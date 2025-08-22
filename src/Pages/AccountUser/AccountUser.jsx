import "./AccountUser.css";
// import PayIcon from "assets/images/IconsBooks/PayIcon";
import { useEffect, useState } from "react";
import PersonalInformation from "./Components/TabsContentAccount/PersonalInformation/PersonalInformation";
import AccountInformationContent from "./Components/TabsContentAccount/AccountInformationContent/AccountInformationContent";
// import PayInformationTab from "./Components/TabsContentAccount/PayInformationTab/PayInformationTab";
import SettingsTab from "./Components/TabsContentAccount/SettingsTab/SettingsTab";
import { Link } from "react-router-dom";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import LogoutIcon from "../../assets/Icons/LogoutIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import SecurityIcon from "../../assets/Icons/SecurityIcon";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import BellIcon from "../../assets/Icons/BellIcon";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import AuthAPI from "../../api/authApi";

const AccountUser = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const dispatch = useDispatch();

  const handleLogout = () => {
    AuthAPI.logout();
    dispatch(logout());
  };

  const translations = {
    accountTitle: {
      ar: "حسابى",
      en: "My Account",
    },
    tabs: [
      { id: 1, title: { ar: "المعلومات الشخصية", en: "Personal Information" }, icon: <ProfileIcon /> },
      { id: 2, title: { ar: "معلومات الحساب", en: "Account Information" }, icon: <SecurityIcon /> },
      // { id: 3, title: { ar: "معلومات الدفع", en: "Payment Information" }, icon: <PayIcon /> },
      { id: 3, title: { ar: "التنبيهات", en: "Notifications" }, icon: <BellIcon /> },
    ],
    logout: {
      ar: "تسجيل الخروج",
      en: "Logout",
    },
  };

  const [tabs, setTabs] = useState([]);

  // Update tabs state when the language changes
  useEffect(() => {
    const updatedTabs = translations.tabs.map((tab) => ({
      ...tab,
      title: tab.title[currentLanguage],
      active: tab.id === 1, // Set the first tab as active by default
    }));
    setTabs(updatedTabs);
  }, [currentLanguage]);

  const handleTabClick = (id) => {
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  return (
    <>
      <HelmetInfo titlePage={translations.accountTitle[currentLanguage]} />
      <main>
        <div className="account-user-content padding-80">
          <ContainerMedia>
            <div className="all-tabs-content-account">
              <div className="row g-3 align-items-start">
                <div className="d-flex flex-column justify-content-between  user-taps col-12 col-md-4 col-xl-3 border-account-user">
                  <ul
                    data-aos="fade-down"
                    className="nav nav-pills flex-column nav-pills  h-100"
                    id="pills-tab"
                    role="tablist"
                  >
                    {/* <li className="nav-item" role="presentation">
                      <UserInfo />
                    </li> */}
                    {tabs.map((tab) => (
                      <li
                        key={tab.id}
                        className="nav-item nav-item-info b-12"
                        role="presentation"
                      >
                        <button
                          className={`nav-link ${tab.active ? "active" : ""
                            } position-relative`}
                          id={`pills-${tab.id}-tab`}
                          data-bs-toggle="pill"
                          data-bs-target={`#pills-${tab.id}`}
                          type="button"
                          role="tab"
                          aria-controls={`pills-${tab.id}`}
                          aria-selected={tab.active ? "true" : "false"}
                          onClick={() => handleTabClick(tab.id)}
                        >
                          {tab.icon} {tab.title}
                        </button>
                      </li>
                    ))}

                  </ul>
                  <li className="nav-item nav  " role="presentation">
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="logout-button d-flex align-items-center gap-2 w-100"
                    >
                      <LogoutIcon /> {translations.logout[currentLanguage]}
                    </Link>
                  </li>
                </div>
                <div className="col-12 col-md-8 col-xl-9">
                  <div
                    className="tab-content w-100  h-100"
                    id="pills-tabContent"
                    data-aos="fade-up"
                  >
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={`tab-pane fade ${tab.active ? "show active" : ""
                          }`}
                        id={`pills-${tab.id}`}
                        role="tabpanel"
                        aria-labelledby={`pills-${tab.id}-tab`}
                      >
                        {tab.title === translations.tabs[0].title[currentLanguage] && (
                          <PersonalInformation />
                        )}
                        {tab.title === translations.tabs[1].title[currentLanguage] && (
                          <AccountInformationContent />
                        )}
                        {/* {tab.title === translations.tabs[2].title[currentLanguage] && (
                          <PayInformationTab />
                        )} */}
                        {tab.title === translations.tabs[2].title[currentLanguage] && (
                          <SettingsTab />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerMedia>
        </div>
      </main>
    </>
  );
};

export default AccountUser;
