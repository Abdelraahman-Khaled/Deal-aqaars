import axiosInstance from "./axiosInstance";

const FavoriteAPI = {
  getFavorites: async () => {
    try {
      const response = await axiosInstance.get("/favorite/mine");
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching favorites:`,
        error.response || error.message
      );
      throw error;
    }
  },
  toggleFavorite: async (id, type) => {
    try {
      const response = await axiosInstance.post("/favorite/toggle", {
        entityId: id,
        entityType: type,
      });

      return response.data;
    } catch (error) {
      console.error(
        `Error adding favorite with ID ${id}:`,
        error.response || error.message
      );
      throw error;
    }
  },
  // removeFavorite: async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/favorite/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       `Error removing favorite with ID ${id}:`,
  //       error.response || error.message
  //     );
  //     handleError(error);
  //     throw error;
  //   }
  // },
};
export default FavoriteAPI;
