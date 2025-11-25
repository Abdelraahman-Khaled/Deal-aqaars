import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء الشركة بنجاح",
    en: "Company created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث بيانات الشركة بنجاح",
    en: "Company updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف الشركة بنجاح",
    en: "Company deleted successfully",
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

const CompoundAPI = {
  // Get all companies
  // Get all compounds with optional filters
  getAllCompounds: async (filters = {}) => {
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
      const url = queryString ? `/compound?${queryString}` : "/compound";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching compounds:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get compound by ID
  getCompoundById: async (id) => {
    try {
      const response = await axiosInstance.get(`/compound/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching compound with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get current user's compounds
  getMyCompounds: async (status) => {
    try {
      const url = status ? `/compound/me?status=${status}` : "/compound/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user compounds:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new compound
  createCompound: async (formData) => {
    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File || (Array.isArray(value) && value.every(v => v instanceof File))) {
        // Keep files as-is
        continue;
      } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
        // Convert nested objects to JSON strings
        formData.set(key, JSON.stringify(value));
      }
    }
    try {
      const response = await axiosInstance.post("/compound", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating compound:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Update compound by ID
  updateCompound: async (id, formData) => {
    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File || (Array.isArray(value) && value.every(v => v instanceof File))) {
        // Keep files as-is
        continue;
      } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
        // Convert nested objects to JSON strings
        formData.set(key, JSON.stringify(value));
      }
    }
    try {
      const response = await axiosInstance.put(`/compound/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating compound with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Delete compound by ID
  deleteCompound: async (id) => {
    try {
      const response = await axiosInstance.delete(`/compound/${id}`);
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting compound with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
};

export default CompoundAPI;
