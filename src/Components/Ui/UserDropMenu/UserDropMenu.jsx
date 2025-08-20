import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserIcon from "../../../assets/images/AccountUser/UserIcon";
import LogOutIcon from "../../../assets/images/AccountUser/LogOutIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import MenuArrow from "../../../assets/Icons/MenuArrow";
import SettingsIcon from "../../../assets/images/AccountUser/SettingsIcon";
import HeartIcon from "../../../assets/Icons/HeartIcon";
import HelpIcon from "../../../assets/Icons/HelpIcon";
import FolderAds from "../../../assets/Icons/FolderAds";
import AuthAPI from "../../../api/authApi";
import { logout } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

const UserDropMenu = () => {
    const dispatch = useDispatch();

    const { currentLanguage } = useLanguage();
    const handleLogout = () => {
        AuthAPI.logout();
        dispatch(logout()); // ✅ كده هيمسح البيانات ويعمل re-render للـ Navbar

    };

    const user = JSON.parse(localStorage.getItem("user"));

    const translations = {
        accountInfo: user?.name || "",
        email: user?.email || "",
    };

    const menuItems = [
        {
            label: { ar: "اعدادات حسابي", en: "Account settings" },
            icon: <SettingsIcon />,
            to: "/profile",
        },
        {
            label: { ar: "المفضلة بتاعتي", en: "My favorite" },
            icon: <HeartIcon />,
            to: "/favorite",
        },
        {
            label: { ar: "إعلاناتي", en: "My ads" },
            icon: <FolderAds />,
            to: "/vendr-ads",
        },
        {
            label: { ar: "المساعدة", en: "Help" },
            icon: <HelpIcon />,
            to: "/reservations",
        },
        {
            label: { ar: "خروج من الحساب", en: "Logout" },
            icon: <LogOutIcon />,
            to: "/",
            onClick: handleLogout,
            className: "logout-drop",
        },
    ];

    return (
        <div className="dropmenu-user h-100">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic--1" className="drop-user">
                    <div className="image-user-login d-flex align-items-center justify-content-center space-2">
                        <div className="border">
                            <UserIcon />
                        </div>
                        <span className="d-none d-xl-inline">
                            {translations.accountInfo}
                        </span>
                        <span className="d-none d-xl-block">
                            <MenuArrow />
                        </span>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* Account Info */}
                    <div className="d-flex align-items-center space-3" to="/accountUser">
                        <div className="border">
                            <UserIcon />
                        </div>
                        <div className="d-flex space-1 flex-column b-11">
                            {translations.accountInfo[currentLanguage]}
                            <p className="b-12" style={{ color: "var(--netural-500)" }}>
                                {translations.email}
                            </p>
                        </div>
                    </div>

                    <hr />

                    {/* Render menu items */}
                    {menuItems.map((item, index) => (
                        <Dropdown.Item key={index}>
                            <Link
                                to={item.to}
                                onClick={item.onClick}
                                className={`link-drop-item ${item.className || ""}`}
                            >
                                {item.icon}
                                {item.label[currentLanguage]}
                            </Link>
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default UserDropMenu;
