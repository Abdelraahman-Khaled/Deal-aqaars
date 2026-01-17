import React, { useState, useEffect } from "react";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import { Formik, Form } from "formik";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import BreadcrumbsPage from "../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import Compound1 from "../JoinUs/Compound1";
import Compound2 from "../JoinUs/Compound2";
import Compound3 from "../JoinUs/Compound3";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useParams } from "react-router-dom";
import "../JoinUs/JoinUs.css";
import CompoundAPI from "../../api/compoundApi";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const UpdateCompound = () => {
    const { id } = useParams();
    const { currentLanguage } = useLanguage();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [removedImages, setRemovedImages] = useState([]);
    const [removedUnits, setRemovedUnits] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        announcementLocation: "",
        details: { ar: "" },
        title: { ar: "" },
        location: {
            city: "",
            detailedLocation: "",
            coordinates: { type: "Point", coordinates: ["", ""] },
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

    useEffect(() => {
        const fetchCompound = async () => {
            try {
                setIsLoading(true);
                const response = await CompoundAPI.getCompoundById(id);
                let compoundData = response.data || response;

                // Handle case where data is in compound object
                if (compoundData.compound) {
                    compoundData = compoundData.compound;
                }


                // Set form data with fetched values
                setFormData({
                    name: compoundData.name || "",
                    type: compoundData.type || "",
                    announcementLocation: compoundData.announcementLocation || "",
                    details: compoundData.details || { ar: "" },
                    title: compoundData.title || { ar: "" },
                    location: compoundData.location || {
                        city: "",
                        detailedLocation: "",
                        coordinates: { type: "Point", coordinates: ["", ""] },
                    },
                    servicesAndFacilities: compoundData.servicesAndFacilities || [],
                    contact: compoundData.contact || {
                        phoneNumber: "",
                        hasWhatsapp: false,
                        emailContact: false,
                    },
                    images: compoundData.compoundImages || [],
                    units: compoundData.units || [],
                });
            } catch (error) {
                console.error("Error fetching compound:", error);
                toast.error("Failed to load compound details");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCompound();
        }
    }, [id]);

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

        // Append removed compound images
        if (removedImages.length > 0) {
            removedImages.forEach((imgName) => {
                data.append("removeCompoundImages[]", imgName);
            });
        }

        // Append main images
        formData.images.forEach((file) => {
            if (file instanceof File) {
                data.append("images", file);
            }
        });

        // Append removed units
        if (removedUnits.length > 0) {
            removedUnits.forEach((unitId) => {
                data.append("removedUnits[]", unitId);
            });
        }

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
            const response = await CompoundAPI.updateCompound(id, data);
            if (response.status) setShowModal(true);
        } catch (error) {
            console.error("Error updating compound:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <HelmetInfo
                titlePage={
                    currentLanguage === "ar"
                        ? "تعديل مشروع عقاري"
                        : "Update Real Estate Project"
                }
            />

            <Formik
                initialValues={formData}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <ContainerMedia>
                        <div className="form-container py-4 align-items-center">
                            <div className="w-100">
                                <div className="pb-4">
                                    <BreadcrumbsPage
                                        newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                        mainTitle={"تعديل مشروع عقاري"}
                                        routeTitleTwoBread={false}
                                        titleTwoBread={false}
                                        secondArrow={false}
                                    />
                                </div>
                                <p className="b-1 mb-2 pb-3">تعديل بيانات المشروع العقاري</p>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className={`step-border ${step === 1 && "active"}`}></p>
                                    <p className={`step-border ${step === 2 && "active"}`}></p>
                                    <p className={`step-border ${step === 3 && "active"}`}></p>
                                </div>

                                {step === 1 && (
                                    <Compound1 formData={formData} setFormData={setFormData} />
                                )}
                                {step === 2 && (
                                    <Compound2
                                        formData={formData}
                                        setFormData={setFormData}
                                        setRemovedImages={setRemovedImages}
                                    />
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
                                                {formikProps.isSubmitting ? "جاري التحديث..." : "تحديث"}
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
                                        <h6>💡 تم التحديث!</h6>
                                        <p className="b-15" style={{ color: "var(--netural-700)" }}>
                                            تم تحديث بيانات المشروع العقاري بنجاح.
                                        </p>
                                        <Link
                                            to={"/my-ads"}
                                            className="btn-main btn-submit mt-3 b-11 py-3 px-2"
                                        >
                                            العودة لإعلاناتي
                                        </Link>
                                    </div>
                                </CustomModal>
                            </div>
                        </div>
                    </ContainerMedia>
                )}
            </Formik>
        </>
    );
};

export default UpdateCompound;
