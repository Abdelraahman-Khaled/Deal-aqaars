import React, { createContext, useContext, useState, useCallback } from 'react';
import LandAPI from '../api/LandApi';

const LandContext = createContext();

export const useLand = () => {
  const context = useContext(LandContext);
  if (!context) {
    throw new Error('useLand must be used within a LandProvider');
  }
  return context;
};

export const LandProvider = ({ children }) => {
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myLands, setMyLands] = useState([]);
  const [myLandsLoading, setMyLandsLoading] = useState(false);
  const [myLandsError, setMyLandsError] = useState(null);
  const [myLandsLoaded, setMyLandsLoaded] = useState(false);

  const fetchLand = useCallback(async (id) => {
    if (!id) {
      setError('Land ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const landData = await LandAPI.getLandById(id);
      setLand(landData?.data);
      return landData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch land');
      setLand(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyLands = useCallback(async (status) => {
    setMyLandsLoading(true);
    setMyLandsError(null);
    try {
      const response = await LandAPI.getMyLands(status);
      setMyLands(response.data);
      setMyLandsLoaded(true);
    } catch (err) {
      setMyLandsError(err.message || 'Failed to fetch my lands');
      setMyLands([]);
    } finally {
      setMyLandsLoading(false);
    }
  }, []);

  const clearLand = useCallback(() => {
    setLand(null);
    setError(null);
    setLoading(false);
  }, []);

  const value = {
    land,
    loading,
    error,
    fetchLand,
    clearLand,
    myLands,
    myLandsLoading,
    myLandsError,
    fetchMyLands,
    myLandsLoaded,
  };

  return (
    <LandContext.Provider value={value}>
      {children}
    </LandContext.Provider>
  );
};