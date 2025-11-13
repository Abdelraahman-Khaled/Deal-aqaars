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
  getAllBuildings: async (page = 1, limit = 10) => {
    try {
      const response = await axiosInstance.get(
        `/building?page=${page}&limit=${limit}`
      );
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
  getMyBuildings: async () => {
    try {
      const response = await axiosInstance.get("/building/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default BuildingAPI;
