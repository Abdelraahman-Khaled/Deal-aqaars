import React, { useState } from 'react';
import FininshCard from './FinishCard';
import './FinishCard.css'; // Make sure to import your CSS file
import PaginationPage from '../../Pagenation/Pagination';

const FinishCardContainer = () => {
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

    // pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 15; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(cardData?.length / perPage);
    const offset = currentPage * perPage;
    const currentPageData = cardData?.slice(offset, offset + perPage);


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };
    return (
        <>
            <div className='card-container pt-4'>
                {currentPageData.map((item, index) => (
                    <div key={index} className='card-item'>
                        <FininshCard
                            img={item.img}
                            subtitles={item.subtitles}
                            exprince={item.exprince}
                            since={item.since}
                            title={item.title}
                        />
                    </div>
                ))}
            </div>
            {pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}
        </>
    );
};

export default FinishCardContainer;
