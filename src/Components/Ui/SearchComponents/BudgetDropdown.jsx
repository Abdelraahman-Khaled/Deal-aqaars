// components/BudgetDropdown.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import ReactSlider from "react-slider";
import MenuArrow from "../../../assets/Icons/MenuArrow";
import { useLanguage } from "../../../Components/Languages/LanguageContext";  // Assuming you have LanguageContext

const BudgetDropdown = ({ budget, setBudget, rotate }) => {
    const { currentLanguage } = useLanguage(); // Get the current language

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

    // Adjust the budget state to round values based on minDistance
    const handleSliderChange = (newValue) => {
        const roundedValue = [
            Math.round(newValue[0] / 100000) * 100000,
            Math.round(newValue[1] / 100000) * 100000,
        ];
        setBudget(roundedValue);
    };
    const budgetText = `${(budget[0]).toLocaleString()} : ${(budget[1]).toLocaleString()}`;

    return (
        <Dropdown className="d-flex budget">
            <Dropdown.Toggle variant="light" className="w-100 text-end">
                {budget[0] === 1000000 ? text.budget : budgetText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <div className="px-3 pt-4 pb-3">
                    <ReactSlider
                        className="slider-ar"
                        thumbClassName="slider-handle"
                        trackClassName="slider-track"
                        value={budget}
                        min={1000000}
                        max={5000000}
                        step={100000}  /* Set step to 100000 to make the slider move by this value */
                        onChange={handleSliderChange}  // Use the handleSliderChange function
                        pearling
                        minDistance={100000}
                    />
                    <div className="d-flex justify-content-between mt-4">
                        <p className="b-12">{budget[1].toLocaleString()} {currentLanguage === "ar" ? "ج.م" : "EGP"}</p>
                        <p className="b-12">{budget[0].toLocaleString()} {currentLanguage === "ar" ? "ج.م" : "EGP"}</p>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main btn-reset btn-confirm w-100" onClick={() => setBudget([1000000, 50000000])}>{text.reset}</button>
                        <button className="btn-main btn-confirm w-100 border">{text.done}</button>
                    </div>
                </div>
            </Dropdown.Menu>
            <MenuArrow rotate={rotate} />
        </Dropdown>
    );
};

export default BudgetDropdown;
