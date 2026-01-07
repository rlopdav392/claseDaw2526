import { useState } from "react";
import { updateProduct, deleteProduct } from "../utils/firebase";
import { useProducts } from "../hooks/useProducts";

export default function CrudAsyncAwaitCustomHook() {
  const { products, loading, error } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    collection: "",
    imageUrl: "",
  });

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
    if (!editingProduct) return;

    try {
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
      // No hace falta fetchProducts(), el listener actualiza automáticamente
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      // Tampoco hace falta fetchProducts()
    } catch (err) {
      console.error("Error al eliminar producto:", err);
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
