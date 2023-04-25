import React, { createContext, useContext, useEffect, useState } from 'react'
export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)

    const [user, setUser] = useState({
        id:"",
        name:"",
        lastName:"",
        email:"",
        password:"",
        address:{
            country:"",
            city:"",
            line:"",
            postCode:"",
        },
        token:"",
        roles:""
    })

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setIsLogged(true)
            loadUser()
        }
    }, [])

    const loadUser = () => {
        const user = sessionStorage.getItem("user")
        const parsedUser = JSON.parse(user)
    
        return {
            userId: parsedUser.userId,
            userFirstName: parsedUser.userFirstName,
            userLastName: parsedUser.userLastName,
            userEmail: parsedUser.userEmail,
            userToken: parsedUser.userToken,
            userRoles: parsedUser.userRoles
        }
    }

    return (
        <ContextGlobal.Provider value={{
            user, 
            isLogged,

            setUser,
            setIsLogged
            
            }}>
            {children}
        </ContextGlobal.Provider>
    )
}

export const useGlobalStates = () => {
    return useContext(ContextGlobal)
}

