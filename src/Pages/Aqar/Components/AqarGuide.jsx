import React, { useEffect, useState } from 'react'
import HelmetInfo from '../../../Components/Helmetinfo/HelmetInfo';
import { useLanguage } from '../../../Components/Languages/LanguageContext';
import { useProperty } from '../../../contexts/PropertyContext';
import BreadcrumbsPage from '../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import DescriptionGuide from '../../../Components/Ui/DescriptionGuide/DescriptionGuide';
import AdsDescription from '../../../Components/Ui/AdsDescription/AdsDescription';
import Map from '../../../Components/Ui/Map/Map';
import CompanyCard from '../../../Components/Ui/CompanyCard/CompanyCard';
import ContainerMedia from '../../../Components/ContainerMedia/ContainerMedia';
import UnitDetails from '../../../Components/Ui/UnitDetails/UnitDetails';
import RealatedSlider from '../../../Components/Ui/RealatedSlider/RealatedSlider';
import RealStateCard from '../../../Components/Ui/RealStateCard/RealStateCard';

import compoundImg from "../../../assets/images/compounds/compound.png";
import TwoAds from '../../../Components/Ui/TwoAds/TwoAds';
import { useParams } from 'react-router-dom';
import { translations } from './translations';
import PropertyShowcaseExample from '../../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';
import Loader from '../../../Components/Loader/Loader';
import PropertyAPI from '../../../api/propertyApi';

const AqarGuide = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const { property, loading, error, fetchProperty, clearProperty } = useProperty();
    const [relatedProperties, setRelatedProperties] = useState([]);
    console.log(relatedProperties, "relatedProperties");

    // Fetch property when component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchProperty(id);
        }
        return () => clearProperty(); // cleanup on unmount
    }, [id, fetchProperty, clearProperty]);

    // Fetch related properties
    useEffect(() => {
        const fetchRelated = async () => {
            if (property) {
                try {
                    const filters = {
                        city: property.location?.city,
                        rooms: property.details?.rooms,
                        bathrooms: property.details?.bathrooms
                    };
                    const response = await PropertyAPI.getAllProperties(filters);

                    let properties = [];
                    if (Array.isArray(response)) {
                        properties = response;
                    } else if (response.data && Array.isArray(response.data)) {
                        properties = response.data;
                    }

                    // Filter out current property
                    const filtered = properties.filter(p => p._id !== property._id && p.id !== property.id);
                    setRelatedProperties(filtered);
                } catch (err) {
                    console.error("Error fetching related properties:", err);
                }
            }
        };
        fetchRelated();
    }, [property]);

    console.log("property:", property);

    const unitDetails = [
        {
            space: property?.details.space,
            floor: property?.details.floor,
            front: property?.details.view,
            numOfAds: "",
            paymentWay: property?.details.paymentMethod,
            numRooms: property?.details.rooms,
            finishingType: property?.details.finishingType,
            yearDelivary: property?.details.handoverDate,
            buildingYear: property?.details.buildingYear,
            meterPrice: (property?.details.price / property?.details.space).toFixed(0),
            AdsType: property?.details.propertyType,
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
                            mainTitle={property?.division === "rent" ? translations[currentLanguage].rent : translations[currentLanguage].sale}
                            mainRoute={"/realestate"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={property?.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample images={property.images.map((item) => item.url)} location={property.location.city} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={property?.details.price + " " + "ج.م"}
                                    lat={property.location.coordinates[0]}
                                    lon={property.location.coordinates[1]}
                                    aqar={true}
                                    rooms={property.details.rooms}
                                    bath={property.details.bathrooms}
                                    space={property.details.space}
                                    description={property.description[currentLanguage]}
                                    location={property.location.detailedLocation}
                                />
                                <UnitDetails data={unitDetails} />

                                <AdsDescription title={"وصف الاعلان"} description={property.description[currentLanguage]} />
                                <Map
                                    lon={property.location.coordinates.coordinates[0]}
                                    lat={property.location.coordinates.coordinates[1]}
                                    locationName={property.title[currentLanguage]}
                                />

                                {/* related slider */}
                                {relatedProperties.length > 0 && (
                                    <RealatedSlider title={"المشاريع المتشابهة"}>
                                        {relatedProperties.map((card, index) => (
                                            <div key={index} className="slider-card-wrapper w-100">
                                                <RealStateCard
                                                    id={card._id}
                                                    price={card.details?.price}
                                                    rooms={card.details?.rooms}
                                                    bath={card.details?.bathrooms}
                                                    space={card.details?.space}
                                                    details={card.description?.[currentLanguage]}
                                                    location={card.location?.detailedLocation}
                                                    offer={card.offer}
                                                    img={card.images && card.images.length > 0 ? card.images[0].url : compoundImg}
                                                    phone={card.advertiserPhoneNumber}
                                                    haveWhatsapp={card.haveWhatsapp}
                                                />
                                            </div>
                                        ))}
                                    </RealatedSlider>
                                )}

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