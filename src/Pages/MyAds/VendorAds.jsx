import React, { useState } from 'react'
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import { translations } from './translations'
import SearchToggle from '../../Components/Ui/SearchComponents/SearchToggle '
import "./vendor.css"
import DropDown from '../../Components/DropDown/DropDown'
import VendorAdsCard from './VendorAdsCard'
import AddannouncementIcon from '../../assets/Icons/AddannouncementIcon'
import { useSelector } from 'react-redux'
import CompanyProjectCard from '../../Components/CompanyProjectCard/CompanyProjectCard'
import { data } from './companyCardData'
import FininshCard from '../../Components/Ui/FinishCard/FinishCard'
import FormField from '../../Components/Forms/FormField'
import InputFiled from '../../Components/Forms/InputField'
import SearchIcon from '../../assets/Icons/SearchIcon'

const VendorAds = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [toggle, setToggle] = useState("realestate");
    const [rotate, setRotate] = useState(false);
    const [activeTab, setActiveTab] = useState("منشور");
    const userType = useSelector((state) => state.userType.userType);

    const tabs = [
        { value: "realestate", label: translations[currentLanguage].realestate },
        { value: "trade", label: translations[currentLanguage].trade },
    ];

    const tabsCompany = [
        { value: "realestate", label: translations[currentLanguage].realestate },
        { value: "project", label: translations[currentLanguage].project },
        { value: "finishing", label: translations[currentLanguage].finishing },
    ]

    const organizing = [
        "الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"
    ];

    const interaction = [
        { value: "-", label: "إجمالى الظهور في البحث" },
        { value: "1", label: "إجمالى المشاهدات" },
        { value: "-", label: "إجمالي محاولات الإتصال" },
        { value: "-", label: "متوسط نسبة المشاهدة" },
        { value: "-", label: "متوسط نسبة الإتصال" },
        { value: "-", label: "عدد النقرات" },
    ]

    // search
    const initialValues = {
        search: "",
    };
    const handleSubmit = (values) => {
        console.log("Join Us form values:", values);
    };

    // status tabs
    const propertyTabs = [
        { label: "منشور", active: true },
        { label: "منتهي", active: false },
        { label: "مرفوض", active: false },
        { label: "قيد المراجعة", active: false },
        { label: "محذوف", active: false }
    ];



    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "إعلاناتي" : "My ads"} />

            <ContainerMedia >
                <div className='vendor py-4 d-flex space-8 flex-column'>
                    {/* top bar */}
                    <div className='d-flex justify-content-between align-items-start'>
                        <div className='pb-2'>
                            <BreadcrumbsPage
                                newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                mainTitle={"إعلاناتي"}
                                routeTitleTwoBread={false}
                                titleTwoBread={false}
                                secondArrow={false}
                            />
                            <h6 className="pt-3">
                                إعلاناتي
                            </h6>
                        </div>
                        <div className="col-12 col-md-6 col-lg-1 min-w-max d-flex justify-content-center ">
                            <div className="select-type tabs-home">
                                <SearchToggle
                                    toggleState={toggle}
                                    setToggleState={setToggle}
                                    tabs={userType === "vendor" ? tabs : tabsCompany}
                                />
                            </div>
                        </div>
                    </div>

                    {/* interaction cards*/}
                    <div className='interaction space-6 d-flex flex-column'>
                        <div className='  d-flex justify-content-between'>
                            <p className="b-9">
                                مستوي التفاعل
                            </p>
                            <div className='d-flex space-3 flex-wrap'>
                                {/* Drop Down */}
                                <DropDown title={"كل إعلاناتك"} details={organizing} rotate={rotate} setRotate={setRotate} />
                            </div>
                        </div>
                        <div className='row'>
                            {
                                interaction.map((item, index) => (
                                    <div className="related-slider col-12 col-sm-6 col-lg-4  mt-4 ">
                                        <div key={index} className='interaction-box'>
                                            <h6>{item.value}</h6>
                                            <p className="b-12">{item.label}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* ads */}
                    <div className='interaction space-6 d-flex flex-column'>
                        <div className='  d-flex justify-content-between'>
                            <p className="b-9">
                                {toggle === "finishing" ? "التشطيب" : "عقاراتك"}
                            </p>
                            <div className='d-flex space-3 flex-wrap'>
                                <div className='position-relative max-w-max' style={{ width: "100%" }}>

                                    <FormField
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                        id="edit-profile-form"
                                    >
                                        <InputFiled
                                            name="search"
                                            type="text"
                                            placeholder={"دور على اللى محتاجه"}
                                            success
                                            style={{ paddingRight: "40px", width: "max-content" }} // Ensure enough space for the icon
                                        />
                                        <span
                                            className="position-absolute"
                                            style={{
                                                top: "50%",
                                                right: "10px",
                                                transform: "translateY(-50%)",
                                                zIndex: 2,
                                            }}
                                        >
                                            <SearchIcon />
                                        </span>
                                    </FormField>
                                </div>
                            </div>
                        </div>
                        {/* status tabs */}
                        <div className="d-flex space-4 mb-4">
                            {propertyTabs
                                .filter(tab => !(toggle === "finishing" && tab.label === "منتهي"))
                                .map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTab(tab.label)}
                                        className={`status ${activeTab === tab.label ? "clicked" : ""}`}>
                                        {tab.label}
                                    </button>
                                ))}
                        </div>
                        {/* cards */}
                        <div className='row g-4 pt-2 '>

                            {
                                data?.length > 0 ?
                                    data.map((card, index) => (
                                        <div key={index} className='related-slider col-12 col-sm-6 col-lg-4  mt-0'>
                                            {toggle === "realestate" ?
                                                <VendorAdsCard
                                                    key={index}
                                                    title={card.title}
                                                    location={card.location}
                                                    details={card.details}
                                                    img={card.img}
                                                    company={true}
                                                    rooms={3}
                                                    bath={2}
                                                    space={130}
                                                    wrapperClass={true}
                                                    price={card.price}
                                                    numAds={card.numAds}
                                                    date={card.date}
                                                    seen={card.seen}
                                                    likes={card.likes}
                                                    calls={card.calls}
                                                    tradeItem={card.tradeItem}
                                                    trade={toggle === "trade" ? true : false}
                                                />
                                                : toggle === "project" ?
                                                    <CompanyProjectCard
                                                        key={index}
                                                        title={card.title}
                                                        location={card.location}
                                                        details={card.details}
                                                        price={card.price}
                                                        img={card.img}
                                                        slider={true}
                                                        wrapperClass="flex-wrap"
                                                        seen={card.seen}
                                                        likes={card.likes}
                                                        calls={card.calls}
                                                    />
                                                    :
                                                    <FininshCard
                                                        img={card.imgFinish}
                                                        subtitles={card.subtitles}
                                                        exprince={card.exprince}
                                                        since={card.since}
                                                        title={card.titleFinish}
                                                        companyAds={true}
                                                        seen={card.seen}
                                                        likes={card.likes}
                                                        calls={card.calls}
                                                    />
                                            }
                                        </div>
                                    ))
                                    :
                                    <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
                                        <AddannouncementIcon />
                                        <p className='b-12 w-25 text-center'>يلا مستني إيه؟ مفيش ولا إعلان منشور! ضيف إعلاناتك دلوقتي ووصل لملايين المستخدمين</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </ContainerMedia >
        </>
    )
}

export default VendorAds