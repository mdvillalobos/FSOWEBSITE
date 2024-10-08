import { useState, useEffect, createContext} from 'react';
import axios from 'axios';

export const AnalyticsContext = createContext({});

export const AnalyticsContextProvider = ({ children }) => {
    const [ analyticsData, setAnalyticsData ] = useState();
    
    const getDataAnalytics = async () => {
        try {
            const response = await axios.get('/api/getDataAnalytics');
            setAnalyticsData(response.data)
        }

        catch {
            setAnalyticsData(null);
            console.error(`Fetching Ranks Error: ${ error.message }`);
        }
    };

    useEffect(() => {
        getDataAnalytics();
    }, []);

    const getDataOnLogin = async () => {
        getDataAnalytics();
    }

    return (
        <AnalyticsContext.Provider value={{ analyticsData, setAnalyticsData, getDataOnLogin }}>
            {children}
        </AnalyticsContext.Provider>
    )
}
