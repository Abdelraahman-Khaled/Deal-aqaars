import React, { useState, useEffect } from 'react';
import FininshCard from './FinishCard';
import './FinishCard.css'; // Make sure to import your CSS file
import PaginationPage from '../../Pagenation/Pagination';
import Loader from '../../Loader/Loader';
import ErrorNotFoundSvg from '../../../assets/images/error-not-found.svg';
import { useFinishing } from '../../../contexts/FinishingContext';
import { useLanguage } from '../../Languages/LanguageContext';

const FinishCardContainer = () => {
    const { finishingServices, loading, error, fetchFinishingServices } = useFinishing();

    useEffect(() => {
        fetchFinishingServices();
    }, [fetchFinishingServices]);
    const { currentLanguage } = useLanguage()
    // Use the API data directly without fallback to static data
    const cardData = finishingServices;

    // pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 15; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(cardData?.length / perPage) || 0;
    const offset = currentPage * perPage;
    const currentPageData = cardData?.slice(offset, offset + perPage) || [];


    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
    };
    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <Loader />
                </div>
            ) : error ? (
                <div className="w-100 text-center py-5">
                    <img
                        src={ErrorNotFoundSvg}
                        alt="Error"
                        style={{ width: '150px', marginBottom: '20px' }}
                    />
                    <h4 className="text-danger mb-2">حدث خطأ ما</h4>
                    <p className="text-muted">يرجى المحاولة مرة أخرى لاحقاً</p>
                    <p className="text-danger small">{error}</p>
                </div>
            ) : currentPageData.length === 0 ? (
                <div className="w-100 text-center py-5" >
                    <img
                        src={ErrorNotFoundSvg}
                        alt="Not Found"
                        style={{ width: '150px', marginBottom: '20px' }}
                    />
                    <p>لا توجد خدمات تشطيب متاحة حالياً</p>
                </div>
            ) : (
                <>
                    <div className='card-container pt-4'>
                        {currentPageData.map((item, index) => (
                            <div key={index} className='card-item'>
                                <FininshCard
                                    id={item._id || index} // Use item.id if available, otherwise use index as fallback
                                    img={item.images && item.images.length > 0 ? item.images[0] : item.img || "./home.jpg"}
                                    subtitles={item.servicesOffered ?
                                        item.servicesOffered.map(service => service.ar || service) :
                                        item.services || item.subtitles}
                                    exprince={item.companyDescription[currentLanguage]}
                                    since={"0"}
                                    title={item.jobType[currentLanguage]}
                                    phoneNumber={item.phoneNumber}
                                    hasWhatsapp={item.hasWhatsapp}
                                    detailedAddress={item.detailedAddress[currentLanguage]}
                                />
                            </div>
                        ))}
                    </div>
                    {!loading && !error && currentPageData.length > 0 && pageCount > 1 && <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />}
                </>
            )}
        </>
    );
};

export default FinishCardContainer;
