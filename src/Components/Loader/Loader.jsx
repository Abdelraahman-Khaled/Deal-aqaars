import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', color = 'primary', fullPage = false }) => {
    // Size classes
    const sizeClass = {
        small: 'loader-sm',
        medium: 'loader-md',
        large: 'loader-lg'
    }[size] || 'loader-md';

    // Color classes
    const colorClass = {
        primary: 'loader-primary',
        secondary: 'loader-secondary',
        light: 'loader-light',
        dark: 'loader-dark'
    }[color] || 'loader-primary';

    // Full page wrapper if needed
    if (fullPage) {
        return (
            <div className="loader-fullpage-container">
                <div className={`loader ${sizeClass} ${colorClass}`}>
                    <div className="loader-spinner"></div>
                </div>
            </div>
        );
    }

    // Regular loader
    return (
        <div className={`loader ${sizeClass} ${colorClass}`}>
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Loader;