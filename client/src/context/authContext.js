import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    // parse a JSON string and convert it into a JavaScript object.
    const login = () => {
        setCurrentUser(
            {id : 1,
            name: "Jone Doe", 
            profilePic: "https://images.pexels.com/photos/2783848/pexels-photo-2783848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        })
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
