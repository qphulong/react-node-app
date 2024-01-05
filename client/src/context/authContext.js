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

    // console.log(res.data);

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

  //===================================================================================================================
  //profile image
  const [profileImage,setProfileImage] = useState("https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/profile-pic/${currentUser.userId}`);
  
      if (response.status === 200) {
        const imageFilename = response.data
        console.log('====================================');
        console.log(imageFilename.profilePic);
        console.log('====================================');
        setProfileImage(imageFilename.profilePic)
      } else {
        console.log(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error.message);
    }
  };
  useEffect(() => {
    fetchProfileImage();
  },[])
  //===================================================================================================================

  return (
    <AuthContext.Provider value={{ currentUser, login, logout,profileImage,setProfileImage}}>
      {children}
    </AuthContext.Provider>
  );
};
