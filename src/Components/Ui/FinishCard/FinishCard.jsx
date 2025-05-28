import React from 'react'
import LocationIcon from '../../../assets/Icons/LocationIcon'
import { Link } from 'react-router-dom'
import FavIcon from '../FavIcon/FavIcon'
import { useLanguage } from '../../Languages/LanguageContext'
import WhatsIcon from '../../../assets/Icons/WhatsIcon'
import CallIcon from '../../../assets/Icons/CallIcon'
import "./FinishCard.css"
import Water from '../../../assets/Icons/Water'
import Electricity from '../../../assets/Icons/Electricity'
import Board from '../../../assets/Icons/Board'

const FininshCard = ({ title, img, icon, since, exprince, subtitles, isFav }) => {
    const { currentLanguage } = useLanguage()

    return (
        <div className={`finish-card compound-card space-4 d-flex flex-column  mb-4  `} >
            {
                img &&
                <Link to={"#"} className='w-100'>
                    <div className='compound-img'>
                        <img className='' loading="lazy" src={img} alt="compoundImg" />
                        {/* favIcon */}
                        <FavIcon isFav={isFav} />
                    </div>
                </Link>
            }


            <Link to="#" className='pt-3 d-flex flex-column flex-md-row gap-3 w-100'>
                <div className='logo' >
                    <img src="/Logo icon.png" alt="company" className='company' />
                </div>
                <div className='d-flex flex-column gap-2 text pb-4'>
                    <p className="b-1">{title}</p>
                    <p className='b-12'>من {since || "2007"}، {exprince} مشاريع</p>
                </div>
            </Link>

            {/*  */}

            <div className='d-flex flex-column space-4 w-100'>
                {
                    subtitles &&
                    <div className='d-flex space-2 w-100 flex-wrap pb-3'>
                        {
                            subtitles?.map((subtitle, index) => (
                                <p key={index} className="yellow-box b-16">
                                    {index % 3 === 0 ? <Water /> : index % 2 === 0 ? <Board /> : <Electricity />}
                                    {subtitle}
                                </p>
                            ))
                        }
                    </div>
                }

                <div className='row connections pt-4 g-2'>
                    {/* WhatsApp */}
                    <div className='col-12 col-md-4'>
                        <Link className='whats-button w-100 b-11 d-flex space-1 justify-content-center'>
                            <WhatsIcon />
                            واتساب
                        </Link>
                    </div>

                    {/* Location */}
                    <div className='col-12 col-md-4'>
                        <Link className='location-button w-100 b-11 d-flex space-1 justify-content-center'>
                            <LocationIcon />
                            اللوكيشن
                        </Link>
                    </div>

                    {/* Call */}
                    <div className='col-12 col-md-4'>
                        <Link className='facebook-button w-100 b-11 d-flex space-1 justify-content-center'>
                            <CallIcon />
                            اتصل
                        </Link>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default FininshCard