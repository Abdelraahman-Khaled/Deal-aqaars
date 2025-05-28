import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import noDataImage from "../../assets/images/NotFound/not-found.png";
import { Link } from 'react-router-dom';
const NotFound = () => {
    const { currentLanguage } = useLanguage();
    return (

        <ContainerMedia>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "صفحه غير متوفرة" : "Not found page"} />
            <div className='py-4 '>

                <div div className='w-100 justify-content-center text-center py-5 d-flex flex-column align-items-center space-4 '
                    style={{ minHeight: "700px" }}
                >
                    <img
                        src={noDataImage}
                        alt="No Data"
                        width="570px"
                        height="180px"
                        style={{ marginBottom: "1rem" }}
                    />
                    <h5>الصفحة غير موجودة</h5>
                    <Link to={"/"} className='btn-main btn-submit mt-3 b-11 py-3 px-2'>
                        العودة للصفحة الرئيسية
                    </Link>
                </div>

            </div>
        </ContainerMedia>
    )
}

export default NotFound