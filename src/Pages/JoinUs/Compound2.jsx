import React, { useState } from "react";
import { translations } from "./translations";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import FormField from "../../Components/Forms/FormField";
import PhoneNumber from "../../Components/Forms/PhoneNumber";
import WhatsIcon from "../../assets/Icons/WhatsIcon";
import Switch from "../../Components/Forms/Switch";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Select from "react-select";
import Checkbox from "../../Components/Forms/Checkbox";
import BudgetDropdown from "../../Components/Ui/SearchComponents/BudgetDropdown";
import ImageUploadGrid from "../../Components/ImageUploadGrid/ImageUploadGrid";
import { Field } from "formik";
import PhoneNumberValidation from "../../Components/Forms/PhoneNumberInput";

const Compound1 = ({ formData, setFormData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [rotateBudget, setRotateBudget] = useState(false);
  const [budget, setBudget] = useState([1000000, 50000000]);

  const [showModal, setShowModal] = useState(false);
  const [selectCompany, setSelectCompany] = useState(
    translations[currentLanguage].company
  );

  const checkboxs = [
    "أمن 24 ساعة",
    "كاميرات مراقبة",
    "جراج خاص",
    "ملاعب رياضية",
    "حدائق",
    "مناطق تجارية",
    "مناطق ترفيهية",
    "مناطق خدمية",
    "مناطق خضراء",
    "مناطق للأطفال",
    "مناطق رياضية",
    "مناطق للياقة البدنية",
    "مناطق للشواء",
    "مناطق للمشي",
    "حمامات سباحة",
  ];
  const details = [
    "شقة غرفة واحدة",
    "شقة غرفتين",
    "شقة ثلاث غرف",
    "شقة أربع غرف",
    "استوديو",
    "فيلا",
    "تاون هاوس",
    "بنتهاوس",
    "دوبلكس",
    "شقة دوبلكس",
    "شقة ثلاثية",
    "مكتب تجاري",
    "محل تجاري",
    "مخزن",
  ];
  const options = [
    { value: "compunds", label: "سكني" },
    { value: "buldings", label: "تجاري" },
  ];

  const paymentOptions = [
    { value: "cash", label: "كاش" },
    { value: "installments", label: "قسط" },
    { value: "mortgage", label: "كاش و قسط" },
  ];

  const typeOfPropertyOptions = [
    { value: "residential", label: "من المطزر (اول سكن)" },
    { value: "commercial", label: "من مالك العقار" },
  ];
  const projectStatusOptions = [
    { value: "under_construction", label: "تحت الانشاء" },
    { value: "completed", label: "متاح" },
    { value: "upcoming", label: "اتسلم خلاص" },
  ];
  const yearOfDeliveryOptions = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
  ];
  const finishingTypeOptions = [
    { value: "extra", label: "  اكسترا سوبر لوكس" },
    { value: "fully_furnished", label: "سوبر لوكس" },
    { value: "semi_furnished", label: "لوكس" },
    { value: "shell_and_core", label: " نص تشطيب" },
    { value: "no_finishing", label: "من غير تشطيب" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "8px",
      padding: "2px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      marginTop: "4px",
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      padding: "10px 15px",
      backgroundColor: state.isFocused ? "#e9ecef" : "white",
      color: "#212529",
      cursor: "pointer",
    }),
  };

  return (
    <>
      <FormField initialValues={formData}>
        <div className="w-100 finishing p-0">
          {/* options */}
          <SectionHeader text={"الخدمات والمرافق"} />
          {/* checkbox */}
          <div className="d-flex flex-wrap space-6 align-items-center mb-4">
            {checkboxs.map((checkbox, index) => (
              <Checkbox
                key={index}
                text={checkbox}
                checked={formData.services.includes(checkbox)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      services: [...prev.services, checkbox],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      services: prev.services.filter((item) => item !== checkbox),
                    }));
                  }
                }}
              />
            ))}
          </div>
          <SectionHeader text={"بيانات التواصل"} />
          <div className="mb-4 lg-w-30">
            <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
              رقم الموبايل
              <span className="required-asterisk">*</span>
            </label>
            <Field
              name="phone"
              component={PhoneNumberValidation}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30">
            <div className="d-flex flex-row space-1">
              <WhatsIcon />
              يوجد واتساب علي هذا الرقم
            </div>
            <Switch
              name="whatsapp"
              checked={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.checked })
              }
            />
          </div>

          <Checkbox text={"تواصل معي عن طريق الايميل"} newClass={"mb-4"} />

          <SectionHeader text={"صور المشروع"} />

          <div className="mb-4">
            <ImageUploadGrid
              name={"images"}
              value={formData.images}
              onChange={(newImages) =>
                setFormData({ ...formData, images: newImages })
              }
            />
          </div>
        </div>
      </FormField>
    </>
  );
};

export default Compound1;
