import React, { useState } from "react";
import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import { Col, Row, Dropdown } from "react-bootstrap";
import TabsContent from "../../../../../Components/Ui/TabsContent/TabsContent";
import "./FinishSearch.css";
import SearchToggle from "../../../../../Components/Ui/SearchComponents/SearchToggle ";
import { translations } from "./translations"; // Import translations
import MenuArrow from "../../../../../assets/Icons/MenuArrow";
import { MultiSelect } from "primereact/multiselect";

const FinishingSearch = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [toggle1, setToggle1] = useState("Furnish");
    const [home, setHome] = useState(translations[currentLanguage].Want);


      const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'أكتوبر', code: 'NY' },
        { name: 'المعادي', code: 'RM' },
        { name: 'بلبن', code: 'LDN' },
        { name: 'السادات', code: 'IST' },
        { name: 'إسكندرية', code: 'PRS' }
    ];


    // arrow
    const [rotate, setRotate] = useState(false);
    const tabs = [
        { value: "Furnish", label: translations[currentLanguage].furnishHome },
        { value: "Renovate", label: translations[currentLanguage].renovateHome }
    ];

    const multiOptions = [
        { value: "1", text: "أكتوبر", selected: false },
        { value: "2", text: "المعادي", selected: false },
        { value: "3", text: "بلبن", selected: false },
        { value: "4", text: "السادات", selected: false },
        { value: "5", text: "إسكندرية", selected: false },
    ];

    const tabshome = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].allItems.map((item, index) => (
                                <p key={index} className={`b-12 pick bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {home === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];


    const tabsKind = [
        {
            eventKey: "tab1",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "سكني" : "Housing"}`)}>
                    {currentLanguage === "ar" ? "سكني" : "Housing"}
                </div >
            ),
            content: (
                <>
                    <div className="d-flex space-4">
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
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
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
                    <div className="d-flex space-4">
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
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
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
                    <div className="d-flex space-4">
                        <div className="d-flex  space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
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
                    <div className="d-flex space-4">
                        <div className="d-flex  space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
                    </div>
                </>
            )
        },
    ];

    return (
        <div className="advanced-search finishing d-flex space-3 flex-column mb-4">
            <p className="b-7">{translations[currentLanguage].furnishHome} و {translations[currentLanguage].renovateHome}</p>
            {/* <div className="row align-items-center"> */}
            <Row className="select-type-container justify-content-center  p-2 gap-4  gap-md-3">
                {/* Types */}
                <Col xs={12} md={3} lg={2} className=" mb-md-0 p-0 max-w-max align-self-center min-w-max">
                    <div className="select-type max-w-max align-self-center">
                        <SearchToggle
                            toggleState={toggle1}
                            setToggleState={setToggle1}
                            tabs={tabs}
                        />
                    </div>
                </Col>
                {/* Search Input */}
                <Col xs={12} md={7} lg={4} className="p-0 h-100">
                          <div className="h-100" >
                                <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" display="chip"
                                    placeholder="Select Cities" maxSelectedLabels={3} className="h-100 form-control w-100  search-input d-flex align-items-center p-0" />
                            </div>
                </Col>
                <Col xs={12} md={5} lg={2} className="d-flex flex-row space-3 p-0 min-w-max">
                    <Col onClick={() => setRotate(!rotate)} >
                        <Dropdown className="d-flex h-100">
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
                <Col xs={12} md={3} lg={2} className="d-flex flex-column space-3 p-0 min-w-max ">
                    <button className="w-100 btn-main p-3">{translations[currentLanguage].searchPlaceholder}</button>
                </Col>
            </Row >
        </div>
    );
};

export default FinishingSearch;
