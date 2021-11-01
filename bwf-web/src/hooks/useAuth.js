import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({user, children}) => {
   
    const [ authData, setAuthData ] = useState(user);

    const setAuth = newUser => { //passing data from API to the function
        if(newUser) {
            localStorage.setItem('bwf-user', JSON.stringify(newUser)); // save it to LocalStorage
        } else {
            localStorage.removeItem('bwf-user'); // for logout use
        }
        setAuthData(newUser);
    }

    return (
        <AuthContext.Provider value={{authData, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

