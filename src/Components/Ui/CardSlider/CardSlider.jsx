import React from 'react'
import { Link } from 'react-router-dom'
import YellowArrow from '../../../assets/Icons/YellowArrow'
import { useLanguage } from '../../Languages/LanguageContext'
import "./CardSlider.css"

const CardSlider = ({ title, children, havLink }) => {
    const { currentLanguage } = useLanguage()
    return (
        <div className='cards-slider mb-4'>
            <div className='d-flex flex-row justify-content-between align-items-center py-3'>
                <h5>{title}</h5>
                {havLink ?
                    <Link className='b-11' to={title === "دليل الكمبوندات " || title === "Compounds Guide" ? "/compounds" : "/realestate"} >
                        {currentLanguage === "ar" ? "شوف اكتر" : "See More"}
                        <span className='p-1'></span>
                        <YellowArrow />
                    </Link>
                    : <></>}
            </div>
            {children}
        </div >
    )
}

export default CardSlider