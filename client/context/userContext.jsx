import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [role, setRole] = useState();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const [ getProfile, getRole ] = await Promise.all([
                    axios.get('/api/getProfile'),
                    axios.get('/api/getRole'),
                ]);
                setUser(getProfile.data);
                setRole(getRole.data)


            } catch (error) {
                console.error(`Fetching User Information Error: ${ error.message }`);
                setUser(null);
                setRole(null);
            }
        };

        checkAuth();
    }, []);

    /* console.log(`User: ${user}`)
    console.log(`Role: ${role}`) */

    return (
        <UserContext.Provider value={{ user, setUser, role, setRole }}>
            {children}
        </UserContext.Provider>
    )
}
