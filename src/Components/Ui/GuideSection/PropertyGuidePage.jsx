import React, { useState, useEffect } from "react";
import SearchToggle from "../SearchComponents/SearchToggle ";
import { translations } from "./translations";
import { useLanguage } from "../../../Components/Languages/LanguageContext";
import DropDown from "../../DropDown/DropDown";
import Ads from "../../Auth/Ads/Ads";
import PropertyAPI from "../../../api/propertyApi";
import RealStateCard from "../RealStateCard/RealStateCard";
import PaginationPage from "../../Pagenation/Pagination";
import CompoundSkeleton from "../CompoundCard/CompoundSkeleton";
import { useSearchParams } from "react-router-dom";
import "./Guide.css";

const PropertyGuidePage = ({ title }) => {
    const { currentLanguage } = useLanguage();
    const [toggle1, setToggle1] = useState("nest");
    const [rotate, setRotate] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagenation, setPagenation] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const ShowType = [
        { value: "nest", label: translations[currentLanguage].nest },
        { value: "list", label: translations[currentLanguage].list },
    ];

    const organizing = ["الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"];

    const [params] = useSearchParams();

    const filters = {
        type: params.get("type") || "",
        division: params.get("division") || "",
        city: params.get("city") || "",
        minPrice: params.get("minPrice") || "",
        maxPrice: params.get("maxPrice") || "",
        bedrooms: params.get("bedrooms") || "",
    };

    const handlePageChange = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
        fetchProperties(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const fetchProperties = async (page = 1) => {
        try {
            setLoading(true);
            const response = await PropertyAPI.getAllProperties(filters);
            if (response && response.data) {
                setProperties(response.data);
                setPagenation(response.pagination);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return price ? price.toLocaleString() : "0";
    };

    useEffect(() => {
        fetchProperties();
    }, [params]);

    console.log("properties", properties);

    return (
        <div className="guide compound d-flex flex-wrap flex-md-row justify-content-between">
            <div className="d-flex space-6 flex-column col-12 col-lg-8">
                <div className="d-flex flex-wrap space-3 justify-content-between align-items-center">
                    <h6>{title}</h6>
                    <div className="d-flex space-3 flex-wrap">
                        {/* Drop Down */}
                        <DropDown
                            title={"رتبها زي ما تحب"}
                            details={organizing}
                            rotate={rotate}
                            setRotate={setRotate}
                        />
                        <div className="max-w-max mb-3 mb-md-0">
                            <SearchToggle
                                toggleState={toggle1}
                                setToggleState={setToggle1}
                                tabs={ShowType}
                                newClass={"select-type p-1"}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap flex-row justify-content-between">
                    {loading && (
                        <div className="loading-container w-100">
                            <div className="d-flex flex-wrap justify-content-between w-100">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <CompoundSkeleton
                                        key={index}
                                        wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && properties.length === 0 && (
                        <div className="no-properties">
                            <p>
                                {currentLanguage === "ar"
                                    ? "لا توجد عقارات متاحة"
                                    : "No properties available"}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        properties.length > 0 &&
                        properties.map((property, index) => (
                            <RealStateCard
                                key={property._id || index}
                                id={property._id}
                                title={
                                    property.title ? property.title[currentLanguage] : "Property"
                                }
                                lon={property.location.coordinates.coordinates[0]}
                                lat={property.location.coordinates.coordinates[1]}
                                details={
                                    property.description
                                        ? property.description[currentLanguage]
                                        : ""
                                }
                                price={formatPrice(property.details?.price)}
                                img={
                                    property.images?.length > 0 ? property.images : "/aqar01.jpg"
                                }
                                company={true}
                                connections={true}
                                wrapperClass={toggle1 === "nest" ? "flex-wrap" : "width-full"}
                                rooms={property.details?.rooms || 0}
                                bath={property.details?.bathrooms || 0}
                                space={property.details?.space || 0}
                                offer={formatPrice(property.details?.price)}
                                division={property.division}
                                category={property.category}
                                phone={property.advertiserPhoneNumber}
                                haveWhatsapp={property.haveWhatsapp}
                                location={property.location.detailedLocation}
                                isFav={property.isFavorite}
                            />
                        ))}
                </div>

                {pagenation?.totalPages > 1 && (
                    <PaginationPage
                        itemCount={pagenation.totalPages}
                        onPageChange={handlePageChange}
                        forcePage={currentPage - 1}
                    />
                )}
            </div>

            {/* Ads */}
            <Ads />
        </div>
    );
};

export default PropertyGuidePage;
