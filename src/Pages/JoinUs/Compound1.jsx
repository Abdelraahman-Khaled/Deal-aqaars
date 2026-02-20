import React, { useEffect, useState } from "react";
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
  const [isItemLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationDetails, setLocationDetails] = useState("");

  // Initialize location state from formData (for UpdateCompound)
  useEffect(() => {
    if (formData.location?.detailedLocation && !locationDetails) {
      setLocationDetails(formData.location.detailedLocation);
    }
    if (formData.location?.coordinates?.coordinates) {
      const coords = formData.location.coordinates.coordinates;
      if (coords[0] && !longitude) setLongitude(coords[0]);
      if (coords[1] && !latitude) setLatitude(coords[1]);
    }
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        detailedLocation: locationDetails,
        coordinates: { type: "Point", coordinates: [longitude, latitude] },
      },
      announcementLocation: locationDetails,
    }));
  }, [locationDetails, latitude, longitude]);

  const options = [
    { value: "residential", label: "سكني" },
    { value: "commercial", label: "تجاري" },
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
      <FormField>
        <div className="w-100">
          {/* company Details */}
          <SectionHeader text={"بيانات المشروع"} />

          {/* Name */}
          <div className="mb-4 ">
            <label className="b-12 mb-2">
              اسم الكمباوند <span className="required-asterisk">*</span>
            </label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="مثال: كمباوند الماسة – العاصمة الإدارية"
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
              value={options.find((option) => option.value === formData.type)}
              onChange={(opt) =>
                setFormData((prev) => ({ ...prev, type: opt ? opt.value : "" }))
              }
            />
          </div>

          <SectionHeader text={"تفاصيل المشروع"} />

          {/* location */}
          <div className="mb-4 ">
            <label className="b-12 mb-2">
              عنوان الاعلان <span className="required-asterisk">*</span>
            </label>
            <input
              name="location"
              className="form-control"
              placeholder={"عنوان الاعلان"}
              value={formData.title.ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: { ...prev.title, ar: e.target.value },
                }))
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
              value={formData.details.ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  details: { ...prev.details, ar: e.target.value },
                }))
              }
            />
          </div>

          <SectionHeader text={"الموقع"} />

          {/* <NestedDropdownAccordion data={nestedLocationData} title="عنوان المشروع"
                        placeholder="اختر المكان" /> */}

          <div className="mb-4">
            <div className="mb-4">
              <label className="b-12 mb-2">
                عنوان المشروع <span className="required-asterisk"> *</span>
              </label>
              <Dropdown
                value={formData.location.city}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    location: { ...prev.location, city: e.value },
                  }));
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
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                isItemLoading={isItemLoading}
                longitude={longitude}
                latitude={latitude}
                setLocationDetails={setLocationDetails}
                locationDetails={locationDetails}
              />
            </div>
          </div>
        </div>
      </FormField>
    </>
  );
};

export default Compound1;
