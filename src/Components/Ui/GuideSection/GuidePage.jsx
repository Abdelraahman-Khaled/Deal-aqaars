import React, { useState } from 'react'
import SearchToggle from '../SearchComponents/SearchToggle '
import { translations } from './translations';
import { useLanguage } from '../../../Components/Languages/LanguageContext';
import DropDown from '../../DropDown/DropDown';
import CompoundCard from '../CompoundCard/CompoundCard';
import Ads from '../../Auth/Ads/Ads';
import "./Guide.css"
// images
import compoundImg from "../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../assets/images/compounds/compound2.png";
import RealStateCard from '../RealStateCard/RealStateCard';



const GuidePage = ({ title, compound = true }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [toggle, setToggle] = useState("inprogress");
    const [toggle1, setToggle1] = useState("nest");
    const [rotate, setRotate] = useState(false);
    const progressTabs = [
        { value: "inprogress", label: translations[currentLanguage].inProgress },
        { value: "ready", label: translations[currentLanguage].ready },
        { value: "all", label: translations[currentLanguage].received },
    ];
    const ShowType = [
        { value: "nest", label: translations[currentLanguage].nest },
        { value: "list", label: translations[currentLanguage].list },
    ];
    const organizing = [
        "الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"
    ];

    // card Data
    const data = [
        {
            id: 1,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg,
        },
        {
            id: 2,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg1,
        },
        {
            id: 3,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg2,
        },
    ];

    return (
        <div className=' guide compound d-flex flex-wrap  flex-md-row  justify-content-between'>

            <div className='d-flex space-6 flex-column col-12  col-lg-8 '>
                {
                    compound &&
                    <h6>{title}</h6>
                }
                <div className='d-flex flex-wrap space-3 justify-content-between align-items-center'>
                    {!compound &&
                        <h6>{title}</h6>
                    }
                    {compound &&
                        <div className='max-w-max mb-3 mb-md-0'>
                            <SearchToggle
                                toggleState={toggle}
                                setToggleState={setToggle}
                                tabs={progressTabs}
                                newClass={"select-progress p-1"}
                            />
                        </div>
                    }
                    <div className='d-flex space-3 flex-wrap'>
                        {/* Drop Down */}
                        <DropDown title={"رتبها زي ما تحب"} details={organizing} rotate={rotate} setRotate={setRotate} />
                        <div className='max-w-max mb-3 mb-md-0'>
                            <SearchToggle
                                toggleState={toggle1}
                                setToggleState={setToggle1}
                                tabs={ShowType}
                                newClass={"select-type p-1"}
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-wrap  flex-row justify-content-between'>
                    {compound && data.map((card, index) => (
                        <CompoundCard
                            key={index}
                            title={card.title}
                            location={card.location}
                            details={card.details}
                            price={card.price}
                            img={card.img}
                            company={true}
                            connections={true}
                            wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                        />
                    ))}
                    {!compound && data.map((card, index) => (
                        <RealStateCard
                            key={index}
                            title={card.title}
                            location={card.location}
                            details={card.details}
                            price={card.price}
                            img={card.img}
                            company={true}
                            connections={true}
                            wrapperClass={toggle1 === "nest" ? "flex-wrap" : "width-full"}
                            rooms={3}
                            bath={2}
                            space={130}
                            offer={"4500,00"}
                        />
                    ))}
                </div>
            </div>

            {/* Ads */}
            <Ads />


        </div>
    )
}

export default GuidePage