import axiosInstance from "./axiosInstance";

const ProfileAPI = {
  getProfile: async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
  },
  updateProfile: async (firstName, image) => {
    try {
      const formData = new FormData();
      formData.append("name", firstName);
      if (image) {
        formData.append("image", image); // Append image file
      }

      const response = await axiosInstance.post("/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify multipart for FormData
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error.response || error.message);
      throw error; // Rethrow for further handling
    }
  },
};

export default ProfileAPI;
