import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import Places from '../../Components/Ui/Places/Places'
import GuidePage from '../../Components/Ui/GuideSection/GuidePage'
import CompoundList from './Components/CompoundDetails/CompoundList'

const CompoundPage = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "الكمبوندات" : "Compounds"} />
            <div className="py-4">

                <ContainerMedia >

                    <CompoundList />
                    <Places />
                    <GuidePage title={"دليل الكمبوندات - 1659 مشروع بأسعار كل الوحدات"} />

                </ContainerMedia>

            </div>
        </>)
}

export default CompoundPage