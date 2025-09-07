import React from 'react';
import './HouseLoader.css';

const HouseLoader = ({ size = 'medium', color = 'primary', fullPage = false }) => {
    // Size classes
    const sizeClass = {
        small: 'house-loader-sm',
        medium: 'house-loader-md',
        large: 'house-loader-lg'
    }[size] || 'house-loader-md';

    // Color classes
    const colorClass = {
        primary: 'house-loader-primary',
        secondary: 'house-loader-secondary',
        light: 'house-loader-light',
        dark: 'house-loader-dark'
    }[color] || 'house-loader-primary';

    // Full page wrapper if needed
    if (fullPage) {
        return (
            <div className="house-loader-fullpage-container">
                <div className={`house-loader ${sizeClass} ${colorClass}`}>
                    <div className="house-container">
                        <div className="roof"></div>
                        <div className="house-body">
                            <div className="window window-left"></div>
                            <div className="door"></div>
                            <div className="window window-right"></div>
                        </div>
                        <div className="foundation"></div>
                    </div>
                    <div className="loading-text">Loading...</div>
                </div>
            </div>
        );
    }

    // Regular loader
    return (
        <div className={`house-loader ${sizeClass} ${colorClass}`}>
            <div className="house-container">
                <div className="roof"></div>
                <div className="house-body">
                    <div className="window window-left"></div>
                    <div className="door"></div>
                    <div className="window window-right"></div>
                </div>
                <div className="foundation"></div>
            </div>
            <div className="loading-text">Loading...</div>
        </div>
    );
};

export default HouseLoader;