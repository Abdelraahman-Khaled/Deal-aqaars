import React, { useState } from 'react'
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import SpaceBox from '../../../../Components/Ui/SpaceBox/SpaceBox';

const CompoundTaps = ({ unitData }) => {

    const saleUnits = unitData.unitsByType.sale 
    const rentUnits = unitData.unitsByType.rent
     

    const tabs = [
        {
            eventKey: "tab1",
            title: (
                <>
                    {"للبيع"}
                </>
            ),
            content: (
                <>
                    <SpaceBox data={saleUnits} />
                </>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <>
                    {"للايجار"}
                </>
            ),
            content: (
                <>
                    <SpaceBox data={rentUnits} />
                </>
            )
        },
    ];

    return (
        <div className="compound-taps space-4 d-flex flex-column w-100">
            <p className='b-5'>وحدات الكمباوند</p>
            <TabsContent
                tabsData={tabs}
                newClassTabsContent={""}
            />
        </div>
    )
}

export default CompoundTaps