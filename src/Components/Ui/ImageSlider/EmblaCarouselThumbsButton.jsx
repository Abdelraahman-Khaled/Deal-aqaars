import React from 'react';
import './ImageSlider.css';

export const Thumb = ({ selected, onClick, imgSrc }) => {
    return (
        <div
            className={`embla-thumbs__slide ${selected ? 'is-selected' : ''}`}
            onClick={onClick}
        >
            <img
                className="embla-thumbs__slide__img"
                src={imgSrc}
                alt="Thumbnail"
            />
        </div>
    );
};
