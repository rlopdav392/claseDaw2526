import { useEffect, useState } from "react";

function App() {
  const [urlDog, setUrlDog] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nameAsc");

  console.log(
    "nueva renderización por cambio en término de búsqueda",
    searchTerm
  );
  console.log(
    "nueva renderización por cambio en lista desplegable",
    sortOption
  );

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  async function fetchingData() {
    try {
      setIsLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (response.ok) {
        const urlPromesa = await response.json();

        setUrlDog(urlPromesa.message);
        setError(null);
      } else {
        setError("error server");
      }
    } catch (error) {
      setError(`error server ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(
    `Llamamos a backend con los nuevos parámetros de búsqueda: Campo de texto: ${searchTerm}, Opción de orden: ${sortOption}`
  );

  useEffect(() => {
    console.log(
      `Llamamos a backend con los nuevos parámetros de búsqueda: Campo de texto: ${searchTerm}, Opción de orden: ${sortOption}`
    );

    fetchingData();
  }, [searchTerm, sortOption]);

  function handlePerrito() {
    fetchingData();
  }

  return (
    <div className="bigLayout">
      <form className="formPerrito">
        <input
          type="text"
          placeholder="Buscar perrito..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="nameAsc">Ordenar por nombre (A-Z)</option>
          <option value="razaAsc">Ordenar por raza (ascendente)</option>
        </select>
      </form>
      {error && <p>Error {error}</p>}
      {isLoading && <p>Estoy cargando</p>}
      {!error && !isLoading && (
        <div className="containerPerritos">
          <img className="imgPerrito" src={urlDog} />
          <button className="btn" onClick={handlePerrito}>
            Otro
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
