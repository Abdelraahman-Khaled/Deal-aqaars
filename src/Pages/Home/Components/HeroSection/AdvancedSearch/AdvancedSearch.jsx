import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import { translations } from "./translations";
import "./AdvancedSearch.css";
import { Col, Dropdown, Row, Container } from "react-bootstrap";
import TabsContent from "../../../../../Components/Ui/TabsContent/TabsContent";
import GreenRight from "../../../../../assets/Icons/GreenRight";
// import MultiSelect from "../../../../../Components/Forms/MultiSelect";
import BudgetDropdown from "../../../../../Components/Ui/SearchComponents/BudgetDropdown";
import PlaceTypeDropdown from "../../../../../Components/Ui/SearchComponents/PlaceTypeDropdown";
import SearchToggle from "../../../../../Components/Ui/SearchComponents/SearchToggle ";
import MenuArrow from "../../../../../assets/Icons/MenuArrow";
import { MultiSelect } from "primereact/multiselect";
import data from "../../../../../data/cities.json";

const AdvancedSearch = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [toggle1, setToggle1] = useState("sale");
  const [toggle2, setToggle2] = useState("all");
  const [placeType, setPlaceType] = useState("نوع المكان");
  const [placeTypeDetails, setPlaceTypeDetails] = useState("");
  const [rooms, setRooms] = useState("");
  const [baths, setBaths] = useState("");
  const [rotate, setRotate] = useState(false);
  const [rotatePlace, setRotatePlace] = useState(false);
  const [rotateBudget, setRotateBudget] = useState(false);
  const [budget, setBudget] = useState([1000000, 50000000]);
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = data.map((item) => ({
    name: item.city_name_ar,
    value: item.city_name_en,
  }));


  const tabs = [
    { value: "sale", label: translations[currentLanguage].forSale },
    { value: "rent", label: translations[currentLanguage].forRent },
  ];

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
        className="p-3"
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
              style={{ width: "47%" }} // 👈 يخلي اتنين جنب بعض
              onClick={() => {
                setPlaceTypeDetails(item.name);
                setPlaceType(tab.ar);
              }}
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

  const tabsrooms = [
    {
      eventKey: "tab1",
      title: <></>,
      content: (
        <div className="d-flex flex-column space-6 ">
          <p className="b-11">{translations[currentLanguage].rooms}</p>
          <div className="d-flex flex-wrap flex-row gap-2">
            {["استوديو", "1", "2", "3", "4", "5", "6", "7", "8+"].map(
              (item, index) => (
                <p
                  key={index}
                  className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${rooms === item ? "picked" : ""
                    }`}
                  onClick={() => setRooms(item)}
                >
                  {rooms === item && <GreenRight />}
                  {item}
                </p>
              )
            )}
          </div>
          <p className="b-11 mt-3">{translations[currentLanguage].baths}</p>
          <div className="d-flex flex-wrap gap-2">
            {["1", "2", "3", "4", "5", "6+"].map((item, index) => (
              <p
                key={index}
                className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${baths === item ? "picked" : ""
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

  const handleSearch = () => {
    const query = new URLSearchParams({
      type: placeTypeDetails,
      division: toggle1,
      city: selectedCities
        ? selectedCities.join(",")
        : "",
      minPrice: budget[0],
      maxPrice: budget[1],
      bedrooms: rooms,
      baths: baths,
    }).toString();

    let route = "/realestate";

    if (placeType === "سكني" || placeType === "Housing") {
      if (placeTypeDetails === "منزل / بيت") {
        route = "/building";
      } else {
        route = "/realestate";
      }
    } else if (placeType === "تجاري" || placeType === "Commercial") {
      route = "/adminstrative";
    } else if (placeType === "زراعي" || placeType === "Agricultural") {
      route = "/land";
    } else if (placeType === "صناعي" || placeType === "Industrial") {
      route = "/factory";
    }

    navigate(`${route}?${query}`);
  };


  return (
    <Container className="advanced-search finishing mb-4">
      <p className="b-7 mb-3">
        505,486 {translations[currentLanguage].forSale} و{" "}
        {translations[currentLanguage].forRent}
      </p>

      <div className="search-container p-2">
        <Row className="select-type-container  p-2 gap-4  gap-md-3 align-items-center">
          {/* First Column - Type Toggles */}
          <Col className="p-0">
            <div className="d-flex flex-column align-items-center gap-3 h-100 min-w-max">
              <div
                className="max-w-max"
                style={{
                  border: "1px solid var(--netural-200)",
                  borderRadius: "var(--border-radius-4)",
                }}
              >
                <SearchToggle
                  toggleState={toggle1}
                  setToggleState={setToggle1}
                  tabs={tabs}
                  newClass={"search-filter"}
                />
              </div>
              <SearchToggle
                toggleState={toggle2}
                setToggleState={setToggle2}
                tabs={progressTabs}
                progress={true}
                newClass={"search-filter"}
              />
            </div>
          </Col>

          {/* Second Column - Search Inputs */}
          <Col className="d-flex">
            <div className="d-flex flex-column gap-4 h-100 ">
              <div className="w-100 ">
                <MultiSelect
                  value={selectedCities}
                  onChange={(e) => setSelectedCities(e.value)}
                  options={cities}
                  optionLabel="name"
                  optionValue="value"
                  display="chip"
                  placeholder="جميع المحافظات"
                  maxSelectedLabels={3}
                  filter
                  className="form-control search-input d-flex align-items-center p-0"
                />
              </div>

              <Row className="g-2 justify-content-between space-1 flex-column flex-sm-row">
                <Col className="m-0 ">
                  <div
                    className=""
                    onClick={() => setRotatePlace(!rotatePlace)}
                  >
                    <PlaceTypeDropdown
                      placeType={placeType}
                      placeTypeDetails={placeTypeDetails}
                      tabsKind={tabsKind}
                      rotate={rotatePlace}
                    />
                  </div>
                </Col>

                <Col className="m-0">
                  <div className="h-100" onClick={() => setRotate(!rotate)}>
                    <Dropdown className="h-100">
                      <Dropdown.Toggle
                        variant="light"
                        className="w-100 text-end d-flex align-items-center justify-content-between"
                      >
                        {rooms === "" && baths === ""
                          ? `${translations[currentLanguage].rooms} & ${translations[currentLanguage].baths}`
                          : rooms === "استوديو"
                            ? rooms + " / " + baths + " حمام"
                            : `${translations[currentLanguage].rooms} ${rooms} / ${baths} ${translations[currentLanguage].baths}`}
                        <MenuArrow rotate={rotate} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        <TabsContent
                          tabsData={tabsrooms}
                          newClassTabsContent={" rooms"}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Third Column - Search Button and Budget */}
          <Col className="p-0">
            <div className="d-flex flex-column-reverse gap-3 h-100 flex-md-column">
              <button className="btn-main search-btn" onClick={handleSearch}>
                {translations[currentLanguage].searchButton}
              </button>

              <div onClick={() => setRotateBudget(!rotateBudget)}>
                <BudgetDropdown
                  rotate={rotateBudget}
                  budget={budget}
                  setBudget={setBudget}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AdvancedSearch;
