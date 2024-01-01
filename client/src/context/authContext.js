import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  // parse a JSON string and convert it into a JavaScript object.
  const login = async (inputs) => {
    console.log(inputs);
    const res = await axios.post("http://localhost:3001/user/sign-in", inputs);

    console.log(res.data);

    if (res.data) {
      setCurrentUser(res.data); //set current user json
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // local storage must be string
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
