import React, { useEffect, useState } from "react";
import HelmetInfo from "../../../../Components/Helmetinfo/HelmetInfo";
import BreadcrumbsPage from "../../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import { useLanguage } from "../../../../Components/Languages/LanguageContext";
import ImageSlider from "../../../../Components/Ui/ImageSlider/ImageSlider";
import ContainerMedia from "../../../../Components/ContainerMedia/ContainerMedia";
import AdsDescription from "../../../../Components/Ui/AdsDescription/AdsDescription";
import Map from "../../../../Components/Ui/Map/Map";
import CompanyCard from "../../../../Components/Ui/CompanyCard/CompanyCard";
import DescriptionGuide from "../../../../Components/Ui/DescriptionGuide/DescriptionGuide";
import UnitDetails from "../../../../Components/Ui/UnitDetails/UnitDetails";
import RealEstateAds from "../../../../Components/Ui/RealEstateAds/RealEstateAds";
import CompanyToSee from "../../../../Components/Ui/CompanyToSee/CompanyToSee";
import SpaceBox from "../../../../Components/Ui/SpaceBox/SpaceBox";
import { useParams } from "react-router-dom";
import { useCompound } from "../../../../contexts/CompoundContext";
import PropertyShowcaseExample from "../../../../Components/Ui/PropertyShowcase/PropertyShowcaseExample";
import Loader from "../../../../Components/Loader/Loader";

const CompoundAqarDetails = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [isRealEstate, setIsRealEstate] = useState(false); // State to track if realEstate mode is active
  const { id, index } = useParams();
  const { compound, loading, error, fetchCompound, clearCompound } =
    useCompound();
  const selectedUnit = compound?.units?.find((unit) => unit._id === index);
  console.log(selectedUnit);

  useEffect(() => {
    if (id) {
      fetchCompound(id);
    }
    return () => clearCompound(); // cleanup on unmount
  }, [id, fetchCompound, clearCompound]);

  // Listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsRealEstate(true);
      } else {
        setIsRealEstate(false);
      }
    };

    // Initialize the state on mount
    handleResize();

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const OPTIONS = {};
  const SLIDES = [
    "/img02.jpg",
    "/img03.jpg",
    "/img04.jpg",
    "/img02.jpg",
    "/img03.jpg",
    "/img04.jpg",
    "/img02.jpg",
    "/img03.jpg",
    "/img04.jpg",
    "/img02.jpg",
    "/img03.jpg",
    "/img04.jpg",
  ];

  const unitDetails = [
    {
      space: selectedUnit?.aqarDetails.space,
      floor: selectedUnit?.aqarDetails.floor,
      front: selectedUnit?.aqarDetails.view,
      numOfAds: "",
      paymentWay: [selectedUnit?.aqarDetails.paymentType],
      numRooms: selectedUnit?.aqarDetails.rooms,
      finishingType: selectedUnit?.aqarDetails.finishingType,
      handingOverYear: selectedUnit?.aqarDetails.handingYear,
      meterPrice:
        selectedUnit?.aqarDetails.price / selectedUnit?.aqarDetails?.space,
      AdsType: "المطور",
    },
  ];

  const compounds = [
    {
      companies: ["عقارات مصر", "مشاريع جديدة", "كمباوندات العين السخنة"],
    },
  ];

  const otherUnits = compound?.units?.filter(
    (unit) => unit._id !== selectedUnit?._id
  );

  const spaceBoxData = compound?.units.reduce((acc, unit) => {
    const aqarType = unit?.unitDetails?.aqarType || "Other";
    if (!acc[aqarType]) {
      acc[aqarType] = {
        title: aqarType,
        spaces: [],
        prices: [],
        _id: unit?._id || 0,
      };
    }
    acc[aqarType].spaces.push(unit?.aqarDetails?.space || 0);
    acc[aqarType].prices.push(unit?.aqarDetails?.price || 0);
    acc[aqarType].prices.push(unit?.aqarDetails?.view || 0);
    acc[aqarType]._id = unit?._id || 0;

    return acc;
  }, {});

  const finalSpaceBoxData = Object.values(spaceBoxData || {});

  if (loading && compound == null) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <HelmetInfo
        titlePage={
          currentLanguage === "ar"
            ? "دليل وحدة الكومباوند"
            : "Compound Unit Guide"
        }
      />
      <div className="py-4">
        <ContainerMedia>
          <header className="pb-4">
            <BreadcrumbsPage
              newClassBreadHeader={"biography-bread breadcrumb-page-2"}
              mainTitle={"دليل الكومباوندات"}
              mainRoute={"/compounds"}
              routeTitleTwoBread={`/compounds-guide/${id}`}
              titleTwoBread={compound?.announcementLocation}
              textBreadActive={
                selectedUnit?.unitDetails.aqarType +
                "  " +
                selectedUnit?.aqarDetails.space +
                " " +
                "متر مربع"
              }
            />
          </header>

          <main>
            <PropertyShowcaseExample
              images={selectedUnit?.aqarImages?.map((item) => item.url) || []}
              location={compound?.location?.detailedLocation}
              lat={compound?.location?.coordinates.coordinates[0]}
              lon={compound?.location?.coordinates.coordinates[1]}
            />
            <div className="row gy-4">
              <div className="col-12 col-xl-9 d-flex flex-column space-6">
                <DescriptionGuide
                  title={selectedUnit?.aqarDetails.price + " " + "ج.م"}
                  aqar={true}
                  rooms={selectedUnit?.aqarDetails.rooms}
                  bath={selectedUnit?.aqarDetails.bathrooms}
                  space={selectedUnit?.aqarDetails.space}
                  location={compound?.location?.detailedLocation}
                  description={compound?.details[currentLanguage]}
                />
                <UnitDetails data={unitDetails} />
                <AdsDescription title={"وصف الاعلان"} description={selectedUnit?.unitDetails?.announcementDetails.ar} />
                <Map
                  lat={compound?.location?.coordinates.coordinates[0]}
                  lon={compound?.location?.coordinates.coordinates[1]}
                  locationName={compound?.title[currentLanguage]}
                />
                <p className="b-5">وحدات تانيه جوا الكومباوند</p>
                <div className="d-flex flex-wrap space-1 justify-content-between">
                  <SpaceBox
                    data={finalSpaceBoxData}
                    realEstate={isRealEstate}
                  />
                </div>
                <CompanyToSee data={compounds} />
              </div>
              <div className="col-12 col-xl-3 d-flex flex-column space-6">
                <CompanyCard
                  name={"تطوير مصر للتطوير العقاري"}
                  since={"2014"}
                  numberProjects={"8"}
                  inhouse={"2"}
                  notFinished={"1"}
                  underDevelopment={"2"}
                />
                <RealEstateAds />
              </div>
            </div>
          </main>
        </ContainerMedia>
      </div>
    </>
  );
};

export default CompoundAqarDetails;
