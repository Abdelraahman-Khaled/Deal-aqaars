import axiosInstance from "./axiosInstance";

const SearchAPI = {
  searchByCity: async (cityId) => {
    const response = await axiosInstance.get(`/search_by_city/${cityId}`);
    return response.data;
  },
};

export default SearchAPI;
