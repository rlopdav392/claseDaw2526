import styles from "./navigation.module.css";
import { Link, NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav>
      <ul className={styles["container-nav"]}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/registro">Registro</Link>
        </li>
        <li>
          <NavLink
            to="/contacto"
            className={({ isActive }) => isActive && styles.active}
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
