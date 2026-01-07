# Tailwind

## Librerias

Material Icons, Font Awesome, Lucide

## Responsive

Mejor padding que en height en los div (header,...)
los md por defecto son firt mobile

## fuentes atomos

www.youtube.com/watch?v=vSB0tZw0fVs

https://github.com/EtishaGarg/airbnb-clone-html-css/blob/main/public/index.html

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
