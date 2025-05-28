import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./RealatedSlider.css"

const RealatedSlider = ({ children, title }) => {

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div className="related-slider d-flex space-4 flex-column" >
            <p className="b-9 relative"> {title} </p>
            <Slider {...settings} >
                {children}
            </Slider>
        </div>
    )
}

export default RealatedSlider