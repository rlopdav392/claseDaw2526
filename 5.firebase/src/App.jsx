import SignInForm from "./components/SignInForm_useState";
import SignUpFormEstadosAgrupados from "./components/SignUpForm_useRefEstadosAgrupados";
import SignUpForm from "./components/SignUpForm_useRef";
import Contador from "./components/Contador";
import BigLayout from "./pages/BigLayout";
import Error from "./pages/Error";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import "./styles/globales.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BigLayout />}>
        <Route index element={<Home />} />
        <Route path="contadorUseEffect" element={<Contador />} />
        <Route path="loginUseState" element={<SignInForm />} />
        <Route
          path="registroUseRefEstadosAgrupados"
          element={<SignUpFormEstadosAgrupados />}
        />
        <Route
          path="registroUseRefEstadosSinAgrupar"
          element={<SignUpForm />}
        />

        <Route path="admin" element={<AdminPanel />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
