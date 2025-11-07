import { addCollectionAndDocuments } from "../utils/firebase";
import { useEffect } from "react";
import CATEGORIES from "../data/categories";
import PRODUCTS from "../data/products";

export const SeedDataLoader = () => {
  const seedDatabase = async () => {
    try {
      await addCollectionAndDocuments("categories", CATEGORIES);
      await addCollectionAndDocuments("products", PRODUCTS);
      console.log("Carga inicial completada");
    } catch (error) {
      console.error("Error al cargar datos iniciales:", error);
    }
  };

  useEffect(() => {
    seedDatabase();
  }, []);
  return null;
};

export default SeedDataLoader;
