import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    // parse a JSON string and convert it into a JavaScript object.
    const login = async (inputs) => {
        const res = axios.post("http://localhost:3001/user/sign-in",inputs)

        if((await res).status === 200){
            console.log('====================================');
            console.log("oke");
            console.log('====================================');
        }

        setCurrentUser(inputs)
    }

    useEffect(() => {
        // local storage must be string
        localStorage.setItem('user',JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value = {{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )

}
