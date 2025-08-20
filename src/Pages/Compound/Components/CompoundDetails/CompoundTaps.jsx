import React, { useState } from 'react'
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import SpaceBox from '../../../../Components/Ui/SpaceBox/SpaceBox';

const CompoundTaps = () => {
    const [toggle, setToggle] = useState("saleDeveloper");
    const { currentLanguage } = useLanguage()


    const data = [
        {
            title: "فلل",
            spaces: [450, 420, 550],
            prices: ["56,685,154", "36,685,154", "46,685,154"]
        },
        {
            title: "شاليهات",
            spaces: [120],
            prices: ["56,685,154"]
        },
        {
            title: "توين هاوس",
            spaces: [120, 130, 150],
            prices: ["850,000", "900,000", "1,200,000"]
        },
        {
            title: "شقة فاخرة",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "فيلا خاصة ",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "بنتهاوس أنيق",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "مكتب تجاري",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "محل تجاري",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "قطعة أرض سكنية",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
    ];

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