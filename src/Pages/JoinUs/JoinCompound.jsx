import React, { useState, useEffect } from "react";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import { Formik, Form } from "formik";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import BreadcrumbsPage from "../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import Compound1 from "./Compound1";
import Compound2 from "./Compound2";
import Compound3 from "./Compound3";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import "./JoinUs.css";
import CompoundAPI from "../../api/compoundApi";

const JoinCompound = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    announcementLocation: "",
    details: { ar: "" },
    title: { ar: "" },
    location: {
      city: "",
      detailedLocation: "",
      coordinates: { type: "Point", coordinates: ["", ""] }, // [lng, lat]
    },
    servicesAndFacilities: [],
    contact: {
      phoneNumber: "",
      hasWhatsapp: false,
      emailContact: false,
    },
    images: [],
    units: [],
  });

  const handleNext = () => {
    let isValid = true;

    if (isValid) setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const data = new FormData();

    // Append normal fields except images and units
    Object.keys(formData).forEach((key) => {
      if (key !== "images" && key !== "units") {
        data.append(
          key,
          typeof formData[key] === "object"
            ? JSON.stringify(formData[key])
            : formData[key]
        );
      }
    });

    // Append main images
    formData.images.forEach((file) => {
      if (file instanceof File) data.append("images", file);
    });

    // Append units
    formData.units.forEach((unit, i) => {
      // 1. Append Images
      if (unit.aqarImages && Array.isArray(unit.aqarImages)) {
        unit.aqarImages.forEach((img) => {
          const file = img.file || img;
          if (file instanceof File) {
            data.append(`units[${i}][aqarImages]`, file);
          }
        });
      }

      // 2. Append Unit Details (Deeply Flattened)
      if (unit.unitDetails) {
        Object.keys(unit.unitDetails).forEach((key) => {
          const value = unit.unitDetails[key];
          if (typeof value === "object" && value !== null) {
            Object.keys(value).forEach((subKey) => {
              data.append(`units[${i}][unitDetails][${key}][${subKey}]`, value[subKey]);
            });
          } else {
            data.append(`units[${i}][unitDetails][${key}]`, value);
          }
        });
      }

      // 3. Append Aqar Details (Flattened)
      if (unit.aqarDetails) {
        Object.keys(unit.aqarDetails).forEach((key) => {
          const value = unit.aqarDetails[key];
          // aqarDetails are flat, but just in case check for object
          if (typeof value === "object" && value !== null) {
            Object.keys(value).forEach((subKey) => {
              data.append(`units[${i}][aqarDetails][${key}][${subKey}]`, value[subKey]);
            });
          } else {
            data.append(`units[${i}][aqarDetails][${key}]`, value);
          }
        });
      }
    });

    try {
      const response = await CompoundAPI.createCompound(data);
      if (response.status) setShowModal(true);
    } catch (error) {
      console.error("Error creating compound:", error);
    }
  };



  return (
    <>
      <HelmetInfo
        titlePage={
          currentLanguage === "ar"
            ? "اعلن عن  مشروع عقاري"
            : "Advertise your company's properties"
        }
      />

      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <ContainerMedia>
            <div className="form-container  py-4 align-items-center ">
              <div className="w-100">
                <div className="pb-4">
                  <BreadcrumbsPage
                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                    mainTitle={"اعلن عن مشروع عقاري"}
                    routeTitleTwoBread={false}
                    titleTwoBread={false}
                    secondArrow={false}
                  />
                </div>
                <p className="b-1 mb-2 pb-3">اعلن عن مشروع عقاري</p>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className={`step-border ${step === 1 && "active"}`}></p>
                  <p className={`step-border ${step === 2 && "active"}`}></p>
                  <p className={`step-border ${step === 3 && "active"}`}></p>
                </div>

                {step === 1 && (
                  <Compound1 formData={formData} setFormData={setFormData} />
                )}
                {step === 2 && (
                  <Compound2 formData={formData} setFormData={setFormData} />
                )}
                {step === 3 && (
                  <Form>
                    <Compound3 formData={formData} setFormData={setFormData} />
                    <div
                      className={`d-flex justify-content-between mt-5 pt-3 ${step > 1 && "flex-row-reverse"
                        }`}
                    >
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="btn-main btn-submit b-11 px-4 btn-second border"
                        >
                          السابق
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn-main btn-submit b-11"
                        disabled={formikProps.isSubmitting}
                      >
                        {formikProps.isSubmitting ? "جاري الإرسال..." : "ابعت للموافقة"}
                      </button>
                    </div>
                  </Form>
                )}

                {step < 3 && (
                  <div
                    className={`d-flex justify-content-between mt-5 pt-3 ${step > 1 && "flex-row-reverse"
                      }`}
                  >
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn-main btn-submit b-11 px-4 btn-second border"
                      >
                        السابق
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-main btn-submit b-11"
                    >
                      اللي بعده
                    </button>
                  </div>
                )}

                <CustomModal
                  showModal={showModal}
                  onHide={() => setShowModal(false)}
                  setShowModal={setShowModal}
                  newClass={"success-modal images-modal join"}
                >
                  <div className="d-flex text-center flex-column align-items-center justify-content-center w-100 space-4 p-5">
                    <div className="position-relative">
                      <DotLottieReact
                        src="/animation/success.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <div className="position-absolute top-1000">
                      <DotLottieReact
                        src="./animation/successpapers.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <h6>💡 طلبك وصل!</h6>
                    <p className="b-15" style={{ color: "var(--netural-700)" }}>
                      تمام،تم إنشاء الاعلان بنجاح، في انتظار الموافقة! ✨ هنراجع
                      بياناتك وهنكلمك قريب عشان نكمل باقي الخطوات. خليك متابع
                      تنبيهاتك لأي جديد! 🚀
                    </p>
                    <Link
                      to={"/"}
                      className="btn-main btn-submit mt-3 b-11 py-3 px-2"
                    >
                      ارجع للرئيسية
                    </Link>
                  </div>
                </CustomModal>
              </div>
            </div>
          </ContainerMedia>
        )}
      </Formik>
    </>
  )
}

export default JoinCompound;
