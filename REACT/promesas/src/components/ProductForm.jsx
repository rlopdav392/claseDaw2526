import { useEffect, useState } from "react";

export default function ProductForm({ onSubmit, product }) {
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: Number(form.price) });
    setForm({ name: "", price: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
      />

      <button type="submit">{product ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}
