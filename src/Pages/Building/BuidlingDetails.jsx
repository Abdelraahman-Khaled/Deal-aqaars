import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import { useParams } from 'react-router-dom';
import { useBuilding } from '../../contexts/BuildingContext';
import BuildingAPI from '../../api/buildingApi';

import compoundImg from "../../assets/images/compounds/compound.png";
import compoundImg1 from "../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../assets/images/compounds/compound2.png";
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import PropertyShowcaseExample from '../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';
import DescriptionGuide from '../../Components/Ui/DescriptionGuide/DescriptionGuide';
import UnitDetails from '../../Components/Ui/UnitDetails/UnitDetails';
import AdsDescription from '../../Components/Ui/AdsDescription/AdsDescription';
import RealatedSlider from '../../Components/Ui/RealatedSlider/RealatedSlider';
import CompanyCard from '../../Components/Ui/CompanyCard/CompanyCard';
import TwoAds from '../../Components/Ui/TwoAds/TwoAds';
import Loader from '../../Components/Loader/Loader';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import { translations } from './translations';
import RealStateCard from '../../Components/Ui/RealStateCard/RealStateCard';
import Map from '../../Components/Ui/Map/Map';
import BuildingCard from '../../Components/Ui/Building/BuildingCard';

const BuildingDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const { building, loading, error, fetchBuilding, clearBuilding } = useBuilding();
    const [relatedBuildings, setRelatedBuildings] = useState([]);

    // Fetch building when component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchBuilding(id);
        }
        return () => clearBuilding(); // cleanup on unmount
    }, [id, fetchBuilding, clearBuilding]);

    useEffect(() => {
        const fetchRelated = async () => {
            if (building && building.location?.city && building.details?.space) {
                try {
                    const params = {
                        city: building.location.city,
                        space: building.details.space
                    };
                    const response = await BuildingAPI.filterBuildings(params);
                    if (response && response.data) {
                        setRelatedBuildings(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching related buildings:", error);
                }
            }
        };
        fetchRelated();
    }, [building]);

    const unitDetails = [
        {
            space: building?.details.space,
            floor: building?.details.floor,
            front: building?.details.view,
            numOfAds: "",
            paymentWay: building?.details.paymentMethod,
            numRooms: building?.details.rooms,
            finishingType: building?.details.finishingType,
            yearDelivary: building?.details.handoverDate,
            buildingYear: building?.details.buildingYear,
            meterPrice: building?.details.space ? (building?.details.price / building?.details.space).toFixed(0) : 0,
            AdsType: building?.details.propertyType,
        }
    ]

    // Show loading state
    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <Loader />
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

    // Show not found message if no building data
    if (!building && !loading) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="text-center py-5">
                        <h3 className="mb-3">{currentLanguage === "ar" ? "العقار غير موجود" : "building Not Found"}</h3>
                        <p className="text-muted">{currentLanguage === "ar" ? "لم يتم العثور على العقار المطلوب" : "The requested building could not be found"}</p>
                    </div>
                </ContainerMedia>
            </div>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل المبنى" : "Building Details"} />
            <div className="py-4">
                <ContainerMedia>
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={building?.division === "rent" ? translations[currentLanguage].rent : translations[currentLanguage].sale}
                            mainRoute={"/realestate"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={building?.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample images={building.images.map((item) => item.url)} location={building.location.city} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={building?.details.price + " " + "ج.م"}
                                    lat={building.location.coordinates[0]}
                                    lon={building.location.coordinates[1]}
                                    aqar={true}
                                    rooms={building.details.rooms}
                                    bath={building.details.bathrooms}
                                    space={building.details.space}
                                    description={building.description[currentLanguage]}
                                    location={building.location.detailedLocation}
                                />
                                <UnitDetails data={unitDetails} />

                                <AdsDescription title={"وصف الاعلان"} description={building.description[currentLanguage]} />
                                <Map
                                    lon={building.location.coordinates.coordinates[0]}
                                    lat={building.location.coordinates.coordinates[1]}
                                    locationName={building.title[currentLanguage]}
                                />

                                {/* related slider */}
                                {relatedBuildings.length > 0 && (
                                    <RealatedSlider title={"المشاريع المتشابهة"}>
                                        {relatedBuildings.map((card, index) => (
                                            <div key={index} className="slider-card-wrapper w-100">
                                                <BuildingCard
                                                    id={card._id}
                                                    price={card.details?.price}
                                                    rooms={card.details?.rooms}
                                                    bath={card.details?.bathrooms}
                                                    space={card.details?.space}
                                                    details={card.description?.[currentLanguage]}
                                                    location={card.location?.detailedLocation}
                                                    offer={card.details?.price}
                                                    img={card.images?.[0]?.url || compoundImg}
                                                    phone={card.advertiserPhoneNumber}
                                                    haveWhatsapp={card.haveWhatsapp}
                                                />
                                            </div>
                                        ))}
                                    </RealatedSlider>
                                )}

                            </div>
                            <div className="left-col col-12 col-xl-3 d-flex flex-column space-6">
                                <TwoAds />
                            </div>
                        </div>
                    </main>
                </ContainerMedia>
            </div>
        </>)
}

export default BuildingDetails