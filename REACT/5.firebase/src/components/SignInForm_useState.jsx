import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase";
import { validation } from "../utils/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInput_masEscalable";
import { UserContext } from "../contexts/ContextUser";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPasswd, setErrorPasswd] = useState(null);

  const debounceEmail = useDebouncedCallback((currentEmail) => {
    if (!validation.isValidEmail(currentEmail)) {
      setErrorEmail("email incorrecto");
    } else {
      setErrorEmail(null);
    }
  }, 3000);

  const handleEmail = (event) => {
    const currentEmail = event.target.value;
    setEmail(currentEmail);
    debounceEmail(currentEmail);
  };

  const debouncePasswd = useDebouncedCallback((currentPasswd) => {
    if (!validation.isValidPassword(currentPasswd)) {
      setErrorPasswd("contraseña incorrecta");
    } else {
      setErrorPasswd(null);
    }
  }, 3000);

  const handlePasswd = (event) => {
    const currentPasswd = event.target.value;
    setPasswd(currentPasswd);
    debouncePasswd(currentPasswd);
    //debouncePasswd(passwd);
  };

  const handleGoogle = async () => {
    try {
      const responseAuth = await signInWithGooglePopup();

      console.log("respuesta auth", responseAuth);

      const responseDatabase = await createUserDocumentFromAuth(
        responseAuth.user,
        {
          rol: "admin",
        }
      );
      console.log("respuesta dabatase", responseDatabase);
    } catch (exception) {
      console.error("movida error", exception);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, passwd);
      console.log(response);
      setCurrentUser(response);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={handleEmail}
        error={errorEmail}
        required
      />

      <FormInput
        label="Password"
        id="passwd"
        type="password"
        value={passwd}
        onChange={handlePasswd}
        error={errorPasswd}
        required
      />

      <div>
        <button type="submit">Login con usuario y passwd</button>
        <button type="button" onClick={handleGoogle}>
          Login con Google
        </button>
      </div>
    </form>
  );
}

export default SignInForm;
