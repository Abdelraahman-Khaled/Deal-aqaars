import React, { useState } from 'react'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import { useLanguage } from '../../Components/Languages/LanguageContext'
import RealStateCard from '../../Components/Ui/RealStateCard/RealStateCard'

import compoundImg from "../../assets/images/compounds/compound.png";
import compoundImg1 from "../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../assets/images/compounds/compound2.png";
import PaginationPage from '../../Components/Pagenation/Pagination'

const data = [
    {
        id: 1,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg,
    },
    {
        id: 2,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg1,
    },
    {
        id: 3,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 4,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 5,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 6,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 7,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 1,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg,
    },
    {
        id: 2,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg1,
    },
    {
        id: 3,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 4,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 5,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 6,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 7,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 1,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg,
    },
    {
        id: 2,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg1,
    },
    {
        id: 3,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 4,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 5,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 6,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 7,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 1,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg,
    },
    {
        id: 2,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg1,
    },
    {
        id: 3,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 4,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 5,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 6,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 7,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 1,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg,
    },
    {
        id: 2,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg1,
    },
    {
        id: 3,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 4,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 5,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 6,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },
    {
        id: 7,
        title: "IL Monte Galala - إل مونت جلاله",
        location: "العين السخنة - البحر الأحمر",
        details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
        price: "7,457,874",
        img: compoundImg2,
    },

];

const SalePage = () => {

    const { currentLanguage } = useLanguage(); // Get the current language

    // pagination with your data structure
    const [paginationData, setPaginationData] = useState({
        totalProperties: data?.length || 0,
        totalPages: Math.ceil((data?.length || 0) / 15),
        currentPage: 1,
        limit: 15
    });

    // Calculate current page data
    const offset = (paginationData.currentPage - 1) * paginationData.limit;
    const currentPageData = data?.slice(offset, offset + paginationData.limit);

    const handlePageChange = ({ selected, page, pagination }) => {
        setPaginationData(prev => ({
            ...prev,
            currentPage: page
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
        
        // Here you would typically make an API call with the new page
        // Example: fetchProperties(page, pagination.limit)
        console.log('Page changed to:', page, 'Pagination:', pagination);
    };

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "بيع" : "sell"} />

            <ContainerMedia >
                <div className='py-4 d-flex space-8 flex-column'>

                    <div className='pb-2'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={"بيع"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={"عقارات تطوير مصر للتطوير العقاري"}
                        />
                        <p className="b-1 pt-3">
                            عقارات تطوير مصر للتطوير العقاري
                        </p>
                    </div>

                    <div className='row g-4 pt-2 '>
                        {[...currentPageData]?.map((card, index) => (
                            <div key={index} className='related-slider col-12 col-sm-6 col-lg-4  mt-0'>
                                <RealStateCard
                                    key={index}
                                    title={card.title}
                                    location={card.location}
                                    details={card.details}
                                    price={card.price}
                                    img={card.img}
                                    company={true}
                                    connections={true}
                                    rooms={3}
                                    bath={2}
                                    space={130}
                                    offer={"4500,00"}
                                    wrapperClass={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {paginationData.totalPages > 1 && <PaginationPage pagination={paginationData} onPageChange={handlePageChange} />}
            </ContainerMedia>

        </>
    )
}

export default SalePage