import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import SliderDetailsContent from '../../Components/Ui/SliderDetailsContent/SliderDetailsContent'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import DescriptionGuide from '../../Components/Ui/DescriptionGuide/DescriptionGuide'
import Offers from '../../Components/Ui/Offers/Offers'
import BasicImageSlider from '../../Components/Ui/BasicImageSlider/BasicImageSlider'
import AdsDescription from '../../Components/Ui/AdsDescription/AdsDescription'
import Map from '../../Components/Ui/Map/Map'
import RealatedSlider from '../../Components/Ui/RealatedSlider/RealatedSlider'
import FininshCard from '../../Components/Ui/FinishCard/FinishCard'
import TwoAds from '../../Components/Ui/TwoAds/TwoAds'
import ComparisonSlider from '../../Components/ComparisonSlider/ComparisonSlider'
import FinishingAPI from '../../api/finishingApi'
import Loader from '../../Components/Loader/Loader'
import { useFinishing } from '../../contexts/FinishingContext'

const images = [
    {
        id: 1,
        img: "./home.jpg",
        descroption: "اوضه نوم"
    },
    {
        id: 2,
        img: "./home1.jpg",
        descroption: "اوضه معيشة"

    },
    {
        id: 3,
        img: "./hom2.jpg",
        descroption: "المطبخ"
    },
];

const cardData = [
    {
        img: "./home.jpg",
        title: "المدينة للأثاث",
        subtitles: ["مكاتب", "اكسسوارات", " مكتبات", "+15"],
        exprince: "خبرة 15 سنة",
        since: "2007"
    },
    {
        img: "./hom2.jpg",
        title: "أثاث العصري",
        subtitles: ["كراسي", "مكاتب", "دواليب", "+10"],
        exprince: "خبرة 10 سنوات",
        since: "2012"
    },
    {
        img: "./home1.jpg",
        title: "البيت الحديث",
        subtitles: ["غرف نوم", "أنتريهات", "مكتبات", "+20"],
        exprince: "خبرة 20 سنة",
        since: "2000"
    },
    {
        img: "./home1.jpg",
        title: "البيت الحديث",
        subtitles: ["غرف نوم", "أنتريهات", "مكتبات", "+20"],
        exprince: "خبرة 20 سنة",
        since: "2000"
    },
    {
        img: "./home.jpg",
        title: "المدينة للأثاث",
        subtitles: ["مكاتب", "اكسسوارات", " مكتبات", "+15"],
        exprince: "خبرة 15 سنة",
        since: "2007"
    },
];
const oneCard = [
    {
        title: "المدينة للأثاث",
        exprince: "خبرة 15 سنة",
        since: "2007"
    },
];


const FinishDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { currentLanguage } = useLanguage();
    const [finishingData, setFinishingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { finishingServices, loading: finishingServicesLoading, error: finishingServicesError, fetchFinishingServices } = useFinishing();
    const relatedServices = finishingServices.slice(0, 10);

    useEffect(() => {
        fetchFinishingServices();
    }, [fetchFinishingServices]);

    // Get the ID from URL params or from state if passed via Link
    const finishingId = id || (location.state && location.state.id);

    useEffect(() => {
        const fetchFinishingData = async () => {
            if (!finishingId) {
                setError('No finishing ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await FinishingAPI.getFinishingById(finishingId);
                console.log(response.data);

                setFinishingData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching finishing details:', err);
                setError('Failed to load finishing details');
            } finally {
                setLoading(false);
            }
        };

        fetchFinishingData();
    }, [finishingId]);

    // Fallback offers if not available in API data
    const offers = finishingData?.servicesOffered?.map(service => service[currentLanguage]) || ["سباكة", "كهربا", "جبس ديكور", "عزل", "ارضيات", "دهانات", "تكييف", "انارة", "تجهيزات"]

    if (loading) {
        return (
            <>
                <HelmetInfo titlePage={"Loading Finish Details"} />
                <ContainerMedia>
                    <div className='d-flex justify-content-center align-items-center min-vh-100'>
                        <Loader />
                    </div>
                </ContainerMedia>
            </>
        );
    }

    if (error) {
        return (
            <>
                <HelmetInfo titlePage={"Error - Finish Details"} />
                <ContainerMedia>
                    <div className="d-flex flex-column justify-content-center align-items-center min-h-400">
                        <h2 className="text-xl font-bold text-danger mb-4">{error}</h2>
                        <p>Unable to load finishing details. Please try again later.</p>
                    </div>
                </ContainerMedia>
            </>
        );
    }

    // Use data from API or fallback to static data if needed
    const title = finishingData?.companyDescription[currentLanguage];
    const companyLocation = finishingData?.detailedAddress[currentLanguage];

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل افرش بيتك" : "Furnish home details"} />
            <ContainerMedia >

                <div className="py-4">
                    <header >
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={"تشطيبات"}
                            mainRoute={"/finish"}
                            routeTitleTwoBread={true}
                            titleTwoBread={false}
                            textBreadActive={finishingData?.companyDescription[currentLanguage]}

                        />
                    </header>
                    <main>


                        <SliderDetailsContent />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={"مؤسسة البنايات الحديثة"}
                                    location={"القاهره الكبري - التجمع الخامس - شارع التسعين"}
                                    lon={finishingData?.location?.coordinates[0]}
                                    lat={finishingData?.location?.coordinates[1]}
                                />
                                <Offers title={"ايه اللي بيقدمه البيانات الحديثة"} offers={offers} />

                                <div>
                                    <p className="b-9 mb-3">
                                        تشطيبات قبل وبعد
                                    </p>
                                    <ComparisonSlider />
                                </div>

                                <AdsDescription title={finishingData?.companyDescription[currentLanguage]} description={finishingData?.companyDescription[currentLanguage]} />
                                <Map lat={finishingData?.location?.coordinates[1]} lon={finishingData?.location?.coordinates[0]} />



                                <RealatedSlider title={"شركات تاني"}>
                                    {relatedServices.map((item, index) => (
                                        <div key={index} className="slider-card-wrapper w-100">
                                            <FininshCard
                                                id={item._id || index}
                                                img={item.images && item.images.length > 0 ? item.images[0] : item.img || "./home.jpg"}
                                                subtitles={item.servicesOffered ?
                                                    item.servicesOffered.map(service => service.ar || service) :
                                                    item.services || item.subtitles}
                                                exprince={item.companyDescription?.ar || item.experience || item.exprince}
                                                title={item.jobType?.ar || item.name || item.title}
                                                phoneNumber={item.phoneNumber}
                                                hasWhatsapp={item.hasWhatsapp}
                                                detailedAddress={item.detailedAddress?.ar}
                                            />
                                        </div>
                                    ))}
                                </RealatedSlider>

                            </div>
                            <div className="col-12 col-xl-3 d-flex flex-column space-6">
                                {oneCard.map((item, index) => (
                                    <div key={index} className="slider-card-wrapper w-100">
                                        <FininshCard
                                            img={item.img}
                                            subtitles={item.subtitles}
                                            exprince={item.exprince}
                                            since={item.since}
                                            title={item.title}
                                        />
                                    </div>
                                ))}
                                <TwoAds />
                            </div>
                        </div>
                    </main>

                </div>
            </ContainerMedia>
        </>
    )
}

export default FinishDetails