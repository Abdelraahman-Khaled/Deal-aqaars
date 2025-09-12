import { Tab, Tabs } from "react-bootstrap";
import "./TabsContent.css";

const TabsContent = ({ tabsData, newClassTabsContent, onSelect }) => {
    return (
        <div className={`${newClassTabsContent} tabs-content-info`}>
            <Tabs
                defaultActiveKey={tabsData[0].eventKey}
                id="uncontrolled-tab-example"
                onSelect={(key) => {
                    if (onSelect) {
                        const selectedTab = tabsData.find((tab) => tab.eventKey === key);
                        if (selectedTab) {
                            onSelect(selectedTab.value || selectedTab.eventKey);
                            // ✅ لو فيه value يرجعها، لو مفيش يرجع eventKey
                        }
                    }
                }}
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
