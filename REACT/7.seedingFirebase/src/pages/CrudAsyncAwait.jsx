import { useEffect, useState } from "react";
import { db, updateProduct, deleteProduct } from "../utils/firebase";

import { collection, getDocs } from "firebase/firestore";

export default function CrudAsyncAwait() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    collection: "",
    imageUrl: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      collection: product.collection,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProduct(editingProduct.id, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setEditingProduct(null);
      setForm({
        name: "",
        price: "",
        stock: "",
        collection: "",
        imageUrl: "",
      });
      await fetchProducts();
    } catch (err) {
      setError("Error al actualizar producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError("Error al eliminar producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="crud-container">
      <h2>CRUD Productos</h2>

      {editingProduct && (
        <form onSubmit={handleUpdate} className="crud-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            name="collection"
            value={form.collection}
            onChange={handleChange}
            placeholder="Colección"
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="URL Imagen"
          />
          <button type="submit">Actualizar</button>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setForm({
                name: "",
                price: "",
                stock: "",
                collection: "",
                imageUrl: "",
              });
            }}
          >
            Cancelar
          </button>
        </form>
      )}

      <ul className="crud-list">
        {products.map((p) => (
          <li key={p.id} className="crud-item">
            <img src={p.imageUrl} alt={p.name} width={50} />
            <span>
              {p.name} - ${p.price} - Stock: {p.stock}
            </span>
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
