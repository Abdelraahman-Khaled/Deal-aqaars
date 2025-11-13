import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import { useParams } from 'react-router-dom';
import AdministrativeAPI from '../../api/administrativeApi';
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
import TwoAds from '../../Components/Ui/TwoAds/TwoAds';
import Loader from '../../Components/Loader/Loader';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import { translations } from './translations';
import RealStateCard from '../../Components/Ui/RealStateCard/RealStateCard';
import Map from '../../Components/Ui/Map/Map';

const AdminstrativeDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const [administrative, setAdministrative] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    console.log("administrative:", administrative);


    const unitDetails = [
        {
            meterPrice:administrative?.details.price / administrative?.details.space ,
            space: administrative?.details.space,
            front: administrative?.details.view,
            paymentWay: false,
            paymentLand:administrative?.details.paymentMethod,
            AdsType: administrative?.details.type,
            floor:administrative?.details.floor,
            finishingType:administrative?.details.finishing,
            buildingYear:administrative?.details.buildingYear,
            handingOverYear:administrative?.details.handingOverYear,
            
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
            phone:"01121323475",
            haveWhatsapp:true,
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
            img: compoundImg1,phone:"01121323475",
            haveWhatsapp:true,
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
            img: compoundImg2,phone:"01121323475",
            haveWhatsapp:true,
        },
    ];




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
                                                phone={card.phone}
                                                haveWhatsapp={card.haveWhatsapp}
                                            />
                                        </div>
                                    ))}
                                </RealatedSlider>

                            </div>
                            <div className="left-col col-12 col-xl-3 d-flex flex-column space-6">
                                {/* <CompanyCard
                                    name={"تطوير مصر للتطوير العقاري"}
                                    since={"2014"}
                                    numberProjects={"8"}
                                    inhouse={"2"}
                                    notFinished={"1"}
                                    underDevelopment={"2"}
                                /> */}

                                <TwoAds />
                            </div>
                        </div>
                    </main>
                </ContainerMedia>
            </div>
        </>)
}

export default AdminstrativeDetails