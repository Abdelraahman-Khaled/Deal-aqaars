import axiosInstance from "./axiosInstance";

const ProfileAPI = {
  getProfile: async () => {
    const response = await axiosInstance.get("user/profile");
    return response.data;
  },
  updateProfile: async (data) => {
    try {
      // Check if data contains image to determine content type
      if (data.image) {
        const formData = new FormData();
        // Append all data fields to formData
        if (data.name) formData.append("name", data.name);
        if (data.email) formData.append("email", data.email);
        if (data.mobile) formData.append("mobile", data.mobile);
        formData.append("image", data.image); // Append image file

        const response = await axiosInstance.put("/update-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Specify multipart for FormData
          },
        });
        return response.data;
      } else {
        // If no image, send as JSON
        const response = await axiosInstance.put("user/profile", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error in updateProfile:", error.response || error.message);
      throw error; // Rethrow for further handling
    }
  },
};

export default ProfileAPI;
