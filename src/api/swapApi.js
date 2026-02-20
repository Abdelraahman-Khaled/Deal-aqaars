import axiosInstance from "./axiosInstance";

const SwapAPI = {
  // Get user's swaps
  getMySwaps: async (status) => {
    try {
      const url = status ? `/swap/my?status=${status}` : "/swap/my";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching user's swaps:", error.response || error.message);
      throw error;
    }
  },

  // Get all swaps
  getAllSwaps: async (query = "") => {
    try {
      const url = query ? `/swap/filter?q=${query}` : "/swap/filter";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching swaps:", error.response || error.message);
      throw error;
    }
  },

  // Get swap by ID
  getSwapById: async (id) => {
    try {
      const response = await axiosInstance.get(`/swap/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching swap with ID ${id}:`, error.response || error.message);
      throw error;
    }
  },

  // Create new swap
  createSwap: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/swap", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating swap:", error.response || error.message);
      throw error;
    }
  },

  // Update swap by ID
  updateSwap: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/swap/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating swap with ID ${id}:`, error.response || error.message);
      throw error;
    }
  },

  // Delete swap by ID
  deleteSwap: async (id) => {
    try {
      const response = await axiosInstance.delete(`/swap/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting swap with ID ${id}:`, error.response || error.message);
      throw error;
    }
  },
};

export default SwapAPI;