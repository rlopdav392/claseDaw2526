import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/");
  };
  return (
    <form className={styles.container}>
      <h2>Soy el login</h2>
      <button onClick={handle}>Soy un button</button>
    </form>
  );
}

export default Login;
