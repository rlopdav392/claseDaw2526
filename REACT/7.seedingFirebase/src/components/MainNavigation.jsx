import { Link } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "20px",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="catalogo">catalogo</Link>
          </li>
          <li>
            <Link to="seedingFirebase">Cargando la base de datos Firebase</Link>
          </li>
          <li>
            <Link to="seedingSupabase">Subiendo imágenes a Supabase</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
