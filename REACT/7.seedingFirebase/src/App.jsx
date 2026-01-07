import BigLayout from "./pages/BigLayout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import SeedingFirebase from "./pages/SeedingFirebase";
import ProductDetail from "./components/ProductDetail";
import { Routes, Route } from "react-router-dom";
import SeedingSupabase from "./pages/SeedingSupabase";
import CrudASyncAwait from "./pages/CrudAsyncAwait";
import CrudSWR from "./pages/CrudSWR";
import CrudReactQuery from "./pages/CrudReactQuery";
import CrudAsyncAwaitCustomHook from "./pages/CrudAsyncAwaitCustomHook";
import CrudSWRcustomHook from "./pages/CrudSWRCustomHook";
import CrudReactQueryCustomHook from "./pages/CrudReactQueryCustomHook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BigLayout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="catalogo/:productId" element={<ProductDetail />} />

        <Route path="seedingFirebase" element={<SeedingFirebase />} />
        <Route path="seedingSupabase" element={<SeedingSupabase />} />
        <Route path="crudAsyncAwait" element={<CrudASyncAwait />} />
        <Route
          path="crudAsyncAwaitCustomHook"
          element={<CrudAsyncAwaitCustomHook />}
        />
        <Route path="crudSWR" element={<CrudSWR />} />
        <Route path="crudSWRCustomHook" element={<CrudSWRcustomHook />} />
        <Route path="crudReactQuery" element={<CrudReactQuery />} />
        <Route
          path="crudReactQueryCustomHook"
          element={<CrudReactQueryCustomHook />}
        />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
