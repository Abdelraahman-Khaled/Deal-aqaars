import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import Places from '../../Components/Ui/Places/Places'
import CompoundGuidePage from '../../Components/Ui/GuideSection/CompoundGuidePage'
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
                    <CompoundGuidePage title={"دليل الكمبوندات "} />

                </ContainerMedia>

            </div>
        </>)
}

export default CompoundPage