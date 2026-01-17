import React, { useEffect, useState } from "react";
import ActiveHeart from "../../../assets/Icons/ActiveHeart";
import AddToFavIcon from "../../../assets/Icons/AddToFavIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import FavoriteAPI from "../../../api/favoriteApi";
import { toast } from "react-toastify";

const FavIcon = ({ isFav = false, id, type }) => {
    const [isFavorite, setIsFavorite] = useState(isFav);
    const [isLoading, setIsLoading] = useState(false);
    const { currentLanguage } = useLanguage();

    // Sync with isFav prop when it changes
    useEffect(() => {
        setIsFavorite(isFav);
    }, [isFav]);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;

        // Optimistic update
        const previousFav = isFavorite;
        setIsFavorite(!isFavorite);

        try {
            setIsLoading(true);
            const response = await FavoriteAPI.toggleFavorite(id, type);

            // Update state based on API response status
            if (response.status === "added") {
                setIsFavorite(true);
            } else if (response.status === "removed") {
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            // Rollback on error
            setIsFavorite(previousFav);
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
        <div className="fav-icon" onClick={toggleFavorite}>
            {isFavorite ? (
                <span>
                    <ActiveHeart />
                </span>
            ) : (
                <span>
                    <AddToFavIcon />
                </span>
            )}
        </div>
    );
};

export default FavIcon;
