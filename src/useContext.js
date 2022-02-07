import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, get_username } from "./Firebase";

const UserContext = createContext({});

export const User_Context = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  //const [basket, setBasket] = useState([{}]);
  useEffect(() => {
    setLoading(true);
    var unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setEmail(res.email) : setEmail(null);
    });

    setLoading(false);
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   var unsubscribe;
  //   const GetUser = () => {
  //     setLoading(true);
  //     unsubscribe = get_username(userEmail).then((res) => {
  //       res ? setUser(res.username) : GetUser();
  //     });
  //   };
  //   GetUser();

  //   setLoading(false);
  //   return unsubscribe;
  // }, [userEmail]);

  const contextValue = {
    user,
    userEmail,
    loading,
    setUser,
    setLoading,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
