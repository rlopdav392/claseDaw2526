# En css herramientas para responsive y accesible:

## min/max sizes

min-width / max-width / min-height / max-height usado conjuntamente con un width / height en % o viewport

## unidades relativas:

rem, %, vw, vh
100%
100vw/100vh

## flex layout

- En flex item:
  flex: 1; //que se expanda
  flex: 0 0 auto; //que se ajuste a su contenido

## grid layout

- En grid container:
  grid-template-columns: auto auto auto; //se ajusta a su contenido
  grid-template-columns: 1fr 2fr; //se estira

- En grid item:
  justify-self: stretch; //se estira horizontalmente
  align-self: strecth // se estira verticalmente

  justify-self: center //se ajusta a su contenido horizontalmente
  align-self: center //se ajusta a su contenido horizontalmente

## Centrar elemento:

- Margin:0 auto + width (text-align:center)
- display:flex flex-direction:column, justify-content:center, align-items:center
- display:grid, justify-items:center, align-items:center
- centrar elementos fuera del flujo (position:absolute) con respecto a su container padre (position:relative)
  top:50%, left:50% transform:translate(-50%, -50%)
  inset: 50% auto auto 50%; transform: translate(-50%, -50%);

## media querys

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

- Movida clamp() para tipografias responsive sin media querys:
  font-size: clamp(1rem, 5vw, 2rem);
  width: clamp(200px, 50vw, 600px);
  padding: clamp(8px, 2vw, 24px);
  margin-left: clamp(0.5rem, 3vw, 2rem);
  border-radius: clamp(4px, 2vw, 40px);

  Mínimo → fijo (px, rem)
  Ideal → relativo (vw, %) => ha de cambiar con el view port, en vw o con calc (2vw + 1rem)
  Máximo → fijo (px, rem)

- Content-based sizing ideal para párrafos responsive:
  width: min-content / max-content / fit-content
