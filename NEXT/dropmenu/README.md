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

## PATRONES PARA LLAMAR A UN SERVER ACTION

- Opción 1 (se ve en la operación delete): Formulario + formAction + useActionState
- Opción 2 (se ve en la operación updateStatus):Llamada directa con promise

## FUNCIONAMIENTO DE UN ALERT DIALOG SOBRE UN DROPMENU: DELETE

### Comportamiento por defecto de un alertDialog en radix

- Un AlertDialog “normal” funciona con Trigger + Content dentro del mismo <AlertDialog>. Ahí Radix gestiona el open/cierre automáticamente.
- En un DropdownMenu, cuando haces click en un item:
  - el menú se cierra
  - su DropdownMenuContent se desmonta
- si tu dialogo vive dentro de ese DropdownMenuContent, se desmonta también → por eso “se abre y se cierra” o directamente no puedes interactuar.

### Modificación del comportamiento para un alertdialog usado sobre un dropmenu

- Para arreglarlo, pones el Dialog fuera del DropdownMenuContent (en un sitio que no se desmonte).
- El trigger visual (el item “Delete”) se queda dentro del menú, pero solo hace setOpen(true).
- Al hacer eso, ya no estás usando AlertDialogTrigger (o no lo puedes usar por contexto), y por tanto Radix ya no puede abrirlo automáticamente → necesitas gestionar tú el open (al menos la apertura; y el cierre lo puedes “delegar” pasando onOpenChange).

## OPCIONES QUE HAY PARA DEVOLVER LA RESPUESTA DEL SERVER ACTION AL CLIENT-TOAST

- opción 1 (la que tenemos implementada): client con toast del actionState.message y refresco con router.refresh y server devuelve el message en un actionstate (es la opción que aqui está implementada).
- opción 2 (me gusta más, porque se más reusable): cliente sin toast y no hace refresh, es el server el que hace revalidate, guarda el state en una cookie y ya no vuelve al cliente, hace un redirect a la page de listado de tickets, esa page cuando se monte, comprobará si hay algo en cookie y si es así renderizará el toast.
