import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, updateProduct, deleteProduct } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export default function CrudReactQuery() {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await updateMutation.mutateAsync({
        id: editingProduct.id,
        data: {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        },
      });

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
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error al cargar productos</p>;

  return (
    <div className="crud-container">
      <h2>CRUD Productos (React Query v5)</h2>

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
º;
