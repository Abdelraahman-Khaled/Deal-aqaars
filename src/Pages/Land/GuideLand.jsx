import React, { useState, useEffect } from "react";
import { translations } from "./translations";
// images
import SearchToggle from "../../Components/Ui/SearchComponents/SearchToggle ";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import DropDown from "../../Components/DropDown/DropDown";
import Ads from "../../Components/Auth/Ads/Ads";
import PaginationPage from "../../Components/Pagenation/Pagination";
import Loader from "../../Components/Loader/Loader";
import LandAPI from "../../api/LandApi";
import LandCard from "../../Components/Ui/Building/BuildingCard";

const GuideLand = ({ title }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle1, setToggle1] = useState("nest");
  const [rotate, setRotate] = useState(false);
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagenation, setPagenation] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

  const ShowType = [
    { value: "nest", label: translations[currentLanguage].nest },
    { value: "list", label: translations[currentLanguage].list },
  ];
  const organizing = ["الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"];

  // Fetch building from API
  const fetchProperties = async (page) => {
    try {
      setLoading(true);
      const response = await LandAPI.getLands(page);

      if (response && response.data) {
        setLands(response.data); // only that page’s building
        setPagenation(response.pagination); // use API pagination object
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchProperties(pageNumber);
  };

  // Format price
  const formatPrice = (price) => {
    return price ? price.toLocaleString() : "0";
  };

  useEffect(() => {
      fetchProperties(currentPage);
    }, [currentPage]);

  return (
    <div className=" guide compound d-flex flex-wrap  flex-md-row  justify-content-between">
      <div className="d-flex space-6 flex-column col-12  col-lg-8 ">
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
        <div className="d-flex flex-wrap  flex-row justify-content-between">
          {loading && (
            <div className="loading-container">
              <p>
                {currentLanguage === "ar"
                  ? "جاري تحميل الاراضي..."
                  : "Loading lands..."}
              </p>
              <Loader />
            </div>
          )}
          {!loading && lands.length === 0 && (
            <div className="no-properties">
              <p>
                {currentLanguage === "ar"
                  ? "لا توجد اراضي متاحة"
                  : "No lands available"}
              </p>
            </div>
          )}
          {!loading &&
            lands.length > 0 &&
            lands.map((property, index) => (
              <LandCard
                key={property._id || index}
                id={property._id}
                title={
                  property.title ? property.title[currentLanguage] : "Property"
                }
                latitude={property.location.coordinates[1]}
                longitude={property.location.coordinates[0]}
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
                type={property.division}
                category={property.category}
                phone={property.advertiserPhoneNumber}
                haveWhatsapp={property.hasWhatsapp}
                location={property.location.detailedLocation}
              />
            ))}
        </div>
        {pagenation?.totalPages > 1 && (
          <PaginationPage
            currentPage={currentPage}
            totalPages={pagenation.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Ads */}
      <Ads />
    </div>
  );
};

export default GuideLand;
