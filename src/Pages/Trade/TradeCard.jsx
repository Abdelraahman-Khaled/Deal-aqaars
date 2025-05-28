import React from 'react'
import "./Trade.css"
import Bed from '../../assets/Icons/Bed'
import BathIcon from '../../assets/Icons/BathIcon'
import AreaIcon from '../../assets/Icons/AreaIcon'
import MoneyIcon from '../../assets/Icons/MoneyIcon'
import WhatsIcon from '../../assets/Icons/WhatsIcon'
import CallIcon from '../../assets/Icons/CallIcon'
import LocationIcon from '../../assets/Icons/LocationIcon'
import { Link } from 'react-router-dom'
import TradeIcon from '../../assets/Icons/TradeIcon'

const TradeCard = ({ title, rooms, bath, space, location, trade, since }) => {

    return (
        <div className='trade-card d-flex flex-column space-4 '>
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100 border-gray pb-3'>
                    <p className='b-1 '>
                        {title}
                    </p>
                    <div className='d-flex gap-2'>
                        <p className='b-11 available'>
                            {since}
                        </p>
                    </div>
                </div>


                {/* locations */}
                <p className='b-11'>
                    <LocationIcon />
                    <span className='px-1'></span>
                    {location}
                </p>


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

                {/* trade icon */}
                <span className='trade-icon'>
                    <TradeIcon />
                </span>

                <div className='trade-details space-2 d-flex flex-column justify-content-center align-items-center'>
                    <p className="b-11">مطلوب في التبديل</p>
                    <p className="b-12">{trade}</p>
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

export default TradeCard