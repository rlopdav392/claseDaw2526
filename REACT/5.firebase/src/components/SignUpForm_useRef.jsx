import { useState, useRef } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../utils/firebase";
import { validation } from "../utils/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInput_masEscalable";

function SignUpForm() {
  const emailRef = useRef(null);
  const displayNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPasswd, setErrorPasswd] = useState(null);

  const debounceEmail = useDebouncedCallback(() => {
    if (!validation.isValidEmail(emailRef.current.value)) {
      setErrorEmail("email incorrecto");
    } else {
      setErrorEmail(null);
    }
  }, 3000);

  const handleEmail = () => {
    debounceEmail();
  };

  const debouncePasswd = useDebouncedCallback(() => {
    if (!validation.isValidPassword(passwordRef.current.value)) {
      setErrorPasswd("contraseña incorrecta");
    } else {
      setErrorPasswd(null);
    }
  }, 3000);

  const handlePasswd = () => {
    debouncePasswd();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (passwordRef !== confirmPasswordRef) {
      setErrorPasswd("password no coinciden");
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
        alert("Cannot create user, email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("Password too weak, at least 6 characters");
      } else {
        console.log("Error creating user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <FormInput
        label="Email"
        id="email"
        type="email"
        ref={emailRef}
        onChange={handleEmail}
        error={errorEmail}
        required
      />

      <FormInput
        label="displayName"
        id="displayName"
        type="text"
        ref={displayNameRef}
        required
      />

      <FormInput
        label="password"
        id="password"
        type="password"
        ref={passwordRef}
        onChange={handlePasswd}
        error={errorPasswd}
        required
      />

      <FormInput
        label="confirmPassword"
        id="confirmPassword"
        type="password"
        ref={confirmPasswordRef}
        required
      />

      <div>
        <button type="submit">Registro</button>
      </div>
    </form>
  );
}

export default SignUpForm;
