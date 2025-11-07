import { useEffect, useState } from "react";
import { getCategories } from "../utils/firebase";
import ProductsByCategory from "../components/ProductsByCategory";

const Catalogo = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
        setError("Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Catálogo de productos</h2>

      {categories.length === 0 && <p>No hay categorías disponibles</p>}

      {categories.map((category) => (
        <ProductsByCategory key={category.id} categoryId={category.id} />
      ))}
    </div>
  );
};

export default Catalogo;
