import React, { createContext, useContext, useState, useCallback } from 'react';
import FactoryAPI from '../api/factoryApi';

const FactoryContext = createContext();

export const useFactory = () => {
  const context = useContext(FactoryContext);
  if (!context) {
    throw new Error('useFactory must be used within a FactoryProvider');
  }
  return context;
};

export const FactoryProvider = ({ children }) => {
  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [myFactories, setMyFactories] = useState([]);
  const [myFactoriesLoading, setMyFactoriesLoading] = useState(false);
  const [myFactoriesError, setMyFactoriesError] = useState(null);
  const [myFactoriesLoaded, setMyFactoriesLoaded] = useState(false);

  const fetchFactory = useCallback(async (id) => {
    if (!id) {
      setError('Factory ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const factoryData = await FactoryAPI.getFactoryById(id);
      setFactory(factoryData?.data);
      return factoryData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch factory');
      setFactory(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFactory = useCallback(() => {
    setFactory(null);
    setError(null);
    setLoading(false);
  }, []);

  const refreshFactory = useCallback(async (id) => {
    if (id) {
      return fetchFactory(id);
    }
  }, [fetchFactory]);

  const fetchMyFactories = useCallback(async (status) => {
    setMyFactoriesLoading(true);
    setMyFactoriesError(null);
    try {
      const response = await FactoryAPI.getMyFactory(status);
      setMyFactories(response.data);
      setMyFactoriesLoaded(true);
    } catch (err) {
      setMyFactoriesError(err.response?.data?.message || 'Failed to fetch my factories');
      setMyFactories([]);
    } finally {
      setMyFactoriesLoading(false);
    }
  }, []);

  const value = {
    factory,
    loading,
    error,
    fetchFactory,
    clearFactory,
    refreshFactory,
    myFactories,
    myFactoriesLoading,
    myFactoriesError,
    fetchMyFactories,
    myFactoriesLoaded,
    setMyFactories,
  };

  return (
    <FactoryContext.Provider value={value}>
      {children}
    </FactoryContext.Provider>
  );
};