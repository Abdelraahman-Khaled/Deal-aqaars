import React, { useEffect } from 'react'
import HelmetInfo from '../../../Components/Helmetinfo/HelmetInfo';
import { useLanguage } from '../../../Components/Languages/LanguageContext';
import { useProperty } from '../../../contexts/PropertyContext';
import BreadcrumbsPage from '../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import ImageSlider from '../../../Components/Ui/ImageSlider/ImageSlider';
import DescriptionGuide from '../../../Components/Ui/DescriptionGuide/DescriptionGuide';
import AdsDescription from '../../../Components/Ui/AdsDescription/AdsDescription';
import Map from '../../../Components/Ui/Map/Map';
import CompanyCard from '../../../Components/Ui/CompanyCard/CompanyCard';
import ContainerMedia from '../../../Components/ContainerMedia/ContainerMedia';
import UnitDetails from '../../../Components/Ui/UnitDetails/UnitDetails';
import RealatedSlider from '../../../Components/Ui/RealatedSlider/RealatedSlider';
import RealStateCard from '../../../Components/Ui/RealStateCard/RealStateCard';

import compoundImg from "../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../assets/images/compounds/compound2.png";
import TwoAds from '../../../Components/Ui/TwoAds/TwoAds';
import { useParams } from 'react-router-dom';
import HouseLoader from '../../../Components/Loader/HouseLoader';
import { translations } from './translations';
import PropertyShowcaseExample from '../../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';
import LocationDisplay from '../../../Components/Ui/LocationDisplay/LocationDisplay';
import { current } from '@reduxjs/toolkit';

const AqarGuide = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const { property, loading, error, fetchProperty, clearProperty } = useProperty();
    // Fetch property when component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchProperty(id);
        }
        return () => clearProperty(); // cleanup on unmount
    }, [id, fetchProperty, clearProperty]);

    console.log("property:", property);

    // Fetch property data when component mounts or id changes

    const OPTIONS = {}
    const SLIDES = [
        "/aqar02.jpg",
        "/aqar03.jpg",
        "/aqar04.jpg",
        "/img03.jpg",
        "/aqar02.jpg",
        "/aqar03.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/aqar04.jpg",
        "/img04.jpg",
        "/aqar02.jpg",
        "/img04.jpg",
    ];



    const unitDetails = [
        {
            space: property?.details.space,
            floor: property?.details.floor,
            front: property?.details.view,
            numOfAds: "",
            paymentWay: property?.details.paymentMethods,
            numRooms: property?.details.rooms,
            finishingType: property?.details.finishing,
            yearDelivary: "",
            meterPrice: property?.details.space,
            AdsType: property?.ownerType,

        }
    ]

    const data = [
        {
            id: 1,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "3,500,000",
            offer: "450,000",
            img: compoundImg,
        },
        {
            id: 2,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق...",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "5,484,000",
            offer: 0,
            img: compoundImg1,
        },
        {
            id: 3,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق...",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "10,874,000",
            offer: "750,000",
            img: compoundImg2,
        },
    ];




    // Show loading state
    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <HouseLoader />
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </ContainerMedia>
            </div>
        );
    }

    // Show not found message if no property data
    if (!property && !loading) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="text-center py-5">
                        <h3 className="mb-3">{currentLanguage === "ar" ? "العقار غير موجود" : "Property Not Found"}</h3>
                        <p className="text-muted">{currentLanguage === "ar" ? "لم يتم العثور على العقار المطلوب" : "The requested property could not be found"}</p>
                    </div>
                </ContainerMedia>
            </div>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "دليل الكومباوندات" : "Compounds Guide"} />
            <div className="py-4">
                <ContainerMedia>
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={property?.category === "rent" ? translations[currentLanguage].rent : translations[currentLanguage].sale}
                            mainRoute={"/realestate"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={property?.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample images={property.images.map((item) => item.url)} lat={property.location.coordinates[0]} lon={property.location.coordinates[1]} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={"7,457,874 ج.م"}
                                    lat={property.location.coordinates[0]}
                                    lon={property.location.coordinates[1]}
                                    aqar={true}
                                    rooms={property.details.rooms}
                                    bath={property.details.bathrooms}
                                    space={property.details.space}
                                    view={property.details.view}
                                    floor={property.details.floor}
                                />
                                <UnitDetails data={unitDetails} />
                                <AdsDescription title={property.title[currentLanguage]} description={property.description[currentLanguage]} />
                                <Map 
                                    lat={property.location.coordinates[0]} 
                                    lon={property.location.coordinates[1]} 
                                    locationName={property.title[currentLanguage]} 
                                />

                                {/* related slider */}
                                <RealatedSlider title={"المشاريع المتشابهة"}>
                                    {data.map((card, index) => (
                                        <div key={index} className="slider-card-wrapper w-100">
                                            <RealStateCard
                                                price={card.price}
                                                rooms={card.rooms}
                                                bath={card.bath}
                                                space={card.space}
                                                details={card.details}
                                                location={card.location}
                                                offer={card.offer}
                                                img={card.img}
                                            />
                                        </div>
                                    ))}
                                </RealatedSlider>

                            </div>
                            <div className="left-col col-12 col-xl-3 d-flex flex-column space-6">
                                <CompanyCard
                                    name={"تطوير مصر للتطوير العقاري"}
                                    since={"2014"}
                                    numberProjects={"8"}
                                    inhouse={"2"}
                                    notFinished={"1"}
                                    underDevelopment={"2"}
                                />

                                <TwoAds />
                            </div>
                        </div>
                    </main>
                </ContainerMedia>
            </div>
        </>)
}

export default AqarGuide