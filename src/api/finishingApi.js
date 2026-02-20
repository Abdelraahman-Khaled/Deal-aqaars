import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء شركتك بنجاح",
    en: "Company created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث شركتك بنجاح",
    en: "Company updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف شركتك بنجاح",
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

const FinishingAPI = {
  // Get all finishing services
  getAllFinishingServices: async (filters = {}) => {
    console.log("f", filters);
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

      const url = queryString ? `/finish/filter?${queryString}` : "/finish";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching finishing services:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get finishing service by ID
  getFinishingById: async (id) => {
    try {
      const response = await axiosInstance.get(`/finish/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching finishing service with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get finishing services by company ID
  getFinishingByCompany: async (companyId) => {
    try {
      const response = await axiosInstance.get(
        `/finish/by-company/${companyId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching finishing services for company ID ${companyId}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Get my finishing services
  getMyFinishingServices: async (status) => {
    try {
      const url = status ? `/finish/me?status=${status}` : "/finish/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching my finishing services:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new finishing service
  createFinishingService: async (formData) => {
    try {
      const response = await axiosInstance.post("/finish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating finishing service:",
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Update finishing service
  updateFinishingService: async (id, formData) => {
    try {
      // If no images, send as JSON
      const response = await axiosInstance.put(`/finish/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating finishing service with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Delete finishing service by ID
  deleteFinishingService: async (id) => {
    try {
      const response = await axiosInstance.delete(`/finish/${id}`);
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting finishing service with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
};

export default FinishingAPI;
