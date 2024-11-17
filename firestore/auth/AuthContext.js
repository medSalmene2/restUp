import React, { useState, createContext } from "react";
import { useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const Authentication = createContext();
export const useAuth = () => {
  return useContext(Authentication);
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe(); // Unsubscribe from auth state changes when component unmounts
  }, []);
  return (
    <Authentication.Provider
      value={{
        user,
      }}>
      {children}
    </Authentication.Provider>
  );
};
