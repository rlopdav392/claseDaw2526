# IMAGENES

## Imagenes con un image

<img src="imagen.jpg" style="width:100%; height:100%; object-fit:cover;">
objetfit: cover (recorta), contain (puede quedar espacios vacíos)
Con cover => object-position: center top (Controla que parte de la imagen se muestra cuando se recorta)
Con contain => object-position controla donde colocar los espacios vacios

Ejemplos para que no haya desbordamiento:

- Opción 1: <img src="imagen.jpg" style="width:100%; height:100%; object-fit:cover;">
- Opción 2: <img src="imagen.jpg" style="width:100%; height:auto; max-height:100%;">
- Opción 3: <div style="width:300px; height:300px; overflow:hidden;">
<img src="imagen.jpg" style="width:100%; height:auto;">
</div>

## Imágenes como fonde de un div (background-image)

  <div style="
    width:300px; height:300px;
    background-image:url('imagen.jpg');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
  "></div>

## picture para responsivida y formatos

  <picture>
    <source srcset="imagen.avif" type="image/avif">
    <source srcset="imagen.webp" type="image/webp">
    <img src="imagen.jpg" alt="Imagen fallback">
  </picture>

    <picture>
    <!-- Pantallas grandes -->
    <source srcset="imagen-1200.jpg" media="(min-width: 1200px)">
    <!-- Pantallas medianas -->
    <source srcset="imagen-800.jpg" media="(min-width: 768px)">
    <!-- Pantallas pequeñas -->
    <source srcset="imagen-400.jpg" media="(max-width: 767px)">
    <!-- Fallback -->
    <img src="imagen-800.jpg" alt="Imagen responsive">

  </picture>

  <picture>
  <source srcset="imagen-1200.avif" type="image/avif" media="(min-width:1200px)">
  <source srcset="imagen-800.avif" type="image/avif" media="(min-width:768px)">
  <source srcset="imagen-400.avif" type="image/avif">
  <img src="imagen-800.jpg" alt="Imagen responsive">
</picture>

## picture recorte avanzado

  <img src="imagen.jpg" style="clip-path:circle(50%);">
