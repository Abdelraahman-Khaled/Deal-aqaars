import React, { useState } from 'react'
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import SpaceBox from '../../../../Components/Ui/SpaceBox/SpaceBox';

const CompoundTaps = ({ unitData }) => {
    const [toggle, setToggle] = useState("saleDeveloper");
    const { currentLanguage } = useLanguage()

    const data = unitData?.aqarType?.map((type, index) => ({
        title: type,
        spaces: unitData?.spaces || [],
        prices: unitData?.prices || []
    })) || [];

    const tabs = [
        {
            eventKey: "tab1",
            title: (
                <>
                    {currentLanguage === "ar" ? "للبيع - المطور" : "sale - developer"}
                </>
            ),
            content: (
                <>
                    <SpaceBox data={data} />
                </>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <>
                    {currentLanguage === "ar" ? "للبيع - معلنين" : "Sale - Advertisers"}
                </>
            ),
            content: (
                <>
                    <SpaceBox data={data} />
                </>
            )
        },
        {
            eventKey: "tab3",
            title: (
                <>
                    {currentLanguage === "ar" ? "للايجار - معلنين" : "Rent - Advertisers"}
                </>
            ),
            content: (
                <>
                    <SpaceBox data={data} />
                </>
            )
        }
    ];

    return (
        <div className="compound-taps space-4 d-flex flex-column w-75">
            <p className='b-5'>وحدات الكمباوند</p>
            <TabsContent
                tabsData={tabs}
                newClassTabsContent={""}
            />
        </div>
    )
}

export default CompoundTaps