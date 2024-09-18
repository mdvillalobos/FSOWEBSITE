import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [role, setRole] = useState();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                axios.get('/api/getRole').then(({data}) => {
                    setRole(data);
                });
                
                axios.get('/api/getProfile').then(({data}) => {
                    setUser(data);
                });
            
            } catch (error) {
                console.log(error);
                setUser(null)
                setRole(null)
            }
        };

        checkAuth();
    }, [])
    console.log(user)
    console.log(role)

    return (
        <UserContext.Provider value={{user, setUser, role, setRole}}>
            {children}
        </UserContext.Provider>
    )
}