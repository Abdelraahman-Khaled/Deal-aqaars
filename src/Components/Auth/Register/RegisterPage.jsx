import React, { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm ";
import RegisterSwiper from "./RegisterSwiper";
import ResetPassword from "./ResetPassword";
import VerifyAccount from "./VerifyAccount";
import OtpPage from "./OtpPage";

const RegisterPage = () => {
    const [formType, setFormType] = useState("register"); // Controls form switching
    return (
        <div>

            <div className="row  flex-row-reverse">
                {/* Left Side (Swiper) - Takes full height, hidden on small screens */}
                <div className="col-lg-6 d-none d-lg-flex  align-items-center justify-content-center bg-light vh-100">
                    <RegisterSwiper />
                </div>

                {/* Right Side (Forms) - Adjusts to screen size */}
                <div className="col-12 col-lg-6 d-flex align-items-top py-5 justify-content-center vh-100">
                    <div className="w-50 min-w-max">
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
    );
};


export default RegisterPage;
