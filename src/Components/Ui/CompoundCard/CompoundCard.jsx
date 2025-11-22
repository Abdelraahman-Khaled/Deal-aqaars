import React from 'react'
import Garag from '../../../assets/Icons/Garag'
import LocationIcon from '../../../assets/Icons/LocationIcon'
import { Link } from 'react-router-dom'
import "./CompoundCard.css"
import FavIcon from '../FavIcon/FavIcon'
import { useLanguage } from '../../Languages/LanguageContext'
import WhatsIcon from '../../../assets/Icons/WhatsIcon'
import CallIcon from '../../../assets/Icons/CallIcon'
import SimpleImageSlider from '../SimpleImageSlider/SimpleImageSlider'

const CompoundCard = ({ id, title, location, details, price, img, company = false, connections = false, slider = false, wrapperClass, status, isSwiping = false, advertiser }) => {

    const { currentLanguage } = useLanguage()


    const handleClick = (e) => {
        if (isSwiping) e.preventDefault();
    };
    return (
        <div className={`compound-card space-4 d-flex ${wrapperClass} mb-4`} style={company & wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }} dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            <Link to={`/compounds-guide/${id}`}
                className={`  ${wrapperClass ? "w-100" : "w-50"}`}
                onClick={handleClick}>
                <div className='compound-img'>
                    <SimpleImageSlider images={img} alt="img" />
                    {/* favIcon */}
                    <FavIcon />
                </div>
            </Link>
            {/* title */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100 flex-column compound-title space-1'>
                    <p className='b-5'>
                        {title}
                    </p>
                    {
                        slider && <p className='b-11 available ' >
                            {currentLanguage === "ar" ? status || "بقي متاح" : status || "Available"}
                        </p>
                    }
                </div>
                {/* locations */}
                <p className='b-11'>
                    <LocationIcon />
                    <span className='px-1'></span>
                    {location}
                </p>
                {/* details */}
                <p className='b-11'>
                    <Garag />
                    <span className='px-1'></span>
                    {details}
                </p>
                {/* price */}
                {
                    price && 
                <p className='b-11 w-100'>
                    تبدأ من  {price} ج.م
                </p>
                }

                {/* Compnay */}
                {/* {
                    company &&
                    <Link to={"#"} className='connections pt-3 d-flex align-items-center space-2 w-100'>
                        <div className='logo'>
                            <img src="/Logo icon.png" alt="company" className='company' />
                        </div>
                        <div className='d-flex space-2 flex-column'>
                            <p className="b-5">تطوير مصر للتطوير العقاري</p>
                            <p className='b-12'>من 2014، 8 مشاريع</p>
                        </div>
                    </Link>
                } */}
                {
                    connections &&
                    <div className='connections d-flex justify-content-between w-100 pt-4 space-4 '>
                        {advertiser?.hasWhatsapp && advertiser?.phoneNumber && (
                            <a
                                href={`https://wa.me/${advertiser.phoneNumber.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='whats-button w-50 b-11 d-flex space-1 justify-content-center'
                            >
                                <WhatsIcon />
                                واتساب
                            </a>
                        )}
                        {/* call */}
                        {advertiser?.phoneNumber && (
                            <a
                                href={`tel:${advertiser.phoneNumber}`}
                                className='facebook-button w-50 b-11 d-flex space-1 justify-content-center'
                            >
                                <CallIcon />
                                اتصل
                            </a>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default CompoundCard