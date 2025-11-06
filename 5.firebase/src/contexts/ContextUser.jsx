import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, getUser } from "../utils/firebase";
const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//const initialCurrentUser = { uid: "", displayName: "", email: "" };

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  console.log("currentUser", currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      const fetchUserData = async () => {
        if (user) {
          try {
            const userData = await getUser(user.uid);
            setCurrentUser(userData);
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
        } else {
          setCurrentUser(null);
        }
      };

      fetchUserData();
    });

    return unsubscribe;
  }, []);
  const ctxValue = {
    currentUser,
    setCurrentUser,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
