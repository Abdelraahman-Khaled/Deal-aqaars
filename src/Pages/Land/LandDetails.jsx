import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import { useParams } from 'react-router-dom';
import { useLand } from '../../contexts/LandContext';
import LandAPI from '../../api/LandApi';
import compoundImg from "../../assets/images/compounds/compound.png";
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import PropertyShowcaseExample from '../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';
import DescriptionGuide from '../../Components/Ui/DescriptionGuide/DescriptionGuide';
import UnitDetails from '../../Components/Ui/UnitDetails/UnitDetails';
import AdsDescription from '../../Components/Ui/AdsDescription/AdsDescription';
import RealatedSlider from '../../Components/Ui/RealatedSlider/RealatedSlider';
import TwoAds from '../../Components/Ui/TwoAds/TwoAds';
import Loader from '../../Components/Loader/Loader';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import { translations } from './translations';
import RealStateCard from '../../Components/Ui/RealStateCard/RealStateCard';
import Map from '../../Components/Ui/Map/Map';
import LandCard from '../../Components/Ui/Building/BuildingCard';

const LandDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const { land, loading, error, fetchLand, clearLand } = useLand();
    const [relatedLands, setRelatedLands] = useState([]);

    // Fetch land when component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchLand(id);
        }
        return () => clearLand(); // cleanup on unmount
    }, [id, fetchLand, clearLand]);

    // Fetch related lands
    useEffect(() => {
        const fetchRelatedLands = async () => {
            if (land) {
                try {
                    const filters = {
                        city: land.location?.city,
                        space: land.details?.space
                    };
                    const response = await LandAPI.getAllLands(filters);

                    let landsList = [];
                    // Handle different response structures
                    if (response.data && Array.isArray(response.data)) {
                        landsList = response.data;
                    } else if (Array.isArray(response)) {
                        landsList = response;
                    }


                    // Filter out current land using proper comparison
                    const filtered = landsList.filter(l => {
                        const isSameLand = (l._id && l._id.toString() === land._id?.toString()) ||
                            (l.id && l.id.toString() === land.id?.toString());
                        return !isSameLand;
                    });
                    setRelatedLands(filtered);
                } catch (err) {
                    console.error("Error fetching related lands:", err);
                }
            }
        };
        fetchRelatedLands();
    }, [land]);


    const unitDetails = [
        {
            meterPrice: land?.details.price / land?.details.space,
            space: land?.details.space,
            front: land?.details.view,
            paymentWay: false,
            paymentLand: land?.details.paymentMethod,
            AdsType: land?.details.type,
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

    // Show not found message if no land data
    if (!land && !loading) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="text-center py-5">
                        <h3 className="mb-3">{currentLanguage === "ar" ? "الارض غير موجود" : "Land Not Found"}</h3>
                        <p className="text-muted">{currentLanguage === "ar" ? "لم يتم العثور على الارض المطلوب" : "The requested land could not be found"}</p>
                    </div>
                </ContainerMedia>
            </div>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل الارض" : "Land Details"} />
            <div className="py-4">
                <ContainerMedia>
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={land?.division === "rent" ? translations[currentLanguage].rent : translations[currentLanguage].sale}
                            mainRoute={"/realestate"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={land?.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample images={land.images.map((item) => item.url)} location={land.location.city} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={land?.details.price + " " + "ج.م"}
                                    lat={land.location.coordinates[0]}
                                    lon={land.location.coordinates[1]}
                                    aqar={true}
                                    description={land.description[currentLanguage]}
                                    location={land.location.detailedLocation}
                                    space={land.details.space}
                                />
                                <UnitDetails data={unitDetails} />

                                <AdsDescription title={"وصف الاعلان"} description={land.description[currentLanguage]} />
                                <Map
                                    lon={land?.location.coordinates[0]}
                                    lat={land?.location.coordinates[1]}
                                    locationName={land.title[currentLanguage]}
                                />

                                {/* related slider */}
                                {relatedLands.length > 0 && (
                                    <RealatedSlider title={"المشاريع المتشابهة"}>
                                        {relatedLands.map((landItem, index) => (
                                            <div key={landItem._id || index} className="slider-card-wrapper w-100">
                                                <LandCard
                                                    id={landItem._id}
                                                    price={landItem.details?.price}
                                                    space={landItem.details?.space}
                                                    details={landItem.description?.[currentLanguage]}
                                                    location={landItem.location?.detailedLocation}
                                                    offer={landItem.offer}
                                                    img={landItem.images && landItem.images.length > 0 ? landItem.images[0].url : compoundImg}
                                                    phone={landItem.advertiserPhoneNumber}
                                                    haveWhatsapp={landItem.hasWhatsapp}
                                                    division={landItem.division}
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

export default LandDetails