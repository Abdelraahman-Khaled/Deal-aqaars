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
  getAllCompounds: async () => {
    try {
      const response = await axiosInstance.get("/compound");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching companies:",
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

  // Create new compound
  createCompound: async (data) => {
    try {
      // Check if data contains logo to determine content type
      if (data.logo) {
        const formData = new FormData();

        // Append all data fields to formData
        if (data.username) formData.append("username", data.username);
        if (data.compoundName)
          formData.append("compoundName", data.compoundName);
        if (data.address) formData.append("address", data.address);
        if (data.registrationNumber)
          formData.append("registrationNumber", data.registrationNumber);
        if (data.website) formData.append("website", data.website);
        if (data.compoundType)
          formData.append("compoundType", data.compoundType);
        if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
        if (data.hasWhatsapp !== undefined)
          formData.append("hasWhatsapp", data.hasWhatsapp);

        // Append logo file
        formData.append("logo", data.logo);

        const response = await axiosInstance.post("/compound", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      } else {
        // If no logo, send as JSON
        const response = await axiosInstance.post("/compound", data);
        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      }
    } catch (error) {
      console.error(
        "Error creating compound:",
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
