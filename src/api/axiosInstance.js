import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "https://deal-two.vercel.app/api/";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Attach token to requests and handle FormData
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If sending FormData, let the browser set the correct Content-Type with boundary
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    
    return config;
});

// Global error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);

        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                const currentLanguage = localStorage.getItem("language") || "en";
                let message = currentLanguage === "ar" ? "حدث خطأ في المصادقة" : "Authentication Error";

                if (data.message === "unauthorized") {
                    message = currentLanguage === "ar" ? "تسجيل الدخول غير صالح" : "Unauthorized";
                }
                // Show toast first
                toast.error(message);
                // Clear token and redirect after a delay
                // localStorage.removeItem("token");
                // setTimeout(() => {
                //     window.location.href = "/";
                // }, 2000); // Wait 2 seconds before redirecting
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
