import axiosInstance from "./axiosInstance";

const AdsAPI = {
  // login
  getAds: async () => {
    try {
      const response = await axiosInstance.get("/ads");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
export default AdsAPI;
