import React, { useEffect, useState } from "react";
import ActiveHeart from "../../../assets/Icons/ActiveHeart";
import AddToFavIcon from "../../../assets/Icons/AddToFavIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import FavoriteAPI from "../../../api/favoriteApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FavIcon = ({ isFav = false, id, type }) => {
    const [isFavorite, setIsFavorite] = useState(isFav);
    const [isLoading, setIsLoading] = useState(false);
    const { currentLanguage } = useLanguage();

    // Check if user is logged in via Redux token
    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = !!token;

    // Sync with isFav prop when it changes
    useEffect(() => {
        setIsFavorite(isFav);
    }, [isFav]);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Guest — show login prompt and stop
        if (!isLoggedIn) {
            toast.info(
                currentLanguage === "ar"
                    ? "يجب تسجيل الدخول أولاً لإضافة إلى المفضلة"
                    : "Please log in to add to favorites",
                { icon: "🔐" }
            );
            return;
        }

        if (isLoading) return;

        // Optimistic update
        const previousFav = isFavorite;
        setIsFavorite(!isFavorite);

        try {
            setIsLoading(true);
            const response = await FavoriteAPI.toggleFavorite(id, type);

            if (response.status === "added") {
                setIsFavorite(true);
            } else if (response.status === "removed") {
                setIsFavorite(false);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
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
                <span><ActiveHeart /></span>
            ) : (
                <span><AddToFavIcon /></span>
            )}
        </div>
    );
};

export default FavIcon;
