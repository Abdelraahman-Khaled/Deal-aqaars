import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem("language") || "ar"
    );

    useEffect(() => {
        //  SAVE LANGUAGE TO LOCAL STORAGE
        localStorage.setItem("language", currentLanguage);
    }, [currentLanguage]);

    const direction = currentLanguage === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        //      //  SAVE DIRECTION LANGUAGE TO LOCAL STORAGE
        localStorage.setItem("direction", direction);

        // UPDATE THE DIRECTION OF THE HTML DOCUMENT
        document.documentElement.dir = direction;
        // SET THE DEfauLTe LANGUGE ATTRIBUTE
        document.documentElement.lang = currentLanguage;
    }, [direction, currentLanguage]);

    return (
        <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage");
    }
    return context;
};
