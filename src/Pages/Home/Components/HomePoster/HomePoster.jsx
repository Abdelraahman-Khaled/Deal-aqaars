import React, { useState, useEffect } from 'react'
import "./HomePoster.css"
import { useAds } from '../../../../contexts/AdsContext';
import { Skeleton } from 'primereact/skeleton';

const HomePoster = () => {
    const { ads, loading } = useAds();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const homeAd = !loading && ads ? ads.find(ad => ad.name === 'home') : null;
    const images = homeAd ? homeAd.images.map((img) => img.url) : [];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    if (loading) {
        return <Skeleton width="100%" height="15.625rem" borderRadius="16px"></Skeleton>
            ;
    }

    return (
        <div className='home-poster'>
            <img className='w-100 ' src={images[currentImageIndex]} alt="poster" />
        </div>
    )
}

export default HomePoster