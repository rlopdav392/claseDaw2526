import useSWR, { mutate } from "swr";
import { db } from "../utils/firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

const fetcher = async () => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export function useProductsSWR() {
  const { data, error, isLoading } = useSWR("products", fetcher);

  const productsRef = collection(db, "products");
  onSnapshot(productsRef, (snapshot) => {
    const updatedProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    mutate("products", updatedProducts, false);
  });

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
}
