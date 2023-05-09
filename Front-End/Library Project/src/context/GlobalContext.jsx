import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

  const [isLogged, setIsLogged] = useState(false);

  const [user, setUser] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: {
      country: "",
      city: "",
      line: "",
      postCode: "",
    },
    token: "",
    roles: []
  });

  const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setIsLogged(true);
    }
  };

  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);



  const setUserAndLocalStorage = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLogged(true);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
    setUser({
      id: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      address: {
        country: "",
        city: "",
        line: "",
        postCode: "",
      },
      token: "",
      roles: []
    });
  };

  return (
    <ContextGlobal.Provider value={{
      user,
      isLogged,
      setUser,
      setUserAndLocalStorage,
      loadUserFromLocalStorage,
      logout,
    }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useGlobalStates = () => {
  return useContext(ContextGlobal);
};