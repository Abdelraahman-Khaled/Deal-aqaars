import React from "react";
import img1 from "../../../assets/images/RegisterSwpier/register1.png";
import img2 from "../../../assets/images/RegisterSwpier/register2.png";
import img3 from "../../../assets/images/RegisterSwpier/register3.png";
import arrow from "../../../assets/images/RegisterSwpier/arrow right.svg";
import logo from "../../../assets/images/logo/logo register.svg";
import { Link } from "react-router-dom"
import "./Register.css"
import { useLanguage } from "../../Languages/LanguageContext";

const content = {
    back: { ar: "ارجع للموقع", en: "Back To Home" },
    sub1: { ar: "بيتك الجديد مستنيك، اختار راحتك معانا!", en: "Your new home is waiting for you, choose your comfort with us!" },
    sub2: { ar: "فرصتك تمتلك بيتك بأحسن سعر وأحلى مكان!", en: "Your chance to own your home at the best price and in the best location!" },
    sub3: { ar: "استثمر في مستقبلك.. بيت أحلامك أقرب مما تتخيل!", en: "Invest in your future... your dream home is closer than you can imagine!" },
}
const RegisterSwiper = () => {
    const { currentLanguage } = useLanguage()

    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide  h-100 p-3" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators custom-carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active bg-white"></button>
                <button type="button" data-bs-target="#carouselExampleDark" className="bg-white" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" className="bg-white" data-bs-slide-to="2"></button>
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner h-100 rounded-3 ">
                <div className="carousel-header">
                    <div className="d-flex justify-content-between">
                        <Link to="/">
                            <div className="top-content d-flex justify-content-between align-items-center bg-white bg-opacity-25 px-3 py-2 rounded-pill">
                                <img loading="lazy" src={arrow} alt="right-arrow" className="arrow-icon" />
                                <p className="text-white mb-0">{content.back[currentLanguage]}</p>
                            </div>
                        </Link>
                        <div>
                            <img loading="lazy" src={logo} alt="logo" />
                        </div>
                    </div>
                </div>
                <div className="carousel-item active h-100" data-bs-interval="3000">
                    <img loading="lazy" src={img1} className="d-block w-100 h-100 object-fit-cover" alt="img1" />
                    <div className="carousel-caption d-none d-md-block rounded ">
                        <h4 className="text-white">
                            {content.sub1[currentLanguage]}
                        </h4>
                    </div>
                </div>
                <div className="carousel-item h-100" data-bs-interval="3000">
                    <img loading="lazy" src={img2} className="d-block w-100 h-100 object-fit-cover" alt="img2" />
                    <div className="carousel-caption d-none d-md-block rounded ">
                        <h4 className="text-white">
                            {content.sub2[currentLanguage]}
                        </h4>
                    </div>
                </div>
                <div className="carousel-item h-100" data-bs-interval="3000">
                    <img loading="lazy" src={img3} className="d-block w-100 h-100 object-fit-cover" alt="img3" />
                    <div className="carousel-caption d-none d-md-block rounded ">
                        <h4 className="text-white">
                            {content.sub3[currentLanguage]}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterSwiper;
