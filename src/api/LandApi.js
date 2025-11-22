import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء الأرض بنجاح",
    en: "Property created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث بيانات الأرض بنجاح",
    en: "Property updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف الأرض بنجاح",
    en: "Property deleted successfully",
  },
  favoriteAdded: {
    ar: "تم إضافة الأرض إلى المفضلة",
    en: "Property added to favorites",
  },
  favoriteRemoved: {
    ar: "تم إزالة الأرض من المفضلة",
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

const LandAPI = {
  // Get all properties with optional filters
  getAllLands: async (filters = {}) => {
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
      const url = queryString ? `/land?${queryString}` : "/land";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching properties:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get property by ID
  getLandById: async (id) => {
    try {
      const response = await axiosInstance.get(`/land/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching land with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get properties by user ID
  getLandsByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/land/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching lands for user ${userId}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get current user's lands
  getMyLands: async (status) => {
    try {
      const url = status ? `/land/me?status=${status}` : "/land/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user lands:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new land
  createLand: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/land", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating land:",
        error.response || error.message
      );
      throw error;
    }
  },
  // Create new land
  createLand: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/land", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating land:",
        error.response || error.message
      );
      throw error;
    }
  },
  // Update land
  updateLand: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/land/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating land with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Delete land
  deleteLand: async (id) => {
    try {
      const response = await axiosInstance.delete(`/land/${id}`);
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting land with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Search properties
  searchProperties: async (searchQuery, filters = {}) => {
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
        `/property/search?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error searching properties:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get favorite properties
  getFavoriteProperties: async () => {
    try {
      const response = await axiosInstance.get("/property/favorites");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching favorite properties:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Add property to favorites
  addToFavorites: async (propertyId) => {
    try {
      const response = await axiosInstance.post(
        `/property/${propertyId}/favorite`
      );
      toast.success(getToastMessages().favoriteAdded[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error adding property ${propertyId} to favorites:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Remove property from favorites
  removeFromFavorites: async (propertyId) => {
    try {
      const response = await axiosInstance.delete(
        `/property/${propertyId}/favorite`
      );
      toast.success(getToastMessages().favoriteRemoved[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error removing property ${propertyId} from favorites:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get property statistics
  getPropertyStats: async () => {
    try {
      const response = await axiosInstance.get("/property/stats");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching property statistics:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get properties by category
  getPropertiesByCategory: async (category) => {
    try {
      const response = await axiosInstance.get(
        `/property/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching properties for category ${category}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get properties by location
  getPropertiesByLocation: async (location) => {
    try {
      const response = await axiosInstance.get(
        `/property/location/${location}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching properties for location ${location}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
};

export default LandAPI;
