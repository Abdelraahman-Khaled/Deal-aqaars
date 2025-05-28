import React from "react";
import Slider from "react-slick";
import "./Slidercontainer.css";

export default function Slidercontainer({ children }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: true,
        responsive: [
            {
                breakpoint: 992, // tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576, // mobile
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}
