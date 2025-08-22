import React, { useState } from "react";
import * as Yup from "yup";
import InputFiled from "../../../../../Components/Forms/InputField";
import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import ProfileIcon from "../../../../../assets/Icons/ProfileIcon";
import PhoneIcon from "../../../../../assets/Icons/PhoneIcon";
import EmailIcon from "../../../../../assets/Icons/EmailIcon";
import PhoneNumber from "../../../../../Components/Forms/PhoneNumber";
import FormField from "../../../../../Components/Forms/FormField";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const { currentLanguage } = useLanguage();
  const [edit, setEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userType = useSelector((state) => state.userType.userType);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("هذا الحقل مطلوب"),
    email: Yup.string().email("بريد غير صالح").required("هذا الحقل مطلوب"),
    mobile: Yup.string().required("هذا الحقل مطلوب"),
  });

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  const translations = {
    title: { ar: "حسابي", en: "My Account" },
    profilePicture: { ar: "صورة حسابي", en: "Profile Picture" },
    info: { ar: "بياناتي", en: "My Information" },
    edit: { ar: "تعديل", en: "Edit" },
  };

  return (
    <div className="d-flex flex-column space-6">
      <div className="personal-information-content border-account-user p-4">
        <h6>{translations.title[currentLanguage]}</h6>
      </div>

      <div className="personal-information-content border-account-user d-flex flex-column space-6">
        <p className="b-5 d-flex flex-row align-items-center justify-content-between space-6 pb-4 border-gray p-3 px-4">
          {translations.profilePicture[currentLanguage]}
          <span className="cursor-pointer-event">
            <EditIcon />
          </span>
        </p>

        <div className="align-self-center pb-5 p-3">
          <div className="profile-pic text-center">
            <img src={user?.profileImage.url || "./home.jpg"} alt="Profile" className="w-100 h-100" />
          </div>
        </div>
      </div>

      <div className="personal-information-content border-account-user d-flex flex-column space-6 pb-5">
        <p className="b-5 d-flex flex-wrap flex-row align-items-center justify-content-between space-6 pb-4 border-gray p-3 px-4">
          {translations.info[currentLanguage]}
          {edit ? (
            <div className="d-flex flex-row align-items-center space-2">
              <button type="submit" form="edit-profile-form" className="btn-main p-2">
                احفظ التعديلات
              </button>
              <button
                className="btn-main btn-second p-2 text-black border px-5 hover-text-white"
                onClick={() => setEdit(false)}
              >
                الغي
              </button>
            </div>
          ) : (
            <span onClick={() => setEdit(true)} className="cursor-pointer-event">
              <EditIcon />
            </span>
          )}
        </p>

        {edit ? (
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            id="edit-profile-form"
          >
            <div className="p-4 form-container gap-2">
              <Row className="g-3 mb-3">
                <Col xs={12} lg={6}>
                  <div className="d-flex flex-column">
                    <label className="b-9 pb-2" style={{ minWidth: "150px" }}>
                      الاسم <span>*</span>
                    </label>
                    <InputFiled name="name" placeholder="حسام علوان" />
                  </div>
                </Col>

                <Col xs={12} lg={6}>
                  <div className="d-flex flex-column">
                    <label className="b-9 pb-2" style={{ minWidth: "150px" }}>
                      الموبايل <span>*</span>
                    </label>
                    <PhoneNumber name="mobile" type="text" placeholder="011012015010" />
                  </div>
                </Col>
              </Row>


              <div className="mb-3 d-flex flex-column justify-content-between flex-wrap gap-3">
                <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                  نوع الحساب <span>*</span>
                </label>
                <InputFiled name="type" placeholder={userType === "vendor" ? "مالك عقار" : "مطور عقاري (كمبوند)"} />
              </div>

              <div className=" d-flex flex-column justify-content-between flex-wrap gap-3">
                <label className="b-9 me-3" style={{ minWidth: "150px" }}>
                  الايميل <span>*</span>
                </label>
                <InputFiled name="email" placeholder="hoss12345@gmail.com" />
              </div>

            </div>
          </FormField>
        ) : (
          <>
            <div className="d-flex flex-row align-items-center space-3 px-3">
              <ProfileIcon />
              <div className="d-flex flex-column space-1">
                <p className="b-12" style={{ color: "var(--netural-700)" }}>الاسم</p>
                <p className="b-11">حسام علوان</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center space-3 px-3">
              <PhoneIcon />
              <div className="d-flex flex-column space-1">
                <p className="b-12" style={{ color: "var(--netural-700)" }}>رقم الموبايل</p>
                <p className="b-11">011012015010</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center space-3 px-3">
              <ProfileIcon />
              <div className="d-flex flex-column space-1">
                <p className="b-12" style={{ color: "var(--netural-700)" }}>نوع الحساب</p>
                <p className="b-11">{userType === "vendor" ? "مالك عقار" : "مطور عقاري (كمبوند)"}</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center space-3 px-3">
              <EmailIcon />
              <div className="d-flex flex-column space-1">
                <p className="b-12" style={{ color: "var(--netural-700)" }}>الايميل</p>
                <p className="b-11">hoss12345@gmail.com</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
