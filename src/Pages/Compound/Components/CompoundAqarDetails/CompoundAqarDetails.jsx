import React, { useEffect, useState } from 'react'
import HelmetInfo from '../../../../Components/Helmetinfo/HelmetInfo'
import BreadcrumbsPage from '../../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import ImageSlider from '../../../../Components/Ui/ImageSlider/ImageSlider';
import ContainerMedia from '../../../../Components/ContainerMedia/ContainerMedia';
import AdsDescription from '../../../../Components/Ui/AdsDescription/AdsDescription';
import Map from '../../../../Components/Ui/Map/Map';
import CompanyCard from '../../../../Components/Ui/CompanyCard/CompanyCard';
import DescriptionGuide from '../../../../Components/Ui/DescriptionGuide/DescriptionGuide';
import UnitDetails from '../../../../Components/Ui/UnitDetails/UnitDetails';
import RealEstateAds from '../../../../Components/Ui/RealEstateAds/RealEstateAds';
import CompanyToSee from '../../../../Components/Ui/CompanyToSee/CompanyToSee';
import SpaceBox from '../../../../Components/Ui/SpaceBox/SpaceBox';

const CompoundAqarDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [isRealEstate, setIsRealEstate] = useState(false); // State to track if realEstate mode is active

    // Listen for window resize events
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsRealEstate(true);
            } else {
                setIsRealEstate(false);
            }
        };

        // Initialize the state on mount
        handleResize();

        // Set up event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const OPTIONS = {}
    const SLIDES = [
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
    ];

    const unitDetails = [
        {
            space: "102 متر²", floor: "الاول", front: "شارع رئيسي", numOfAds: "EG-5696885", paymentWay: "كاش أو تقسيط",
            numRooms: "2", finishingType: "اكسترا سوبر لوكس", yearDelivary: "2028", meterPrice: "147,480 ج.م/متر²", AdsType: "المطور"
        }
    ]

    const compounds = [
        {
            companies: ["عقارات مصر", "مشاريع جديدة", "كمباوندات العين السخنة"],
        },

    ];

    const compoundDetails = [
        {
            title: "توين هاوس",
            spaces: [120, 130, 150],
            prices: ["850,000", "900,000", "1,200,000"]
        },
        {
            title: "فلل",
            spaces: [450, 420, 550],
            prices: ["56,685,154", "36,685,154", "46,685,154"]
        },
        {
            title: "شقة فاخرة",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "فيلا خاصة ",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "بنتهاوس أنيق",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "مكتب تجاري",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "محل تجاري",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
        {
            title: "قطعة أرض سكنية",
            spaces: [600, 700, 800],
            prices: ["2,000,000", "2,200,000", "2,500,000"]
        },
    ];
    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "دليل وحدة الكومباوند" : "Compound Unit Guide"} />
            <div className="py-4">
                <ContainerMedia >

                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={"دليل الكومباوندات"}
                            routeTitleTwoBread={false}
                            titleTwoBread={"IL Monte Galala - إل مونت جلاله"}
                            textBreadActive={"شاليهات 102 متر² للبيع"}
                        />
                    </header>

                    <main>
                        <ImageSlider slides={SLIDES} options={OPTIONS} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-6">
                                <DescriptionGuide
                                    title={" 7,457,874 ج.م"}
                                    location={"الجيزة - 6 أكتوبر - طريق الواحات"}
                                    description={"شاليهات 102 متر² للبيع فى IL Monte Galala - إل مونت جلاله-العين السخنة - البحر الأحمر"}
                                />
                                <UnitDetails data={unitDetails} />
                                <AdsDescription />
                                <Map />
                                <p className="b-5">وحدات تانيه جوا الكومباوند</p>
                                <div className='d-flex flex-wrap space-1 justify-content-between'>
                                    <SpaceBox data={compoundDetails} realEstate={isRealEstate} />
                                </div>
                                <CompanyToSee data={compounds} />
                            </div>
                            <div className="col-12 col-xl-3 d-flex flex-column space-6">
                                <CompanyCard
                                    name={"تطوير مصر للتطوير العقاري"}
                                    since={"2014"}
                                    numberProjects={"8"}
                                    inhouse={"2"}
                                    notFinished={"1"}
                                    underDevelopment={"2"}
                                />
                                <RealEstateAds />
                            </div>
                        </div>
                    </main>
                </ContainerMedia>
            </div>
        </>)
}

export default CompoundAqarDetails