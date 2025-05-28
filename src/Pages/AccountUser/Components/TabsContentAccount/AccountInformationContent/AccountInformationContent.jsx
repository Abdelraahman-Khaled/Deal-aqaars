// @ts-nocheck
import React, { useState, useEffect } from "react";
import "./AccountInfo.css";
import { toast } from "react-toastify";
import imgProfile from "../../../../../assets/images/home.jpg"
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { useLanguage } from "../../../../../Components/Languages/LanguageContext";
import FormField from "../../../../../Components/Forms/FormField";
import InputFiled from "../../../../../Components/Forms/InputField";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const translations = {
  title: { ar: "امان الحساب", en: "Account security" },
  password: { ar: "كلمة السر", en: "Password" },
  choosePassword: { ar: "اختار كلمة سر قوية عشان تحمي حسابك. ", en: "Choose a strong password to keep your account safe." },
  makePassword: { ar: "اعمل كلمة سر", en: "Make a password" },
  google: { ar: "  تسجيل بجوجل", en: "Log in with Google" },
  googleAccount: { ar: "إنت رابط حساب جوجل بـ Deal وبتستخدمه في تسجيل الدخول. إنت داخل بحساب hoss12345@gmail.com الخاص بك مع كلمة السر التي قمت بإعطاءها عند إنشاء حسابك. الرجاء تأكيد رقم هاتفك للمتابعة.", en: "You are linked to a Google account with Deal and you can log in with it. You are logged in to hoss12345@gmail.com account with the password you provided when you created your account. Please confirm your phone number to proceed." },
  cancelGoogle: { ar: "الغي ربط الحساب", en: "Cancel" },
  deleteAccount: { ar: "مسح الحساب", en: "Delete account" },
  deleteDetails: { ar: "لو حذفت حسابك، كل بياناتك هتتمسح ومش هتقدر تسترجعها تاني. لو متأكد، دوس على امسح حسابي.", en: "If you delete your account, all your data will be deleted and you will not be able to recover it. If you are sure, click Delete Account." },
  deleteBtn: { ar: "امسح حسابي ", en: "Delete account" },
}

const AccountInformationContent = () => {
  const { currentLanguage } = useLanguage(); // Get current language
  const [opacity, setOpacity] = useState(true);
  const [password, setPassword] = useState(false);
  const [inputType, setInputType] = useState("password")

  const [profileData, setProfileData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("هذا الحقل مطلوب"),
    newPassword: Yup.string().email("بريد غير صالح").required("هذا الحقل مطلوب"),
    confirmPassword: Yup.string().required("هذا الحقل مطلوب"),
  });


  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };



  return (
    <div className="d-flex flex-column space-6">
      <div className="personal-information-content border-account-user p-4">
        <h6>{translations.title[currentLanguage]}</h6>
      </div>

      {!password ? (
        <>
          <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
            <div className="col-9">
              <p className="b-5 pb-1">{translations.password[currentLanguage]}</p>
              <p className="b-12 text-gray">{translations.choosePassword[currentLanguage]}</p>
            </div>
            <button
              className="btn-second btn-main p-2 col-1 min-w-max b-11"
              style={{ border: "1px solid var(--primary)", height: "fit-content" }}
              onClick={() => setPassword(!password)}
            >
              {translations.makePassword[currentLanguage]}
            </button>
          </div>

          {opacity && (
            <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
              <div className="col-9">
                <p className="b-5 pb-1">{translations.google[currentLanguage]}</p>
                <p className="b-12 text-gray">{translations.googleAccount[currentLanguage]}</p>
              </div>
              <button
                className="btn-second btn-main p-2 col-1 min-w-max b-11"
                style={{ border: "1px solid var(--primary)", height: "fit-content" }}
                onClick={() => setOpacity(false)}
              >
                {translations.cancelGoogle[currentLanguage]}
              </button>
            </div>
          )}

          <div className="personal-information-content border-account-user p-4 row m-0 justify-content-between align-items-center space-2">
            <div className="col-9">
              <p className="b-5 pb-1">{translations.deleteAccount[currentLanguage]}</p>
              <p className="b-12 text-gray">{translations.deleteDetails[currentLanguage]}</p>
            </div>
            <button
              className="btn-second btn-main p-2 col-1 min-w-max b-10 error background-red"
              style={{ height: "fit-content" }}
            >
              {translations.deleteBtn[currentLanguage]}
            </button>
          </div>
        </>
      ) : <>

        <FormField
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          id="edit-profile-form"
        >
          <div className="d-flex flex-column align-items-center">
            <div className="p-4 form-container align-items-start gap-4 w-50">

              <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1">
                <label className="b-11 me-3 pb-2" style={{ minWidth: "150px" }}>
                  الرقم السري الحالي <span>*</span>
                </label>
                <InputFiled
                  name="password"
                  type={inputType}
                  placeholder={" • • • • • • • •"}
                  success
                  setInputType={setInputType}
                />
              </div>

              <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1">
                <label className="b-11 me-3 pb-2" style={{ minWidth: "150px" }}>
                  الرقم السري الجديد <span>*</span>
                </label>
                <InputFiled
                  name="newPassword"
                  type={inputType}
                  placeholder={" • • • • • • • •"}
                  success
                  setInputType={setInputType}
                />
              </div>

              <div className="w-100 d-flex flex-column justify-content-between flex-wrap gap-1">
                <label className="b-11 me-3" style={{ minWidth: "150px" }}>
                  تأكيد الرقم السري الجديد <span>*</span>
                </label>
                <InputFiled
                  name="confirmPassword"
                  type={inputType}
                  placeholder={" • • • • • • • •"}
                  success
                  setInputType={setInputType}
                />
              </div>


              <Link to={"#"} className="b-15">
                نسيت الرقم السري؟
              </Link>

              <button className="btn-main w-100">
                تغيير كلمة السر
              </button>

            </div>
          </div>
        </FormField>
      </>}
    </div>


  );
};

export default AccountInformationContent;
