import { Children, createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ( {children}) => {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}   {/* means “render whatever components are wrapped inside <AuthProvider>...</AuthProvider> */}
        </AuthContext.Provider>
    )
}