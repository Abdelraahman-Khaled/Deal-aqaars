import React, { useState, useEffect } from "react";
import SearchToggle from "../SearchComponents/SearchToggle ";
import { translations } from "./translations";
import { useLanguage } from "../../../Components/Languages/LanguageContext";
import DropDown from "../../DropDown/DropDown";
import CompoundCard from "../CompoundCard/CompoundCard";
import Ads from "../../Auth/Ads/Ads";
import CompoundAPI from "../../../api/compoundApi";
import CompoundSkeleton from "../CompoundCard/CompoundSkeleton";
import "./Guide.css";

const CompoundGuidePage = ({ title }) => {
    const { currentLanguage } = useLanguage();
    const [toggle, setToggle] = useState("all");
    const [toggle1, setToggle1] = useState("nest");
    const [rotate, setRotate] = useState(false);
    const [compounds, setCompounds] = useState([]);
    const [loading, setLoading] = useState(false);

    const progressTabs = [
        { value: "inprogress", label: translations[currentLanguage].inProgress },
        { value: "ready", label: translations[currentLanguage].ready },
        { value: "all", label: translations[currentLanguage].received },
    ];

    const ShowType = [
        { value: "nest", label: translations[currentLanguage].nest },
        { value: "list", label: translations[currentLanguage].list },
    ];

    const organizing = ["الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"];

    const fetchCompounds = async () => {
        try {
            setLoading(true);
            // TODO: Add status filter based on toggle state when backend is ready
            // const filters = {};
            // if (toggle !== "all") {
            //   filters.status = toggle;
            // }

            const response = await CompoundAPI.getAllCompounds(); // Fetch all compounds for now
            if (response && response.data) {
                setCompounds(response.data);
            }
        } catch (error) {
            console.error("Error fetching compounds:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompounds();
    }, []); // Removed toggle dependency - will fetch once on mount


    return (
        <div className="guide compound d-flex flex-wrap flex-md-row justify-content-between">
            <div className="d-flex space-6 flex-column col-12 col-lg-8">
                <h6>
                    {title + " " + compounds.length + " " + "مشروع بأسعار كل الوحدات"}
                </h6>

                <div className="d-flex flex-wrap space-3 justify-content-between align-items-center">
                    {/* Status filter - UI ready but not functional yet */}
                    <div className="max-w-max mb-3 mb-md-0">
                        <SearchToggle
                            toggleState={toggle}
                            setToggleState={setToggle}
                            tabs={progressTabs}
                            newClass={"select-progress p-1"}
                        />
                    </div>

                    <div className="d-flex space-3 flex-wrap">
                        {/* Drop Down */}
                        <DropDown
                            title={"رتبها زي ما تحب"}
                            details={organizing}
                            rotate={rotate}
                            setRotate={setRotate}
                        />
                        <div className="max-w-max mb-3 mb-md-0">
                            <SearchToggle
                                toggleState={toggle1}
                                setToggleState={setToggle1}
                                tabs={ShowType}
                                newClass={"select-type p-1"}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap flex-row justify-content-between">
                    {loading && (
                        <div className="loading-container w-100">
                            <div className="d-flex flex-wrap justify-content-between w-100">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <CompoundSkeleton
                                        key={index}
                                        wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && compounds.length === 0 && (
                        <div className="no-properties">
                            <p>
                                {currentLanguage === "ar"
                                    ? "لا توجد كموندات متاحة"
                                    : "No compounds available"}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        compounds.map((compound, index) => {
                            return (
                                <CompoundCard
                                    id={compound._id}
                                    key={index}
                                    title={compound.name}
                                    details={compound.details.ar}
                                    location={compound.announcementLocation}
                                    price={compound.units[0]?.aqarDetails?.price}
                                    img={compound.compoundImages}
                                    company={true}
                                    connections={true}
                                    wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                                    advertiser={compound.contact}
                                />
                            );
                        })}
                </div>
            </div>

            {/* Ads */}
            <Ads />
        </div>
    );
};

export default CompoundGuidePage;
