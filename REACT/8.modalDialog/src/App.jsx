import Example1 from "./views/Example1";
import Example2 from "./views/Example2";
import Example3 from "./views/Example3";

export default function App() {
  return (
    <div className="container">
      <h1>Ejemplos de manejo de modales en React</h1>

      <section>
        <h2>🟩 Ejemplo 1 - Sin Prop Drilling</h2>
        <Example1 />
      </section>

      <section>
        <h2>🟨 Ejemplo 2 - Con Prop Drilling</h2>
        <Example2 />
      </section>

      <section>
        <h2>🟦 Ejemplo 3 - Con Context API</h2>
        <Example3 />
      </section>
    </div>
  );
}
