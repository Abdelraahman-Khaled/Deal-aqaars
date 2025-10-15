import React, { useState } from "react";
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

const AdvancedSearch = () => {
    const { currentLanguage } = useLanguage();
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
    const [selectedValues, setSelectedValues] = useState([]);

    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'أكتوبر', code: 'NY' },
        { name: 'المعادي', code: 'RM' },
        { name: 'بلبن', code: 'LDN' },
        { name: 'السادات', code: 'IST' },
        { name: 'إسكندرية', code: 'PRS' }
    ];
    // const multiOptions = [
    //     { value: "1", name: "أكتوبر", selected: false },
    //     { value: "2", name: "المعادي", selected: false },
    //     { value: "3", name: "بلبن", selected: false },
    //     { value: "4", name: "السادات", selected: false },
    //     { value: "5", name: "إسكندرية", selected: false },
    // ];

    const tabs = [
        { value: "sale", label: translations[currentLanguage].forSale },
        { value: "rent", label: translations[currentLanguage].forRent }
    ];

    const progressTabs = [
        { value: "all", label: translations[currentLanguage].all },
        { value: "ready", label: translations[currentLanguage].ready },
        { value: "inprogress", label: translations[currentLanguage].inProgress }
    ];

    const tabsKind = [
        {
            eventKey: "tab1",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "سكني" : "Housing"}`)}>
                    {currentLanguage === "ar" ? "سكني" : "Housing"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex  space-4">
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("ارض")}>
                                ارض
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("بيت")}>
                                بيت
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("كمبوند")}>
                                كمبوند
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "تجاري" : "Commercial"}`)}>
                    {currentLanguage === "ar" ? "تجاري" : "Commercial"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex  space-4">
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("إداري")}>
                                إداري
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab3",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "زراعي" : "Agricultural"}`)}>
                    {currentLanguage === "ar" ? "زراعي" : "Agricultural"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex flex-wrap space-4">
                        <div className="d-flex space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab4",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "صناعي" : "Industrial"}`)}>
                    {currentLanguage === "ar" ? "صناعي" : "Industrial"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex flex-wrap space-4">
                        <div className="d-flex space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm w-100 border">تمام</button>
                    </div>
                </>
            )
        },
    ];

    const tabsrooms = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6 ">
                    <p className="b-11">{translations[currentLanguage].rooms}</p>
                    <div className="d-flex flex-wrap flex-row gap-2">
                        {["استوديو", "1", "2", "3", "4", "5", "6", "7", "8+"].map((item, index) => (
                            <p key={index} className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${rooms === item ? "picked" : ""}`} onClick={() => setRooms(item)}>
                                {rooms === item && <GreenRight />}
                                {item}
                            </p>
                        ))}
                    </div>
                    <p className="b-11 mt-3">{translations[currentLanguage].baths}</p>
                    <div className="d-flex flex-wrap gap-2">
                        {["1", "2", "3", "4", "5", "6+"].map((item, index) => (
                            <p key={index} className={`b-12 pick bg-light-gray d-flex space-2 max-w-max ${baths === item ? "picked" : ""}`} onClick={() => setBaths(item)}>
                                {baths === item && <GreenRight />}
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="d-flex flex-column flex-md-row space-3 space-md-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setRooms(""); setBaths("") }}>
                            {translations[currentLanguage].reset}
                        </button>
                        <button className="btn-main btn-confirm w-100 border">{translations[currentLanguage].confirm}</button>
                    </div>
                </div>
            )
        },
    ];

    return (
        <Container className="advanced-search finishing mb-4">
            <p className="b-7 mb-3">505,486 {translations[currentLanguage].forSale} و {translations[currentLanguage].forRent}</p>

            <div className="search-container p-2">
                <Row className="select-type-container  p-2 gap-4  gap-md-3 align-items-center">
                    {/* First Column - Type Toggles */}
                    <Col className="p-0">
                        <div className="d-flex flex-column align-items-center gap-3 h-100 min-w-max">
                            <div className="max-w-max" style={{ border: "1px solid var(--netural-200)", borderRadius: "var(--border-radius-4)" }}>
                                <SearchToggle
                                    toggleState={toggle1}
                                    setToggleState={setToggle1}
                                    tabs={tabs}
                                />
                            </div>
                            <SearchToggle
                                toggleState={toggle2}
                                setToggleState={setToggle2}
                                tabs={progressTabs}
                                progress={true}
                            />
                        </div>
                    </Col>

                    {/* Second Column - Search Inputs */}
                    <Col className="d-flex">
                        <div className="d-flex flex-column gap-3 h-100 ">
                            <div className="w-100 pb-2">
                                <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" display="chip"
                                    placeholder="Select Cities" maxSelectedLabels={3} className="form-control search-input d-flex align-items-center p-0" />
                            </div>

                            <Row className="g-2 justify-content-between space-1 flex-column flex-sm-row">
                                <Col className="m-0 ">
                                    <div className="" onClick={() => setRotatePlace(!rotatePlace)}>
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
                                            <Dropdown.Toggle variant="light" className="w-100 text-end d-flex align-items-center justify-content-between">
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
                            <button className="btn-main search-btn  p-lg-1 p-xl-3">
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
        </Container >
    );
};

export default AdvancedSearch;