import React, { useState } from "react";
import { Col, Dropdown } from "react-bootstrap";
import SearchToggle from "../../../Components/Ui/SearchComponents/SearchToggle ";
import { translations } from "./translations";
import "./aqar.css";
import { useLanguage } from "../../../Components/Languages/LanguageContext";
import MenuArrow from "../../../assets/Icons/MenuArrow";
import BudgetDropdown from "../../../Components/Ui/SearchComponents/BudgetDropdown";
import PlaceTypeDropdown from "../../../Components/Ui/SearchComponents/PlaceTypeDropdown";
import TabsContent from "../../../Components/Ui/TabsContent/TabsContent";
import GreenRight from "../../../assets/Icons/GreenRight";
import { MultiSelect } from "primereact/multiselect";
import data from "../../../data/cities.json"
import { useSearchParams } from "react-router-dom";

const AqarDetails = () => {

     const [params] = useSearchParams();

  const filters = {
    type:params.get("type")|| "",
    division: params.get("division") || "",
    city: params.get("city") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    bedrooms: params.get("bedrooms") || "",
    baths: params.get("baths") || ""
  };
console.log("fit",filters);


  const { currentLanguage } = useLanguage(); // Get the current language
  const [finishing, setFinishing] = useState(
    translations[currentLanguage].Want
  );
  const [delivary, setDelivary] = useState(
    translations[currentLanguage].WantDelivary
  );
  const [toggle1, setToggle1] = useState(filters.division || "sale");
  const [selectedCities, setSelectedCities] = useState(null);
  const [toggle2, setToggle2] = useState("all");
  const [rotate, setRotate] = useState(false);
  const [rotateBudget, setRotateBudget] = useState(false);
  const [budget, setBudget] = useState(
    filters.minPrice && filters.maxPrice
      ? [filters.minPrice, filters.maxPrice]
      : [1000000, 50000000]
  );
  const [rotatePlace, setRotatePlace] = useState(false);
  const [placeType, setPlaceType] = useState(filters.type || "نوع المكان");
  const [placeTypeDetails, setPlaceTypeDetails] = useState("");
  const [rooms, setRooms] = useState(filters.bedrooms || "");
  const [baths, setBaths] = useState(filters.baths||"");

  const tabs = [
    { value: "sale", label: translations[currentLanguage].sale },
    { value: "rent", label: translations[currentLanguage].rent },
  ];

  const cities = data.map((item) => ({
    name: item.city_name_ar,
    value: item.city_name_en,
  }));

  const progressTabs = [
    { value: "all", label: translations[currentLanguage].all },
    { value: "ready", label: translations[currentLanguage].ready },
    { value: "inprogress", label: translations[currentLanguage].inProgress },
  ];

  const placeTypesTabs = [
    {
      key: "tab1",
      ar: "سكني",
      en: "Housing",
      items: [
        { id: 1, name: "منزل / بيت" },
        { id: 2, name: "شقة" },
        { id: 3, name: "شقة بحديقة" },
        { id: 4, name: "استوديو" },
        { id: 5, name: "استوديو فندقي" },
        { id: 6, name: "استوديو بحديقة" },
        { id: 7, name: "لوفت" },
        { id: 8, name: "دوبلكس" },
        { id: 9, name: "دوبلكس بحديقة" },
        { id: 10, name: "بنتهاوس" },
        { id: 11, name: "روف" },
        { id: 12, name: "توين دوبلكس" },
        { id: 13, name: "هاف دوبلكس" },
        { id: 14, name: "شاليه بحديقة" },
        { id: 15, name: "ساحلي فيلا" },
        { id: 16, name: "توين شاليه" },
        { id: 17, name: "شاليه كابينة" },
        { id: 18, name: "فيلا منفصلة" },
        { id: 19, name: "فيلا جاردن" },
        { id: 20, name: "توين فيلا" },
      ],
    },

    {
      key: "tab2",
      ar: "تجاري",
      en: "Commercial",
      items: [
        { id: 1, name: "محلات" },
        { id: 2, name: "إداري" },
      ],
    },

    {
      key: "tab3",
      ar: "زراعي",
      en: "Agricultural",
      items: [
        { id: 1, name: "ارض مباني سكني" },
        { id: 2, name: "ارض ادارية" },
        { id: 3, name: "ارض تجارية" },
        { id: 4, name: "ارض زراعية" },
        { id: 5, name: "ارض صناعية" },
      ],
    },

    {
      key: "tab4",
      ar: "صناعي",
      en: "Industrial",
      items: [
        { id: 1, name: "مصنع" },
        { id: 2, name: "مخزن" },
        { id: 3, name: "ورشة" },
      ],
    },
  ];

  const tabsKind = placeTypesTabs.map((tab) => ({
    eventKey: tab.key,

    title: (
      <div
        onClick={() => setPlaceType(currentLanguage === "ar" ? tab.ar : tab.en)}
      >
        {currentLanguage === "ar" ? tab.ar : tab.en}
      </div>
    ),

    content: (
      <>
        <div className="d-flex space-4 flex-wrap">
          {tab.items.map((item) => (
            <p
              key={item.id}
              className="b-12 pick bg-light-gray"
              style={{ width: "45%" }} // 👈 يخلي اتنين جنب بعض
              onClick={() => setPlaceTypeDetails(item.name)}
            >
              {item.name}
            </p>
          ))}
        </div>

        <div className="d-flex flex-row space-4 mt-3">
          <button
            className="btn-main submit-btn btn-reset btn-confirm w-100"
            onClick={() => {
              setPlaceType("نوع المكان");
              setPlaceTypeDetails("");
            }}
          >
            رجّع كل حاجة
          </button>
          <button className="btn-main btn-confirm w-100 border">تمام</button>
        </div>
      </>
    ),
  }));

  // rooms
  const tabsrooms = [
    {
      eventKey: "tab1",
      title: <></>,
      content: (
        <div className="d-flex flex-column space-6">
          <p className="b-11">{translations[currentLanguage].rooms} </p>
          <div className="d-flex flex-wrap flex-row gap-2">
            {["استوديو", "1", "2", "3", "4", "5", "6", "7", "8+"].map(
              (item, index) => (
                <p
                  key={index}
                  className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${
                    rooms === item ? "picked" : ""
                  }`}
                  onClick={() => setRooms(item)}
                >
                  {rooms === item && <GreenRight />}
                  {item}
                </p>
              )
            )}
          </div>
          <p className="b-11 mt-3">{translations[currentLanguage].baths} </p>
          <div className="d-flex flex-wrap gap-2">
            {["1", "2", "3", "4", "5", "6+"].map((item, index) => (
              <p
                key={index}
                className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${
                  baths === item ? "picked" : ""
                }`}
                onClick={() => setBaths(item)}
              >
                {baths === item && <GreenRight />}
                {item}
              </p>
            ))}
          </div>
          <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
            <button
              className="btn-main submit-btn btn-reset btn-confirm w-100"
              onClick={() => {
                setPlaceType("نوع المكان");
                setRooms("");
                setBaths("");
              }}
            >
              {translations[currentLanguage].reset}
            </button>
            <button className="btn-main btn-confirm w-100 border">
              {translations[currentLanguage].confirm}
            </button>
          </div>
        </div>
      ),
    },
  ];




  return (
    <div className="advanced-search compound d-flex flex-column p-0">
      <div className="row g-2 align-items-center p-0">
        {/* Types */}
        <div className="col-12 col-md-6 col-lg-1 min-w-max d-flex justify-content-center ">
          <div className="select-type tabs-home">
            <SearchToggle
              toggleState={toggle1}
              setToggleState={setToggle1}
              tabs={tabs}
            />
          </div>
        </div>

        {/* Search Input */}
        <div className="col col-xl-2 ">
          <div className="position-relative w-100">
            <MultiSelect
              value={selectedCities}
              onChange={(e) => setSelectedCities(e.value)}
              options={cities}
              optionLabel="name"
              optionValue="value"
              display="chip"
              placeholder={filters.city || "جميع المحافظات"}
              maxSelectedLabels={3}
              filter
              className="h-100 form-control w-100  search-input d-flex align-items-center p-1"
            />
          </div>
        </div>

        {/* Place Type */}
        <div
          className="col-12 col-md-6 col-lg-2"
          onClick={() => setRotatePlace(!rotatePlace)}
        >
          <PlaceTypeDropdown
            placeType={placeType}
            placeTypeDetails={placeTypeDetails}
            tabsKind={tabsKind}
            rotate={rotatePlace}
          />
        </div>

        {/* Rooms & Baths */}
        <div
          className="col-12 col-md-6 col-lg-2 min-w-max"
          onClick={() => setRotate(!rotate)}
        >
          <Dropdown className="d-flex h-100 ">
            <Dropdown.Toggle
              variant="light"
              className="w-100 text-end d-flex align-items-center justify-content-between"
            >
              {rooms === "" && baths === ""
                ? `${translations[currentLanguage].rooms} & ${translations[currentLanguage].baths}`
                : rooms === "استوديو"
                ? rooms + " / " + baths + " حمام"
                : `${translations[currentLanguage].rooms} ${rooms} / ${baths} ${translations[currentLanguage].actualBath}`}
              <MenuArrow rotate={rotate} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <TabsContent
                tabsData={tabsrooms}
                newClassTabsContent={"tabs-home rooms"}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Progress Tabs */}
        <div className="col-12 col-md-6 col-lg-1 min-w-max d-flex justify-content-center ">
          <SearchToggle
            toggleState={toggle2}
            setToggleState={setToggle2}
            tabs={progressTabs}
            progress={true}
          />
        </div>

        {/* Budget */}
        <div
          className="col-12 col-md-6 col-lg-2"
          onClick={() => setRotateBudget(!rotateBudget)}
        >
          <BudgetDropdown
            rotate={rotateBudget}
            budget={budget}
            setBudget={setBudget}
          />
        </div>
      </div>
    </div>
  );
};

export default AqarDetails;
