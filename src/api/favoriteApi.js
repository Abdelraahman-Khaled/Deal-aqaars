import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const getCurrentLanguage = () => localStorage.getItem("language") || "en";

const getToastMessages = () => ({
  favoriteAdded: {
    ar: "تم إضافة إلى المفضلة",
    en: "Added to favorites",
  },
  favoriteRemoved: {
    ar: "تم إزالة من المفضلة",
    en: "Removed from favorites",
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

      const language = getCurrentLanguage();
      const toastMessages = getToastMessages();

      // Show toast based on response status
      if (response.data.status === "added") {
        toast.success(toastMessages.favoriteAdded[language]);
      } else if (response.data.status === "removed") {
        toast.success(toastMessages.favoriteRemoved[language]);
      }

      return response.data;
    } catch (error) {
      console.error(
        `Error toggling favorite with ID ${id}:`,
        error.response || error.message
      );
      handleError(error);
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
