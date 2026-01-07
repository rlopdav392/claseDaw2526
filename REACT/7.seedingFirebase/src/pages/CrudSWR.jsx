import { useState } from "react";
import useSWR, { mutate } from "swr";
import { db, updateProduct, deleteProduct } from "../utils/firebase";

import { collection, getDocs } from "firebase/firestore";

const fetcher = async () => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export default function CrudSWR() {
  const { data: products, error, isLoading } = useSWR("products", fetcher);

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
    /*
    1. Actualizo cache sin ir backend (mutate false)
    2. Actualizo backend
    3. Ahora si traigo lo de backend a cache para evitar inconsistencias (mutate true)
    */
    e.preventDefault();
    if (!editingProduct) return;

    try {
      mutate(
        "products",
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : p
        ),
        false
      );

      await updateProduct(editingProduct.id, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      mutate("products");

      setEditingProduct(null);
      setForm({
        name: "",
        price: "",
        stock: "",
        collection: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      mutate(
        "products",
        products.filter((p) => p.id !== id),
        false
      );

      await deleteProduct(id);

      mutate("products");
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error al cargar productos</p>;

  return (
    <div className="crud-container">
      <h2>CRUD Productos (SWR)</h2>

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
