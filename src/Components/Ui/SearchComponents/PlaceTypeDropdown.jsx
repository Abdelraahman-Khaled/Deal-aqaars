// components/PlaceTypeDropdown.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import TabsContent from "../TabsContent/TabsContent";
import MenuArrow from "../../../assets/Icons/MenuArrow";

const PlaceTypeDropdown = ({ placeType, placeTypeDetails, tabsKind, rotate, onChange,newClass = "" }) => (
    <Dropdown className="d-flex">
        <Dropdown.Toggle variant="light" className="w-100 text-end">
            {placeType}{placeTypeDetails && " / " + placeTypeDetails}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <TabsContent tabsData={tabsKind} newClassTabsContent={`tabs-home place-kind ${newClass} `}onSelect={onChange} />
        </Dropdown.Menu>
        <MenuArrow rotate={rotate} />
    </Dropdown>
);

export default PlaceTypeDropdown;
