# MOVIDA OBSERVADOR

Se observa la intersección con el viewport de un container invisible "sentinel" que este justo encima del container sticky

observer.observe(sentinelRef.current);

## PORCENTAJE DE VISIBILIDAD HACIENDO USO DE THRESHOLD

## Porcentaje de visitiblidad [threshold: 0, 0.5, 1] para que entry.isIntersecting sea true

- si al menos 1 píxel del elemento está visible => threshold: 0
- Si al menos la mitad del elemento está visible => threshold: 0.5
- si todo el elemento está completamente visible => threshold: 1

En este ejemplo cuando sentinel pierde toda la visibilidad (threshold: 0) ya no intersecta y se activa sticky
Solo intersecta cuando por lo menos tenga un pixel de visibilidad, si no tiene ningun pixel en viewwport ya no intersecta

```jsx
const observer = new IntersectionObserver(
  ([entry]) => {
    setIsSticky(!entry.isIntersecting);
  },
  {
    threshold: 0,
  }
);
```

En este ejemplo cuando sentinel pierde más de la mitad de visibilidad (threshold: 0.5) ya no intersecta y se activa
sticky
Solo intersecta cuando esté la mitad visible en el viewport, menos de la mitad (49%) ya no interecta

```jsx
const observer = new IntersectionObserver(
  ([entry]) => {
    setIsSticky(!entry.isIntersecting);
  },
  {
    threshold: 0.5,
  }
);
```

En este ejemplo cuando sentinel pierde aunque sea un pixel de visibilidad (threshold: 1 ) ya no intersecta y se activa sticky
Solo interecta cuando esté por completo en el viewport, si pierda un pixel de visibilidad ya no intersecta

```jsx
const observer = new IntersectionObserver(
  ([entry]) => {
    setIsSticky(!entry.isIntersecting);
  },
  {
    threshold: 1,
  }
);
```

## PORCENTAJE DE VISIBILIDAD HACIENDO USO DE THRESHOLD + ROOTMARGIN PARA SER MAS PRECISOS EN EL PORCENTAJE

- Entonces, como threshold solo acepta este rango de visibilidad porcentual sobre el viewport [0,0.5,1]
  Si queremos afinar más y en pixel, con más exactitud, en plan exactamente cuando le queden 30 pixel, pues en ese caso hay que usar threshold con rootMargin

- Entonces: con threshold:0 activo sticky cuando salga por completo del viewport el container sentinel
  Pero si quiero que el sticky se active 15 pixel antes de que salga del viewport sentinel (height de sentinel
  tendría que ser > 15px), uso threshold:0 con rootMargin negativo -15px

```jsx
const observer = new IntersectionObserver(
  ([entry]) => {
    setIsSticky(!entry.isIntersecting);
  },
  {
    threshold: 0,
    rootMargin: "0px 0px -15px 0px",
  }
);
```
