import React, { useState, useRef } from 'react';
import './PropertyShowcase.css';
import CustomModal from '../../CustomModal/CustomModal';
import { Thumb } from '../ImageSlider/EmblaCarouselThumbsButton';
import CameraICon from '../../../assets/Icons/CameraIcon';
import LocationDisplay from '../LocationDisplay/LocationDisplay';

const PropertyShowcase = ({
    images = [],
    location = 'Property Location',
    lon,
    lat,
    className = ''
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const thumbnailRef = useRef(null);

    // Default images if none provided
    const defaultImages = [
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+1',
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+2',
        'https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+3'
    ];

    const displayImages = images.length > 0 ? images : defaultImages;
    const thumbnailImages = displayImages;
    const hasMoreImages = displayImages.length > 3;

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    // Drag scroll handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.pageY - thumbnailRef.current.offsetTop);
        setScrollTop(thumbnailRef.current.scrollTop);
        thumbnailRef.current.style.cursor = 'grabbing';
        thumbnailRef.current.style.userSelect = 'none';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        if (thumbnailRef.current) {
            thumbnailRef.current.style.cursor = 'grab';
            thumbnailRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (thumbnailRef.current) {
            thumbnailRef.current.style.cursor = 'grab';
            thumbnailRef.current.style.userSelect = 'auto';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.pageY - thumbnailRef.current.offsetTop;
        const walk = (y - startY) * 2; // Scroll speed multiplier
        thumbnailRef.current.scrollTop = scrollTop - walk;
    };

    // Touch handlers for mobile
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartY(e.touches[0].pageY - thumbnailRef.current.offsetTop);
        setScrollTop(thumbnailRef.current.scrollTop);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.touches[0].pageY - thumbnailRef.current.offsetTop;
        const walk = (y - startY) * 2;
        thumbnailRef.current.scrollTop = scrollTop - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleShowAllImages = () => {
        setShowAllImages(true);
    };

    return (
        <div className="property-showcase">
            {/* Thumbnail Gallery - Left Side */}
            <div
                className="thumbnail-gallery"
                ref={thumbnailRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: 'grab' }}
            >
                {thumbnailImages.map((image, index) => {
                    const isLastThumbnail = index === thumbnailImages.length - 1;
                    return (
                        <div key={index} className="thumbnail-wrapper" style={{ position: 'relative' }}>
                            <Thumb
                                selected={index === selectedImageIndex}
                                onClick={() => handleThumbnailClick(index)}
                                imgSrc={image}
                                images={displayImages}
                                setShowModal={setShowModal}
                                showModal={showModal}
                            />
                            {isLastThumbnail && (
                                <div className="camera-icon-overlay-thumbnail">
                                    <span className="camera-icon b-16 d-flex space-2 align-items-center" onClick={() => setShowModal(true)}>
                                        {displayImages.length}
                                        <CameraICon />
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}


            </div>

            {/* Main Image Display - Right Side */}
            <div className="main-image-container">
                <div className="main-image-wrapper">
                    <img
                        src={displayImages[selectedImageIndex]}
                        alt="Main property view"
                        className="main-image"
                        onClick={() => setShowModal(true)}
                    />



                    {/* Location Overlay */}
                    {location && (
                        <div className="location-overlay">
                          
                            <span>
                                <LocationDisplay lat={lat} lon={lon} />
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Modal for All Images */}
            <CustomModal
                showModal={showModal}
                onHide={() => setShowModal(false)}
                title={"الصور"}
                newClass={"images-modal"}
            >
                <div className='d-flex flex-wrap flex-row justify-content-between w-100'>
                    {
                        displayImages?.map((src, index) => (
                            <div
                                key={index}
                                className='col-md-6 col-lg-4 col-12 rounded-1 p-2'
                                onClick={() => {
                                    setSelectedImageIndex(index);
                                    setShowModal(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={src}
                                    alt={`Property image ${index + 1}`}
                                    className='w-100 h-100 rounded-2'
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                            </div>
                        ))
                    }
                </div>
            </CustomModal>
        </div>
    );
};

export default PropertyShowcase;