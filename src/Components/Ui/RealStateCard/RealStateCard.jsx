import React from 'react'
import LocationIcon from '../../../assets/Icons/LocationIcon'
import { Link } from 'react-router-dom'
import FavIcon from '../FavIcon/FavIcon'
import Bed from '../../../assets/Icons/Bed'
import BathIcon from '../../../assets/Icons/BathIcon'
import AreaIcon from '../../../assets/Icons/AreaIcon'
import MoneyIcon from '../../../assets/Icons/MoneyIcon'
import { useLanguage } from '../../Languages/LanguageContext'
import WhatsIcon from '../../../assets/Icons/WhatsIcon'
import CallIcon from '../../../assets/Icons/CallIcon'
import "./RealstateCard.css"

const RealStateCard = ({ price, rooms, bath, space, details, location, offer, img, company = false, connections = false, wrapperClass, isFav }) => {
    const { currentLanguage } = useLanguage()
    const sliceWords = (text) => {
        const words = text.split(" ");
        return words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");
    };
    return (
        <div className={`compound-card space-4 d-flex ${wrapperClass} mb-4  `} style={company & wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }} mb-4 dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            <Link to={"/aqar-guide"} className={`  ${wrapperClass ? "w-100" : "w-50"}`}>
                <div className='compound-img'>
                    <img loading="lazy" src={img} alt="compoundImg" />
                    {/* favIcon */}
                    <FavIcon isFav={isFav} />
                </div>
            </Link>
            {/* price */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100'>
                    <p className='b-1 min-w-max'>
                        {price}  ج.م
                    </p>
                    <div className='d-flex gap-2 flex-wrap justify-content-end'>
                        <p className='b-11 available'>
                            سكني
                        </p>
                        <p className='b-11 available'>
                            للبيع
                        </p>
                    </div>
                </div>
                {/* specifications */}
                <div className='d-flex gap-2'>
                    <p className='d-flex align-items-center gap-2 b-11'>
                        <Bed />
                        {rooms}
                    </p>
                    <p className='d-flex align-items-center gap-2 b-11'>
                        <BathIcon />
                        {bath}
                    </p>
                    <p className='d-flex align-items-center gap-2 b-11'>
                        <AreaIcon />
                        {space} متر مربع
                    </p>
                </div>
                {/* details */}
                <p className='b-12'>
                    {sliceWords(details)}
                </p>
                {/* locations */}
                <p className='b-11'>
                    <LocationIcon />
                    <span className='px-1'></span>
                    {location}
                </p>
                {/* offer */}
                <div className='w-100'>
                    <p className='b-11 available d-flex gap-1 ' style={{ color: "var(--yellow-100)", width: " fit-content" }}>
                        <MoneyIcon />
                        مقدم {offer}{offer == 0 ? "%" : " ج.م"}
                    </p>
                </div>
                <div className='connections d-flex justify-content-between w-100 pt-4 space-2 '>
                    {/* whats */}
                    <Link className='whats-button w-50 b-11 d-flex space-1 justify-content-center'>
                        <WhatsIcon />
                        واتساب
                    </Link>
                    {/* faceBook */}
                    <Link className='facebook-button w-50 b-11 d-flex space-1 justify-content-center'>
                        <CallIcon />
                        اتصل
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RealStateCard