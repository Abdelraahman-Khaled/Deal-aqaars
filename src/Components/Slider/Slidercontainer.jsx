import React, { useState } from "react";
import Slider from "react-slick";
import "./Slidercontainer.css";

export default function Slidercontainer({ children }) {
    const [isSwiping, setIsSwiping] = useState(false);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3.77,
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
                    slidesToShow: 1.65,
                },
            },
        ],
        beforeChange: () => setIsSwiping(true),
        afterChange: () => setTimeout(() => setIsSwiping(false), 0),
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, { isSwiping }))}
            </Slider>
        </div>
    );
}
