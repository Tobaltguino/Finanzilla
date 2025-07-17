import { createContext, useContext, useEffect, useState } from "react";

import { is_authenticated, register } from "../endpoints/api";

import { login } from "../endpoints/api";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const nav = useNavigate();

    const get_authenticated = async () => {
        try {
            const success = await is_authenticated();
            setIsAuthenticated(success)
        } catch (error) {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const login_user = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            setIsAuthenticated(true)
            nav('/transacciones')
        }
    }

    const register_user = async (username, email, password, cpassword) => {
        if (password === cpassword) {
            try {
                await register(username, email, password)
                alert('Successfully registeres user')
            } catch (error) {
                alert('Error registering user')
            }
        }
        else {
            alert('Passwords dont match')
        }
    }

    useEffect(() => {
        get_authenticated();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, register_user}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);