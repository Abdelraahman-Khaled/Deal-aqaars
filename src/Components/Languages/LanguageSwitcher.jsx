import { Dropdown } from "react-bootstrap";
import LanguageIcon from "../../assets/Icons/LanguageIcon";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
    const { currentLanguage, setCurrentLanguage } = useLanguage();

    const handleLanguageChange = (newLanguage) => {
        setCurrentLanguage(newLanguage);
    };

    return (
        <Dropdown className="b-12 language" onSelect={handleLanguageChange}>
            <Dropdown.Toggle id="dropdown-basic" className="drop-lang">
                <Dropdown.Item eventKey={currentLanguage === "ar" ? "en" : "ar"} className="lang cursor-pointer-1 d-flex align-items-center gap-1 flex-row-reverse ">
                    {currentLanguage === "ar" ? "EN" : "العربية"}
                    <LanguageIcon />
                </Dropdown.Item>
            </Dropdown.Toggle>
        </Dropdown>
    );
};

export default LanguageSwitcher;