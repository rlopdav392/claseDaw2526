import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "../utils/firebase.js";
import { supabase } from "../utils/supabaseClient";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // Para previsualización
  const [supabaseUrl, setSupabaseUrl] = useState(""); // URL real en Supabase

  const [uploading, setUploading] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Para forzar re-render de <img> preview

  // Cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(productId);
      setProduct(data);
      setName(data.name);
      setPrice(data.price);
      setImageUrl(data.imageUrl);
      setSupabaseUrl(data.imageUrl); // Guardar la URL real para borrado
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId]);

  // Manejo de selección de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setImageUrl(previewUrl); // Previsualización
      setImageKey((prev) => prev + 1); // Forzar re-render
    }
    e.target.value = null;
  };

  // Actualizar producto
  const handleUpdate = async () => {
    let newImageUrl = supabaseUrl;

    if (file) {
      setUploading(true);

      // Borrar imagen anterior si existe
      if (supabaseUrl) {
        try {
          console.log("borrando imagen anterior Supabase URL:", supabaseUrl);

          const fullPath = supabaseUrl.split("/storage/v1/object/public/")[1];
          console.log("Full path:", fullPath);
          const path = fullPath.replace("imagenes/", "");
          console.log("Path para borrar:", path);

          const { error: deleteError } = await supabase.storage
            .from("imagenes")
            .remove([path]);

          if (deleteError)
            console.warn("No se pudo eliminar imagen anterior:", deleteError);
          else console.log("Imagen anterior eliminada ✅");
        } catch (error) {
          console.error("Error al eliminar imagen anterior:", error.message);
        }
      }

      // Subir nueva imagen
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("imagenes")
        .upload(fileName, file);

      if (error) {
        alert("Error al subir imagen: " + error.message);
        setUploading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("imagenes")
        .getPublicUrl(fileName);
      newImageUrl = publicUrl.publicUrl;

      setSupabaseUrl(newImageUrl); // Guardar URL de Supabase para próximo borrado
      setImageUrl(newImageUrl); // Mostrar nueva imagen en UI
      setUploading(false);
    }

    // Actualizar en Firebase
    await updateProduct(productId, { name, price, imageUrl: newImageUrl });
    alert("Producto actualizado");
    navigate("/catalogo");
  };

  // Eliminar producto
  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      if (supabaseUrl) {
        const path = supabaseUrl.split("/storage/v1/object/public/")[1];
        const { error: deleteError } = await supabase.storage
          .from("imagenes")
          .remove([path]);
        if (deleteError)
          console.error("Error al eliminar imagen:", deleteError);
      }

      await deleteProduct(productId);
      alert("Producto eliminado");
      navigate("/catalogo");
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  if (isLoading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h2>Detalle de {product.name}</h2>

      <div>
        <label>Nombre:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Imagen actual:</label>
        {imageUrl && (
          <img key={imageKey} src={imageUrl} alt={name} width={150} />
        )}
      </div>

      <div>
        <label>Subir nueva imagen:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpdate} disabled={uploading}>
        {uploading ? "Subiendo..." : "Actualizar"}
      </button>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}

export default ProductDetail;
