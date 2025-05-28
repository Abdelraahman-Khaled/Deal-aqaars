import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import Switch from "../../../../../Components/Forms/Switch";
import { useState } from "react";



const translations = {
  title: { ar: "التنبيهات", en: "Notifications" },
  allNotifications: { ar: "كل التنبيهات", en: "All Notifications" },
  subAllNotifications: { ar: "تقدر تشغل أو تطفي كل التنبيهات بضغطة زر، اختار اللي يناسبك! ", en: "You can turn on or off all notifications by clicking the button, select what you want!" },
  realestateNoti: { ar: "تنبيهات العقارات الجديدة", en: "New Real Estate Notifications" },
  subRealestateNoti: { ar: "هنبعت لك كل العقارات الجديدة اللي بتنزل في التطبيق وأي تغييرات مهمة.", en: "You will get all the new real estate that you have bought in the app and any important changes." },
}

const SettingsTab = () => {
  const { currentLanguage } = useLanguage()
  const [toggle, setToggle] = useState(true)


  return (
    <div className="d-flex flex-column space-6">
      <div className="personal-information-content border-account-user p-4">
        <h6>{translations.title[currentLanguage]}</h6>
      </div>


      <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
        <div className="col-9">
          <p className="b-5 pb-1">{translations.allNotifications[currentLanguage]}</p>
          <p className="b-12 text-gray">{translations.subAllNotifications[currentLanguage]}</p>
        </div>
        <div className=" col-1 min-w-max b-11" onClick={() => setToggle(!toggle)}>
          <Switch
            defaultChecked={true}
            checked={toggle}
          />
        </div>
      </div>


      <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
        <div className="col-9">
          <p className="b-5 pb-1">{translations.realestateNoti[currentLanguage]}</p>
          <p className="b-12 text-gray">{translations.subRealestateNoti[currentLanguage]}</p>
        </div>
        <div className=" col-1 min-w-max b-11">
          <Switch
            defaultChecked={false}

          />
        </div>
      </div>

    </div>

  );
};

export default SettingsTab;
