import "./NavbarMenu.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ContainerMedia from "../ContainerMedia/ContainerMedia";
import LanguageSwitcher from "../Languages/LanguageSwitcher";
import UserDropMenu from "../Ui/UserDropMenu/UserDropMenu";
import { useLanguage } from "../Languages/LanguageContext";
import { Dropdown } from "react-bootstrap";
import NavItem from 'react-bootstrap/NavItem';
import MenuArrow from "../../assets/Icons/MenuArrow";
import Bell from "./Bell";
import CustomModal from "../CustomModal/CustomModal";
import BuildingIcon from "../../assets/Icons/BuildingIcon";
import HouseSimpleIcon from "../../assets/Icons/HouseSimpleIcon";
import PaintBrushIcon from "../../assets/Icons/PaintBrushIcon";
import SwapModalIcon from "../../assets/Icons/SwapModalIcon";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserType } from "../../store/userTypeSlice";
import { PersonJoin } from "../Ui/PersonJoin/PersonJoin";
import RequestProgress from "../Ui/PersonJoin/RequestProgress";
import { CompanyJoin } from "../Ui/CompanyJoin/CompanyJoin";
import Land from "../../assets/Icons/Land";
import Commercial from "../../assets/Icons/Commercial";
import Industrial from "../../assets/Icons/Industrial";


const content = {
    sale: { ar: "عقارات", en: "ٌReal estate" },
    rent: { ar: "كموبندات", en: "Compounds" },
    trade: { ar: "تبديل", en: "Trade" },
    finishing: { ar: "تشطيبات", en: "Finishing" },
    announce: { ar: "اعلن", en: "Announce" },
    login: { ar: "ادخل لحسابك", en: "Login" },
    personJoin: { ar: "انضم كمالك", en: "Join as an owner" },
    companyJoin: { ar: "انضم كشركة", en: "Join as a company" },
    finishMenu: {
        finish: { ar: "شطب بيتك", en: "Renovate Your Home" },
        furnish: { ar: "افرش بيتك", en: "Furnish Your Home" },
    },
}
const announcementPerson = [
    { id: 1, text: "اعلن عن عقارك", icon: <HouseSimpleIcon />, link: "join-aqar" },
    { id: 2, text: "اعلن عن اي حاجه عايز تبدلها", icon: <SwapModalIcon />, link: "join-trade" },
    { id: 3, text: "اعلن عن أرض", icon: <Land />, link: "joinLand" },
    { id: 4, text: "اعلن عن وحدة تجارية", icon: <Commercial />, link: "joinCommercial" },
    { id: 5, text: "اعلن عن وحدة صناعية", icon: <Industrial />, link: "joinIndustrial" },
];
const announcementCompany = [
    { id: 1, text: "اعلن عن عقار", icon: <HouseSimpleIcon />, link: "join-aqar" },
    { id: 2, text: "اعلن عن مشروع عقاري", icon: <BuildingIcon />, link: "join-compound" },
    { id: 3, text: "اعلن عن خدمات التشطيب", icon: <PaintBrushIcon />, link: "join-finish" },
];

const NavbarMenu = () => {
    const { currentLanguage } = useLanguage(); // Get the current language from the context
    const [isMenuFixed, setMenuFixed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPerson, setShowPerson] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setMenuFixed(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { user } = useSelector((state) => state.auth);
    const userType = useSelector((state) => state.userType.userType);
    const dispatch = useDispatch();


    if (user?.role === "user") {
        dispatch(setUserType("user"));
    } else if (user?.companyId !== null) {
        dispatch(setUserType("company"));
    } else if (user?.role === "vendor") {
        dispatch(setUserType("vendor"));
    } else {
        dispatch(setUserType("user"));
    }



    return (
        <>
            <Navbar expand="lg" className={`navbar-menu z-3 ${isMenuFixed ? "menu-fixed" : ""}`}>
                <ContainerMedia>
                    <Navbar.Brand data-aos="fade-left">
                        <Link to="/" className="image-logo">
                            <img src={logo} alt="logo" />
                        </Link>
                    </Navbar.Brand>
                    {/* Small Screen */}
                    {/* Language */}
                    <div className="main-info-left d-flex align-items-center gap-3 d-lg-none">
                        <div className="icon-lang icon-border d-none">
                            {/* <LanguageSwitcher /> */}
                        </div>
                        <span className="break-span"></span>
                        {/* Bell */}
                        <div className="icon-lang icon-border d-none">
                            <Bell />
                        </div>
                        <span className="break-span"></span>
                        {/* if auth */}
                        {user ? (
                            <>
                                <UserDropMenu />
                                {userType === "vendor" || userType === "company" ?
                                    <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                        {content.announce[currentLanguage]}
                                    </button>
                                    :
                                    <>
                                        <button onClick={() => setShowPerson(true)} className="btn-main b-11 " style={{ minWidth: "130px" }}>
                                            {content.personJoin[currentLanguage]}
                                        </button>
                                        <button onClick={() => setShowCompany(true)} className="btn-main b-11 btn-second border" style={{ minWidth: "130px", borderColor: "var(--primary) !important" }}>
                                            {content.companyJoin[currentLanguage]}
                                        </button>
                                    </>
                                }
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="d-sm-none">
                                    <button className="btn-main btn-second b-11">
                                        {content.login[currentLanguage]}
                                    </button>
                                </Link >
                                <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                    {content.announce[currentLanguage]}
                                </button>
                            </>
                        )}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav" className="nav-menu">
                        <Nav className="me-auto space-4" data-aos="fade-right ">
                            {/* sale */}
                            <NavLink className="nav-link b-11" to="/realestate">
                                {content.sale[currentLanguage]}
                            </NavLink>
                            {/* rent */}
                            <NavLink className="nav-link b-11" to="/compounds">
                                {content.rent[currentLanguage]}
                            </NavLink>
                            {/* trade */}
                            <NavLink className="nav-link b-11" to="/trade">
                                {content.trade[currentLanguage]}
                            </NavLink>
                            {/* Drop Down */}
                            <Dropdown className="nav-drop-down" as={NavItem}>
                                {/* finishing */}
                                <Dropdown.Toggle className="nav-link b-11" as={NavLink}>
                                    {content.finishing[currentLanguage]}
                                    <MenuArrow />
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item className="finishing">
                                        {/* finish */}
                                        <NavLink className=" b-11" style={{ color: " var(--netural-1000)" }} to="/finish">
                                            {content.finishMenu.finish[currentLanguage]}
                                        </NavLink>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="finishing">
                                        {/* furnish */}
                                        <NavLink className="  b-11" style={{ color: " var(--netural-1000)" }} to="/finish">
                                            {content.finishMenu.furnish[currentLanguage]}
                                        </NavLink>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        <div className="left-nav-menu d-flex align-items-center gap-3 ">
                            {/* Language */}
                            <div className="icon-lang icon-border d-lg-flex" >
                                {/* <LanguageSwitcher /> */}
                            </div>
                            <span className="break-span"></span>
                            {/* Bell */}
                            <div className="icon-lang icon-border d-lg-flex">
                                <Bell />
                            </div>
                            <span className="break-span"></span>
                            {/* if auth */}
                            {user ? (
                                <>
                                    <span className="d-none d-lg-flex">
                                        <UserDropMenu />
                                    </span>
                                    {userType === "vendor" || userType === "company" ?
                                        <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                            {content.announce[currentLanguage]}
                                        </button>
                                        :
                                        <>
                                            <button onClick={() => setShowPerson(true)} className="btn-main b-11 " style={{ minWidth: "130px" }}>
                                                {content.personJoin[currentLanguage]}
                                            </button>
                                            <button onClick={() => setShowCompany(true)} className="btn-main b-11 btn-second border" style={{ minWidth: "130px", borderColor: "var(--primary) !important" }}>
                                                {content.companyJoin[currentLanguage]}
                                            </button>
                                        </>
                                    }

                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="btn-main btn-second b-11">
                                            {content.login[currentLanguage]}
                                        </button>
                                    </Link >
                                    {/* <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                        {content.announce[currentLanguage]}
                                    </button> */}
                                    <button onClick={() => setShowPerson(true)} className="btn-main b-11 " style={{ minWidth: "130px" }}>
                                        {content.personJoin[currentLanguage]}
                                    </button>
                                    <button onClick={() => setShowCompany(true)} className="btn-main b-11 btn-second border" style={{ minWidth: "130px", borderColor: "var(--primary) !important" }}>
                                        {content.companyJoin[currentLanguage]}
                                    </button>
                                </>
                            )}
                        </div>
                    </Navbar.Collapse>
                </ContainerMedia>
            </Navbar>
            {/* custom modal for announcements */}
            <CustomModal
                showModal={showModal}
                onHide={() => setShowModal(false)}
                setShowModal={setShowModal}
                title={currentLanguage === "ar" ? "اعلن" : "Announce"}
                newClass={"announcement-modal"}
            >
                {
                    userType === "vendor" ?
                        <div className="modal-grid h-100">
                            {announcementPerson.map((item) => (
                                <Link to={item.link} onClick={() => setShowModal(false)} key={item.id} className="modal-announcement ">
                                    <div className="d-flex flex-column align-items-center space-6">
                                        {item.icon}
                                        <p className="b-11">{item.text}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        :
                        <div className="modal-grid h-100">
                            {announcementCompany.map((item) => (
                                <Link to={item.link} onClick={() => setShowModal(false)} key={item.id} className="modal-announcement ">
                                    <div className="d-flex flex-column align-items-center space-6">
                                        {item.icon}
                                        <p className="b-11">{item.text}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                }
            </CustomModal>

            {/* join as person modal */}
            <CustomModal
                showModal={showPerson}
                onHide={() => setShowPerson(false)}
                setShowModal={setShowPerson}
                title={"انضم كمالك"}
                subtitle={"انضم لديل واعلن عن عقار أو تبديل  – كله في مكان واحد!"}
                newClass={"w-600"}
            >
                <PersonJoin setShowPerson={setShowPerson} setShowProgress={setShowProgress} />
            </CustomModal>

            {/* join as company modal */}
            <CustomModal
                showModal={showCompany}
                onHide={() => setShowCompany(false)}
                setShowModal={setShowCompany}
                title={"انضم كشركة"}
                subtitle={"انضم لديل واعلن عن مشروع عقاري أو خدمات تطشيب  – كله في مكان واحد!"}
                newClass={"w-600"}
            >
                <CompanyJoin setShowCompany={setShowCompany} setShowProgress={setShowProgress} />
            </CustomModal>

            {/* progress modal */}
            <CustomModal
                showModal={showProgress}
                onHide={() => setShowProgress(false)}
                setShowModal={setShowProgress}
                newClass={"progress-modal"}
            >
                <div>
                    <RequestProgress setShowProgress={setShowProgress} />
                </div>
            </CustomModal>
        </>
    );
};

export default NavbarMenu;
