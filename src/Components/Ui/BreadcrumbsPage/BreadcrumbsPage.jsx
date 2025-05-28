import { Link } from "react-router-dom";
import "./BreadcrumbsPage.css";
import BreadcrumbsIcon from "../../../assets/Icons/BreadcrumbsIcon";
import SmallLeftIcon from "../../../assets/Icons/SmallLeftIcon";
import ContainerMedia from "../../ContainerMedia/ContainerMedia";
import { useLanguage } from "../../Languages/LanguageContext";

const BreadcrumbsPage = ({
    newClassBreadHeader,
    routeTitleTwoBread = "/",
    titleTwoBread = null,
    textBreadActive,
    mainTitle,
    mainRoute
}) => {
    const { currentLanguage } = useLanguage(); // Get the current language

    return (
        <div
            className={`breadcrumb-page position-relative z-1 ${newClassBreadHeader}`}
        >
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb gap-1">
                    {/* First Breadcrumb: Home */}
                    <li className="breadcrumb-item">
                        <Link
                            to={mainRoute}
                            className="link-bread d-flex align-items-center gap-2"
                        >
                            <BreadcrumbsIcon />
                            <SmallLeftIcon />
                            {mainTitle}
                        </Link>
                    </li>

                    {/* Chevron Icon */}
                    <li className="breadcrumb-item">
                        <div className="icon-chevron--1">
                            <SmallLeftIcon />
                        </div>
                    </li>

                    {/* Second Breadcrumb: Conditional Rendering for titleTwoBread */}
                    {titleTwoBread && (
                        <>
                            <li className="breadcrumb-item">
                                <Link
                                    to={routeTitleTwoBread}
                                    className="link-bread d-flex align-items-center gap-2"
                                >
                                    {titleTwoBread}
                                </Link>
                            </li>

                            {/* Chevron Icon */}
                            <li className="breadcrumb-item">
                                <div className="icon-chevron--1">
                                    <SmallLeftIcon />
                                </div>
                            </li>
                        </>
                    )}
                    {/* Active Breadcrumb */}
                    <li
                        className="breadcrumb-item active d-flex align-items-center gap-2"
                        aria-current="page"
                    >
                        {textBreadActive}
                    </li>
                </ol>
            </nav>
        </div>
    );
};


export default BreadcrumbsPage;