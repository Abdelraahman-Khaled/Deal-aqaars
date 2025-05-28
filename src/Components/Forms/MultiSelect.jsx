import React, { useState, useRef, useEffect } from "react";
import LocationIcon from "../../assets/Icons/LocationIcon";
import CloseIcon from "../../assets/Icons/CloseIcon";
import "./MutliSelect.css";

const MultiSelect = ({ label, options, placeholder, defaultSelected = [], onChange, disabled = false }) => {
    const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0); // Focus input
        }
    };

    const handleSelect = (optionValue) => {
        const newSelectedOptions = selectedOptions.includes(optionValue)
            ? selectedOptions.filter((val) => val !== optionValue)
            : [...selectedOptions, optionValue];
        setSelectedOptions(newSelectedOptions);
        setSearchText("");
        if (onChange) onChange(newSelectedOptions);
    };

    const removeOption = (value) => {
        const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
        setSelectedOptions(newSelectedOptions);
        if (onChange) onChange(newSelectedOptions);
    };

    const selectedValuesText = selectedOptions.map((value) => {
        const match = options.find((option) => option.value === value);
        return match ? match.text : "";
    });

    const filteredOptions = options.filter((opt) =>
        opt.text.toLowerCase().includes(searchText.toLowerCase()) &&
        !selectedOptions.includes(opt.value)
    );

    return (
        <div className="w-100" ref={wrapperRef}>
            <div className="position-relative w-100">
                <div
                    className={`form-control search-input d-flex align-items-center gap-2  ${isOpen ? "foucs" : ""}`}
                    onClick={toggleDropdown}
                    style={{ minHeight: "3rem", cursor: disabled ? "not-allowed" : "text" }}
                >
                    <div>
                        <LocationIcon color="#173794" />
                    </div>

                    {selectedValuesText.map((text, index) => (
                        <div key={index} className="badge b-12 d-flex align-items-center">
                            <span className="me-1">{text}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(selectedOptions[index]);
                                }}
                                className="btn btn-sm p-0 border-0 "
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    ))}

                    <input
                        type="text"
                        className="flex-grow-1 border-0 outline-0 "
                        placeholder={placeholder || "دور على المدينة أو الحي أو الشارع"}
                        onChange={(e) => setSearchText(e.target.value)}
                        onFocus={toggleDropdown}
                        value={searchText}
                        ref={inputRef}
                        style={{ minWidth: "100px", display:"flex"}}
                        disabled={disabled}
                    />

                    <span className="ms-auto">
                        <i className={`bi bi-chevron-${isOpen ? "up" : "down"}`}></i>
                    </span>
                </div>

                {isOpen && (
                    <div
                        className="mutli-search position-absolute bg-white border w-100 mt-1 rounded shadow-sm"
                        style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1050 }}
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="dropdown-item p-2 m-1"
                                    onClick={() => handleSelect(option.value)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {option.text}
                                </div>
                            ))
                        ) : (
                            <div className="dropdown-item text-muted">لا توجد نتائج</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
