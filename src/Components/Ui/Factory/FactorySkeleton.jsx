import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { useLanguage } from '../../Languages/LanguageContext';

const FactorySkeleton = ({ wrapperClass }) => {
    const { currentLanguage } = useLanguage();

    return (
        <div
            className={`position-relative compound-card space-4 d-flex ${wrapperClass} mb-4`}
            style={wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }}
            dir={currentLanguage === "ar" ? "rtl" : "ltr"}
        >
            {/* Image Skeleton */}
            <div className={` ${wrapperClass ? "w-100" : "w-50"}`}>
                <div className='compound-img'>
                    <Skeleton width="100%" height="100%" className="border-radius-4" />
                </div>
            </div>

            <div className="d-flex flex-column space-4 w-100">
                {/* Price and Type */}
                <div className="d-flex justify-content-between w-100">
                    <Skeleton width="30%" height="1.5rem" />
                    <Skeleton width="20%" height="1rem" />
                </div>

                {/* Specs (Area) */}
                <div className="d-flex gap-2">
                    <Skeleton width="40%" height="1rem" />
                </div>

                {/* Details */}
                <Skeleton width="80%" height="1rem" />

                {/* Location */}
                <div className="d-flex align-items-center gap-2">
                    <Skeleton shape="circle" size="1rem" />
                    <Skeleton width="50%" height="1rem" />
                </div>

                {/* Buttons */}
                <div className="connections d-flex justify-content-between w-100 pt-4 space-2 ">
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                    <Skeleton width="48%" height="2.5rem" className="border-radius-2" />
                </div>
            </div>
        </div>
    );
};

export default FactorySkeleton;
