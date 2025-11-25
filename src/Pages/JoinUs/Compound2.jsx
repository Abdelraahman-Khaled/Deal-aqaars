import React, { useEffect, useState } from "react";
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
import ImageUploadCompound from "../../Components/ImageUploadGrid/ImageUploadCompound";

const Compound1 = ({ formData, setFormData, setRemovedImages }) => {
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
  // عند الـ Checkbox onChange

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
                isChecked={formData.servicesAndFacilities.includes(checkbox)}
                onChange={(checked) => {
                  if (checked) {
                    setFormData((prev) => ({
                      ...prev,
                      servicesAndFacilities: [
                        ...prev.servicesAndFacilities,
                        checkbox,
                      ],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      servicesAndFacilities: prev.servicesAndFacilities.filter(
                        (item) => item !== checkbox
                      ),
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
            <Field name="contact.phoneNumber">
              {({ field, form }) => (
                <PhoneNumberValidation
                  field={field}
                  form={form}
                  placeholder="+201121323475"
                  onChangeExtra={(val) => {
                    setFormData((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, phoneNumber: val },
                    }));
                  }}
                />
              )}
            </Field>
          </div>

          <div className="b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30">
            <div className="d-flex flex-row space-1">
              <WhatsIcon />
              يوجد واتساب علي هذا الرقم
            </div>
            <Switch
              name="whatsapp"
              checked={formData.contact.hasWhatsapp}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contact: { ...prev.contact, hasWhatsapp: e.target.checked },
                }))
              }
            />
          </div>

          <Checkbox
            text={"تواصل معي عن طريق الايميل"}
            newClass={"mb-4"}
            isChecked={formData.contact.emailContact}
            onChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                contact: { ...prev.contact, emailContact: checked },
              }))
            }
          />

          <SectionHeader text={"صور المشروع"} />

          <div className="mb-4">
            <ImageUploadCompound
              value={formData.images}
              onChange={(imgs) =>
                setFormData((prev) => ({
                  ...prev,
                  images: imgs,
                }))
              }
              onRemove={(imageName) => {
                if (setRemovedImages) {
                  setRemovedImages((prev) => [...prev, imageName]);
                }
              }}
            />
          </div>
        </div>
      </FormField>
    </>
  );
};

export default Compound1;
