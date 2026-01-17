import React, { useEffect, useState } from 'react'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import SearchToggle from '../../Components/Ui/SearchComponents/SearchToggle ';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import RealStateCard from '../../Components/Ui/RealStateCard/RealStateCard';
// images
import compoundImg from "../../assets/images/compounds/compound.png";
import compoundImg1 from "../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../assets/images/compounds/compound2.png";
import PaginationPage from '../../Components/Pagenation/Pagination';
import FininshCard from '../../Components/Ui/FinishCard/FinishCard';
import Slidercontainer from '../../Components/Slider/Slidercontainer';
import noDataImage from "../../assets/images/NotFound/not-found.png";
import FavoriteAPI from '../../api/favoriteApi';
import { current } from '@reduxjs/toolkit';
import Loader from '../../Components/Loader/Loader';

const realEstateCards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: "IL Monte Galala - إل مونت جلاله",
    location: "العين السخنة - البحر الأحمر",
    details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
    price: "7,457,874",
    offer: i % 2 === 0 ? "خصم 10%" : "عرض خاص", // Alternate offers
    img: [compoundImg, compoundImg1, compoundImg2][i % 3], // Cycle through 3 images
}));

const finishCards = [
    {
        img: "./home.jpg",
        title: "المدينة للأثاث",
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
        subtitles: ["مكاتب", "أنتريهات", " مكتبات", "+15"],
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
];

const Favorite = () => {
    const { currentLanguage } = useLanguage();
    const [toggle, setToggle] = useState("property");
    const [favData, setFavData] = useState([])
    const [loading, setLoading] = useState(false)
    const tabs = [
        { value: "property", label: "عقارات" },
        { value: "compound", label: "كمبوندات" },
        { value: "finish", label: "تشطيبات" },
        { value: "swap", label: "تبديل" },
    ];


    // pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 12; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(
        (toggle === "property" ? favData.length : favData.length) / perPage
    );
    let offset = currentPage * perPage;
    const currentPageData = toggle === "property"
        ? favData.slice(offset, offset + perPage)
        : favData.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [toggle]);

    // Get favorite items when component mounts
    useEffect(() => {
        const getFavorites = async () => {
            setLoading(true)
            try {
                const response = await FavoriteAPI.getFavorites()
                setFavData(response.items)
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false)
            }
        };

        getFavorites();
    }, [currentLanguage]);
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Loader />
            </div>)
    }
    return (
        <>

            <HelmetInfo titlePage={currentLanguage === "ar" ? "المفضلة" : "Favorite"} />
            <ContainerMedia >
                <div className='advanced-search py-4 d-flex space-8 flex-column p-0'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className="b-1">
                            {currentLanguage === "ar" ? "المفضلة بتاعتي" : "Favorite"}
                        </p>
                        <div className=" d-flex flex-column space-3" style={{ minWidth: "max-content" }}>
                            <div className="select-type tabs-home justify-content-center">
                                <SearchToggle
                                    toggleState={toggle}
                                    setToggleState={setToggle}
                                    tabs={tabs}
                                />
                            </div>
                        </div>
                    </div>

                    {/* if no Data */}
                    {
                        currentPageData.length <= 0 &&
                        <div div className='w-100 text-center py-5 d-flex flex-column align-items-center space-4 '>
                            <img
                                src={noDataImage}
                                alt="No Data"
                                width="570px"
                                height="180px"
                                style={{ marginBottom: "1rem" }}
                            />
                            <h6>لا يوجد عناصر مفضلة حاليا</h6>
                            <p className="b-15">حط العقارات اللي عجبتك في المفضلة عشان تلاقيها بسرعة بعدين. 🏡✨</p>
                        </div>
                    }


                    {/* Data */}
                    {/* cards */}
                    <div className='d-flex flex-row flex-wrap  space-6'>
                        {
                            currentPageData.length > 0 ? (
                                toggle === "property" ? (
                                    currentPageData.map((card, index) => {
                                        card = card.target; // <-- assign here safely
                                        return (
                                            <div key={index} className="card-item">
                                                <RealStateCard
                                                    id={card._id}
                                                    key={index}
                                                    title={card.title[currentLanguage]}
                                                    type={card.details.propertyType}
                                                    category={card.details.paymentMethods}
                                                    lat={card.location.coordinates[0]}
                                                    lon={card.location.coordinates[1]}
                                                    // location={card.location}
                                                    details={card.description[currentLanguage]}
                                                    price={card.details.price}
                                                    img={card.images}
                                                    company={true}
                                                    connections={true}
                                                    rooms={card.details.rooms}
                                                    bath={card.details.bathrooms}
                                                    space={card.details.space}
                                                    advertiser={card.advertiser}
                                                    offer={card.offer}
                                                    wrapperClass={"flex-wrap "}
                                                    isFav={true}
                                                />
                                            </div>
                                        );
                                    })
                                )
                                    : (
                                        currentPageData.map((item, index) => (
                                            <div key={index} className='card-item'>
                                                <FininshCard
                                                    img={item.img}
                                                    subtitles={item.subtitles}
                                                    exprince={item.exprince}
                                                    since={item.since}
                                                    title={item.title}
                                                    isFav={true}
                                                />
                                            </div>
                                        )))) : (
                                <></>
                            )
                        }
                    </div>
                </div>

                {/* Pagination */}
                {currentPageData.length > 0 && pageCount > 1 && (
                    <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
                )}



                <p className="b-9 m-2">
                    {toggle === "property" ? "عقارات تانيه ممكن تعجبك" : "تشطيبات تانيه ممكن تعجبك"}
                </p>
                {currentPageData.length > 0 &&
                    <Slidercontainer>
                        {
                            toggle === "property" ? (
                                currentPageData.map((card, index) => {
                                    card = card.target; // <-- assign here safely
                                    return (
                                        <RealStateCard
                                            id={card._id}
                                            key={index}
                                            title={card.title[currentLanguage]}
                                            type={card.details.propertyType}
                                            category={card.details.paymentMethods}
                                            lat={card.location.coordinates[0]}
                                            lon={card.location.coordinates[1]}
                                            // location={card.location}
                                            details={card.description[currentLanguage]}
                                            price={card.details.price}
                                            img={card.images}
                                            company={true}
                                            connections={true}
                                            rooms={card.details.rooms}
                                            bath={card.details.bathrooms}
                                            space={card.details.space}
                                            advertiser={card.advertiser}
                                            offer={card.offer}
                                            wrapperClass={"flex-wrap "}
                                            isFav={true}
                                        />
                                    );
                                })
                            ) : (

                                finishCards.map((item, index) => (
                                    <div key={index}>
                                        <FininshCard
                                            img={item.img}
                                            subtitles={item.subtitles}
                                            exprince={item.exprince}
                                            since={item.since}
                                            title={item.title}
                                        />
                                    </div>
                                )))}
                    </Slidercontainer>
                }

            </ContainerMedia >
        </>

    )
}

export default Favorite