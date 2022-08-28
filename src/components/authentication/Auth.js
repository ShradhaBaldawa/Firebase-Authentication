import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const userInfo = localStorage.getItem('userDetails');
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (userInfo) {
            setCurrentUser(JSON.parse(userInfo));
            setLoading(false);
        }
    }, [userInfo]);

    if (loading) {
        return <p className="text-center forgot-text mt-2">Please Login to have access to dashboard Page.</p>;
    }
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};