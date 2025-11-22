import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { useLanguage } from '../../Components/Languages/LanguageContext';

const TradeSkeleton = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div className='trade-card d-flex flex-column space-4 mb-4' dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            {/* Image Skeleton */}
            <div className='trade-card-image mb-3'>
                <Skeleton width="100%" height="200px" className="border-radius-4" />
            </div>

            <div className='d-flex flex-column space-4 w-100'>
                {/* Title and Time */}
                <div className='d-flex justify-content-between w-100 pb-3'>
                    <Skeleton width="60%" height="1.5rem" />
                    <Skeleton width="20%" height="1rem" />
                </div>

                {/* Location */}
                <div className='d-flex align-items-center gap-2'>
                    <Skeleton shape="circle" size="1.5rem" />
                    <Skeleton width="50%" height="1rem" />
                </div>

                {/* Specifications (Rooms, Bath, Space) */}
                <div className='d-flex gap-2'>
                    <Skeleton width="25%" height="1rem" />
                    <Skeleton width="25%" height="1rem" />
                    <Skeleton width="25%" height="1rem" />
                </div>

                {/* Trade Icon */}
                <div className='d-flex justify-content-center my-2'>
                    <Skeleton shape="circle" size="3rem" />
                </div>

                {/* Trade Details */}
                <div className='trade-details space-2 d-flex flex-column justify-content-center align-items-center'>
                    <Skeleton width="40%" height="1rem" className="mb-1" />
                    <Skeleton width="60%" height="1rem" />
                </div>

                {/* Buttons */}
                <div className='connections d-flex justify-content-between w-100 pt-4 space-2 '>
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                </div>
            </div>
        </div>
    );
};

export default TradeSkeleton;
