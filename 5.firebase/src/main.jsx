import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./contexts/ContextUser";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
