import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main style={{ height: "2000px", padding: "20px" }}>
        Scroll down to see the sticky element behave as fixed.
      </main>
    </>
  );
}

export default App;
