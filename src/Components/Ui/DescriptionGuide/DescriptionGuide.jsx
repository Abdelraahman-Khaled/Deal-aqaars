import React from 'react'
import LocationIcon from '../../../assets/Icons/LocationIcon'
import "./DescriptionGuide.css"
import HeartIcon from '../../../assets/Icons/HeartIcon'
import ShareIcon from '../../../assets/Icons/ShareIcon'
import Bed from '../../../assets/Icons/Bed'
import BathIcon from '../../../assets/Icons/BathIcon'
import AreaIcon from '../../../assets/Icons/AreaIcon'
import Eye from '../../../assets/Icons/Eye'
import ListIcon from '../../../assets/Icons/ListIcon'
import LocationDisplay from '../LocationDisplay/LocationDisplay'
const DescriptionGuide = ({ title, location, price, description, aqar = false, rooms, bath, space, view, floor, lat, lon }) => {
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between py-4 space-3 flex-wrap'>
                <div className='d-flex space-4 flex-column'>
                    <p className='b-3'>{title}</p>
                    {
                        description &&
                        <p className='b-11'>{description}</p>
                    }
                    <p className='b-11 d-flex'>
                        <LocationIcon/>
                     {location}
                    </p>
                    {price && <p className='b-11'>تبدأ من {price} ج.م</p>}
                    {
                        aqar &&
                        <div className='d-flex space-6 flex-wrap'>
                            {rooms > 0 && (
                                <p className='d-flex align-items-center gap-2 b-11'>
                                    <Bed />
                                    {rooms}
                                </p>
                            )}
                            {bath > 0 && (
                                <p className='d-flex align-items-center gap-2 b-11'>
                                    <BathIcon />
                                    {bath}
                                </p>
                            )}
                            <p className='d-flex align-items-center gap-2 b-11'>
                                <AreaIcon />
                                {space} متر مربع
                            </p>
                            {view && (
                                <p className='d-flex align-items-center gap-2 b-11'>
                                    <Eye />
                                    {view}
                                </p>
                            )}
                            {floor && (
                                <p className='d-flex align-items-center gap-2 b-11'>
                                    <ListIcon />
                                    الطابق {floor}
                                </p>
                            )}
                        </div>
                    }
                </div>

                <div className='leave-container d-flex justify-content-between space-3'>
                    <button className='leave-button b-11'>
                        <span className='pe-2'><HeartIcon color={"var(--primary)"} /></span>
                        سيبه عندي
                    </button>
                    <button className='leave-button b-11' onClick={handleShare}>
                        <span className='pe-2'><ShareIcon /></span>
                        ابعته لحد
                    </button>
                </div>
            </div>
        </>
    )
}

export default DescriptionGuide