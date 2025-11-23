import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import AqarDetails from './Components/AqarDetails'
import Places from '../../Components/Ui/Places/Places'
import PropertyGuidePage from '../../Components/Ui/GuideSection/PropertyGuidePage'
import { useLanguage } from '../../Components/Languages/LanguageContext'

const Aqar = () => {
    const { currentLanguage } = useLanguage();
    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "عقارات" : "Real Estate"} />
            <div className="py-4">

                <ContainerMedia >

                    <AqarDetails />
                    <Places />
                    <PropertyGuidePage title={"عقارات للبيع في مصر"} />

                </ContainerMedia>

            </div>
        </>)
}


export default Aqar