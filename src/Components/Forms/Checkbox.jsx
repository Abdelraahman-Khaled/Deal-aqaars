import { useLanguage } from "../Languages/LanguageContext";

const Checkbox = ({ text, newClass, onChange, isChecked }) => {
    const { currentLanguage } = useLanguage();
    return (
        <div className={`b-15 d-flex align-items-center space-2 max-w-max ${newClass}`}>
            <input
                className={`form-check-input  ${currentLanguage === "en" && "mx-0"}`}
                type="checkbox"
                value=""
                id="flexCheckChecked"
                style={{ width: "20px", height: "20px" }}
                onChange={(e) => onChange(e.target.checked)}
                checked={isChecked}
            />
            {text}
        </div>)
}

export default Checkbox