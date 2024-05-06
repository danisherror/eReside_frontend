import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const IdContext= createContext();
export const StatusContext= createContext();
export const AuthProvider = ({children}) =>{

    const storeTokenInLs= (serverToken) => {
        return localStorage.setItem('token',serverToken)
    };

    return(
    <AuthContext.Provider value={storeTokenInLs}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue= useContext(AuthContext);
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue
};
export const IdProvider = ({children}) =>{

    const storeTokenInLs= (serverToken) => {
        return localStorage.setItem('id',serverToken)
    };

    return(
    <IdContext.Provider value={storeTokenInLs}>
        {children}
    </IdContext.Provider>
    );
};

export const useID = () => {
    const authContextValue= useContext(IdContext);
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue
};
export const StatusProvider = ({children}) =>{

    const storeTokenInLs= (serverToken) => {
        return localStorage.setItem('status',serverToken)
    };

    return(
    <StatusContext.Provider value={storeTokenInLs}>
        {children}
    </StatusContext.Provider>
    );
};

export const useStatus = () => {
    const authContextValue= useContext(StatusContext);
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue
};