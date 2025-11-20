import React, { useState } from "react";
import { translations } from "./translations";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import InputFiled from "../../Components/Forms/InputField";
import FormField from "../../Components/Forms/FormField";
import Map from "../../Components/Ui/Map/Map";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import Select from "react-select";
import TextArea from "../../Components/Forms/TextArea";
import GoogleSearchBoxWithMap from "../../Components/GoogleMap/GoogleSearchBoxWithMap";
import { Dropdown } from "primereact/dropdown";
import data from "../../data/cities.json";

const Compound1 = ({ formData, setFormData }) => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState("");
  const [city, setCity] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectCompany, setSelectCompany] = useState(
    translations[currentLanguage].company
  );

  const options = [
    { value: "compunds", label: "سكني" },
    { value: "buldings", label: "تجاري" },
    { value: "administrative", label: "إداري" },
    { value: "mixed", label: "مختلط" },
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
        <div className="w-100">
          {/* company Details */}
          <SectionHeader text={"بيانات المشروع"} />

          {/* Name */}
          <div className="mb-4 ">
            <label className="b-12 mb-2">
              اسم الكمباوند <span className="required-asterisk">*</span>
            </label>
            <InputFiled
              name="name"
              placeholder={"مثال: كمباوند الماسة – العاصمة الإدارية"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* type of project */}
          <div className="mb-4 ">
            <label className="b-12 mb-2">
              نوع المشروع <span className="required-asterisk">*</span>
            </label>
            <Select
              options={options}
              styles={customStyles}
              placeholder="اختار نوع المشروع"
              value={options.find(option => option.value === formData.projectType)}
              onChange={(selectedOption) =>
                setFormData({ ...formData, projectType: selectedOption ? selectedOption.value : '' })
              }
            />
          </div>

          <SectionHeader text={"تفاصيل المشروع"} />

          {/* location */}
          <div className="mb-4 ">
            <label className="b-12 mb-2">
              عنوان الاعلان <span className="required-asterisk">*</span>
            </label>
            <InputFiled
              name="location"
              placeholder={"عنوان الاعلان"}
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* Company */}
          <div className="mb-4 ">
            <label className="b-12 ">
              تفاصيل الاعلان <span className="required-asterisk">*</span>
            </label>
            <TextArea
              name="location-details"
              placeholder={"عنوان الاعلان"}
              value={formData.locationDetails}
              onChange={(e) =>
                setFormData({ ...formData, locationDetails: e.target.value })
              }
            />
          </div>

          {/* location english  */}
          {/* <div className="mb-4 ">
            <label className="b-12 mb-2">
              عنوان الاعلان بالانجليزي{" "}
              <span className="required-asterisk">*</span>
            </label>
            <InputFiled
              name="location-en"
              placeholder={"عنوان الاعلان بالانجليزي"}
            />
          </div> */}

          {/* Company */}
          {/* <div className="mb-4 ">
            <label className="b-12 ">
              تفاصيل الاعلان بالانجليزي
              <span className="required-asterisk">*</span>
            </label>
            <TextArea
              name="location-details-en"
              placeholder={"عنوان الاعلان بالانجليزي"}
            />
          </div> */}

          <SectionHeader text={"الموقع"} />

          {/* <NestedDropdownAccordion data={nestedLocationData} title="عنوان المشروع"
                        placeholder="اختر المكان" /> */}

          <div className="mb-4">
            <div className="mb-4">
              <label className="b-12 mb-2">
                عنوان المشروع <span className="required-asterisk"> *</span>
              </label>
              <Dropdown
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.value });
                }}
                editable
                options={data.map((item) => ({
                  value: item.city_name_en,
                  label:
                    currentLanguage === "ar"
                      ? item.city_name_ar
                      : item.city_name_en,
                }))}
                placeholder={translations[currentLanguage].city}
                name="city"
                className="hide-scrollbar"
                optionValue="value" // هيخزن value (انجليزي)
                optionLabel="label" // هيعرض اللي في label
              ></Dropdown>
            </div>
            <label className="b-12 mb-2">
              عنوان المشروع <span className="required-asterisk">*</span>
            </label>

            <div className="mb-5">
              <GoogleSearchBoxWithMap
                setLatitude={(lat) => setFormData({ ...formData, latitude: lat })}
                setLongitude={(lng) => setFormData({ ...formData, longitude: lng })}
                isItemLoading={isItemLoading}
                longitude={formData.longitude}
                latitude={formData.latitude}
                setLocationDetails={(details) => setFormData({ ...formData, locationDetails: details })}
                locationDetails={formData.locationDetails}
              />
            </div>
          </div>
        </div>
      </FormField>
    </>
  );
};

export default Compound1;
