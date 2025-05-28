import "./NavbarMenu.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ContainerMedia from "../ContainerMedia/ContainerMedia";
import LanguageSwitcher from "../Languages/LanguageSwitcher";
import UserDropMenu from "../Ui/UserDropMenu/UserDropMenu";
import { isAuthenticated } from "../../api/axiosInstance";
import { useLanguage } from "../Languages/LanguageContext";
import HeartIcon from "../../assets/Icons/HeartIcon";
import { Dropdown } from "react-bootstrap";
import NavItem from 'react-bootstrap/NavItem';
import MenuArrow from "../../assets/Icons/MenuArrow";
import Bell from "./Bell";
import CustomModal from "../CustomModal/CustomModal";
import BuildingIcon from "../../assets/Icons/BuildingIcon";
import HouseSimpleIcon from "../../assets/Icons/HouseSimpleIcon";
import PaintBrushIcon from "../../assets/Icons/PaintBrushIcon";
import SwapModalIcon from "../../assets/Icons/SwapModalIcon";


const content = {
    sale: { ar: "بيع", en: "Sale" },
    rent: { ar: "إيجار", en: "Rent" },
    trade: { ar: "تبديل", en: "Trade" },
    finishing: { ar: "تشطيبات", en: "Finishing" },
    announce: { ar: "اعلن", en: "Announce" },
    login: { ar: "ادخل لحسابك", en: "Login" },
    finishMenu: {
        finish: { ar: "شطب بيتك", en: "Renovate Your Home" },
        furnish: { ar: "افرش بيتك", en: "Furnish Your Home" },
    },
}
const announcements = [
    { id: 1, text: "اعلن عن عقارك", icon: <HouseSimpleIcon /> },
    { id: 2, text: "اعلن عن عقارات شركتك", icon: <BuildingIcon /> },
    { id: 3, text: "اعلن عن خدمات التشطيب", icon: <PaintBrushIcon /> },
    { id: 4, text: "اعلن عن اي حاجه عايز تبدلها", icon: <SwapModalIcon /> },
];

const NavbarMenu = () => {
    const { currentLanguage } = useLanguage(); // Get the current language from the context
    const [isMenuFixed, setMenuFixed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setMenuFixed(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


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
                            <LanguageSwitcher />
                        </div>
                        <span className="break-span"></span>
                        {/* Bell */}
                        <div className="icon-lang icon-border d-none">
                            <Bell />
                        </div>
                        <span className="break-span"></span>
                        {/* if auth */}
                        {!isAuthenticated() ? (
                            <>
                                <UserDropMenu />
                                <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                    {content.announce[currentLanguage]}
                                </button>
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
                            <NavLink className="nav-link b-11" to="/sale">
                                {content.sale[currentLanguage]}
                            </NavLink>
                            {/* rent */}
                            <NavLink className="nav-link b-11" to="/realestate">
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
                                <LanguageSwitcher />
                            </div>
                            <span className="break-span"></span>
                            {/* Bell */}
                            <div className="icon-lang icon-border d-lg-flex">
                                <Bell />
                            </div>
                            <span className="break-span"></span>
                            {/* if auth */}
                            {!isAuthenticated() ? (
                                <>
                                    <span className="d-none d-lg-flex">
                                        <UserDropMenu />
                                    </span>
                                    <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                        {content.announce[currentLanguage]}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="btn-main btn-second b-11">
                                            {content.login[currentLanguage]}
                                        </button>
                                    </Link >
                                    <button onClick={() => setShowModal(true)} className="btn-main b-11" style={{ minWidth: "200px" }}>
                                        {content.announce[currentLanguage]}
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


                <div className="modal-grid h-100">
                    {announcements.map((item) => (
                        <Link to={"join"} onClick={() => setShowModal(false)} key={item.id} className="modal-announcement ">
                            <div className="d-flex flex-column align-items-center space-6">
                                {item.icon}
                                <p className="b-11">{item.text}</p>
                            </div>
                        </Link>
                    ))}
                </div>



            </CustomModal>
        </>
    );
};

export default NavbarMenu;
