// components/SearchToggle.js
import React from "react";
import NestIcon from "../../../assets/Icons/NestIcon";
import ListIcon from "../../../assets/Icons/ListIcon";

const SearchToggle = ({ toggleState, setToggleState, tabs = [], progress = false, newClass, nest = false, list = false }) => (
    <>
        <ul className={`nav nav-tabs  ${newClass ? newClass : ""} ${progress ? "select-progress" : ""}`} id="uncontrolled-tab-example" role="tablist">
            {tabs.map((tab, index) => (
                <li className="nav-item" role="presentation" key={index}>
                    <button
                        type="button"
                        role="tab"
                        className={`nav-link d-flex space-2 b-11 ${toggleState === tab.value && "active"}`}
                        onClick={() => setToggleState(tab.value)}>
                        {tab.label === ("شبكة" || "Nest") && <NestIcon />}
                        {tab.label === ("لسته" || "List") && <ListIcon />}
                        {tab.label}
                    </button>
                </li>
            ))}
        </ul>
    </>
);

export default SearchToggle;
