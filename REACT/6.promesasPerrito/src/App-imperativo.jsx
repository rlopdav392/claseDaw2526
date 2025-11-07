import { useEffect } from "react";

function App() {
  //const [urlDog, setUrlDog] = useState("");

  async function fetchingData() {
    const urlDogImperativo = document.querySelector(".imgPerrito");
    if (urlDogImperativo) {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (response.ok) {
          const urlPromesa = await response.json();
          console.log(urlPromesa);
          urlDogImperativo.src = urlPromesa.message;
          //setUrlDog(urlPromesa.message);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("estoy en finally");
      }
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  function handlePerrito() {
    fetchingData();
  }

  return (
    <div className="bigLayout">
      <div className="containerPerritos">
        <img className="imgPerrito" />
        <button className="btn" onClick={handlePerrito}>
          Otro
        </button>
      </div>
    </div>
  );
}

export default App;
