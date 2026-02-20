import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { useLanguage } from '../../Languages/LanguageContext';

const CompoundSkeleton = ({ wrapperClass }) => {
    const { currentLanguage } = useLanguage();

    return (
        <div className={`compound-card space-4 d-flex ${wrapperClass} mb-4`} style={wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }} dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            {/* Image Skeleton */}
            <div className={` ${wrapperClass ? "w-100" : "w-50"}`}>
                <div className='compound-img'>
                    <Skeleton width="100%" height="100%" className="border-radius-4" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100 flex-column compound-title space-1'>
                    <Skeleton width="60%" height="1.5rem" className="mb-2" />
                    <Skeleton width="30%" height="1rem" />
                </div>

                {/* Location */}
                <div className='d-flex align-items-center space-2'>
                    <Skeleton shape="circle" size="1.5rem" />
                    <Skeleton width="40%" height="1rem" />
                </div>

                {/* Details */}
                <div className='d-flex align-items-center space-2'>
                    <Skeleton shape="circle" size="1.5rem" />
                    <Skeleton width="50%" height="1rem" />
                </div>

                {/* Price */}
                <Skeleton width="30%" height="1rem" className="mt-2" />

                {/* Buttons */}
                <div className='connections d-flex justify-content-between w-100 pt-4 space-4 '>
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                </div>
            </div>
        </div>
    );
};

export default CompoundSkeleton;
