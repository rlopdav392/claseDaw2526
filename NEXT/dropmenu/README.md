# CRUD de UPDATE /DELETE HECHO SOBRE UN DROPDOWNMENU

- Descargar y poner en ejecución para entender el funcionamiento,
- Su base de datos es un json definido en data, para que pueda ser ejecutado en cualquier entorno
- La pagina principal es /tickets
- Tanto la operación de update como la de delete son dos server action, ya que son llamadas de un client,
- Se ha usado dos patrones diferentes de comunicar el client con el server action y recibir la respuesta del mismo:
  - En el delete, se usa el tipico patrón de formAction con su actionState
  - En el updateStatus se usa una simple promesa
- Ambos patrones son correctos en este caso, ya que no hay un formulario como tal con validación de campos, si así lo hubiesa obviamente, nada de promesas, tiene que usarse si o si un formAction con ActionState
- Así mismo también hay que entender el patrón usado en el dropmenu, que lo explico más abajo, ya que tiene una casuística especial, se trata de un dropmenu con un dialog.
- y por último, también explico dos posibles formas de renderizar el toast tras el server action (cookie, useEffect sobre timestamp)

## 1. PATRONES PARA LLAMAR A UN SERVER ACTION

- Opción 1 (se ve en la operación delete): Formulario + formAction + useActionState
- Opción 2 (se ve en la operación updateStatus):Llamada directa con promise

## 2. FUNCIONAMIENTO DE UN ALERT DIALOG SOBRE UN DROPMENU: DELETE

#### 2.1 Comportamiento por defecto de un alertDialog en radix

- Un AlertDialog “normal” funciona con Trigger + Content dentro del mismo <AlertDialog>. Ahí Radix gestiona el open/cierre automáticamente.
- En un DropdownMenu, cuando haces click en un item:
  - el menú se cierra
  - su DropdownMenuContent se desmonta
- si tu dialogo vive dentro de ese DropdownMenuContent, se desmonta también → por eso “se abre y se cierra” o directamente no puedes interactuar.

#### 2.2 Modificación del comportamiento para un alertdialog usado sobre un dropmenu

- Para arreglarlo, pones el Dialog fuera del DropdownMenuContent (en un sitio que no se desmonte).
- El trigger visual (el item “Delete”) se queda dentro del menú, pero solo hace setOpen(true).
- Al hacer eso, ya no estás usando AlertDialogTrigger (o no lo puedes usar por contexto), y por tanto Radix ya no puede abrirlo automáticamente → necesitas gestionar tú el open (al menos la apertura; y el cierre lo puedes “delegar” pasando onOpenChange).

## 3. OPCIONES QUE HAY PARA DEVOLVER LA RESPUESTA DEL SERVER ACTION AL CLIENT-TOAST

- opción 1 (la que tenemos implementada): client con toast del actionState.message y refresco con router.refresh y server devuelve el message en un actionstate (es la opción que aqui está implementada).
- opción 2 (me gusta más, porque se más reusable): cliente sin toast y no hace refresh, es el server el que hace revalidate, guarda el state en una cookie y ya no vuelve al cliente, hace un redirect a la page de listado de tickets, esa page cuando se monte, comprobará si hay algo en cookie y si es así renderizará el toast, eso es lo que se llama el patrón FLASH TOAST.

#### 3.1 PATRÓN DE FLASH TOAST

- En el server action se haría esto:

```jsx
revalidatePath(ticketsPath());
await setCookieByKey("toast", "Ticket deleted");
redirect(ticketsPath());
```

- En la página de post (o mejor en un template si lo quieres más reusable aún), se llamaría a un component "RedirectToast", lo encapsulo en un componente, y lo pongo directamente el código del toast-cookie en la pagina porque entonces toda la página se tendría que convertir en useclient al hacer uso de toast, entonces aquí el truco está en aquello que lleve el toast, meterlo en un component, y ya al invocarlo desde la página, no hay necesidad de convertir la página en use client.

```jsx
<RedirectToast />
```

- Código del componente RedirectToast

```jsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
```

# 3 PATRONES SERVER PARA COMUNICACIÓN ENTRE CLIENTE <=> SERVER ACTIONS

## Patrón 1: promise directa (imperativo)

- Se llama a server action como una función async normal, sin action state.
- Para acciones rápidas sin form, que no requieren de validación de campos

```jsx
const promise = UpdateTicketStatus(id, value);

toast.promise(promise);

const result = await promise;
toast.success(result.message);
```

## Patrón 2: formAction + useActionState (sin inputs, por lo tanto sin formData)

- Se llama a server action a través de un actionState, pero sin formData
- Para acciones rápidas sin form, que no requieren de validación de campos

```jsx
const [state, formAction] = useActionState(deleteTicket, initial)

<form action={formAction}>
  <button>Confirm</button>
</form
```

## Patrón 3: formAction + useActionState + formData (validación de inputs)

- Se llama a server action a través de un actionState con su formData
- para formularios con validación de sus inputs

```jsx
<form action={formAction}>
  <input name="title" />
  <input name="content" />
</form>
```

# 2 PATRONES UX PARA MOSTRAR TOAST TRAS EL ACTION SERVER

## Toast en el client, no redirect

- server action → devuelve estado a client → client renderiza toast → client hace router.refresh()

## Toast en un layout/template con redirect = patrón Flash message/toast

- server action → guarda mensaje en cookie → server hace revalidate + redirect → layout/template lee cookie y renderiza toast
