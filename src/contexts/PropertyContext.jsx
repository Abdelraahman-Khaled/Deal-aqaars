import React, { createContext, useContext, useState, useCallback } from 'react';
import PropertyAPI from '../api/propertyApi';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchProperty = useCallback(async (id) => {
    if (!id) {
      setError('Property ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const propertyData = await PropertyAPI.getPropertyById(id);
      setProperty(propertyData?.data);
      return propertyData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch property');
      setProperty(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllProperty = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allPropertyData = await PropertyAPI.getAllProperties();
      setAllProperties(allPropertyData?.data);
      return allPropertyData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch all properties');
      setAllProperties([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProperty = useCallback(() => {
    setProperty(null);
    setError(null);
    setLoading(false);
  }, []);

  const refreshProperty = useCallback(async (id) => {
    if (id) {
      return fetchProperty(id);
    }
  }, [fetchProperty]);

  const value = {
    property,
    allProperties,
    loading,
    error,
    fetchProperty,
    fetchAllProperty,
    clearProperty,
    refreshProperty,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};