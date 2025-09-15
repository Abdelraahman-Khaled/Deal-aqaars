import React, { useState, useEffect } from 'react'
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
import PropertyAPI from '../../api/propertyApi'
import SwapAPI from '../../api/swapApi'
import Loader from '../../Components/Loader/Loader'
import { current } from '@reduxjs/toolkit'

import { useFinishing } from '../../contexts/FinishingContext';
import TradeCard from '../Trade/TradeCard'

const VendorAds = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [toggle, setToggle] = useState("realestate");
    const [rotate, setRotate] = useState(false);
    const [activeTab, setActiveTab] = useState("منشور");
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [propertiesLoaded, setPropertiesLoaded] = useState(false);
    const [swaps, setSwaps] = useState([]);
    const [swapsLoaded, setSwapsLoaded] = useState(false);
    const userType = useSelector((state) => state.userType.userType);
    const { myFinishingServices, fetchMyFinishingServices, loading: finishingLoading, error: finishingError, myFinishingServicesLoaded } = useFinishing();

    // Fetch user's properties
    const fetchMyProperties = async () => {
        try {
            setLoading(true);
            const response = await PropertyAPI.getMyProperties();
            setProperties(response.data);
            console.log(response.data);

            setError(null);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err.message || 'Failed to fetch properties');
            setProperties([]);
        } finally {
            setLoading(false);
            setPropertiesLoaded(true);
        }
    };

    // Fetch user's swaps
    const fetchMySwaps = async () => {
        try {
            setLoading(true);
            const response = await SwapAPI.getMySwaps();
            setSwaps(response.swaps);
            console.log("My Swaps:", response.swaps);
            setError(null);
        } catch (err) {
            console.error('Error fetching swaps:', err);
            setError(err.message || 'Failed to fetch swaps');
            setSwaps([]);
        } finally {
            setLoading(false);
            setSwapsLoaded(true);
        }
    };

    // Fetch user's finishing services
    // This function is now part of FinishingContext and called via useFinishing hook

    useEffect(() => {
        if (toggle === "finishing") {
            console.log("Toggle is finishing. myFinishingServicesLoaded:", myFinishingServicesLoaded);
            console.log("Current myFinishingServices:", myFinishingServices);
            console.log("Current finishingError:", finishingError);
            if (!myFinishingServicesLoaded) {
                fetchMyFinishingServices();
            }
        } else if (toggle === "swaps") {
            if (!swapsLoaded) {
                fetchMySwaps();
            }
        } else if (toggle !== "finishing" && toggle !== "swaps" && !propertiesLoaded) {
            fetchMyProperties();
        }
    }, [toggle, fetchMyFinishingServices, fetchMySwaps, fetchMyProperties, propertiesLoaded, myFinishingServicesLoaded, myFinishingServices, finishingError, swapsLoaded]);

    // Handle property deletion
    const handleDeleteProperty = (deletedPropertyId) => {
        setProperties(prevProperties =>
            prevProperties.filter(property => property._id !== deletedPropertyId)
        );
    };

    const user = useSelector((state) => state.auth.user);
    const tabs = [
        { value: "realestate", label: translations[currentLanguage].realestate },
        { value: "swaps", label: translations[currentLanguage].trade },
    ];

    const tabsCompany = [
        { value: "realestate", label: translations[currentLanguage].realestate },
        { value: "project", label: translations[currentLanguage].project },
        ...(user?.companyId ? [{ value: "finishing", label: translations[currentLanguage].finishing }] : []),
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
                                    tabs={userType == "vendor" ? tabs : tabsCompany}
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
                            {toggle === "finishing" ? (
                                finishingLoading ? (
                                    <div className="col-12 text-center py-5">
                                        <Loader />
                                        <p className="mt-2">جاري تحميل إعلانات التشطيبات...</p>
                                    </div>
                                ) : finishingError ? (
                                    <div className="col-12 text-center py-5">
                                        <p className="text-danger">حدث خطأ في تحميل إعلانات التشطيبات: {finishingError}</p>
                                        <button
                                            className="btn btn-primary mt-2"
                                            onClick={() => window.location.reload()}
                                        >
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                ) : myFinishingServices ?
                                    <div className='related-slider col-12 col-sm-6 col-lg-4  mt-0'>
                                        <FininshCard
                                            img={myFinishingServices.images}
                                            subtitles={myFinishingServices.servicesOffered ?
                                                myFinishingServices.servicesOffered.map(service => service[currentLanguage]) :
                                                myFinishingServices.services || myFinishingServices.subtitles}
                                            exprince={myFinishingServices.companyDescription?.[currentLanguage] || myFinishingServices.experience || myFinishingServices.exprince}
                                            title={myFinishingServices.jobType?.[currentLanguage] || myFinishingServices.name || myFinishingServices.title}
                                            phoneNumber={myFinishingServices.phoneNumber}
                                            hasWhatsapp={myFinishingServices.hasWhatsapp}
                                            detailedAddress={myFinishingServices.detailedAddress?.[currentLanguage]}
                                            companyAds={true}
                                            seen={"1"}
                                            likes={"2"}
                                            calls={"3"}
                                        />
                                    </div>
                                    : (
                                        <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
                                            <AddannouncementIcon />
                                            <p className='b-12 w-25 text-center'>لا توجد إعلانات تشطيبات خاصة بك.</p>
                                        </div>
                                    )
                            ) : (
                                loading ? (
                                    <div className="col-12 text-center py-5">
                                        <Loader />
                                        <p className="mt-2">جاري تحميل الإعلانات...</p>
                                    </div>
                                ) : error ? (
                                    <div className="col-12 text-center py-5">
                                        <p className="text-danger">حدث خطأ في تحميل الإعلانات: {error}</p>
                                        <button
                                            className="btn btn-primary mt-2"
                                            onClick={() => window.location.reload()}
                                        >
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                ) : properties?.length > 0 ? (
                                    properties.map((property, index) => (
                                        <div key={property.id || index} className='related-slider col-12 col-sm-6 col-lg-4  mt-0'>
                                            {toggle === "realestate" ?
                                                <VendorAdsCard
                                                    key={index}
                                                    id={property._id}
                                                    title={property.title[currentLanguage]}
                                                    lon={property.location.coordinates[0]}
                                                    lat={property.location.coordinates[1]}
                                                    details={property.description[currentLanguage]}
                                                    img={property.images}
                                                    company={true}
                                                    rooms={property.details.rooms}
                                                    bath={property.details.bathroooms}
                                                    space={property.details.space}
                                                    wrapperClass={true}
                                                    price={property.details.price}
                                                    numAds={index + 1}
                                                    date={property.createdAt}
                                                    seen={"1"}
                                                    likes={"1"}
                                                    calls={"1"}
                                                    tradeItem={"asad"}
                                                    trade={toggle === "trade" ? true : false}
                                                    onDelete={handleDeleteProperty}
                                                    propertyData={property}
                                                />
                                                : toggle === "project" ?
                                                    <CompanyProjectCard
                                                        key={index}
                                                        title={property.title[currentLanguage]}
                                                        lat={property.location.coordinates[0]}
                                                        lon={property.location.coordinates[1]}
                                                        details={property.description[currentLanguage]}
                                                        price={property.details.price}
                                                        img={property.images}
                                                        slider={true}
                                                        wrapperClass="flex-wrap"
                                                        seen={"1"}
                                                        likes={"2"}
                                                        calls={"3"}
                                                    />
                                                    : toggle === "swaps" ?
                                                        <div className="row g-4 pt-2 ">
                                                            {swaps.map((swap, index) => (
                                                                <>
                                                                    <TradeCard
                                                                        key={index} 
                                                                        id={swap._id}
                                                                        title={swap.whatIHave.description}
                                                                        trade={swap.whatIWant.description}
                                                                        location={swap.locationLabel}
                                                                        images={swap.images}
                                                                        listedBy={swap.listedBy}
                                                                        phoneNumber={swap.contact?.phoneNumber}
                                                                        hasWhatsapp={swap.contact?.hasWhatsapp}
                                                                        createdAt={swap.createdAt}
                                                                    />
                                                                </>
                                                            ))}
                                                        </div>
                                                        :
                                                        <FininshCard
                                                            id={item._id || index} // Use item.id if available, otherwise use index as fallback
                                                            img={item.images && item.images.length > 0 ? item.images[0] : item.img || "./home.jpg"}
                                                            subtitles={item.servicesOffered ?
                                                                item.servicesOffered.map(service => service.ar || service) :
                                                                item.services || item.subtitles}
                                                            exprince={item.companyDescription[currentLanguage]}
                                                            since={"0"}
                                                            title={item.jobType[currentLanguage]}
                                                            phoneNumber={item.phoneNumber}
                                                            hasWhatsapp={item.hasWhatsapp}
                                                            detailedAddress={item.detailedAddress[currentLanguage]}
                                                        />
                                            }
                                        </div>
                                    ))
                                ) : (
                                    <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
                                        <AddannouncementIcon />
                                        <p className='b-12 w-25 text-center'>يلا مستني إيه؟ مفيش ولا إعلان منشور! ضيف إعلاناتك دلوقتي ووصل لملايين المستخدمين</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </ContainerMedia >
        </>
    )
}

export default VendorAds