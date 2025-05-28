import React from 'react'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import FFBar from '../../Components/Ui/Finish&FurnisherBar/FFBar'
import { useLanguage } from '../../Components/Languages/LanguageContext'

const FinishPage = () => {
    const { currentLanguage } = useLanguage();

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تشطيب" : "Finishing"} />
            <div className="py-4">

                <ContainerMedia >

                    <FFBar />

                </ContainerMedia>

            </div>
        </>
    )
}

export default FinishPage