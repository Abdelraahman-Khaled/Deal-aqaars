import React, { useState } from 'react'
import { Col, Dropdown } from "react-bootstrap";
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import SearchToggle from '../../../../Components/Ui/SearchComponents/SearchToggle ';
import MultiSelect from '../../../../Components/Forms/MultiSelect';
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../../../assets/Icons/MenuArrow';
import { translations } from './translations';
import "./compound.css"
import BudgetDropdown from '../../../../Components/Ui/SearchComponents/BudgetDropdown';
import PlaceTypeDropdown from '../../../../Components/Ui/SearchComponents/PlaceTypeDropdown';

const CompoundList = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [finishing, setFinishing] = useState(translations[currentLanguage].Want);
    const [delivary, setDelivary] = useState(translations[currentLanguage].WantDelivary);
    const [toggle1, setToggle1] = useState("cash");
    const [rotate, setRotate] = useState(false);
    const [rotateDelivary, setRotatedelivary] = useState(false);
    const [rotateBudget, setRotateBudget] = useState(false);
    const [budget, setBudget] = useState([1000000, 50000000]);
    const [rotatePlace, setRotatePlace] = useState(false);
    const [placeType, setPlaceType] = useState("نوع المكان");
    const [placeTypeDetails, setPlaceTypeDetails] = useState("");


    const tabs = [
        { value: "cash", label: translations[currentLanguage].cash },
        { value: "installment", label: translations[currentLanguage].installment }
    ];

    const multiOptions = [
        { value: "1", text: "أكتوبر", selected: false },
        { value: "2", text: "المعادي", selected: false },
        { value: "3", text: "بلبن", selected: false },
        { value: "4", text: "السادات", selected: false },
        { value: "5", text: "إسكندرية", selected: false },
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


    return (
        <div className="advanced-search  compound  d-flex space-3 flex-column p-0">
            <div className="row gap-2 align-items-center " >
                <Col className="d-flex flex-row space-3 " >
                    <Col onClick={() => setRotate(!rotate)}>
                        <Dropdown className="d-flex" >
                            <Dropdown.Toggle variant="light" className="w-100 text-end">
                                {finishing}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <TabsContent
                                    tabsData={tabsFinishing}
                                    newClassTabsContent={"tabs-home rooms"}
                                />
                            </Dropdown.Menu>
                            <MenuArrow rotate={rotate} />
                        </Dropdown>
                    </Col>
                </Col>
                {/* Search Input */}
                <Col className="d-flex flex-row space-3">
                    <div className="position-relative w-100">
                        <MultiSelect
                            options={multiOptions}
                            defaultSelected={[]}
                            onChange={(values) => setSelectedValues(values)}
                        />
                    </div>
                </Col>


                {/* Types */}
                <div className="col-md-2 col-12 d-flex flex-column space-3 max-w-max" style={{ minWidth: "max-content" }}>
                    <div className="select-type tabs-home justify-content-center">
                        <SearchToggle
                            toggleState={toggle1}
                            setToggleState={setToggle1}
                            tabs={tabs}
                        />
                    </div>
                </div>


                {/* Delivery date */}
                <Col className="d-flex flex-row space-3 " >
                    <Col onClick={() => setRotatedelivary(!rotateDelivary)}>
                        <Dropdown className="d-flex" >
                            <Dropdown.Toggle variant="light" className="w-100 text-end">
                                {delivary}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <TabsContent
                                    tabsData={deliveryDate}
                                    newClassTabsContent={"tabs-home rooms"}
                                />
                            </Dropdown.Menu>
                            <MenuArrow rotate={rotateDelivary} />
                        </Dropdown>
                    </Col>
                </Col>

                {/* Budget */}
                {/* Filters */}
                <Col onClick={() => setRotateBudget(!rotateBudget)}>
                    <BudgetDropdown rotate={rotateBudget} budget={budget} setBudget={setBudget} />
                </Col>

                {/* type */}
                <Col onClick={() => setRotatePlace(!rotatePlace)}>
                    <PlaceTypeDropdown placeType={placeType} placeTypeDetails={placeTypeDetails} tabsKind={tabsKind} rotate={rotatePlace} />
                </Col>
            </div>
        </div>
    )
}

export default CompoundList