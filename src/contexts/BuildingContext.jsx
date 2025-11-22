import React, { createContext, useContext, useState, useCallback } from 'react';
import BuildingAPI from '../api/buildingApi';

const BuildingContext = createContext();

export const useBuilding = () => {
  const context = useContext(BuildingContext);
  if (!context) {
    throw new Error('useBuilding must be used within a BuildingProvider');
  }
  return context;
};

export const BuildingProvider = ({ children }) => {
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [myBuildings, setMyBuildings] = useState([]);
  const [myBuildingsLoading, setMyBuildingsLoading] = useState(false);
  const [myBuildingsError, setMyBuildingsError] = useState(null);
  const [myBuildingsLoaded, setMyBuildingsLoaded] = useState(false);

  const fetchBuilding = useCallback(async (id) => {
    if (!id) {
      setError('Building ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const buildingData = await BuildingAPI.getBuildingById(id);
      setBuilding(buildingData?.data);
      return buildingData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch building');
      setBuilding(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearBuilding = useCallback(() => {
    setBuilding(null);
    setError(null);
    setLoading(false);
  }, []);

  const refreshBuilding = useCallback(async (id) => {
    if (id) {
      return fetchBuilding(id);
    }
  }, [fetchBuilding]);

  const fetchMyBuildings = useCallback(async (status) => {
    setMyBuildingsLoading(true);
    setMyBuildingsError(null);
    try {
      const response = await BuildingAPI.getMyBuildings(status);
      setMyBuildings(response.data);
      setMyBuildingsLoaded(true);
    } catch (err) {
      setMyBuildingsError(err.response?.data?.message || 'Failed to fetch my buildings');
      setMyBuildings([]);
    } finally {
      setMyBuildingsLoading(false);
    }
  }, []);

  const value = {
    building,
    loading,
    error,
    fetchBuilding,
    clearBuilding,
    refreshBuilding,
    myBuildings,
    myBuildingsLoading,
    myBuildingsError,
    fetchMyBuildings,
    myBuildingsLoaded,
    setMyBuildings,
  };

  return (
    <BuildingContext.Provider value={value}>
      {children}
    </BuildingContext.Provider>
  );
};