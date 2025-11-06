import "./styles/stylesGlobales.css";
import "./styles/stylesReusables.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Pagina2 from "./pages/Pagina2";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import BigLayout from "./pages/BigLayout";
import ProductDetail from "./pages/productDetail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/protected/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BigLayout />}>
          <Route index element={<Home />} />
          <Route path="pagina2" element={<Pagina2 />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="home/:productId" element={<ProductDetail />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
