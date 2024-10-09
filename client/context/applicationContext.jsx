import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ApplicationContext = createContext({});

export const ApplicationContextProvider = ({ children }) => {
    const [ ranks, setRanks ] = useState(null);
    
    const getRank = async () => {
        await axios.get('/api/getAllRank')
        .then(response => setRanks(response.data))
        .catch(error => console.error(`Fetching Ranks Error: ${ error.message }`))
    };

    useEffect(() => {
        getRank();
    }, [])

    const fetchRanksOnLogin = () => {
        getRank();
    };

    return (
        <ApplicationContext.Provider value={{ ranks, setRanks, fetchRanksOnLogin}}>
            {children}
        </ApplicationContext.Provider>
    )
}
