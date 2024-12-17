import React, { useState, createContext, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserInfo } from "../../firestore/User";

const Authentication = createContext();

export const useAuth = () => {
  return useContext(Authentication);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to manually refresh the user data
  const refreshUser = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const userInfo = await fetchUserInfo(currentUser.uid);
        setUser(userInfo);
        console.log("User info refreshed successfully.");
      } catch (error) {
        console.error("Error refreshing user info: ", error);
      }
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userInfo = await fetchUserInfo(user.uid);
        setUser(userInfo);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <Authentication.Provider
      value={{
        user,
        refreshUser, // Expose the refreshUser function to components
      }}>
      {children}
    </Authentication.Provider>
  );
};
