import { useState } from "react";
import { useLanguage } from "../../Languages/LanguageContext";
import MenuArrow from "../../../assets/Icons/MenuArrow";

const ReadMoreText = ({ text, maxLength, newClass }) => {
  const [showAll, setShowAll] = useState(false);
  const [rotate, setRotate] = useState(false);

  const { currentLanguage } = useLanguage(); // Get the current language

  return (
    <div>
      <p className={` b-4 ${newClass}`} >
        {showAll ? text : text ? `${text.slice(0, maxLength)}... ` : ''}
        {text && text.length > maxLength && (
          <span className='w-100 read-more px-2' style={{ color: 'var(--yellow-100)' }} onClick={() => {
            setShowAll(!showAll);
            setRotate(!rotate);
          }}>
            {
              showAll
                ? currentLanguage === "ar"
                  ? "إقرأ اقل" // "Less" in Arabic
                  : "Read Less" // "Less" in English
                : currentLanguage === "ar"
                  ? "إقرأ اكتر" // "More" in Arabic
                  : "Read More" // "More" in English
            }
            <span className='px-2  b-11' ><MenuArrow color={'var(--yellow-100)'} rotate={rotate} /></span>
          </span>
        )}
      </p>
    </div >
  );
};

export default ReadMoreText;
