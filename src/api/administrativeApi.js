import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء الوحدة بنجاح",
    en: "Property created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث بيانات الوحدة بنجاح",
    en: "Property updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف الوحدة بنجاح",
    en: "Property deleted successfully",
  },
  favoriteAdded: {
    ar: "تم إضافة الوحدة إلى المفضلة",
    en: "Property added to favorites",
  },
  favoriteRemoved: {
    ar: "تم إزالة الوحدة من المفضلة",
    en: "Property removed from favorites",
  },
  genericError: {
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    en: "An error occurred. Please try again.",
  },
});

const handleError = (error) => {
  const language = getCurrentLanguage();
  const toastMessages = getToastMessages();

  if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(toastMessages.genericError[language]);
  }
};

const AdministrativeAPI = {
  // Get all properties with optional filters
  getAllAdministrative: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add filters to query params
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== undefined &&
          filters[key] !== null &&
          filters[key] !== ""
        ) {
          queryParams.append(key, filters[key]);
        }
      });

      const queryString = queryParams.toString();
      const url = queryString ? `/administrative?${queryString}` : "/administrative";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching administrative:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get property by ID
  getAdministrativeById: async (id) => {
    try {
      const response = await axiosInstance.get(`/administrative/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching administrative with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },


  getMyAdministrative: async (status) => {
    try {
      const url = status ? `/administrative/me?status=${status}` : "/administrative/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Get properties by user ID
  getAdministrativeByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/administrative/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching administrative for user ${userId}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new property
  createAdministrative: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/administrative", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating administrative:",
        error.response || error.message
      );
      throw error;
    }
  },
  // Create new land
  createAdministrative: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/administrative", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating administrative:",
        error.response || error.message
      );
      throw error;
    }
  },
  // Update land
  updateAdministrative: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/administrative/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating administrative with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Delete land
  deleteAdministrative: async (id) => {
    try {
      const response = await axiosInstance.delete(`/administrative/${id}`);
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting administrative with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Search properties
  searchAdministrative: async (searchQuery, filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      // Add filters to query params
      Object.keys(filters).forEach((key) => {
        if (
          filters[key] !== undefined &&
          filters[key] !== null &&
          filters[key] !== ""
        ) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await axiosInstance.get(
        `/administrative/search?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error searching administrative:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get favorite properties
  getFavoriteAdministrative: async () => {
    try {
      const response = await axiosInstance.get("/administrative/favorites");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching favorite administrative:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Add property to favorites
  addToFavorites: async (administrativeId) => {
    try {
      const response = await axiosInstance.post(
        `/administrative/${administrativeId}/favorite`
      );
      toast.success(getToastMessages().favoriteAdded[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error adding administrative ${administrativeId} to favorites:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Remove property from favorites
  removeFromFavorites: async (administrativeId) => {
    try {
      const response = await axiosInstance.delete(
        `/administrative/${administrativeId}/favorite`
      );
      toast.success(getToastMessages().favoriteRemoved[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error removing administrative ${administrativeId} from favorites:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get administrative statistics
  getAdministrativeStats: async () => {
    try {
      const response = await axiosInstance.get("/administrative/stats");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching administrative statistics:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get properties by category
  getAdministrativeByCategory: async (category) => {
    try {
      const response = await axiosInstance.get(
        `/administrative/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching administrative for category ${category}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get properties by location
  getAdministrativeByLocation: async (location) => {
    try {
      const response = await axiosInstance.get(
        `/administrative/location/${location}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching administrative for location ${location}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
};

export default AdministrativeAPI;
