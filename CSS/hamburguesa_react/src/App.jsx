import Header from "./components/Header/Header";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "10rem", textAlign: "center" }}>
        <h1>Contenido de ejemplo</h1>
        <p>
          Abre el menú hamburguesa desde móvil o reduce el ancho de la ventana.
        </p>
      </main>
    </>
  );
}
