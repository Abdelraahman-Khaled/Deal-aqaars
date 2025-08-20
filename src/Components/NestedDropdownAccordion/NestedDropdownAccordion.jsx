import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import MenuArrow from '../../assets/Icons/MenuArrow';
import './nest.css'
const NestedDropdownAccordion = ({ data, title, placeholder }) => {
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleOptionSelect = (sectionId, optionId, optionLabel) => {
        setSelectedValues((prev) => ({
            ...prev,
            [sectionId]: optionLabel,
        }));
    };

    const getSelectedText = () => {
        const selectedCount = Object.keys(selectedValues).length;
        if (selectedCount === 0) return placeholder;
        if (selectedCount === 1) return Object.values(selectedValues)[0];
        return `${selectedCount} عناصر محددة`;
    };

    return (
        <div className="w-100 mb-4">
            {/* Title */}
            {title &&
                <div className=" mb-2">
                    <p className="b-12">{title} <span className="text-danger">*</span></p>
                </div>
            }
            {/* Main Dropdown */}
            <div className="position-relative">
                <button
                    className={`form-control d-flex justify-content-between align-items-center ${isMainOpen ? 'border-primary' : ''
                        }`}
                    type="button"
                    onClick={() => setIsMainOpen(!isMainOpen)}
                >
                    <p
                        className={`flex-grow-1 text-start ${Object.keys(selectedValues).length > 0 ? '' : 'b-16'
                            }`}
                    >
                        {getSelectedText()}
                    </p>
                    {isMainOpen ? (
                        <MenuArrow size={16} className="ms-2" />
                    ) : (
                        <MenuArrow size={16} className="ms-2" />
                    )}
                </button>

                {isMainOpen && (
                    <div className="dropdown-menu show w-100 mt-1 p-0 shadow overflow-auto" style={{ maxHeight: '300px' }}>
                        {data.map((section) => (
                            <div key={section.id} className="border-bottom">
                                {/* Section Header */}
                                <button
                                    type="button"
                                    className="dropdown-item d-flex justify-content-between align-items-center py-2"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <p>{section.title}</p>
                                    <MenuArrow
                                        size={16}
                                        className={expandedSections.includes(section.id) ? 'rotate-180' : ''}
                                    />
                                </button>

                                {/* Options */}
                                {expandedSections.includes(section.id) && (
                                    <div className="bg-light">
                                        {section.options.map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                className={`dropdown-item ps-5 text-start ${selectedValues[section.id] === option.label
                                                    ? 'bg-primary text-white'
                                                    : ''
                                                    }`}
                                                onClick={() =>
                                                    handleOptionSelect(section.id, option.id, option.label)
                                                }
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NestedDropdownAccordion;
