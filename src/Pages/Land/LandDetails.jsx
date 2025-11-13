import React, { useEffect } from 'react'
import { useLanguage } from '../../Components/Languages/LanguageContext';
import { useParams } from 'react-router-dom';
import { useLand } from '../../contexts/LandContext';
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

const LandDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams();
    const { land, loading, error, fetchLand, clearLand } = useLand();
    // Fetch building when component mounts or id changes
    useEffect(() => {
        if (id) {
            fetchLand(id);
        }
        return () => clearLand(); // cleanup on unmount
    }, [id, fetchLand, clearLand]);

    console.log("land:", land);



    const unitDetails = [
        {
            meterPrice:land?.details.price / land?.details.space ,
            space: land?.details.space,
            front: land?.details.view,
            paymentWay: false,
            paymentLand:land?.details.paymentMethod,
            AdsType: land?.details.type,
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
                                />
                                <UnitDetails data={unitDetails} />
                               
                                <AdsDescription title={"وصف الاعلان"} description={land.description[currentLanguage]} />
                                <Map
                                    lon={land?.location.coordinates[0]}
                                    lat={land?.location.coordinates[1]}
                                    locationName={land.title[currentLanguage]}
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

export default LandDetails