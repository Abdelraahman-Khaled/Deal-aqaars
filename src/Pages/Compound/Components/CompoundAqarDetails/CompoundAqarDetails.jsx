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
import { useParams } from 'react-router-dom';
import { useCompound } from '../../../../contexts/CompoundContext';
import PropertyShowcaseExample from '../../../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';

const CompoundAqarDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [isRealEstate, setIsRealEstate] = useState(false); // State to track if realEstate mode is active
    const { id } = useParams()
    const { compound, loading, error, fetchCompound, clearCompound } = useCompound();

    useEffect(() => {
        if (id) {
            fetchCompound(id);
        }
        return () => clearCompound(); // cleanup on unmount
    }, [id, fetchCompound, clearCompound]);
    console.log(compound);

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
            space: compound?.units[0].aqarDetails.space,
            floor: compound?.units[0].aqarDetails.floor,
            front: compound?.units[0].aqarDetails.view,
            numOfAds: "",
            paymentWay: compound?.units.map(unit => unit.aqarDetails.paymentType),
            numRooms: compound?.units[0].aqarDetails.rooms,
            finishingType: compound?.units[0].aqarDetails.finishingType,
            yearDelivary: compound?.units[0].aqarDetails.handingYear,
            meterPrice: compound?.units[0].aqarDetails.price,
            AdsType: compound?.units[0].aqarDetails.ownerType,
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
                            mainTitle={compound?.title[currentLanguage]}
                            mainRoute={"/realestate"}
                            routeTitleTwoBread={false}
                            titleTwoBread={compound?.announcementLocation}
                            textBreadActive={"شاليهات 102 متر² للبيع"}
                        />
                    </header>

                    <main>
                        <PropertyShowcaseExample images={compounds?.compoundImages?.length > 0 ? compounds?.compoundImages.map((item) => item.url) : []} lat={compound?.detailedLocation.coordinates[0]} lon={compound?.detailedLocation.coordinates[1]} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-6">
                                <DescriptionGuide
                                    title={compound?.units[0].aqarDetails.price + " " + "ج.م"}
                                    lat={compound?.detailedLocation.coordinates[0]}
                                    lon={compound?.detailedLocation.coordinates[1]}
                                    aqar={true}
                                    rooms={compound?.units[0].aqarDetails.rooms}
                                    bath={compound?.units[0].aqarDetails.bathrooms}
                                    space={compound?.units[0].aqarDetails.space}
                                    description={compound?.units[0].unitDetails.announcementTitle[currentLanguage]}
                                />
                                <UnitDetails data={unitDetails} />
                                <AdsDescription />
                                <Map
                                    lon={compound?.detailedLocation.coordinates[0]}
                                    lat={compound?.detailedLocation.coordinates[1]}
                                    locationName={compound?.title[currentLanguage]}
                                />
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