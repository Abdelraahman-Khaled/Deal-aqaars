import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axiosInstance'; // Assuming axiosInstance is in src/api
import AdsAPI from '../api/Ads';

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdsAPI.getAds();
      setAds(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <AdsContext.Provider value={{ ads, loading, error, fetchAds }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  return useContext(AdsContext);
};