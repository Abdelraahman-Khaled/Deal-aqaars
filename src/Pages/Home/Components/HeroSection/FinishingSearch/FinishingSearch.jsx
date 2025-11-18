import React, { useState } from "react";
import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import { Col, Row, Dropdown } from "react-bootstrap";
import TabsContent from "../../../../../Components/Ui/TabsContent/TabsContent";
import "./FinishSearch.css";
import SearchToggle from "../../../../../Components/Ui/SearchComponents/SearchToggle ";
import { translations } from "./translations"; // Import translations
import MenuArrow from "../../../../../assets/Icons/MenuArrow";
import { MultiSelect } from "primereact/multiselect";
import data from "../../../../../data/cities.json"
import { useNavigate } from "react-router-dom";

const FinishingSearch = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle1, setToggle1] = useState("furnishing");
  const [selectedCities, setSelectedCities] = useState(null);
  const [home, setHome] = useState(translations[currentLanguage].Want);
  const navigate = useNavigate();

  const cities = data?.map((item) => ({
    name: item.city_name_ar,
    value: item.city_name_en,
  }));

  // arrow
  const [rotate, setRotate] = useState(false);
  const tabs = [
    { value: "furnishing", label: translations[currentLanguage].furnishHome },
    { value: "finishing", label: translations[currentLanguage].renovateHome },
  ];

  const tabshome = [
    {
      eventKey: "tab1",
      title: <></>,
      content: (
        <div className="d-flex flex-column space-6">
          <div className="d-flex space-4 flex-column justify-content-center">
            {translations[currentLanguage].allItems.map((item, index) => (
              <p
                key={index}
                className={`b-12 pick bg-light-gray d-flex space-2`}
                onClick={() => setHome(item)}
              >
                {home === item}
                {item}
              </p>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const handleSearch = () => {
    const query = new URLSearchParams({
      division: toggle1,
      city: selectedCities
        ? selectedCities.join(",")
        : "",
      servicesOffered: home
    }).toString();

    navigate(`/finish?${query}`);
  };

  return (
    <div className="advanced-search finishing d-flex space-3 flex-column mb-4">
      <p className="b-7">
        {translations[currentLanguage].furnishHome} و{" "}
        {translations[currentLanguage].renovateHome}
      </p>
      {/* <div className="row align-items-center"> */}
      <Row className="select-type-container justify-content-center align-items-center p-2 gap-4  gap-md-3">
        {/* Types */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className=" mb-md-0 p-0 max-w-max align-self-center min-w-max"
        >
          <div className="select-type max-w-max align-self-center">
            <SearchToggle
              toggleState={toggle1}
              setToggleState={setToggle1}
              tabs={tabs}
              newClass={"search-filter"}
            />
          </div>
        </Col>
        {/* Search Input */}
        <Col xs={12} md={7} lg={4} className="p-0 h-100">
          <div className="h-100">
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
              className="h-100 form-control w-100  search-input d-flex align-items-center p-0"
            />
          </div>
        </Col>
        <Col
          xs={12}
          md={5}
          lg={2}
          className="d-flex flex-row space-3 p-0 min-w-max"
        >
          <Col onClick={() => setRotate(!rotate)}>

            <Dropdown className="d-flex h-100 type-finishing">
              <Dropdown.Toggle variant="light" className="w-100 text-end">
                {home}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <TabsContent
                  tabsData={tabshome}
                  newClassTabsContent={"tabs-home rooms"}
                />
              </Dropdown.Menu>
              <MenuArrow rotate={rotate} />
            </Dropdown>
          </Col>
        </Col>
        {/* Main Search Button */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className="d-flex flex-column space-3 p-0 min-w-max "
        >
          <button className="w-100 btn-main" onClick={handleSearch}>
            {translations[currentLanguage].searchPlaceholder}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default FinishingSearch;
