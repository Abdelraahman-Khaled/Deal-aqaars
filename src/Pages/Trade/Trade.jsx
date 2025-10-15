import React, { useState, useEffect } from 'react'
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
import SwapAPI from '../../api/swapApi';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader/Loader';
import ErrorNotFoundSvg from '../../assets/images/error-not-found.svg';





const Trade = () => {
    const { currentLanguage } = useLanguage();
    const [trades, setTrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to force error state for testing
    const forceErrorState = () => {
        const errorMessage = currentLanguage === "ar" ?
            "فشل تحميل إعلانات البدل. يرجى المحاولة مرة أخرى لاحقاً." :
            "Failed to load trades. Please try again later.";
        setTrades([]);
        setError(errorMessage);
        setIsLoading(false);
    };

    // Fetch all trades on component mount
    useEffect(() => {
        const fetchTrades = async () => {
            try {
                setIsLoading(true);
                setError(null); // Reset error state before fetching

                // Uncomment the line below to test error state
                // return forceErrorState();

                const response = await SwapAPI.getAllSwaps();
                // Check if response contains the swaps array
                if (response && response.swaps && Array.isArray(response.swaps)) {
                    setTrades(response.swaps);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching trades:", error);
                const errorMessage = currentLanguage === "ar" ?
                    "فشل تحميل إعلانات البدل. يرجى المحاولة مرة أخرى لاحقاً." :
                    "Failed to load trades. Please try again later.";
                setTrades([]); // Clear trades on error
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrades();
    }, [currentLanguage]); // Add currentLanguage as dependency

    const initialValues = {
        search: "",
    };
    const handleSubmit = (values) => {
        console.log("Search form values:", values);
        // Implement search functionality here
    };

    // pagenation
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 12; // NUMBER OF PAGE ITEMS
    const pageCount = Math.ceil(trades.length / perPage);
    let offset = currentPage * perPage;
    const currentPageData = trades.slice(offset, offset + perPage);

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
                                    placeholder={currentLanguage === "ar" ? "دور على اللى محتاجه" : "Search for what you need"}
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
                        <Link to={"/join-trade"} className="btn-main min-w-max">
                            <AddIcon />
                            {currentLanguage === "ar" ? "نزّل إعلانك للبدل" : "Post Your Trade Ad"}
                        </Link>
                    </div>

                    <div className='d-flex flex-row flex-wrap space-6'>
                        {isLoading ? (
                            <div className="w-100 text-center py-5">
                                <Loader size="large" color="primary" />
                                <p className="mt-3">{currentLanguage === "ar" ? "جاري تحميل البيانات..." : "Loading data..."}</p>
                            </div>
                        ) : error ? (
                            // Error state display
                            <div className="w-100 text-center py-5">
                                <img
                                    src={ErrorNotFoundSvg}
                                    alt="Error"
                                    style={{ width: '150px', marginBottom: '20px' }}
                                />
                                <h4 className="text-danger mb-2">{currentLanguage === "ar" ? "حدث خطأ ما" : "Something Went Wrong"}</h4>
                                <p className="text-muted">{currentLanguage === "ar" ? "يرجى المحاولة مرة أخرى لاحقاً" : "Please try again later"}</p>
                                <p className="text-danger small">{error}</p>
                            </div>
                        ) : currentPageData.length === 0 ? (
                            // Empty state display
                            <div className="w-100 text-center py-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                <img
                                    src={ErrorNotFoundSvg}
                                    alt="Not Found"
                                    style={{ width: '150px', marginBottom: '20px' }}
                                />
                                <p>{currentLanguage === "ar" ? "لا توجد إعلانات للبدل حالياً" : "No trade ads available at the moment"}</p>
                            </div>
                        ) : (
                            <div className='card-container '>
                                {currentPageData?.map((card, index) => {
                                    return (
                                        <div key={card._id || card.id || index} className='card-item'>
                                            <TradeCard
                                                key={card._id || card.id || index}
                                                title={card.whatIHave?.propertyType}
                                                rooms={card.rooms}
                                                bath={card.bath}
                                                space={card.space}
                                                lat={card.location?.coordinates[0]}
                                                lon={card.location?.coordinates[1]}
                                                trade={card.whatIWant?.propertyType}
                                                since={card.createdAt}
                                                phoneNumber={currentPageData && card.contact ? card.contact.phoneNumber : null}
                                                hasWhatsapp={currentPageData && card.contact ? card.contact.hasWhatsapp : undefined}
                                                imageUrl={currentPageData && card.images && card.images.length > 0 ? card.images[0].url.trim() : null}
                                            />
                                        </div>
                                    );
                                })
                                }
                            </div>
                        )}
                    </div>
                    {!isLoading && !error && currentPageData.length > 0 && pageCount > 1 && (
                        <PaginationPage itemCount={pageCount} onPageChange={handlePageChange} />
                    )}
                </div>
            </ContainerMedia >

        </>
    )
}

export default Trade