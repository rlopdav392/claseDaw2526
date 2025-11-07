import { Link } from "react-router-dom";
import { UserContext } from "../contexts/ContextUser";
import { useContext } from "react";
import { signOutUser } from "../utils/firebase";
function MainNavigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const response = await signOutUser();
      console.log(response);
      setCurrentUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };
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
            <Link to="contadorUseEffect">
              contador para entender el useEffect
            </Link>
          </li>
          {!currentUser ? (
            <>
              <li>
                <Link to="loginUseState">Login con useState</Link>
              </li>
              <li>
                <Link to="registroUseRefEstadosAgrupados">
                  Registro con useRef y estados agrupados
                </Link>
              </li>
              <li>
                <Link to="registroUseRefEstadosSinAgrupar">
                  Registro con useRef y sin agrupar estados
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
              {currentUser.rol === "admin" && (
                <li>
                  <Link to="admin">Panel admin</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
