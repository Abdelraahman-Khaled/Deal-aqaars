import React, { useState } from 'react'
import { Col, Dropdown } from "react-bootstrap";
import SearchToggle from '../../../Components/Ui/SearchComponents/SearchToggle ';
import { translations } from './translations';
import "./aqar.css"
import { useLanguage } from '../../../Components/Languages/LanguageContext';
import MultiSelect from '../../../Components/Forms/MultiSelect';
import MenuArrow from '../../../assets/Icons/MenuArrow';
import BudgetDropdown from '../../../Components/Ui/SearchComponents/BudgetDropdown';
import PlaceTypeDropdown from '../../../Components/Ui/SearchComponents/PlaceTypeDropdown ';
import TabsContent from '../../../Components/Ui/TabsContent/TabsContent';

const AqarDetails = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [finishing, setFinishing] = useState(translations[currentLanguage].Want);
    const [delivary, setDelivary] = useState(translations[currentLanguage].WantDelivary);
    const [toggle1, setToggle1] = useState("cash");
    const [toggle2, setToggle2] = useState("all");
    const [rotate, setRotate] = useState(false);
    const [rotateBudget, setRotateBudget] = useState(false);
    const [budget, setBudget] = useState([1000000, 50000000]);
    const [rotatePlace, setRotatePlace] = useState(false);
    const [placeType, setPlaceType] = useState("نوع المكان");
    const [placeTypeDetails, setPlaceTypeDetails] = useState("");
    const [rooms, setRooms] = useState("");
    const [baths, setBaths] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);


    const tabs = [
        { value: "cash", label: translations[currentLanguage].sale },
        { value: "installment", label: translations[currentLanguage].rent }
    ];

    const multiOptions = [
        { value: "1", text: "أكتوبر", selected: false },
        { value: "2", text: "المعادي", selected: false },
        { value: "3", text: "بلبن", selected: false },
        { value: "4", text: "السادات", selected: false },
        { value: "5", text: "إسكندرية", selected: false },
    ];

    const progressTabs = [
        { value: "all", label: translations[currentLanguage].all },
        { value: "ready", label: translations[currentLanguage].ready },
        { value: "inprogress", label: translations[currentLanguage].inProgress }
    ];

    // finishing tabs
    const tabsFinishing = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].allItemsFinishing.map((item, index) => (
                                <p key={index} className={`b-12 pick bg-light-gray d-flex space-2`}
                                    onClick={() => setFinishing(item)}>
                                    {finishing === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];

    // delivery date
    const deliveryDate = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].allItemsDelivary.map((item, index) => (
                                <p key={index} className={`b-12 pick bg-light-gray d-flex space-2`}
                                    onClick={() => setDelivary(item)}>
                                    {delivary === item}
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

    // rooms
    const tabsrooms = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
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
                            options={multiOptions}
                            defaultSelected={[]}
                            onChange={(values) => setSelectedValues(values)}
                        />
                    </div>
                </div>

                {/* Place Type */}
                <div className="col-12 col-md-6 col-lg-2" onClick={() => setRotatePlace(!rotatePlace)}>
                    <PlaceTypeDropdown placeType={placeType} placeTypeDetails={placeTypeDetails} tabsKind={tabsKind} rotate={rotatePlace} />
                </div>

                {/* Rooms & Baths */}
                <div className="col-12 col-md-6 col-lg-2 min-w-max" onClick={() => setRotate(!rotate)}>
                    <Dropdown className="d-flex h-100 ">
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
                <div className="col-12 col-md-6 col-lg-2" onClick={() => setRotateBudget(!rotateBudget)}>
                    <BudgetDropdown rotate={rotateBudget} budget={budget} setBudget={setBudget} />
                </div>
            </div>
        </div>

    )
}


export default AqarDetails