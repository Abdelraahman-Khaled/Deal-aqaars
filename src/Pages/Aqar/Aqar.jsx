import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import AqarDetails from './Components/AqarDetails'
import Places from '../../Components/Ui/Places/Places'
import GuidePage from '../../Components/Ui/GuideSection/GuidePage'
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
                    <GuidePage title={"عقارات للبيع في مصر"} compound={false} />

                </ContainerMedia>

            </div>
        </>)
}


export default Aqar