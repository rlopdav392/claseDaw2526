import { useState, useRef } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../utils/firebase";
import { validation } from "../utils/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInput_masEscalable";

function SignUpFormEstadosAgrupados() {
  const emailRef = useRef(null);
  const displayNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [serverError, setServerError] = useState(null);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    displayName: null,
  });

  const debounceEmail = useDebouncedCallback(() => {
    setErrors((prev) => ({
      ...prev,
      email: validation.isValidEmail(emailRef.current.value)
        ? null
        : "Email incorrecto",
    }));
  }, 3000);

  const debouncePasswd = useDebouncedCallback(() => {
    setErrors((prev) => ({
      ...prev,
      password: validation.isValidPassword(passwordRef.current.value)
        ? null
        : "Contraseña incorrecta",
    }));
  }, 3000);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (serverError) setServerError(null);

    const name = displayNameRef.current.value.trim();
    if (!name) {
      setErrors((prev) => ({
        ...prev,
        displayName: "Nombre no puede estar vacío",
      }));
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrors((prev) => ({
        ...prev,
        password: "Las contraseñas no coinciden",
      }));
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      await createUserDocumentFromAuth(user, {
        displayName: displayNameRef.current.value,
        rol: "user",
      });

      console.log("User created:", user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setServerError("El email ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setServerError("La contraseña es demasiado débil");
      } else {
        setServerError("Error inesperado al registrar usuario");
        console.error(error);
      }
    }
  };

  return (
    <>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSignUp}>
        <FormInput
          label="Email"
          id="email"
          type="email"
          ref={emailRef}
          onChange={debounceEmail}
          error={errors.email}
          required
        />

        <FormInput
          label="Display Name"
          id="displayName"
          type="text"
          ref={displayNameRef}
          error={errors.displayName}
          required
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          ref={passwordRef}
          onChange={debouncePasswd}
          error={errors.password}
          required
        />

        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          required
        />

        <div>
          <button type="submit">Registro</button>
        </div>
      </form>
    </>
  );
}

export default SignUpFormEstadosAgrupados;
