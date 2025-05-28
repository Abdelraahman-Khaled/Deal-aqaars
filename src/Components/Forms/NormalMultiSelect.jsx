import React, { useState, useRef, useEffect } from "react";
import "./MutliSelect.css";
import CloseIcon from "../../assets/Icons/CloseIcon";

const NormalMultiSelect = ({
    label,
    options,
    defaultSelected = [],
    onChange,
    disabled = false,
    size = "md", // You can pass a size prop ('sm', 'md', 'lg') to control the size
}) => {
    const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };

    const handleSelect = (optionValue) => {
        const newSelectedOptions = selectedOptions.includes(optionValue)
            ? selectedOptions.filter((value) => value !== optionValue)
            : [...selectedOptions, optionValue];

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    };

    const removeOption = (value) => {
        const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    };

    const selectedValuesText = selectedOptions.map(
        (value) => options.find((option) => option.value === value)?.text || ""
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Size classes for different sizes
    const sizeClasses = {
        sm: "p-1 text-muted",
        md: "p-2 text-muted",
        lg: "p-3 text-muted",
    };

    return (
        <div className="w-100">
            {/* <label className="mb-2 d-block text-muted">{label}</label> */}

            <div className="position-relative w-100" ref={dropdownRef}>
                <div className="d-flex flex-column align-items-start">
                    <div onClick={toggleDropdown} className="w-100">
                        <div className={`mb-2  d-flex align-items-center border rounded p-2 ${sizeClasses[size]}`}>
                            <div className="d-flex flex-wrap gap-2">
                                {selectedValuesText.length > 0 ? (
                                    selectedValuesText.map((text, index) => (
                                        <div
                                            key={index}
                                            className="badge   d-flex align-items-center  border"
                                        >
                                            <p className="me-2">{text}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeOption(selectedOptions[index]);
                                                }}
                                                className="btn btn-sm p-0 border-0"
                                            >
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ color: "var(--netural-500)" }}>مثلاً: سباكة، جبس بورد، دهانات... إلخ</p>
                                )}
                            </div>
                            <div className="ms-auto">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click propagation
                                        toggleDropdown();
                                    }}
                                    className="btn btn-sm btn-link text-secondary"
                                >
                                    <svg
                                        className={`stroke-current ${isOpen ? "transform rotate-180" : ""}`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div
                            className="mutli-search absolute start-0 z-1 w-100  rounded shadow-sm mt-1"
                            onClick={(e) => e.stopPropagation()}
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                        >
                            <div className=" d-flex flex-column">
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer py-2 px-3 dropdown-item rounded-0`}
                                        style={selectedOptions.includes(option.value) ? { background: "var(--primary)", color: "var(--netural-100)" } : {}}
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        {option.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default NormalMultiSelect;
