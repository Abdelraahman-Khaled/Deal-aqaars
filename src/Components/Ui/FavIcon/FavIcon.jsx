import React, { useState } from "react";
import ActiveHeart from "../../../assets/Icons/ActiveHeart";
import AddToFavIcon from "../../../assets/Icons/AddToFavIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import FavoriteAPI from "../../../api/favoriteApi";
import { toast } from "react-toastify";

const FavIcon = ({ isFav = false, id, type }) => {
    const [fav, setFav] = useState(isFav);
    const [isLoading, setIsLoading] = useState(false);
    const { currentLanguage } = useLanguage();

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;

        // Optimistic update
        const previousFav = fav;
        setFav(!fav);

        try {
            setIsLoading(true);
            const response = await FavoriteAPI.toggleFavorite(id, type);

            // Sync with API response (in case it returns unexpected state)
            setFav(!isFav);
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setFav(previousFav); // rollback if failed
            toast.error(
                currentLanguage === "ar"
                    ? "فشل في تحديث المفضلة."
                    : "Failed to update favorites."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fav-icon"
            onClick={toggleFavorite}>
            {fav ?
                <span >
                    <ActiveHeart />
                </span>
                :
                <span >
                    <AddToFavIcon />
                </span>}
        </div>
    )
}
export default FavIcon;
