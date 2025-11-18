import React, { useEffect, useState } from 'react';
import { Col, Dropdown } from "react-bootstrap";
import TabsContent from '../../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../../assets/Icons/MenuArrow';
import { translations } from './translations';
import { useLanguage } from '../../Languages/LanguageContext';
import "./FFBar.css"
import SearchToggle from '../SearchComponents/SearchToggle ';
import FinishCardContainer from '../FinishCard/FinishCardContainer';
import { MultiSelect } from 'primereact/multiselect';
import data from '../../../data/cities.json';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useFinishing } from '../../../contexts/FinishingContext';

const FFBar = () => {
    const { currentLanguage } = useLanguage();
    const { finishingServices, loading, error, fetchFinishingServices } = useFinishing();

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [filterState, setFilterState] = useState({
        division: params.get("division") || "furnishing",
        city: params.get("city") || "",
        servicesOffered: params.get("servicesOffered") || "",
    });

    // ---------------------------
    // (1) Sync filterState with URL params
    // ---------------------------
    useEffect(() => {
        const newFilters = {
            division: params.get("division") || "furnishing",
            city: params.get("city") || "",
            servicesOffered: params.get("servicesOffered") || "",
        };

        // Avoid infinite loop by comparing old vs new
        setFilterState(prev =>
            JSON.stringify(prev) === JSON.stringify(newFilters)
                ? prev
                : newFilters
        );
    }, [params]);

    // ---------------------------
    // (2) Fetch finishing services when filterState changes
    // ---------------------------
    useEffect(() => {
        fetchFinishingServices(filterState);
    }, [filterState]);

    // ---------------------------
    // Local UI States
    // ---------------------------
    const [rotate, setRotate] = useState(false);

    // Convert comma-separated cities → array
    const cityArray = filterState.city ? filterState.city.split(",") : [];

    const [selectedCities, setSelectedCities] = useState(cityArray);
    const [toggle, setToggle] = useState(filterState.division);
    const [home, setHome] = useState(filterState.servicesOffered || translations[currentLanguage].Want);

    // Cities list
    const cities = data.map((item) => ({
        name: item.city_name_ar,
        value: item.city_name_en,
    }));

    // ---------------------------
    // (3) Update URL (trigger fetch automatically)
    // ---------------------------
    const updateURL = (changes) => {
        const newQuery = new URLSearchParams({
            division: changes.division ?? toggle,
            city: (changes.city ?? selectedCities)?.join(",") || "",
            servicesOffered: changes.servicesOffered ?? home,
        }).toString();

        navigate(`/finish?${newQuery}`);
    };

    // ---------------------------
    // (4) Handlers
    // ---------------------------

    const handleDivisionChange = (value) => {
        setToggle(value);
        updateURL({ division: value });
    };

    const handleCitiesChange = (e) => {
        setSelectedCities(e.value);
        updateURL({ city: e.value });
    };

    const handleHomeChange = (value) => {
        setHome(value);
        updateURL({ servicesOffered: value });
    };

    // ---------------------------
    // Tabs Data
    // ---------------------------
    const tabs = [
        { value: "furnishing", label: translations[currentLanguage].furnish },
        { value: "finishing", label: translations[currentLanguage].finish }
    ];

    const tabshome = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {translations[currentLanguage].allItems.map((item, index) => (
                            <p key={index}
                                className={`b-12 pick bg-light-gray d-flex space-2`}
                                onClick={() => handleHomeChange(item)}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            )
        },
    ];

    // ---------------------------
    // RENDER
    // ---------------------------
    return (
        <div className="advanced-search  compound  d-flex space-3 flex-column p-0">

            <div className="d-flex flex-wrap gap-2 align-items-center">

                {/* Division Toggle */}
                <div className="col-md-2 col-12 d-flex flex-column space-3" style={{ minWidth: "max-content" }}>
                    <div className="select-type tabs-home justify-content-center">
                        <SearchToggle
                            toggleState={toggle}
                            setToggleState={handleDivisionChange}
                            tabs={tabs}
                        />
                    </div>
                </div>

                {/* Cities MultiSelect */}
                <Col className="d-flex flex-row space-3">
                    <div className="position-relative w-100">
                        <MultiSelect
                            value={selectedCities}
                            onChange={handleCitiesChange}
                            options={cities}
                            optionLabel="name"
                            optionValue="value"
                            display="chip"
                            placeholder={filterState.city || "جميع المحافظات"}
                            maxSelectedLabels={3}
                            filter
                            className="h-100 form-control w-100 search-input d-flex align-items-center p-1"
                        />
                    </div>
                </Col>

                {/* Services Offered */}
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

            <FinishCardContainer
                finishingServices={finishingServices}
                loading={loading}
                error={error}
            />

        </div>
    );
};

export default FFBar;
