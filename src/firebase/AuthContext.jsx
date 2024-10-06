import React, { Children, useContext, useState, useEffect } from "react";
import { auth } from ".";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [state, setState] = useState(null);
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setState(user);
        })
    });

    return <AuthContext.Provider value={state}>
        {children}
    </AuthContext.Provider>
}