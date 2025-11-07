import { useState, useEffect } from "react";
import { getCategories } from "../utils/firebase";

const Categories = () => {
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
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error al cargar categorías</p>;

  return (
    <div style={{ display: "flex", gap: "15px" }}>
      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
