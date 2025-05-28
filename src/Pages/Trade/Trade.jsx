import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import SearchIcon from '../../assets/Icons/SearchIcon';
import AddIcon from '../../assets/Icons/AddIcon';
import TradeCard from './TradeCard';
import PaginationPage from '../../Components/Pagenation/Pagination';
import { Link } from 'react-router-dom';


const tradeData = [
    {
        id: 1,
        title: "شقة 120م فى المهندسين",
        location: "القاهرة - المهندسين - قريب من محطة الأتوبيس",
        rooms: "3",
        bath: "2",
        space: "120",
        trade: "سيارة نيسان قشقاي موديل 2022",
        since: "قبل يوم"
    },
    {
        id: 2,
        title: "فيلا فاخرة 300م فى الشيخ زايد",
        location: "الجيزة - الشيخ زايد - كمبوند الندى",
        rooms: "5",
        bath: "4",
        space: "300",
        trade: "مرسيدس GLC 2020",
        since: "قبل يومين"
    },
    {
        id: 3,
        title: "دور كامل 180م فى الزقازيق",
        location: "الشرقية - الزقازيق - حي الزهور",
        rooms: "4",
        bath: "2",
        space: "180",
        trade: "هوندا سيفيك 2018",
        since: "قبل أسبوع"
    },
    {
        id: 4,
        title: "مكتب إداري 100م فى مدينة نصر",
        location: "القاهرة - مدينة نصر - شارع الطيران",
        rooms: "2",
        bath: "1",
        space: "100",
        trade: "تويوتا كورولا 2021",
        since: "منذ شهر"
    },
    {
        id: 5,
        title: "شقة فاخرة 150م فى المعادي",
        location: "القاهرة - المعادي - زهراء المعادي",
        rooms: "3",
        bath: "2",
        space: "150",
        trade: "كيا سبورتاج 2023",
        since: "قبل يوم"
    },
    {
        id: 6,
        title: "شقة 90م فى الهرم",
        location: "الجيزة - الهرم - شارع فيصل",
        rooms: "2",
        bath: "1",
        space: "90",
        trade: "شيفروليه أوبترا 2020",
        since: "قبل يومين"
    },
    {
        id: 7,
        title: "دور أرضي 110م فى بنها",
        location: "القليوبية - بنها - حي الزهور",
        rooms: "3",
        bath: "2",
        space: "110",
        trade: "رينو لوجان 2019",
        since: "منذ شهر"
    },
    {
        id: 8,
        title: "شقة 100م فى طنطا",
        location: "الغربية - طنطا - شارع الجيش",
        rooms: "2",
        bath: "1",
        space: "100",
        trade: "بيجو 508 2017",
        since: "قبل أسبوع"
    },
    {
        id: 9,
        title: "شقة 80م فى شبرا",
        location: "القاهرة - شبرا - بالقرب من المترو",
        rooms: "2",
        bath: "1",
        space: "80",
        trade: "فيات تيبو 2022",
        since: "قبل يوم"
    },
    {
        id: 10,
        title: "فيلا 350م فى التجمع",
        location: "القاهرة - التجمع الخامس - كمبوند قطامية هايتس",
        rooms: "6",
        bath: "5",
        space: "350",
        trade: "BMW X5 موديل 2019",
        since: "قبل يومين"
    },
    {
        id: 11,
        title: "شقة 115م فى العصافرة",
        location: "الإسكندرية - العصافرة - شارع جمال عبد الناصر",
        rooms: "3",
        bath: "2",
        space: "115",
        trade: "سيات ليون 2020",
        since: "قبل أسبوع"
    },
    {
        id: 12,
        title: "مكتب 120م فى سموحة",
        location: "الإسكندرية - سموحة - ميدان فيكتوريا",
        rooms: "3",
        bath: "1",
        space: "120",
        trade: "تويوتا ياريس 2021",
        since: "منذ شهر"
    },
    {
        id: 13,
        title: "شقة 140م فى الدقي",
        location: "الجيزة - الدقي - شارع التحرير",
        rooms: "3",
        bath: "2",
        space: "140",
        trade: "فورد فوكس 2018",
        since: "قبل يوم"
    },
    {
        id: 14,
        title: "شقة دوبلكس 200م فى التجمع",
        location: "القاهرة - التجمع الأول - خلف الجامعة الألمانية",
        rooms: "5",
        bath: "3",
        space: "200",
        trade: "هيونداي توسان 2020",
        since: "قبل يومين"
    },
    {
        id: 15,
        title: "شقة 90م فى المرج",
        location: "القاهرة - المرج - شارع السوق",
        rooms: "2",
        bath: "1",
        space: "90",
        trade: "BYD F3 موديل 2021",
        since: "قبل أسبوع"
    },
    {
        id: 16,
        title: "فيلا 280م فى 6 أكتوبر",
        location: "الجيزة - 6 أكتوبر - الحي الرابع",
        rooms: "5",
        bath: "3",
        space: "280",
        trade: "جيب شيروكي 2019",
        since: "منذ شهر"
    },
    {
        id: 17,
        title: "شقة 130م فى فيصل",
        location: "الجيزة - فيصل - محطة حسن محمد",
        rooms: "3",
        bath: "2",
        space: "130",
        trade: "نيسان سنترا 2020",
        since: "قبل يوم"
    },
    {
        id: 18,
        title: "شقة 150م فى المنصورة",
        location: "الدقهلية - المنصورة - توريل الجديدة",
        rooms: "4",
        bath: "2",
        space: "150",
        trade: "كيا سيراتو 2019",
        since: "قبل يومين"
    },
    {
        id: 19,
        title: "شقة 125م فى حلوان",
        location: "القاهرة - حلوان - شارع رايل",
        rooms: "3",
        bath: "2",
        space: "125",
        trade: "ميتسوبيشي لانسر 2016",
        since: "قبل أسبوع"
    },
    {
        id: 20,
        title: "مكتب 90م فى العباسية",
        location: "القاهرة - العباسية - شارع السرجاني",
        rooms: "2",
        bath: "1",
        space: "90",
        trade: "هوندا أكورد 2022",
        since: "منذ شهر"
    },
];

const Trade = () => {
    const { currentLanguage } = useLanguage();

    const initialValues = {
        search: "",
    };
    const handleSubmit = (values) => {
        console.log("Join Us form values:", values);
    };

    // pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 12; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(tradeData.length / perPage);
    let offset = currentPage * perPage;
    const currentPageData = tradeData.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };


    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تبديل" : "Trade"} />
            <ContainerMedia >
                <div className='py-4'>
                    <div className='d-flex flex-row flex-wrap align-items-center justify-content-between space-3 py-3 pb-5'>
                        <div className='position-relative max-w-max' style={{ width: "100%" }}>
                            <FormField
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                id="edit-profile-form"
                            >
                                <InputFiled
                                    name="search"
                                    type="text"
                                    placeholder={"دور على اللى محتاجه"}
                                    success
                                    style={{ paddingRight: "40px", width: "max-content" }} // Ensure enough space for the icon
                                />
                                <span
                                    className="position-absolute"
                                    style={{
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        zIndex: 2,
                                    }}
                                >
                                    <SearchIcon />
                                </span>
                            </FormField>
                        </div>
                        <Link to={"/join"} className="btn-main min-w-max">
                            <AddIcon />
                            نزّل إعلانك للبدل
                        </Link>
                    </div>

                    <div className='d-flex flex-row flex-wrap  space-6'>
                        <div className='card-container '>
                            {
                                currentPageData.map((card, index) => (
                                    <div key={index} className='card-item'>
                                        <TradeCard
                                            key={index}
                                            title={card.title}
                                            rooms={card.rooms}
                                            bath={card.bath}
                                            space={card.space}
                                            location={card.location}
                                            trade={card.trade}
                                            since={card.since}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {currentPageData.length > 0 && pageCount > 1 && (
                        <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
                    )}
                </div>
            </ContainerMedia >

        </>
    )
}

export default Trade