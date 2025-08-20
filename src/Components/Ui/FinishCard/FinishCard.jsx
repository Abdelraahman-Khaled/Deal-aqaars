import React, { useState } from 'react'
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
import DeleteButton from '../../DeleteButton/DeleteButton'
import CustomModal from '../../CustomModal/CustomModal'
import DeleteModal from '../../DeleteButton/DeleteModal'
import Bed from '../../../assets/Icons/Bed'
import BathIcon from '../../../assets/Icons/BathIcon'
import AreaIcon from '../../../assets/Icons/AreaIcon'
import HeartLikes from '../../../assets/Icons/HeartLikes'
import Eye from '../../../assets/Icons/Eye'
import PhoneAds from '../../../assets/Icons/PhoneAds'

const FininshCard = ({ title, img, icon, since, exprince, subtitles, isFav, companyAds = false, likes, seen, calls }) => {
    const { currentLanguage } = useLanguage()
    const [showProgress, setShowProgress] = useState(false);

    return (
        <div className={`finish-card compound-card space-4 d-flex flex-column  mb-4  `} >
            {
                img &&
                <Link to={"#"} className='w-100'>
                    <div className='compound-img'>
                        <img className='' loading="lazy" src={img} alt="compoundImg" />
                        {/* favIcon */}
                        {!companyAds && <FavIcon isFav={isFav} />}
                    </div>
                </Link>
            }


            <Link to="#" className='pt-3 d-flex flex-column flex-md-row gap-3 w-100'>
                <div className='logo' >
                    <img src="/Logo icon.png" alt="company" className='company' />
                </div>
                <div className='d-flex flex-column gap-2 text pb-4'>
                    <p className="b-5">{title}</p>
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

                {
                    companyAds ?
                        <>
                            <div className='d-flex gap-3'>
                                <p className='d-flex align-items-center gap-2 b-12'>
                                    {seen}
                                    <HeartLikes />
                                </p>
                                <p className='d-flex align-items-center gap-2 b-12'>
                                    {likes}
                                    <Eye />
                                </p>
                                <p className='d-flex align-items-center gap-2 b-12'>
                                    {calls}
                                    <PhoneAds />
                                </p>
                            </div>
                            <div className='connections d-flex justify-content-between w-100 pt-4 space-2 '>
                                {/* delete */}
                                <div onClick={() => setShowProgress(true)} className='w-50'>
                                    <DeleteButton text="حذف الاعلان" newClass='w-100' />
                                </div>

                                {/* edit */}
                                <button className='btn-main w-50'>
                                    عدل على الاعلان
                                </button>
                            </div>
                        </>

                        :
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
                }

            </div>
            {/* delete modal*/}
            <CustomModal
                showModal={showProgress}
                onHide={() => setShowProgress(false)}
                setShowModal={setShowProgress}
                newClass={"progress-modal"}
            >
                <div>
                    <DeleteModal setShowProgress={setShowProgress} />
                </div>
            </CustomModal>
        </div >
    )
}

export default FininshCard