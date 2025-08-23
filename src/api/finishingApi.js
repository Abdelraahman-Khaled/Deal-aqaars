import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  createSuccess: {
    ar: "تم إنشاء خدمة التشطيب بنجاح",
    en: "Finishing service created successfully",
  },
  updateSuccess: {
    ar: "تم تحديث خدمة التشطيب بنجاح",
    en: "Finishing service updated successfully",
  },
  deleteSuccess: {
    ar: "تم حذف خدمة التشطيب بنجاح",
    en: "Finishing service deleted successfully",
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
  getAllFinishingServices: async () => {
    try {
      const response = await axiosInstance.get("/finish");
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
  getMyFinishingServices: async () => {
    try {
      const response = await axiosInstance.get("/finish/me");
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
  createFinishingService: async (data) => {
    try {
      // Check if data contains images to determine content type
      if (data.images && data.images.length > 0) {
        const formData = new FormData();

        // Append all data fields to formData
        if (data.name) formData.append("name", data.name);
        if (data.description) formData.append("description", data.description);
        if (data.type) formData.append("type", data.type);
        if (data.services && data.services.length > 0) {
          data.services.forEach((service, index) => {
            formData.append(`services[${index}]`, service);
          });
        }
        if (data.mobile) formData.append("mobile", data.mobile);
        if (data.hasWhatsapp !== undefined)
          formData.append("hasWhatsapp", data.hasWhatsapp);
        if (data.contactByEmail !== undefined)
          formData.append("contactByEmail", data.contactByEmail);

        // Append image files
        if (data.images && data.images.length > 0) {
          data.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        }

        const response = await axiosInstance.post("/finish", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      } else {
        // If no images, send as JSON
        const response = await axiosInstance.post("/finishing", data);
        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      }
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
  updateFinishingService: async (id, data) => {
    try {
      // Check if data contains images to determine content type
      if (data.images && data.images.length > 0) {
        const formData = new FormData();

        // Append all data fields to formData
        if (data.name) formData.append("name", data.name);
        if (data.description) formData.append("description", data.description);
        if (data.type) formData.append("type", data.type);
        if (data.services && data.services.length > 0) {
          data.services.forEach((service, index) => {
            formData.append(`services[${index}]`, service);
          });
        }
        if (data.mobile) formData.append("mobile", data.mobile);
        if (data.hasWhatsapp !== undefined)
          formData.append("hasWhatsapp", data.hasWhatsapp);
        if (data.contactByEmail !== undefined)
          formData.append("contactByEmail", data.contactByEmail);

        // Append image files
        if (data.images && data.images.length > 0) {
          data.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        }

        const response = await axiosInstance.put(`/finish/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
        return response.data;
      } else {
        // If no images, send as JSON
        const response = await axiosInstance.put(`/finishing/${id}`, data);
        toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
        return response.data;
      }
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
      const response = await axiosInstance.delete(`/finishing/${id}`);
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
