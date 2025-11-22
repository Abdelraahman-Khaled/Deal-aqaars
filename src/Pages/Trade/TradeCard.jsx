import React from 'react'
import "./Trade.css"
import Bed from '../../assets/Icons/Bed'
import BathIcon from '../../assets/Icons/BathIcon'
import AreaIcon from '../../assets/Icons/AreaIcon'
import MoneyIcon from '../../assets/Icons/MoneyIcon'
import WhatsIcon from '../../assets/Icons/WhatsIcon'
import CallIcon from '../../assets/Icons/CallIcon'
import LocationIcon from '../../assets/Icons/LocationIcon'
import TradeIcon from '../../assets/Icons/TradeIcon'
import SimpleImageSlider from '../../Components/Ui/SimpleImageSlider/SimpleImageSlider'
import { useLanguage } from '../../Components/Languages/LanguageContext'

const TradeCard = ({ title, details, tradeDetails, rooms, bath, space, location, trade, since, phoneNumber, hasWhatsapp, images, lat, lon }) => {
    const { currentLanguage } = useLanguage()


    // Calculate time since posting
    let timeSince = "حديثاً";
    if (since) {
        const createdDate = new Date(since);
        if (!isNaN(createdDate)) {
            const now = new Date();
            const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

            if (currentLanguage === "ar") {
                if (diffDays === 0) {
                    timeSince = "اليوم";
                } else if (diffDays === 1) {
                    timeSince = "قبل يوم";
                } else if (diffDays < 7) {
                    timeSince = `قبل ${diffDays} أيام`;
                } else if (diffDays < 30) {
                    timeSince = `قبل ${Math.floor(diffDays / 7)} أسابيع`;
                } else {
                    timeSince = `قبل ${Math.floor(diffDays / 30)} شهر`;
                }
            } else {
                if (diffDays === 0) {
                    timeSince = "Today";
                } else if (diffDays === 1) {
                    timeSince = "1 day ago";
                } else if (diffDays < 7) {
                    timeSince = `${diffDays} days ago`;
                } else if (diffDays < 30) {
                    timeSince = `${Math.floor(diffDays / 7)} weeks ago`;
                } else {
                    timeSince = `${Math.floor(diffDays / 30)} months ago`;
                }
            }
        }
    }



    return (
        <div className='trade-card d-flex flex-column space-4 '>
            <div className='trade-card-image mb-3'>
                <SimpleImageSlider images={images} alt="img" />
            </div>
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100  pb-3'>
                    <p className='b-5 '>
                        {title}
                    </p>

                    <div className='d-flex gap-2'>
                        <p className='b-11 available'>
                            {timeSince}
                        </p>
                    </div>
                </div>
                <p className='b-5 '>
                    {details}
                </p>

                {/* locations */}
                <p className='b-11 overflow-hidden d-flex'>
                    <LocationIcon />
                    {location}
                </p>


                {/* specifications */}
                <div className='d-flex gap-2'>
                    {rooms && <p className='d-flex align-items-center gap-2 b-11'>
                        <Bed />
                        {rooms}
                    </p>}
                    {bath &&
                        <p className='d-flex align-items-center gap-2 b-11'>
                            <BathIcon />
                            {bath}
                        </p>
                    }
                    {space &&
                        <p className='d-flex align-items-center gap-2 b-11'>
                            <AreaIcon />
                            {space} متر مربع
                        </p>
                    }
                </div>

                {/* trade icon */}
                <span className='trade-icon'>
                    <TradeIcon />
                </span>

                <div className='trade-details space-2 d-flex flex-column justify-content-center align-items-center'>
                    <p className="b-11">مطلوب في التبديل</p>
                    <p className="b-12">{trade}</p>
                    <p className="b-12">{tradeDetails}</p>
                </div>
                <div className='connections d-flex justify-content-between w-100 pt-4 space-2 '>
                    {/* WhatsApp button - only show if hasWhatsapp is true or not specified */}
                    {(hasWhatsapp === undefined || hasWhatsapp) && (
                        <a
                            href={phoneNumber ? `https://wa.me/${phoneNumber.replace(/\+/g, '').replace(/\s/g, '')}` : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='whats-button w-50 b-11 d-flex space-1 justify-content-center'
                        >
                            <WhatsIcon />
                            واتساب
                        </a>
                    )}
                    {/* Call button */}
                    <a
                        href={phoneNumber ? `tel:${phoneNumber}` : '#'}
                        className={`facebook-button ${hasWhatsapp === false ? 'w-100' : 'w-50'} b-11 d-flex space-1 justify-content-center`}
                    >
                        <CallIcon />
                        اتصل
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TradeCard