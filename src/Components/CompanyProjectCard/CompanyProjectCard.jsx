import { Link } from 'react-router-dom'
import Garag from '../../assets/Icons/Garag'
import AddToFavIcon from '../../assets/Icons/AddToFavIcon'
import WhatsIcon from '../../assets/Icons/WhatsIcon'
import CallIcon from '../../assets/Icons/CallIcon'
import LocationIcon from '../../assets/Icons/LocationIcon'
import { useLanguage } from '../Languages/LanguageContext'
import DeleteButton from '../DeleteButton/DeleteButton'
import HeartLikes from '../../assets/Icons/HeartLikes'
import Eye from '../../assets/Icons/Eye'
import PhoneAds from '../../assets/Icons/PhoneAds'
import CustomModal from '../CustomModal/CustomModal'
import DeleteModal from '../DeleteButton/DeleteModal'
import { useState } from 'react'

const CompanyProjectCard = ({ calls, likes, seen, title, location, details, price, img, company = false, connections = false, slider = false, wrapperClass, status, isSwiping = false }) => {

    const { currentLanguage } = useLanguage()
    const [showProgress, setShowProgress] = useState(false);


    const handleClick = (e) => {
        if (isSwiping) e.preventDefault();
    };
    return (
        <div className={`compound-card space-4 d-flex ${wrapperClass} mb-4  `} style={company & wrapperClass === "flex-wrap" ? { width: "49%" } : { width: "100%" }} mb-4 dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            <Link to={"/compounds-guide"}
                className={`  ${wrapperClass ? "w-100" : "w-50"}`}
                onClick={handleClick}>
                <div className='compound-img'>
                    <img loading="lazy" src={img} alt="compoundImg" />
                    {/* favIcon */}
                    <AddToFavIcon />
                </div>
            </Link>
            <div className='d-flex gap-3 w-100'>
                <p className='d-flex align-items-center gap-2 b-12'>
                    <HeartLikes />
                    {seen}
                </p>
                <p className='d-flex align-items-center gap-2 b-12'>
                    <Eye />
                    {likes}
                </p>
                <p className='d-flex align-items-center gap-2 b-12'>
                    <PhoneAds />
                    {calls}
                </p>
            </div>
            {/* title */}
            <div className='d-flex flex-column space-4 w-100'>
                <div className='d-flex justify-content-between w-100 flex-column compound-title space-1'>
                    <p className='b-9'>
                        {title}
                    </p>

                </div>
                {/* locations */}
                <p className='b-12'>
                    <LocationIcon />
                    <span className='px-1'></span>
                    {location}
                </p>
                {/* details */}
                <p className='b-12'>
                    <Garag />
                    <span className='px-1'></span>
                    {details}
                </p>
                {/* price */}
                <p className='b-9 w-100'>
                    تبدأ من  {price} ج.م
                </p>

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

                {/* Compnay */}
                {
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
                }
                {
                    connections &&
                    <div className='connections d-flex justify-content-between w-100 pt-4 space-4 '>
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
                }
            </div>
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
        </div>
    )
}

export default CompanyProjectCard