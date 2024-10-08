import { useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

export const AnalyticsContext = createContext({});

export const AnalyticsContextProvider = ({ children }) => {
    const { role } = useContext(UserContext)
    const [ analyticsData, setAnalyticsData ] = useState([]);
    
    const getDataAnalytics = async () => {
        await axios.get('/api/getDataAnalytics')
        .then(response => setAnalyticsData(response.data))
        .catch(error => console.error(`Fetching Ranks Error: ${ error.message }`))
    };

    useEffect(() => {
        getDataAnalytics();
    }, []);

    const getDataOnLogin = () => {
        getDataAnalytics();
    }

    return (
        <AnalyticsContext.Provider value={{ analyticsData, setAnalyticsData, getDataOnLogin }}>
            {children}
        </AnalyticsContext.Provider>
    )
}
