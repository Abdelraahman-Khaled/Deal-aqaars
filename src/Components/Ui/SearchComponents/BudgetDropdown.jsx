// components/BudgetDropdown.js
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import ReactSlider from "react-slider";
import MenuArrow from "../../../assets/Icons/MenuArrow";
import { useLanguage } from "../../../Components/Languages/LanguageContext";  // Assuming you have LanguageContext

const BudgetDropdown = ({ budget, setBudget, rotate, buttons = true, title }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [tempBudget, setTempBudget] = useState(budget);

    // Update tempBudget when budget prop changes
    useEffect(() => {
        setTempBudget(budget);
    }, [budget]);

    // Translations based on current language
    const translate = {
        en: {
            budget: "Budget (EGP)",
            reset: "Reset Everything",
            done: "Done"
        },
        ar: {
            budget: "الميزانية (ج.م)",
            reset: "رجّع كل حاجة",
            done: "تمام"
        }
    };

    const text = translate[currentLanguage] || translate.en; // Fallback to English if language is not found

    // Adjust the temporary budget state to round values based on minDistance
    const handleSliderChange = (newValue) => {
        const roundedValue = [
            Math.round(newValue[0] / 100000) * 100000,
            Math.round(newValue[1] / 100000) * 100000,
        ];
        setTempBudget(roundedValue);
    };

    // Confirm budget changes
    const handleConfirm = () => {
        setBudget(tempBudget);
    };

    // Reset budget
    const handleReset = () => {
        const defaultBudget = [100000, 100000000];
        setTempBudget(defaultBudget);
        setBudget(defaultBudget);
    };

    const budgetText = `${(budget[1]).toLocaleString()} : ${(budget[0]).toLocaleString()}`;

    return (
        <Dropdown className="d-flex budget justify-content-between">
            <Dropdown.Toggle variant="light" className="w-100 text-end">
                {budget[0] === 100000 && budget[1] === 100000000 ? title || text.budget : budgetText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <div className="px-3 pt-4 pb-3">
                    <ReactSlider
                        className="slider-ar"
                        thumbClassName="slider-handle"
                        trackClassName="slider-track"
                        value={tempBudget}
                        min={100000}
                        max={100000000}
                        step={100000}  /* Set step to 100000 to make the slider move by this value */
                        onChange={handleSliderChange}  // Use the handleSliderChange function
                        pearling
                        minDistance={100000}
                    />
                    <div className="d-flex justify-content-between mt-4">
                        <p className="b-12">{tempBudget[1].toLocaleString()} {currentLanguage === "ar" ? "ج.م" : "EGP"}</p>
                        <p className="b-12">{tempBudget[0].toLocaleString()} {currentLanguage === "ar" ? "ج.م" : "EGP"}</p>
                    </div>
                    {buttons && <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main btn-reset btn-confirm w-100" onClick={handleReset}>{text.reset}</button>
                        <button className="btn-main btn-confirm w-100 border" onClick={handleConfirm}>{text.done}</button>
                    </div>}
                </div>
            </Dropdown.Menu>
            <MenuArrow rotate={rotate} />
        </Dropdown>
    );
};

export default BudgetDropdown;
