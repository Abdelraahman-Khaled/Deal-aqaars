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

const CompanyAPI = {
  // Get all companies
  getAllCompanies: async () => {
    try {
      const response = await axiosInstance.get("/company");
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

  // Get company by ID
  getCompanyById: async (id) => {
    try {
      const response = await axiosInstance.get(`/company/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching company with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },

  // Create new company
  createCompany: async (data) => {
    try {
      // Check if data contains logo to determine content type
      if (data.logo) {
        const formData = new FormData();

        // Append all data fields to formData
        if (data.username) formData.append("username", data.username);
        if (data.companyName) formData.append("companyName", data.companyName);
        if (data.address) formData.append("address", data.address);
        if (data.registrationNumber)
          formData.append("registrationNumber", data.registrationNumber);
        if (data.website) formData.append("website", data.website);
        if (data.companyType) formData.append("companyType", data.companyType);
        if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
        if (data.hasWhatsapp !== undefined)
          formData.append("hasWhatsapp", data.hasWhatsapp);

        // Append logo file
        formData.append("logo", data.logo);

        const response = await axiosInstance.post("/company", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      } else {
        // If no logo, send as JSON
        const response = await axiosInstance.post("/company", data);
        toast.success(getToastMessages().createSuccess[getCurrentLanguage()]);
        return response.data;
      }
    } catch (error) {
      console.error("Error creating company:", error.response || error.message);
      handleError(error);
      throw error;
    }
  },
  beingVendor: async (data) => {
    try {
      const response = await axiosInstance.put("/user/profile", data);
      toast.success(getToastMessages().updateSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
      handleError(error);
      throw error;
    }
  },

  // Delete company by ID
  deleteCompany: async (id) => {
    try {
      const response = await axiosInstance.delete(`/company/${id}`);
      toast.success(getToastMessages().deleteSuccess[getCurrentLanguage()]);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting company with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
      throw error;
    }
  },
};

export default CompanyAPI;
