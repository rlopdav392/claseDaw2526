import { useEffect, useState } from "react";
function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("MONTADO");
    return () => console.log("DESMONTADO");
  }, []);

  console.log("RE-RENDER");

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default Contador;
