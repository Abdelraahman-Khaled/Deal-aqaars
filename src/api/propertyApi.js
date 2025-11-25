import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء العقار بنجاح",
    en: "Property created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث بيانات العقار بنجاح",
    en: "Property updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف العقار بنجاح",
    en: "Property deleted successfully",
  },
  favoriteAdded: {
    ar: "تم إضافة العقار إلى المفضلة",
    en: "Property added to favorites",
  },
  favoriteRemoved: {
    ar: "تم إزالة العقار من المفضلة",
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

const PropertyAPI = {
  // Get all properties with optional filters
  getAllProperties: async (filters = {}) => {
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
      console.log("queryString", queryString);

      const url = queryString ? `/property/filter?${queryString}` : "/property";

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
  getAllBuildings: async (filters = {}) => {
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
      const url = queryString ? `/building?${queryString}` : "/building";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching buildings:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get property by ID
  getPropertyById: async (id) => {
    try {
      const response = await axiosInstance.get(`/property/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching property with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
  // Get property by ID
  getBuildingById: async (id) => {
    try {
      const response = await axiosInstance.get(`/building/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching property with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
  // Get land by ID
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
  // Get factory by ID
  getFactoryById: async (id) => {
    try {
      const response = await axiosInstance.get(`/factory/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching factory with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
  // Get administrative by ID
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

  // Get properties by user ID
  getPropertiesByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/property/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching properties for user ${userId}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get current user's properties
  getMyProperties: async (status) => {
    try {
      const url = status ? `/property/me?status=${status}` : "/property/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user properties:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new property
  createProperty: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/property", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response || error.message
      );
      throw error;
    }
  },
  // Create new house
  createBuilding: async (formData) => {
    try {
      // The formData is already prepared in JoinTrade.jsx, so we just need to send it
      const response = await axiosInstance.post("/building", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response || error.message
      );
      throw error;
    }
  },

  // Update property
  updateBuilding: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/building/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating property with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
  // Update property
  updateProperty: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/property/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating property with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
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
  // Update factory
  updateFactory: async (id, formData) => {
    try {
      const response = await axiosInstance.put(`/factory/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating factory with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
  // Update administrative
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

  // Delete property
  deleteProperty: async (id) => {
    try {
      const response = await axiosInstance.delete(`/property/${id}`);
      console.log("PropertyAPI.deleteProperty: Showing success toast");
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting property with ID ${id}:`,
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

export default PropertyAPI;
