import React from 'react'
import BellIcon from '../../../assets/Icons/BellIcon'
import "./Ads.css"
import { Link } from 'react-router-dom'
const Ads = () => {
    const links = ["عقارات استوديو للبيع", "عقارات 2 غرفة نوم للبيع", "عقارات 1 غرفة نوم للبيع", "عقارات 3 غرفة نوم للبيع", "عقارات 4 غرفة نوم للبيع"]

    return (
        <div className='ads col-lg-3 col-12 d-flex flex-column  lg-align-items-center space-6 mb-5'>
            <div className='d-flex flex-column w-100 space-6'>
                <p className='b-12 text-center'>
                    خليك أول واحد يعرف عن العقارات الجديدة!
                </p>
                <button className='btn-main w-100 p-3'>
                    <BellIcon color={"#fff"} />
                    عرفني أول بأول بالعقارات الجديدة!
                </button>
                <p className='b-11 w-100 like'>
                    حاجات ممكن تعجبك
                </p>
                <div className='d-flex flex-column space-2 w-100 '>
                    {
                        links.map((link, index) => (
                            <Link key={index} to={"#"} className='w-100 b-12'>
                                {link}
                            </Link>
                        ))
                    }
                </div>
                <Link to={"/realestate"} className="w-100 " style={{ color: "var(--yellow-100)" }}>
                    شوف اكتر
                </Link>
            </div>
            <div className='w-100'>
                <img src="/ads.png" alt="ads" className='w-100' />
            </div>
        </div>
    )
}

export default Ads