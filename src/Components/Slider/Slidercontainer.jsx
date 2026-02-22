import React, { useState } from "react";
import Slider from "react-slick";
import "./Slidercontainer.css";
import { useLanguage } from "../Languages/LanguageContext";

export default function Slidercontainer({ children }) {
    const [isSwiping, setIsSwiping] = useState(false);
    const { currentLanguage } = useLanguage();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: currentLanguage === "ar",
        responsive: [
            {
                breakpoint: 1200, // large screens
                settings: {
                    slidesToShow: 2.6,
                },
            },
            {
                breakpoint: 1024, // laptops/tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 992, // tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, // small tablets/mobile
                settings: {
                    slidesToShow: 1.62,
                },
            },
            {
                breakpoint: 576, // mobile
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 480, // very small mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        beforeChange: () => setIsSwiping(true),
        afterChange: () => setTimeout(() => setIsSwiping(false), 0),
    };
    return (
        <div className="slider-container" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            <Slider {...settings}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, { isSwiping }))}
            </Slider>
        </div>
    );
}
