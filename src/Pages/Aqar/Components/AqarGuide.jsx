import React from 'react'
import HelmetInfo from '../../../Components/Helmetinfo/HelmetInfo';
import { useLanguage } from '../../../Components/Languages/LanguageContext';
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

const AqarGuide = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

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
            space: "102 متر²", floor: "الاول", front: "شارع رئيسي", numOfAds: "EG-5696885", paymentWay: "كاش أو تقسيط",
            numRooms: "3", finishingType: "اكسترا سوبر لوكس", yearDelivary: "2028", meterPrice: "147,480 ج.م/متر²", AdsType: "المطور"
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




    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "دليل الكومباوندات" : "Compounds Guide"} />
            <div className="py-4">
                <ContainerMedia>
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={"بيع"}
                            mainRoute={"/sale"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={"شقه للبيع متشطبه بالكامل بمقدم 300 الف لسرعه البيع"}
                        />
                    </header>
                    <main>
                        <ImageSlider slides={SLIDES} options={OPTIONS} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={"7,457,874 ج.م"}
                                    location={"الجيزة - 6 أكتوبر - طريق الواحات"}
                                    aqar={true}
                                    rooms={"3"}
                                    bath={"4"}
                                    space={"130"}
                                />
                                <UnitDetails data={unitDetails} />
                                <AdsDescription />
                                <Map />

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