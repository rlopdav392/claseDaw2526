import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { db } from "../utils/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const fetchProducts = async () => {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export function useProductsReactQuery() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    const productsRef = collection(db, "products");
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      queryClient.setQueryData(["products"], updatedProducts);
    });

    return () => unsubscribe();
  }, [queryClient]);

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
}
