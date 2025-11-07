import { useEffect, useState } from "react";
import { getProductsByCategory } from "../utils/firebase";
import { Link } from "react-router-dom";

const ProductsByCategory = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No hay productos en esta categoría</p>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price} €</p>
          <Link to={`/catalogo/${product.id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;
