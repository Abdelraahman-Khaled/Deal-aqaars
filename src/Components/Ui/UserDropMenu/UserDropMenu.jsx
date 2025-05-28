import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserIcon from "../../../assets/images/AccountUser/UserIcon";
import LogOutIcon from "../../../assets/images/AccountUser/LogOutIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import DateIcon from "../../../assets/images/IconsBooks/DateIcon";
import MenuArrow from "../../../assets/Icons/MenuArrow";
import SettingsIcon from "../../../assets/images/AccountUser/SettingsIcon";
import HeartIcon from "../../../assets/Icons/HeartIcon";
import HelpIcon from "../../../assets/Icons/HelpIcon";

const UserDropMenu = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        window.location.reload(); // Redirect to the login page
    };


    // Translations for the dropdown items
    const translations = {
        accountInfo: { ar: "Hossam Elwan", en: "Hossam Elwan" },
        settings: { ar: "اعدادات حسابي", en: "Account settings" },
        favourite: { ar: "المفضلة بتاعتي", en: "My favorite" },
        help: { ar: "المساعدة", en: "Help" },
        logout: { ar: "خروج من الحساب", en: "Logout" },
    };

    return (
        <div className="dropmenu-user h-100">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic--1" className="drop-user">
                    <div className="image-user-login d-flex align-items-center justify-content-center space-2">
                        <div className="border">
                            <UserIcon />
                        </div>
                        <span className="d-none d-xl-inline">
                            {translations.accountInfo[currentLanguage]}
                        </span>
                        <span className="d-none d-xl-block">
                            <MenuArrow />
                        </span>
                    </div>
                </Dropdown.Toggle>

                {/* Menu */}
                <Dropdown.Menu>
                    {/* Account Information */}
                    <div className=" d-flex align-items-center space-3" to="/accountUser">
                        <div className="border">
                            <UserIcon />
                        </div>
                        <div className="d-flex space-1 flex-column b-11">
                            {translations.accountInfo[currentLanguage]}
                            <p className="b-12" style={{ color: "var(--netural-500)" }}>hoss12345@gmail.com</p>
                        </div>
                    </div>
                    {/* hr */}
                    <hr />
                    {/* settings */}
                    <Dropdown.Item>
                        <Link className="link-drop-item" to="/profile">
                            <SettingsIcon />
                            {translations.settings[currentLanguage]}
                        </Link>
                    </Dropdown.Item>
                    {/* heart */}
                    <Dropdown.Item>
                        <Link className="link-drop-item" to="/favorite">
                            <HeartIcon />
                            {translations.favourite[currentLanguage]}
                        </Link>
                    </Dropdown.Item>
                    {/* help */}
                    <Dropdown.Item>
                        <Link className="link-drop-item" to="/reservations">
                            <HelpIcon />
                            {translations.help[currentLanguage]}
                        </Link>
                    </Dropdown.Item>
                    {/* Log Out */}
                    <Dropdown.Item>
                        <Link
                            onClick={handleLogout}
                            to="/"
                            className="link-drop-item logout-drop"
                        >
                            <LogOutIcon /> {translations.logout[currentLanguage]}
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default UserDropMenu;