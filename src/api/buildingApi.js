import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

const BuildingAPI = {
  getBuildingById: async (id) => {
    try {
      const response = await axiosInstance.get(`/building/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllBuildings: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Pagination
      if (filters.page) queryParams.append("page", filters.page);
      if (filters.limit) queryParams.append("limit", filters.limit);

      // Basic filters
      if (filters.division) queryParams.append("division", filters.division);
      if (filters.status) queryParams.append("status", filters.status);

      // Location
      if (filters.city) queryParams.append("location.city", filters.city);

      // Details
      if (filters.propertyType) queryParams.append("details.propertyType", filters.propertyType);
      if (filters.finishingType) queryParams.append("details.finishingType", filters.finishingType);
      if (filters.view) queryParams.append("details.view", filters.view);
      if (filters.paymentMethod) queryParams.append("details.paymentMethod", filters.paymentMethod);

      // Ranges (Space)
      if (filters.space) queryParams.append("details.space", filters.space);
      if (filters.minSpace) queryParams.append("details.space[gte]", filters.minSpace);
      if (filters.maxSpace) queryParams.append("details.space[lte]", filters.maxSpace);

      // Ranges (Price)
      if (filters.price) queryParams.append("details.price", filters.price);
      if (filters.minPrice) queryParams.append("details.price[gte]", filters.minPrice);
      if (filters.maxPrice) queryParams.append("details.price[lte]", filters.maxPrice);

      // Ranges (Building Year)
      if (filters.minBuildingYear) queryParams.append("details.buildingYear[gte]", filters.minBuildingYear);
      if (filters.maxBuildingYear) queryParams.append("details.buildingYear[lte]", filters.maxBuildingYear);

      // Ranges (Handover Date)
      if (filters.handoverDateFrom) queryParams.append("details.handoverDate[gte]", filters.handoverDateFrom);
      if (filters.handoverDateTo) queryParams.append("details.handoverDate[lte]", filters.handoverDateTo);

      const queryString = queryParams.toString();
      const url = queryString ? `/building?${queryString}` : "/building";

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createBuilding: async (buildingData) => {
    try {
      const response = await axiosInstance.post("/building", buildingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateBuilding: async (id, buildingData) => {
    try {
      const response = await axiosInstance.put(`/building/${id}`, buildingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteBuilding: async (id) => {
    try {
      const response = await axiosInstance.delete(`/building/${id}`);
      toast.success("تم حذف المبني من المفضلة");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMyBuildings: async (status) => {
    try {
      const url = status ? `/building/me?status=${status}` : "/building/me";
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  filterBuildings: async (params) => {
    try {
      const response = await axiosInstance.get("/building/filter", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default BuildingAPI;
