# TAILWIND

## Extensiones

- prettier
- Tailwind CSS IntelliSense

## Documentación oficial

https://tailwindcss.com/docs/installation/tailwind-cli

## Personalización

- Clases arbitrarias:
  font-['Oswald']
- Extendiendo theme:
  @theme {
  --font-oswald: "Oswald";
  }
    <p class="font-oswald">Texto con Oswald</p>

- Variables CSS
  :root {
  --variable-oswald: "Oswald", sans-serif;
  }
    <p class="font-(family-name:--variable-oswald)">Texto con Oswald</p>

## Diferencias con css

align flex => items

## Regla de medición de tailwind

padding, marginm width, heigh: p0 => p96 (multiplicador 0,25)
width, height: w-screen, w-min, w-fit, w-full,min-w
font size:text-xs =>text-9xl (aplica interlineado por defecto hasta 5xl)
leading (interlineado):
tracking (letter spacing)
border: grosor border-2,color border-red-500,radio rounded, rounded-lg, rounded-full, estilo border-solid
gap

## Fundamentos

- texto: https://tailwindcss.com/docs/font-family

- Colores y gradientes: https://tailwindcss.com/docs/colors

- Imágenes de fondo: https://tailwindcss.com/docs/background-image

- Contenedores

## Flexbox

- align pasa a ser item

## Grid

## Posicionamiento

## Animaciones y Hover

## Directiva apply

## Ejemplo modal tailwind

## Personalización Tailwind

## Portfolio

## Academia GG

## Integración librerías / frameworks frontEnd
