import React from 'react'
import { useLanguage } from "../../../../Components/Languages/LanguageContext"
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';
import FinishingSearch from './FinishingSearch/FinishingSearch';
import '../../Home.css';

const HeroSection = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const tabsDataBio = [
        {
            eventKey: "tab1",
            title: (
                <>
                    {currentLanguage === "ar" ? "عقارات" : "Real estate"}
                </>
            ),
            content: (
                <>
                    <AdvancedSearch />
                </>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <>
                    {currentLanguage === "ar" ? "تشطيبات" : "Finishing"}
                </>
            ),
            content: (
                <>
                    <FinishingSearch />
                </>
            )
        }
    ];
    return (
        <div className="home-hero my-4 ">
            <h4 className='p-4 pb-0 text-center'>{currentLanguage === "ar" ? "كل العقارات في حتة واحدة!" : "All properties in one place!"}</h4>
            <div className='w-100'>
                <TabsContent
                    tabsData={tabsDataBio}
                    newClassTabsContent={"tabs-home "}
                />
            </div>
        </div>
    )
}

export default HeroSection