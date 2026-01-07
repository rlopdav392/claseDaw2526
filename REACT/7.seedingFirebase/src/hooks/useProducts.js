import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, "products");

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error al escuchar productos:", err);
        setError("Error al cargar productos");
        setLoading(false);
      }
    );

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  return { products, loading, error };
}
