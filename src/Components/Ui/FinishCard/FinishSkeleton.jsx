import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { useLanguage } from '../../Languages/LanguageContext';

const FinishSkeleton = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div className="finish-card compound-card space-4 d-flex flex-column mb-4" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            {/* Image Skeleton */}
            <div className='compound-img'>
                <Skeleton width="100%" height="200px" className="border-radius-4" />
            </div>

            {/* Company Info */}
            <div className='pt-3 d-flex flex-column flex-md-row gap-3 w-100'>
                <div className='logo'>
                    <Skeleton shape="circle" size="3rem" />
                </div>
                <div className='d-flex flex-column gap-2 w-100'>
                    <Skeleton width="60%" height="1.2rem" />
                    <Skeleton width="40%" height="1rem" />
                </div>
            </div>

            {/* Subtitles */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex space-2 w-100 flex-wrap pb-3'>
                    <Skeleton width="30%" height="2rem" className="border-radius-2" />
                    <Skeleton width="30%" height="2rem" className="border-radius-2" />
                    <Skeleton width="30%" height="2rem" className="border-radius-2" />
                </div>

                {/* Buttons */}
                <div className='row connections pt-4 g-2'>
                    <div className='col-12 col-md-4'>
                        <Skeleton width="100%" height="2.5rem" className="border-radius-2" />
                    </div>
                    <div className='col-12 col-md-4'>
                        <Skeleton width="100%" height="2.5rem" className="border-radius-2" />
                    </div>
                    <div className='col-12 col-md-4'>
                        <Skeleton width="100%" height="2.5rem" className="border-radius-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinishSkeleton;
