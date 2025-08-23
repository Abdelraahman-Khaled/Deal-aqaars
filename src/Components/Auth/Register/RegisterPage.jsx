import React, { useState, useEffect } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import RegisterSwiper from "./RegisterSwiper";
import ResetPassword from "./ResetPassword";
import VerifyAccount from "./VerifyAccount";
import OtpPage from "./OtpPage";
import RegisterForm from "./RegisterForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Languages/LanguageContext";

const RegisterPage = () => {
    const [formType, setFormType] = useState("login"); // Controls form switching
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { currentLanguage } = useLanguage();
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    
    return (
        <>
            <Helmet>
                <title>{formType === "login" ? "Login" : "Register"} | Deal</title>
                <meta name="description" content="Login or register to access your Deal account" />
            </Helmet>
            <div className="auth-standalone-container min-vh-100">
                <div className="row flex-row-reverse min-vh-100 m-0">
                    {/* Left Side (Swiper) - Takes full height, hidden on small screens */}
                    <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center ">
                        <RegisterSwiper />
                    </div>

                    {/* Right Side (Forms) - Adjusts to screen size */}
                    <div className="col-12 col-lg-6 d-flex align-items-center py-3 justify-content-center">
                        <div className={`px-3 px-md-4 ${windowWidth >= 992 ? "w-75" : "w-100"} hide-scrollbar`}>
                            {formType === "register" && <RegisterForm setFormType={setFormType} />}
                            {formType === "login" && <LoginForm setFormType={setFormType} />}
                            {formType === "forgotPassword" && <ForgotPasswordForm />}
                            {formType === "verifyAccount" && <VerifyAccount />}
                            {formType === "resetPassword" && <ResetPassword />}
                            {formType === "otp" && <OtpPage setFormType={setFormType} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default RegisterPage;
