import React, { useState, useEffect, useCallback } from "react";
import BreadcrumbsPage from "../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import { translations } from "./translations";
import SearchToggle from "../../Components/Ui/SearchComponents/SearchToggle ";
import "./vendor.css";
import DropDown from "../../Components/DropDown/DropDown";
import VendorAdsCard from "./VendorAdsCard";
import AddannouncementIcon from "../../assets/Icons/AddannouncementIcon";
import { useSelector } from "react-redux";
import CompanyProjectCard from "../../Components/CompanyProjectCard/CompanyProjectCard";
import FininshCard from "../../Components/Ui/FinishCard/FinishCard";
import FormField from "../../Components/Forms/FormField";
import InputFiled from "../../Components/Forms/InputField";
import SearchIcon from "../../assets/Icons/SearchIcon";
import PropertyAPI from "../../api/propertyApi";
import SwapAPI from "../../api/swapApi";
import Loader from "../../Components/Loader/Loader";

import { useFinishing } from "../../contexts/FinishingContext";

import { useBuilding } from "../../contexts/BuildingContext";
import { useLand } from "../../contexts/LandContext";
import { useFactory } from "../../contexts/FactoryContext";

const VendorAds = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle, setToggle] = useState("realestate");
  const [rotate, setRotate] = useState(false);
  const [activeTab, setActiveTab] = useState("منشور");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertiesLoaded, setPropertiesLoaded] = useState(false);
  const [swaps, setSwaps] = useState([]);
  const [swapsLoaded, setSwapsLoaded] = useState(false);
  const userType = useSelector((state) => state.userType.userType);
  const {
    myFinishingServices,
    fetchMyFinishingServices,
    loading: finishingLoading,
    error: finishingError,
    myFinishingServicesLoaded,
  } = useFinishing();
  const {
    myBuildings,
    myBuildingsLoading: contextMyBuildingsLoading,
    myBuildingsError: contextMyBuildingsError,
    fetchMyBuildings: fetchMyBuildingsFromContext,
    myBuildingsLoaded: contextMyBuildingsLoaded,
    setMyBuildings: setContextMyBuildings,
  } = useBuilding();
  const {
    myLands,
    myLandsLoading: contextMyLandsLoading,
    myLandsError: contextMyLandsError,
    fetchMyLands: fetchMyLandsFromContext,
    myLandsLoaded: contextMyLandsLoaded,
    setMyLands: setContextMyLands,
  } = useLand();
  const {
    myFactories,
    myFactoriesLoading: contextMyFactoriesLoading,
    myFactoriesError: contextMyFactoriesError,
    fetchMyFactories: fetchMyFactoriesFromContext,
    myFactoriesLoaded: contextMyFactoriesLoaded,
    setMyFactories: setContextMyFactories,
  } = useFactory();

  
  // Fetch user's properties
  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      const response = await PropertyAPI.getMyProperties();
      setProperties(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.message || "Failed to fetch properties");
      setProperties([]);
    } finally {
      setLoading(false);
      setPropertiesLoaded(true);
    }
  };

  // Fetch user's swaps
  const fetchMySwaps = async () => {
    try {
      setLoading(true);
      const response = await SwapAPI.getMySwaps();
      setSwaps(response.swaps);
      console.log("My Swaps:", response.swaps);
      setError(null);
    } catch (err) {
      console.error("Error fetching swaps:", err);
      setError(err.message || "Failed to fetch swaps");
      setSwaps([]);
    } finally {
      setLoading(false);
      setSwapsLoaded(true);
    }
  };

  // Fetch user's finishing services
  // This function is now part of FinishingContext and called via useFinishing hook

  const fetchMyBuildings = async () => {
    if (!contextMyBuildingsLoaded) {
      fetchMyBuildingsFromContext();
    }
  };

  const fetchMyLands = async () => {
    if (!contextMyLandsLoaded) {
      fetchMyLandsFromContext();
    }
  };

  const fetchMyFactories = useCallback(async () => {
    if (!contextMyFactoriesLoaded) {
      fetchMyFactoriesFromContext();
    }
  }, [contextMyFactoriesLoaded, fetchMyFactoriesFromContext]);

  useEffect(() => {
    if (toggle === "finishing") {
      console.log(
        "Toggle is finishing. myFinishingServicesLoaded:",
        myFinishingServicesLoaded
      );
      console.log("Current myFinishingServices:", myFinishingServices);
      console.log("Current finishingError:", finishingError);
      if (!myFinishingServicesLoaded) {
        fetchMyFinishingServices();
      }
    } else if (toggle === "swaps") {
      if (!swapsLoaded) {
        fetchMySwaps();
      }
    } else if (toggle === "building") {
      fetchMyBuildings();
    } else if (toggle === "land") {
      fetchMyLands();
    } else if (toggle === "factory") {
      fetchMyFactories();
    } else if (
      toggle !== "finishing" &&
      toggle !== "swaps" &&
      toggle !== "building" &&
      toggle !== "land" &&
      toggle !== "factory" &&
      !propertiesLoaded
    ) {
      fetchMyProperties();
    }
  }, [
    toggle,
    fetchMyFinishingServices,
    fetchMySwaps,
    fetchMyBuildings,
    fetchMyLands,
    fetchMyFactories,
    fetchMyProperties,
    propertiesLoaded,
    myFinishingServicesLoaded,
    myFinishingServices,
    finishingError,
    swapsLoaded,
    contextMyBuildingsLoaded,
    contextMyLandsLoaded,
    contextMyFactoriesLoaded,
  ]);

  // Handle property deletion
  const handleDeleteProperty = (deletedPropertyId) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property._id !== deletedPropertyId)
    );
  };

  const handleDeleteFinish = () => {
    fetchMyFinishingServices(); // Re-fetch services to update UI
  };

  const handleDeleteSwap = () => {
    fetchMySwaps(); // Re-fetch swaps to update UI
  };

  const handleDeleteBuilding = async () => {
    fetchMyBuildingsFromContext();
    }

  const handleDeleteLand = async () => {
    fetchMyLandsFromContext();
  }

  const handleDeleteFactory = async () => {
    fetchMyFactoriesFromContext();
  }

  const user = useSelector((state) => state.auth.user);
  const tabs = [
    { value: "realestate", label: translations[currentLanguage].realestate },
    { value: "swaps", label: translations[currentLanguage].swaps },
    { value: "building", label: translations[currentLanguage].building },
    { value: "land", label: translations[currentLanguage].land },
    { value: "factory", label: translations[currentLanguage].factory },
  ];

  const tabsCompany = [
    { value: "realestate", label: translations[currentLanguage].realestate },
    { value: "project", label: translations[currentLanguage].project },
    ...(user?.companyId
      ? [{ value: "finishing", label: translations[currentLanguage].finishing }]
      : []),
    { value: "land", label: translations[currentLanguage].land },
    { value: "factory", label: translations[currentLanguage].factory },
  ];

  const organizing = ["الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"];

  const interaction = [
    { value: "-", label: "إجمالى الظهور في البحث" },
    { value: "1", label: "إجمالى المشاهدات" },
    { value: "-", label: "إجمالي محاولات الإتصال" },
    { value: "-", label: "متوسط نسبة المشاهدة" },
    { value: "-", label: "متوسط نسبة الإتصال" },
    { value: "-", label: "عدد النقرات" },
  ];

  // search
  const initialValues = {
    search: "",
  };
  const handleSubmit = (values) => {
    console.log("Join Us form values:", values);
  };

  // status tabs
  const propertyTabs = [
    { label: "منشور", active: true },
    { label: "منتهي", active: false },
    { label: "مرفوض", active: false },
    { label: "قيد المراجعة", active: false },
    { label: "محذوف", active: false },
  ];

  return (
    <>
      <HelmetInfo
        titlePage={currentLanguage === "ar" ? "إعلاناتي" : "My ads"}
      />

      <ContainerMedia>
        <div className="vendor py-4 d-flex space-8 flex-column">
          {/* top bar */}
          <div className="d-flex justify-content-between align-items-start">
            <div className="pb-2">
              <BreadcrumbsPage
                newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                mainTitle={"إعلاناتي"}
                routeTitleTwoBread={false}
                titleTwoBread={false}
                secondArrow={false}
              />
              <h6 className="pt-3">إعلاناتي</h6>
            </div>
            <div className="col-12 col-md-6 col-lg-1 min-w-max d-flex justify-content-center ">
              <div className="select-type tabs-home">
                <SearchToggle
                  toggleState={toggle}
                  setToggleState={setToggle}
                  tabs={userType == "vendor" ? tabs : tabsCompany}
                />
              </div>
            </div>
          </div>

          {/* interaction cards*/}
          <div className="interaction space-6 d-flex flex-column">
            <div className="  d-flex justify-content-between">
              <p className="b-9">مستوي التفاعل</p>
              <div className="d-flex space-3 flex-wrap">
                {/* Drop Down */}
                <DropDown
                  title={"كل إعلاناتك"}
                  details={organizing}
                  rotate={rotate}
                  setRotate={setRotate}
                />
              </div>
            </div>
            <div className="row">
              {interaction.map((item, index) => (
                <div className="related-slider col-12 col-sm-6 col-lg-4  mt-4 ">
                  <div key={index} className="interaction-box">
                    <h6>{item.value}</h6>
                    <p className="b-12">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ads */}
          <div className="interaction space-6 d-flex flex-column">
            <div className="  d-flex justify-content-between">
              <p className="b-9">
                {toggle === "finishing" ? "التشطيب" : "عقاراتك"}
              </p>
              <div className="d-flex space-3 flex-wrap">
                <div
                  className="position-relative max-w-max"
                  style={{ width: "100%" }}
                >
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
              </div>
            </div>
            {/* status tabs */}
            <div className="d-flex space-4 mb-4">
              {propertyTabs
                .filter(
                  (tab) => !(toggle === "finishing" && tab.label === "منتهي")
                )
                .map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab.label)}
                    className={`status ${
                      activeTab === tab.label ? "clicked" : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
            </div>
            {/* cards */}
            <div className="row g-4 pt-2 ">
              {toggle === "finishing" ? (
                finishingLoading ? (
                  <div className="col-12 text-center py-5">
                    <Loader />
                    <p className="mt-2">جاري تحميل إعلانات التشطيبات...</p>
                  </div>
                ) : finishingError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-danger">
                      حدث خطأ في تحميل إعلانات التشطيبات: {finishingError}
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => window.location.reload()}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : myFinishingServices && myFinishingServices.length > 0 ? (
                  myFinishingServices.map((service, index) => (
                    <div
                      className="related-slider col-12 col-sm-6 col-lg-4  mt-0"
                      key={index}
                    >
                      <FininshCard
                        id={service._id}
                        img={service.images}
                        subtitles={
                          service.servicesOffered
                            ? service.servicesOffered.map(
                                (service) => service[currentLanguage]
                              )
                            : service.services || service.subtitles
                        }
                        exprince={
                          service.companyDescription?.[currentLanguage] ||
                          service.experience ||
                          service.exprince
                        }
                        title={
                          service.jobType?.[currentLanguage] ||
                          service.name ||
                          service.title
                        }
                        phoneNumber={service.phoneNumber}
                        hasWhatsapp={service.hasWhatsapp}
                        detailedAddress={
                          service.detailedAddress?.[currentLanguage]
                        }
                        companyAds={true}
                        seen={"1"}
                        likes={"2"}
                        calls={"3"}
                        onDelete={handleDeleteFinish}
                      />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <AddannouncementIcon />
                    <p className="b-12 w-25 text-center">
                      لا توجد إعلانات تشطيبات خاصة بك.
                    </p>
                  </div>
                )
              ) : toggle === "swaps" ? (
                loading ? (
                  <div className="col-12 text-center py-5">
                    <Loader />
                    <p className="mt-2">جاري تحميل الإعلانات...</p>
                  </div>
                ) : error ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-danger">
                      حدث خطأ في تحميل الإعلانات: {error}
                    </p>
                  </div>
                ) : swaps.length > 0 ? (
                  swaps.map((swap, index) => (
                    <div
                      className="related-slider col-12 col-sm-6 col-lg-4 mt-0"
                      key={swap._id || index}
                    >
                      <VendorAdsCard
                        numAds={index + 1}
                        id={swap._id}
                        title={swap.whatIHave?.propertyType}
                        trade={true}
                        location={swap.locationLabel}
                        images={swap.images}
                        listedBy={swap.listedBy}
                        phoneNumber={swap.contact?.phoneNumber}
                        hasWhatsapp={swap.contact?.hasWhatsapp}
                        since={swap.createdAt}
                        seen={"1"}
                        likes={"1"}
                        calls={"1"}
                        tradeItem={swap.whatIWant?.propertyType}
                        date={swap.createdAt}
                        onDelete={handleDeleteSwap}
                        lat={swap?.location?.coordinates[0]}
                        lon={swap?.location?.coordinates[1]}
                        model={"swap"}
                      />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <AddannouncementIcon />
                    <p className="b-12 w-25 text-center">
                      لا توجد مبادلات خاصة بك.
                    </p>
                  </div>
                )

              ) : toggle === "building" ? (
                contextMyBuildingsLoading ? (
                  <div className="col-12 text-center py-5">
                    <Loader />
                    <p className="mt-2">جاري تحميل إعلانات المباني...</p>
                  </div>
                ) : contextMyBuildingsError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-danger">
                      حدث خطأ في تحميل إعلانات المباني:{" "}
                      {contextMyBuildingsError}
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => window.location.reload()}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : myBuildings && myBuildings.length > 0 ? (
                  myBuildings.map((building, index) => (
                    <div
                      key={building.id || index}
                      className="related-slider col-12 col-sm-6 col-lg-4  mt-0"
                    >
                      <VendorAdsCard
                        id={building._id}
                        key={index}
                        numAds={index + 1}
                        date={building.createdAt}
                        title={building.title[currentLanguage]}
                        lat={building.location.coordinates.coordinates[0]}
                        lon={building.location.coordinates.coordinates[1]}
                        location={building.location.city}
                        details={building.description[currentLanguage]}
                        price={building.details.price}
                        space={building.details.space}
                        img={building.images}
                        slider={true}
                        wrapperClass="flex-wrap"
                        seen={"1"}
                        likes={"2"}
                        calls={"3"}
                        onDelete={handleDeleteBuilding}
                        model={"building"}
                      />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <AddannouncementIcon />
                    <p className="b-12 w-25 text-center">
                      لا توجد إعلانات مباني خاصة بك.
                    </p>
                  </div>
                )
              ) : toggle === "land" ? (
                contextMyLandsLoading ? (
                  <div className="col-12 text-center py-5">
                    <Loader />
                    <p className="mt-2">جاري تحميل إعلانات الأراضي...</p>
                  </div>
                ) : contextMyLandsError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-danger">
                      حدث خطأ في تحميل إعلانات الأراضي: {
                        contextMyLandsError
                      }
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => window.location.reload()}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : myLands && myLands.length > 0 ? (
                  myLands.map((land, index) => (
                    <div
                      key={land.id || index}
                      className="related-slider col-12 col-sm-6 col-lg-4  mt-0"
                    >
                      <VendorAdsCard
                        id={land._id}
                        key={index}
                        numAds={index + 1}
                        date={land.createdAt}
                        title={land.title[currentLanguage]}
                        lat={land.location.coordinates.coordinates[0]}
                        lon={land.location.coordinates.coordinates[1]}
                        location={land.location.city}
                        details={land.description[currentLanguage]}
                        price={land.details.price}
                        space={land.details.space}
                        img={land.images}
                        slider={true}
                        wrapperClass="flex-wrap"
                        seen={"1"}
                        likes={"2"}
                        calls={"3"}
                        onDelete={handleDeleteLand}
                        model={"land"}
                      />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <AddannouncementIcon />
                    <p className="b-12 w-25 text-center">
                      لا توجد إعلانات أراضي خاصة بك.
                    </p>
                  </div>
                )
              ) : toggle === "factory" ? (
                contextMyFactoriesLoading ? (
                  <div className="col-12 text-center py-5">
                    <Loader />
                    <p className="mt-2">جاري تحميل إعلانات المصانع...</p>
                  </div>
                ) : contextMyFactoriesError ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-danger">
                      حدث خطأ في تحميل إعلانات المصانع: {
                        contextMyFactoriesError
                      }
                    </p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => window.location.reload()}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : myFactories && myFactories.length > 0 ? (
                  myFactories.map((factory, index) => (
                    <div
                      key={factory.id || index}
                      className="related-slider col-12 col-sm-6 col-lg-4  mt-0"
                    >
                      <VendorAdsCard
                        id={factory._id}
                        key={index}
                        numAds={index + 1}
                        date={factory.createdAt}
                        title={factory.title[currentLanguage]}
                        lat={factory.location.coordinates.coordinates[0]}
                        lon={factory.location.coordinates.coordinates[1]}
                        location={factory.location.city}
                        details={factory.description[currentLanguage]}
                        price={factory.details.price}
                        space={factory.details.space}
                        img={factory.images}
                        slider={true}
                        wrapperClass="flex-wrap"
                        seen={"1"}
                        likes={"2"}
                        calls={"3"}
                        onDelete={handleDeleteFactory}
                        model={"factory"}
                      />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                    <AddannouncementIcon />
                    <p className="b-12 w-25 text-center">
                      لا توجد إعلانات مصانع خاصة بك.
                    </p>
                  </div>
                )
              ) : loading ? (
                <div className="col-12 text-center py-5">
                  <Loader />
                  <p className="mt-2">جاري تحميل الإعلانات...</p>
                </div>
              ) : error ? (
                <div className="col-12 text-center py-5">
                  <p className="text-danger">
                    حدث خطأ في تحميل الإعلانات: {error}
                  </p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => window.location.reload()}
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : properties.length > 0 ? (
                properties.map((property, index) => (
                  <div
                    key={property.id || index}
                    className="related-slider col-12 col-sm-6 col-lg-4  mt-0"
                  >
                    {toggle === "realestate" ? (
                      <VendorAdsCard
                        numAds={index + 1}
                        type={property.division}
                        key={index}
                        id={property._id}
                        price={property.details.price}
                        rooms={property.details.rooms}
                        bath={property.details.bathrooms}
                        space={property.details.space}
                        title={property.title[currentLanguage]}
                        location={property.location.detailedLocation}
                        images={property.images}
                        listedBy={property.listedBy}
                        phoneNumber={property.contact?.phoneNumber}
                        hasWhatsapp={property.contact?.hasWhatsapp}
                        since={property.createdAt}
                        seen={"1"}
                        likes={"1"}
                        calls={"1"}
                        date={property.createdAt}
                        onDelete={handleDeleteProperty}
                        propertyData={property}
                        model={"property"}
                      />
                    ) : toggle === "project" ? (
                      <CompanyProjectCard
                        key={index}
                        title={property.title[currentLanguage]}
                        lat={property.location.coordinates[0]}
                        lon={property.location.coordinates[1]}
                        details={property.description[currentLanguage]}
                        price={property.details.price}
                        img={property.images}
                        slider={true}
                        wrapperClass="flex-wrap"
                        seen={"1"}
                        likes={"2"}
                        calls={"3"}
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <AddannouncementIcon />
                  <p className="b-12 w-25 text-center">
                    لا توجد إعلانات عقارية خاصة بك.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContainerMedia>
    </>
  );
};

export default VendorAds;
