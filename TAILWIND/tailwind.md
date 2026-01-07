# TAILWIND

## Extensiones

- prettier
- Tailwind CSS IntelliSense

## Documentación oficial

- https://tailwindcss.com/docs/installation/tailwind-cli

## Personalización:

https://tailwindcss.com/docs/functions-and-directives#apply

- Clases arbitrarias:
  border-['red']

- clases arbitrarias con variables CSS:
  border-[var(--micolor)]

- shorthand para algunas clases arbitarias y sus variables CSS: (suele ser para colores y tipografia)
  text-[var(--mi-color)] es lo mismo que text-(color:--mi-color)
  font-[var(--oswald)]" es lo mismo que font-(family-name:--oswald)

- clases utilitarias personalizadas extendiendo theme:
  @theme {
  --font-oswald: "Oswald", sans-serif;
  }
  <p class="font-oswald">Texto con Oswald</p>

  Solo hay que respetar el prefijo, y ya:
  font- → para fuentes
  text- → para color de texto
  bg- → para background
  border- → para bordes
  gap- → para gaps

- Clases utilitarias personalizadas con variables:
  :root {
  --movida: "Oswald", sans-serif;
  }
  @theme {
  --font-oswald: var(--movida);
  }
    <p class="font-oswald">Texto con Oswald</p>

  - uso de componentes reusables:
    botones, formularios y mejor usa styled component
    apply

## Fundamentos

- texto: https://tailwindcss.com/docs/font-family

font-medium => font-weight:300

- Colores y gradientes: https://tailwindcss.com/docs/colors

- Imágenes de fondo: https://tailwindcss.com/docs/background-image

- Mediciones en tailwind:
  - padding, margin
  - width, height: w-screen, w-full,min-w
  - font size:text-xs =>text-9xl (viene tbe con un interlineado)
  - leading (interlineado):
  - tracking (letter spacing)
    border:
    - grosor border-2
    - color: border-red-500
    - radio:rounded, rounded-lg,..
    - estilo border-solid

## Tailwind toolbox

- https://windytoolbox.com/icons

## Flexbox

- align-end => items-end
- flex: 1 => flex-1; //que se expanda
  flex: 0 0 auto; => flex-none //que se ajuste a su contenido

## Grid: https://tailwindcss.com/docs/grid-template-columns

- En grid container:
  grid-template-columns: auto auto auto; //se ajusta a su contenido => grid-cols-[auto_auto_auto]
  repeat(4,auto) => grid-cols-[repeat(4,auto)]

  grid-template-columns: 1fr 2fr; //se estira => grid-cols-[1fr_2fr]
  grid-template-columns: repeat(3,1fr); => grid-cols-[repeat(3,1fr)]"

grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
grid-cols-[repeat(auto-fit,minmax(200px,1fr))]

- En grid item:
  justify-self: stretch; //se estira horizontalmente => justify-self-stretch
  align-self: strecth // se estira verticalmente => self-stretch

  justify-self: center //se ajusta a su contenido horizontalmente => justify-self-center
  align-self: center //se ajusta a su contenido horizontalmente => self-center

## Centrar elemento:

- Margin:0 auto + width (text-align:center) => mx-auto
- display:flex flex-direction:column, justify-content:center, align-items:center
- display:grid, justify-items:center, align-items:center

place-content-center sirve tanto para flex como para grid

- centrar elementos fuera del flujo (position:absolute) con respecto a su container padre (position:relative)
  top:50%, left:50% transform:translate(-50%, -50%)
  inset: 50% auto auto 50%; transform: translate(-50%, -50%);

## media querys - responsive design: https://tailwindcss.com/docs/responsive-design

- En grid: grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
- En media query:
  .containerGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 90%;
  max-width: 1600px;
  @media (max-width: 768px) {
  grid-template-columns: 1fr;
  }
  }

## Posicionamiento

## Animaciones y Hover

https://tailwindcss.com/docs/animation

## Ejemplo modal tailwind (55')

## Personalización Tailwind (2')

## Integración librerías / frameworks frontEnd - React (3')
