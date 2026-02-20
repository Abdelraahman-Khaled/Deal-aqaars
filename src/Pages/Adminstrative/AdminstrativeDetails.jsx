import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import { useParams } from 'react-router-dom';
import AdministrativeAPI from '../../api/administrativeApi';
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
import AdminstrativeCard from '../../Components/Ui/Adminstrative/AdminstrativeCard';

const AdminstrativeDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const [administrative, setAdministrative] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [relatedAdministrative, setRelatedAdministrative] = useState([]);

    // Fetch administrative when component mounts or id changes
    useEffect(() => {
        const fetchAdministrative = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await AdministrativeAPI.getAdministrativeById(id);
                setAdministrative(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch administrative details');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchAdministrative();
        }
        return () => setAdministrative(null); // cleanup on unmount
    }, [id]);

    // Fetch related administrative properties
    useEffect(() => {
        const fetchRelatedAdministrative = async () => {
            if (administrative) {
                try {
                    const filters = {
                        city: administrative.location?.city,
                        rooms: administrative.details?.rooms,
                        bathrooms: administrative.details?.bathrooms
                    };
                    const response = await AdministrativeAPI.getAllAdministrative(filters);

                    let administrativeList = [];
                    if (response.data && Array.isArray(response.data)) {
                        administrativeList = response.data;
                    } else if (Array.isArray(response)) {
                        administrativeList = response;
                    }

                    // Filter out current administrative
                    const filtered = administrativeList.filter(a => {
                        const isSame = (a._id && a._id.toString() === administrative._id?.toString()) ||
                            (a.id && a.id.toString() === administrative.id?.toString());
                        return !isSame;
                    });
                    setRelatedAdministrative(filtered);
                } catch (err) {
                    console.error("Error fetching related administrative:", err);
                }
            }
        };
        fetchRelatedAdministrative();
    }, [administrative]);


    const unitDetails = [
        {
            meterPrice: administrative?.details.price / administrative?.details.space,
            space: administrative?.details.space,
            front: administrative?.details.view,
            paymentWay: false,
            paymentLand: administrative?.details.paymentMethod,
            AdsType: administrative?.details.type,
            floor: administrative?.details.floor,
            finishingType: administrative?.details.finishing,
            buildingYear: administrative?.details.buildingYear,
            handingOverYear: administrative?.details.handingOverYear,

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

    // Show not found message if no administrative data
    if (!administrative && !loading) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="text-center py-5">
                        <h3 className="mb-3">{currentLanguage === "ar" ? "الوحدة الإدارية غير موجودة" : "Administrative Unit Not Found"}</h3>
                        <p className="text-muted">{currentLanguage === "ar" ? "لم يتم العثور على الوحدة الإدارية المطلوبة" : "The requested administrative unit could not be found"}</p>
                    </div>
                </ContainerMedia>
            </div>
        );
    }

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل الوحدة الإدارية" : "Administrative Unit Details"} />
            <div className="py-4">
                <ContainerMedia>
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={administrative?.division === "rent" ? translations[currentLanguage].rent : translations[currentLanguage].sale}
                            mainRoute={"/adminstrative"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={administrative?.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample images={administrative.images.map((item) => item.url)} location={administrative.location.city} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={administrative?.details.price + " " + "ج.م"}
                                    lat={administrative.location.coordinates[0]}
                                    lon={administrative.location.coordinates[1]}
                                    aqar={true}
                                    description={administrative.description[currentLanguage]}
                                    location={administrative.location.detailedLocation}
                                    space={administrative.details.space}
                                    rooms={administrative.details.rooms}
                                    bath={administrative.details.bathrooms}
                                />
                                <UnitDetails data={unitDetails} />

                                <AdsDescription title={"وصف الاعلان"} description={administrative.description[currentLanguage]} />
                                <Map
                                    lon={administrative?.location.coordinates[0]}
                                    lat={administrative?.location.coordinates[1]}
                                    locationName={administrative.title[currentLanguage]}
                                />

                                {/* related slider */}
                                {relatedAdministrative.length > 0 && (
                                    <RealatedSlider title={"المشاريع المتشابهة"}>
                                        {relatedAdministrative.map((adminItem, index) => (
                                            <div key={adminItem._id || index} className="slider-card-wrapper w-100">
                                                <AdminstrativeCard
                                                    id={adminItem._id}
                                                    price={adminItem.details?.price}
                                                    rooms={adminItem.details?.rooms}
                                                    bath={adminItem.details?.bathrooms}
                                                    space={adminItem.details?.space}
                                                    details={adminItem.description?.[currentLanguage]}
                                                    location={adminItem.location?.detailedLocation}
                                                    offer={adminItem.offer}
                                                    img={adminItem.images && adminItem.images.length > 0 ? adminItem.images[0].url : compoundImg}
                                                    phone={adminItem.advertiserPhoneNumber}
                                                    haveWhatsapp={adminItem.hasWhatsapp}
                                                    division={adminItem.division}
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

export default AdminstrativeDetails