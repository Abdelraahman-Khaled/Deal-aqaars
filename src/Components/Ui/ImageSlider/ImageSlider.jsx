import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import './ImageSlider.css';
import CameraICon from '../../../assets/Icons/CameraIcon';

const ImageSlider = ({ slides, options }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });
    const [thumbCount, setThumbCount] = useState(3); // default

    const updateThumbCount = () => {
        const width = window.innerWidth;
        if (width >= 992) {
            setThumbCount(3);
        } else if (width >= 768) {
            setThumbCount(4);
        } else {
            setThumbCount(3);
        }
    };

    useEffect(() => {
        updateThumbCount(); // initial set
        window.addEventListener('resize', updateThumbCount);
        return () => window.removeEventListener('resize', updateThumbCount);
    }, []);

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect).on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="embla space-6 pb-4">
            <div className="embla__viewport col-9" ref={emblaMainRef}>
                <div className="embla__container relative">
                    {slides.map((src, index) => (
                        <div className="embla__slide" key={index}>
                            <img className="embla__slide__img" src={src} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
                <span className="camera-icon b-16 d-flex space-2 align-items-center" onClick={() => setShowModal(true)}>
                    {slides.length}
                    <CameraICon />
                </span>
            </div>
            <div className="embla-thumbs h-100">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container space-6">
                        {slides.slice(0, thumbCount).map((src, index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                imgSrc={src}
                                index={index}
                                images={slides}
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
