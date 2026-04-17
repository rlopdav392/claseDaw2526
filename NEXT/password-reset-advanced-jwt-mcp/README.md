# COMO USAR INNGEST

## CONFIGURACIONES INICIALES

=> Liberías a usar:
@react-email/components, @react-email/components/render, inngest y resend.

=> Modificaciones en la tabla users:
En tu tabla users has de meter el campo passwordResetNonce, ese campo, sirve, para que una vez que se use el token de reset password, se invalide para no volver a usarlo.

=> Variables de entorno para resend:
    RESEND_API_KEY="re_TPRR3zrq_B82HndXoubXBXeB8fNrX6a6Q"
    RESEND_FROM_EMAIL="onboarding@resend.dev"

=> Variables de entorno para inngest (están inicializadas para local-desarrollo):
    INNGEST_DEV=1
    INNGEST_EVENT_KEY="your_inngest_event_key"
    INNGEST_SIGNING_KEY="your_inngest_signing_key"

## INNGEST DESARROLLO vs INNGEST CLOUD

Inngest varia algo si se ejecuta en modo desarrollo o en cloud, en desarrollo, tienes que ejecutar el server inngest en local, en cloud, te olvidas, y luego las tres variables de entorno que usa inngesthay que modificarlas según estamos en desarrollo o producción.  

En desarrollo inngest se ejecuta de la siguiente forma:
npm run inngest:dev -- -u http://localhost:3000/api/inngest
Luego lo abres desde esta url: http://localhost:8288

En producción, cuando tengas un dominio publico de tu app, usas inngest cloud, por lo tanto, ya no tienes que lanzar inngest en local

estableces correctamente las tres variables de entorno:
    INNGEST_DEV=0
    INNGEST_EVENT_KEY="your_inngest_event_key"
    INNGEST_SIGNING_KEY="your_inngest_signing_key"

En el dashboard de inngest tiens que decirle a inngest donde se encuentra desplegada tu aplicación, para cuando ingeste ejecute el endpoint /api/inngest sepa a donde tiene que ir.

## FLUJO DE EJECUCIÓN DE RESET PASSWORD CON REENVIO A EMAIL:

En el action forgot-password.ts está toda la lógica, vamos a verla:

=> exista o no exista el usuario, siempre devuelve true, exito, por temas de seguridad.
=> Si inngest no está en modo dev y la key es invalida, pues no se enviará el evento y si está en dev pero no está arrancado, pues irá al catch y se ejecutará el fallback
=> Entonces se genera el evento en inngest, se le pone un nombre e inngest devolverá un id:
  const { ids } = await inngest.send({
        name: "app/password.password-reset",
        data: { userId: user.id },
      });
=> Lo que hemos dicho, si el inngest falla, se ha de ejecutar el fallback, es decir reenviar directamente al email el reset password sin pasar por un sistema de colas - inngest.
=> Sino falla, inngest guarda el evento en su sistema colas y cuando decida ejecutarlo hace una llamada HTTP a mi app a un endpoint interno /api/inngest
La definición de esa función suscrita está en event-password-reset, y si, tendrás que que definir un endpoint.

=> Sea por fallback o a través de inngest, ahora lo siguiente sería generar el link y enviarlo por email com resend:


  1. Creo un link seguro de reset
        const link = await generatePasswordResetLink(user.id);
        await sendPasswordResetEmail(user.username, user.email, link);


        Idea principal: Como el usuario no está autenticado, no puedes identificarlo con la cookie de login.
        Entonces he creado un token temporal de 30 minutos que se mandará en la url, que identifica al usuario, el password es un compendio de userID + nonce(un número random) firmado con el secreto.
        Ese nonce, se guarda en BBDD con el nombre passwordResetNonce. 

2. Enviar el email con Resend desde tu servidor, Resend usa un componente React como plantilla, de tal forma que renderizará ese componente React a HTML y lo enviará como email.

    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Restablecer contraseña",
      react: (
        <PasswordResetEmail toName={username} url={passwordResetLink} />
      ),
    });

3. PassowrdResetEmail es el email que se enviará, esta diseñado con componentes de la librería @react-email/components, verás que a este componente se le pasa unos props inicializados con datos fake llamados PreviewProps, para visualizar como se ve el email a modo de preview sin tener que enviarlo:

PasswordResetEmail.PreviewProps = {
  toName: "Usuario",
  url: "http://localhost:3000/reset-password/ejemplo",
} satisfies PasswordResetEmailProps;


http://localhost:3000/dev/email-preview

4. Entonces el siguiente paso es cuando el usuario pulsa en el enlace del correo irá al link de reestablecer contraseña que lleva ese token temporal

reset_password\[token] => page.tsx

En esta página se valida el token, acuérdate que el token era (userid, nonce), se saca con el secreto y se compara en base de datos que exista ese usuario con ese nonce, si no es así, pues da mensaje de no válido, y vuelve a poner la opción para que vayas a recuperar contraseña.

Si token válido muestra formulario para meter contraseña nueva, aquí lo importante de este action:

=> Vuelve a validar el token (que lo pasa en el form en un campo oculto)

=> Si token valido y la nueva contraseña metida pasa la validación zod, pues se actualiza contraseña en usuario, y se elimina el nonce del usuario, para invalidar ese token, por si lo quieren volver a usar, antes de que caduque, antes de esos 30 minutos.
