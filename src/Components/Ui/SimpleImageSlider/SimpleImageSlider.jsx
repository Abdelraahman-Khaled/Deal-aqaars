import React, { useState } from 'react'
import { useLanguage } from '../../Languages/LanguageContext'
import './SimpleImageSlider.css'

const SimpleImageSlider = ({ images, alt = "image", className = "" }) => {
    const { currentLanguage } = useLanguage()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Default placeholder image
    const placeholderImage = '/aqar01.jpg' // Using existing image from public folder as placeholder

    // Process images to handle different formats
    let processedImages
    if (!images || (Array.isArray(images) && images.length === 0)) {
        // If no images provided or empty array, use placeholder
        processedImages = [placeholderImage]
    } else if (Array.isArray(images)) {
        // If images is array, check if items are objects with url property or strings
        processedImages = images.map(item => typeof item === 'object' && item.url ? item.url : item)
        // Filter out empty/null/undefined images and use placeholder if all are empty
        processedImages = processedImages.filter(img => img && img.trim() !== '')
        if (processedImages.length === 0) {
            processedImages = [placeholderImage]
        }
    } else {
        // Single image (string)
        processedImages = images && images.trim() !== '' ? [images] : [placeholderImage]
    }

    const hasMultipleImages = processedImages.length > 1

    const nextImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % processedImages.length)
    }

    const prevImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + processedImages.length) % processedImages.length)
    }

    const goToImage = (index, e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex(index)
    }

    return (
        <div className={`simple-image-slider ${className}`}>
            <img src={processedImages[currentImageIndex]} alt={alt} />
            {/* Image slider controls */}
            {hasMultipleImages && (
                <>
                    <button
                        className='image-nav-btn prev-btn'
                        onClick={prevImage}
                        aria-label="Previous image"
                    >
                        {currentLanguage === "ar" ? "›" : "‹"}
                    </button>
                    <button
                        className='image-nav-btn next-btn'
                        onClick={nextImage}
                        aria-label="Next image"
                    >
                        {currentLanguage === "ar" ? "‹" : "›"}
                    </button>
                    <div className='image-indicators'>
                        {processedImages.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={(e) => goToImage(index, e)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default SimpleImageSlider