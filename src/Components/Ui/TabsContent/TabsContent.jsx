import { Tab, Tabs } from "react-bootstrap";
import "./TabsContent.css";
const TabsContent = ({ tabsData, newClassTabsContent }) => {

    return (
        <div className={`${newClassTabsContent} tabs-content-info`}>
            <Tabs
                defaultActiveKey={tabsData[0].eventKey}
                id="uncontrolled-tab-example"
            >
                {tabsData.map((tab) => (
                    <Tab key={tab.eventKey} eventKey={tab.eventKey} title={tab.title}>
                        {tab.content}
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};

export default TabsContent;
