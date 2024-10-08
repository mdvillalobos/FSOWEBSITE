import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RankContext = createContext({});

export const RankContextProvider = ({ children }) => {
    const [ ranks, setRanks ] = useState([]);
    
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
        <RankContext.Provider value={{ ranks, setRanks, fetchRanksOnLogin}}>
            {children}
        </RankContext.Provider>
    )
}
