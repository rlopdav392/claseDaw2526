import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function UploadImage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadImage = async () => {
    if (!file) return alert("Selecciona una imagen primero");

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("imagenes")
      .upload(fileName, file);

    if (error) {
      console.error("❌ Error al subir:", error.message);
      alert("Error al subir: " + error.message);
      return;
    }

    console.log("✅ Subida exitosa:", data);

    const { data: publicUrl } = supabase.storage
      .from("imagenes")
      .getPublicUrl(fileName);

    setUrl(publicUrl.publicUrl);
  };

  return (
    <div style={{ padding: 20 }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadImage}>Subir</button>
      {url && (
        <div>
          <p>Imagen subida:</p>
          <img src={url} alt="subida" width={200} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
