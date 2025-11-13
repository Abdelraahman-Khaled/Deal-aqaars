import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Bed from '../../assets/Icons/Bed'
import BathIcon from '../../assets/Icons/BathIcon'
import AreaIcon from '../../assets/Icons/AreaIcon'
import LocationIcon from '../../assets/Icons/LocationIcon'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import HeartLikes from '../../assets/Icons/HeartLikes'
import Eye from '../../assets/Icons/Eye'
import PhoneAds from '../../assets/Icons/PhoneAds'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import CustomModal from '../../Components/CustomModal/CustomModal'
import DeleteModal from '../../Components/DeleteButton/DeleteModal'
import TradeIcon from '../../assets/Icons/TradeIcon'
import SimpleImageSlider from '../../Components/Ui/SimpleImageSlider/SimpleImageSlider'
import FavIcon from '../../Components/Ui/FavIcon/FavIcon'
import LocationDisplay from '../../Components/Ui/LocationDisplay/LocationDisplay'
import UpdatePropertyModal from './UpdatePropertyModal'

const VendorAdsCard = ({ propertyData, id,type,model , price, numAds, seen,  title, tradeItem, likes, calls, date, rooms, bath, space, details, location, img, company = false, wrapperClass, isFav, isSwiping = false, trade = false, onDelete }) => {
    const { currentLanguage } = useLanguage()
    const [showProgress, setShowProgress] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const sliceWords = (text) => {
        const words = text.split(" ");
        return words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");
    };


    const handleClick = (e) => {
        if (isSwiping) e.preventDefault();
    };


    return (
        <div className={`compound-card space-4 d-flex ${wrapperClass} mb-4  `} style={company & wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }} dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            <Link to={ model ==="property" ? `/aqar-guide/${id}` : model === "building" ? `/building-guide/${id}` : model === "land" ? `/land-guide/${id}` : `/factory-guide/${id}` }
                className={`  ${wrapperClass ? "w-100" : "w-50"}`}
                onClick={handleClick}
            >
                <div className='compound-img'>
                    <SimpleImageSlider images={img} alt="img" />
                    {/* favIcon */}
                    <FavIcon isFav={isFav} />
                </div>
            </Link>
            {/* price */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100'>
                    <p className='b-11 min-w-max' style={{ color: "var(--primary)" }}>
                        رقم الاعلان: {numAds}
                    </p>
                    <div className='d-flex gap-2 flex-wrap justify-content-end'>
                        <p className='b-16 available'>
                            {type === "sale"? "للبيع":"للايجار"}
                        </p>
                        <p className='b-16 available'>
                            {date ? date.split('T')[0] : ''}
                        </p>
                    </div>
                </div>
                {trade && <p className="b-9">{title}</p>}
                {!trade &&
                    <>
                        <p className="b-9">{price} ج.م</p>
                        <div className='d-flex gap-2'>
                            {rooms && (
                                <p className='d-flex align-items-center gap-2 b-12'>
                                    <Bed />
                                    {rooms}
                                </p>
                            )}
                            {bath && (
                                <p className='d-flex align-items-center gap-2 b-12'>
                                    <BathIcon />
                                    {bath}
                                </p>
                            )}
                            <p className='d-flex align-items-center gap-2 b-12'>
                                <AreaIcon />
                                {space} متر مربع
                            </p>
                        </div>
                    </>
                }
                {/* specifications */}


                {!trade &&
                    <>
                        {/* details */}
                        <p className='b-12'>
                            {details}
                        </p>
                        {/* locations */}

                        <p className='b-12'>
                            <LocationIcon/>
                            {" "}
                            {location}
                        </p>
                    </>
                }
                {trade &&
                    <>
                        <span className='trade-icon'>
                            <TradeIcon />
                        </span>
                        <div className='trade-details space-2 d-flex flex-column justify-content-center align-items-center'>
                            <p className="b-11">مطلوب في التبديل</p>
                            <p className="b-12">{tradeItem}</p>
                        </div>
                    </>
                }
                <div className='d-flex gap-2'>
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
                        <Link to={`/update-aqar/${id}`} className='text-white'>
                            عدل على الاعلان
                        </Link>
                    </button>
                </div>
            </div>
            {/* delete modal*/}
            <CustomModal
                showModal={showProgress}
                onHide={() => setShowProgress(false)}
                setShowModal={setShowProgress}
                newClass={"progress-modal"}
            >
                <div>
                    <DeleteModal
                        setShowProgress={setShowProgress}
                        propertyId={id}
                        onDelete={onDelete}
                        type={model}
                    />
                </div>
            </CustomModal>

            {/* update modal */}
            {/* <UpdatePropertyModal
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                propertyId={id}
                propertyData={propertyData}
                onUpdate={onDelete} // Refresh the list after update
            /> */}
        </div >
    )
}

export default VendorAdsCard