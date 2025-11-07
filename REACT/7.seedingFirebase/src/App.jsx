import BigLayout from "./pages/BigLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import SeedingFirebase from "./pages/SeedingFirebase";
import ProductDetail from "./components/ProductDetail";
import { Routes, Route } from "react-router-dom";
import SeedingSupabase from "./pages/SeedingSupabase";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BigLayout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="catalogo/:productId" element={<ProductDetail />} />

        <Route path="seedingFirebase" element={<SeedingFirebase />} />
        <Route path="seedingSupabase" element={<SeedingSupabase />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
