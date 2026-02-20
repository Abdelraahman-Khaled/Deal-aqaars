import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import FinishingAPI from '../api/finishingApi';

const FinishingContext = createContext();

export const useFinishing = () => {
    return useContext(FinishingContext);
};

export const FinishingProvider = ({ children }) => {
    const [finishingServices, setFinishingServices] = useState([]);
    const [myFinishingServices, setMyFinishingServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [myFinishingServicesLoaded, setMyFinishingServicesLoaded] = useState(false);

    const fetchFinishingServices = useCallback(async (currentFilters) => {
        try {
            setLoading(true);
            const response = await FinishingAPI.getAllFinishingServices(currentFilters);
            setFinishingServices(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching finishing services:', err);
            setError('Failed to load finishing services');
        } finally {
            setLoading(false);
        }
    }, []);


    const fetchMyFinishingServices = useCallback(async (status) => {
        try {
            setLoading(true);
            const response = await FinishingAPI.getMyFinishingServices(status); // Assuming this API call exists
            setMyFinishingServices(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching my finishing services:', err);
            setError('Failed to load your finishing services');
        } finally {
            setLoading(false);
            setMyFinishingServicesLoaded(true);
        }
    }, []);

    const value = {
        finishingServices,
        myFinishingServices,
        loading,
        error,
        fetchFinishingServices,
        fetchMyFinishingServices,
        myFinishingServicesLoaded,
    };

    return (
        <FinishingContext.Provider value={value}>
            {children}
        </FinishingContext.Provider>
    );
};