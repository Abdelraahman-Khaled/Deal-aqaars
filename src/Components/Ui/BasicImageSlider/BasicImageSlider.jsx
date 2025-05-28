import React from "react";
import Slidercontainer from "../../../Components/Slider/Slidercontainer";
import "./BasicImageSlider.css";



const BasicImageSlider = ({ title, images }) => {


    return (
        <div>
            <p className="b-9 mb-3">{title}</p>
            <Slidercontainer>
                {images.map((img, index) => (
                    <div className="basic-image">
                        <img src={img.img} alt={`Image ${index + 1}`} key={index} />
                        <div class="overlay"></div>
                        <p className="b-5">{img.descroption}</p>
                    </div>
                ))}
            </Slidercontainer>
        </div>
    );
};

export default BasicImageSlider;
