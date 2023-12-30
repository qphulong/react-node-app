import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    // parse a JSON string and convert it into a JavaScript object.
    const login = (inputs) => {
        const res = axios.post("http://localhost:3001/user/sign-in",inputs)

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
