// components/RoomsAndBathsDropdown.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import TabsContent from "../TabsContent/TabsContent";

const RoomsAndBathsDropdown = ({ rooms, baths, tabsrooms }) => {
    const displayText = () => {
        if (rooms === "" && baths === "") return "عدد الاوض & الحمامات";
        return `عدد الاوض ${rooms} / ${baths} حمام`;
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" className="w-100 text-end">
                {displayText()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <TabsContent tabsData={tabsrooms} newClassTabsContent="tabs-home rooms" />
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default RoomsAndBathsDropdown;
