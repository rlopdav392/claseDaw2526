# GESTIÓN DEL CARRITO

SON TRES useEffect

COMO CONTEXTO DE CARRITO CONSUME CONTEXTO DE USUARIO, IMPORTANTE EL PROVIDER DEL USER HA DE ESTAR POR ENCIMA DEL PROVIDER DEL CART, PARA QUE CONTEXTO CART PUEDA ACCEDER A CONTEXTO USER

```jsx
<UserProvider>
  <CartProvider>
    <App />
  </CartProvider>
</UserProvider>
```

## CUANDO EL USUARIO SE LOGEE: (useEffect 1 escuchando cambios de usuario [user])

- leo carrito de firebase (users/{uid}/cart)
- leo carrito de localtorage
- Hago merge(si mismo item en firebase y en localstorage se suman cantidades, sino está el mismo item en ambos sitios pues se añade item al merge y ya) y tras el merge actualizo tanto localstorage como firebase. Esto del merge, solo se hace una única vez, tras el inicio de sesión.

IMPORTANTE: EL MERGE SOLO UNA VEZ, JUSTO TRAS DETECTAR EL LOGIN.

## CADA VEZ QUE CAMBIA EL CARRITO (useEffect 2 escuchando cambios de carrito [cart])

- cualquier cambio en carrito provoca una actualización en localstorage y en firebase (en este ultimo solo si usuario logueado)

## CADA VEZ QUE SE REFRESQUE LA PAGINA (mount/umount DOM component) (useEffect 3 escuchando en el mount [])

- Contexto de carrito vuelve a cargarse a traves de localstorage, y si por lo que fuera no hay nada en localstorage pues tendría que ir a firebase

## CUANDO EL USUARO CIERRE SESION: (useeffect 1 escuchando cambios de usuario [user])

- Se borra localstorage y ya
