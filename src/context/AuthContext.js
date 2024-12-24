import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSocialUser, setIsSocialUser] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isSocialUser, setIsSocialUser }}>
            {children}
        </AuthContext.Provider>
    );
}
