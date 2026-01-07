import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("/products.json");
        if (!res.ok) throw new Error("Error al cargar productos");

        const products = await res.json();
        setData(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = (product) => {
    setData([...data, { ...product, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setData(data.filter((p) => p.id !== id));
  };

  const updateProduct = (product) => {
    setData(data.map((p) => (p.id === product.id ? product : p)));
    setEditingProduct(null);
  };

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2 style={{ color: "red" }}>Error: {error}</h2>;

  return (
    <div className="container">
      <h1>CRUD Productos</h1>
      <ProductForm
        onSubmit={editingProduct ? updateProduct : addProduct}
        product={editingProduct}
      />

      <ProductList
        products={data}
        onDelete={deleteProduct}
        onEdit={setEditingProduct}
      />
    </div>
  );
}

export default App;
