import React, { createContext, useContext, useState, useCallback } from 'react';
import CompoundAPI from '../api/compoundApi';

const CompoundContext = createContext();

export const useCompound = () => {
  const context = useContext(CompoundContext);
  if (!context) {
    throw new Error('useCompound must be used within a CompoundProvider');
  }
  return context;
};

export const CompoundProvider = ({ children }) => {
  const [compound, setCompound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompound = useCallback(async (id) => {
    if (!id) {
      setError('Compound ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const compoundData = await CompoundAPI.getCompoundById(id);
      setCompound(compoundData);
      return compoundData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch compound');
      setCompound(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCompound = useCallback(() => {
    setCompound(null);
    setError(null);
    setLoading(false);
  }, []);

  const refreshCompound = useCallback(async (id) => {
    if (id) {
      return fetchCompound(id);
    }
  }, [fetchCompound]);

  const value = {
    compound,
    loading,
    error,
    fetchCompound,
    clearCompound,
    refreshCompound,
  };

  return (
    <CompoundContext.Provider value={value}>
      {children}
    </CompoundContext.Provider>
  );
};