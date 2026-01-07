import React, { useState, useEffect } from "react";
import SearchToggle from "../SearchComponents/SearchToggle ";
import { translations } from "./translations";
import { useLanguage } from "../../../Components/Languages/LanguageContext";
import DropDown from "../../DropDown/DropDown";
import CompoundCard from "../CompoundCard/CompoundCard";
import Ads from "../../Auth/Ads/Ads";
import PropertyAPI from "../../../api/propertyApi";
import "./Guide.css";
// images
import RealStateCard from "../RealStateCard/RealStateCard";
import CompoundAPI from "../../../api/compoundApi";
import PaginationPage from "../../Pagenation/Pagination";
import Loader from "../../Loader/Loader";
import CompoundSkeleton from "../CompoundCard/CompoundSkeleton";
import { useSearchParams } from "react-router-dom";

const GuidePage = ({ title, compound = true }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle, setToggle] = useState("all");
  const [toggle1, setToggle1] = useState("nest");
  const [rotate, setRotate] = useState(false);
  const [properties, setProperties] = useState([]);
  const [compounds, setCompounds] = useState([]);
  const [loading, setLoading] = useState(false);
  // pagenation
  const [pagenation, setPagenation] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1; // react-paginate is 0-based
    setCurrentPage(newPage);
    fetchProperties(newPage); // fetch new page from API
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const progressTabs = [
    { value: "inprogress", label: translations[currentLanguage].inProgress },
    { value: "ready", label: translations[currentLanguage].ready },
    { value: "all", label: translations[currentLanguage].received },
  ];
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
    bedrooms: params.get("bedrooms") || ""
  };

  useEffect(() => {
    fetchProperties()
  }, [params]);


  // Fetch properties from API
  const fetchProperties = async (page = 1) => {
    try {
      setLoading(true);
      const response = await PropertyAPI.getAllProperties(filters); // pass page
      if (response && response.data) {
        setProperties(response.data); // only that page’s properties
        setPagenation(response.pagination); // use API pagination object
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompounds = async () => {
    try {
      setLoading(true);
      const filters = {};

      // Add status filter based on toggle state
      if (toggle !== "all") {
        filters.status = toggle;
      }

      const response = await CompoundAPI.getAllCompounds(filters);
      if (response && response.data) {
        setCompounds(response.data);
      }
    } catch (error) {
      console.error("Error fetching compounds:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return price ? price.toLocaleString() : "0";
  };

  useEffect(() => {
    if (!compound) {
      fetchProperties();
    } else {
      fetchCompounds();
    }
  }, [compound, toggle]);

  console.log("properties", properties);
  console.log("compounds", compounds);
  console.log("compound prop", compound);
  console.log("toggle state", toggle);

  return (
    <div className=" guide compound d-flex flex-wrap  flex-md-row  justify-content-between">
      <div className="d-flex space-6 flex-column col-12  col-lg-8 ">
        {compound && (
          <h6>
            {title + " " + compounds.length + " " + "مشروع بأسعار كل الوحدات"}
          </h6>
        )}
        <div className="d-flex flex-wrap space-3 justify-content-between align-items-center">
          {!compound && <h6>{title}</h6>}
          {compound && (
            <div className="max-w-max mb-3 mb-md-0">
              <SearchToggle
                toggleState={toggle}
                setToggleState={setToggle}
                tabs={progressTabs}
                newClass={"select-progress p-1"}
              />
            </div>
          )}
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
          {compound && loading && (
            <div className="loading-container w-100">
              <div className="d-flex flex-wrap justify-content-between w-100">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CompoundSkeleton key={index} wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""} />
                ))}
              </div>
            </div>
          )}
          {compound && !loading && compounds.length === 0 && (
            <div className="no-properties">
              <p>
                {currentLanguage === "ar"
                  ? "لا توجد كموندات متاحة"
                  : "No compounds available"}
              </p>
            </div>
          )}
          {compound &&
            !loading &&
            compounds.map((compound, index) => {
              return (
                <CompoundCard
                  id={compound._id}
                  key={index}
                  title={compound.name}
                  details={compound.details.ar}
                  location={compound.announcementLocation}
                  price={compound.units[0]?.aqarDetails?.price}
                  img={compound.compoundImages}
                  company={true}
                  connections={true}
                  wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                  advertiser={compound.contact}
                />
              );
            })}
          {!compound && loading && (
            <div className="loading-container w-100">
              <div className="d-flex flex-wrap justify-content-between w-100">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CompoundSkeleton key={index} wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""} />
                ))}
              </div>
            </div>
          )}
          {!compound && !loading && properties.length === 0 && (
            <div className="no-properties">
              <p>
                {currentLanguage === "ar"
                  ? "لا توجد عقارات متاحة"
                  : "No properties available"}
              </p>
            </div>
          )}
          {!compound &&
            !loading &&
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
            forcePage={currentPage - 1} // react-paginate uses 0-based index
          />
        )}
      </div>

      {/* Ads */}
      <Ads />
    </div>
  );
};

export default GuidePage;
