# Menu hamburguesa

## Instalación de la libreria: npm install react-icons

## Instalación del node modules: npm install

## Ejecución sobre vite: npm run dev

## Modo no hamburguesa:

- el button hamburguesa es un flex item de mi header escondido:

```css
.btnMobileNav {
  border: none;
  background: none;
  cursor: pointer;
  display: none;
  .iconMobileNav {
    height: 4.8rem;
    width: 4.8rem;
    color: #333;
  }
}
```

## Modo hamburguesa en estado close

- Muestro el botón hamburguesa de mi header

```css
.btnMobileNav {
  display: block;
  z-index: 1000;
}
```

- Saco del flujo a todo mi container nav, y que ocupe todo el viewport, lo dejo con una pequeña transparencia alpha

```css
background-color: rgba(255, 255, 255, 0.97);
width: 100%;
height: 100vh;
position: absolute;
top: 0;
left: 0;
```

- La convierto en un flex, ya que ahora el menu va a ocupar toda la pagina, pues que se centre en la pagina, tbe se podría usar margin:0 auto

```css
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
```

- La oculto y la saco del viewport: transform: translateX(100%);, eso es para el efecto ese chulo de menu deslizante, sino no hace falta sacarle del viewport

```css
opacity: 0;
pointer-events: none;
visibility: hidden;
transition: all 0.5s ease-in;
transform: translateX(100%);
```

- Ahora el menu ya no bailará en fila en el header, sino que en columna

```css
.navList {
  flex-direction: column;
  gap: 4.8rem;
}
```

## Modo hamburguesa en estado open

- Sabre que esta en estado open cuando mi container nav tambien tenga la clase navOpen, en ese momento tengo que regresar a su posición original el container nav (transform: translateX(0)), que lo había sacado fuera del viewport y mostrarlo

```css &.navOpen {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  transform: translateX(0);
  }
```

## Sino interesa el efecho de menu deslizándose pues quitar esto:

```css
transition: all 0.5s ease-in;
transform: translateX(100%);
transform: translateX(0);
```
