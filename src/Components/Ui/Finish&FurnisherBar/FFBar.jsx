import React, { useState } from 'react'
import { Col, Dropdown } from "react-bootstrap";
import MultiSelect from '../../../Components/Forms/MultiSelect';
import TabsContent from '../../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../../assets/Icons/MenuArrow';
import { translations } from './translations';
import { useLanguage } from '../../Languages/LanguageContext';
import "./FFBar.css"
import SearchToggle from '../SearchComponents/SearchToggle ';
import FinishCardContainer from '../FinishCard/FinishCardContainer';


const FFBar = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [home, setHome] = useState(translations[currentLanguage].Want);
    const [rotate, setRotate] = useState(false);
    const [toggle, setToggle] = useState("finish");


    const tabs = [
        { value: "furnish", label: translations[currentLanguage].furnish },
        { value: "finish", label: translations[currentLanguage].finish }
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


    return (
        <div className="advanced-search  compound  d-flex space-3 flex-column p-0">
            <div className="d-flex flex-wrap gap-2 align-items-center  " >

                {/* Types */}
                <div className="col-md-2 col-12 d-flex flex-column space-3" style={{ minWidth: "max-content" }}>
                    <div className="select-type tabs-home justify-content-center">
                        <SearchToggle
                            toggleState={toggle}
                            setToggleState={setToggle}
                            tabs={tabs}
                        />
                    </div>
                </div>

                {/* Search Input */}
                <Col className="d-flex flex-row space-3">
                    <div className="position-relative w-100">
                        <MultiSelect
                            options={multiOptions}
                            defaultSelected={[]}
                            onChange={(values) => setSelectedValues(values)}
                            placeholder={"فين المكان"}
                        />
                    </div>
                </Col>
                <Col xs={12} md={2} className="d-flex flex-row space-3">
                    <Col onClick={() => setRotate(!rotate)} >
                        <Dropdown className="d-flex">
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
            </div>
            {toggle === "furnish" ? <FinishCardContainer /> : <FinishCardContainer />}

        </div>
    )
}

export default FFBar