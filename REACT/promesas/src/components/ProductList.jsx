export default function ProductList({ products, onDelete, onEdit }) {
  return (
    <ul className="list">
      {products.map((p) => (
        <li key={p.id} className="item">
          <span>
            {p.name} - ${p.price}
          </span>

          <button onClick={() => onEdit(p)}>Editar</button>
          <button className="danger" onClick={() => onDelete(p.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
