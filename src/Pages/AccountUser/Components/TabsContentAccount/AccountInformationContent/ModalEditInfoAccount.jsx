import OtpForm from "Components/Auth/OtpForm/OtpForm";
import CustomModal from "Components/CustomModal/CustomModal";
import FormField from "Components/Forms/FormFiled";
import InputFiled from "Components/Forms/InputField";
import SuccessSend from "Components/Ui/SuccessSend/SuccessSend";
import { useState } from "react";
import * as Yup from "yup";

const ModalEditInfoAccount = ({
  showModalEditInfoAccount,
  hideModalEditInfoAccount,
  initialValue
}) => {
  const validationSchema = Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
      .required("ادخل البريد الإلكتروني أو رقم الهاتف")
      .test(
        "رقم الهاتف او البريد الالكترونى",
        "رقم هاتف او الايميل خطأ",
        function (value) {
          return (
            Yup.string().email().isValidSync(value) ||
            Yup.string()
              .matches(/^[0-9]{10,14}$/, {
                message: "رقم هاتف خطأ",
                excludeEmptyString: true
              })
              .isValidSync(value)
          );
        }
      )
  });

  const initialValues = {
    emailOrPhoneNumber: initialValue
  };

  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState(initialValue);
  //   SHOW OTP
  const [showOtp, setShowOtp] = useState(false);
  const hideOtp = () => {
    setShowOtp(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    if (values) {
      setShowOtp(true);
      hideModalEditInfoAccount();
    }
  };

  // SUCCESS SEND MODAL
  const [successSend, setSuccessSend] = useState(false);
  const successSendButton = (e) => {
    e.preventDefault();
    setSuccessSend(true);
    hideOtp();
  };
  const hidesuccessSendButton = () => {
    setSuccessSend(false);
  };
  return (
    <>
      <SuccessSend
        showsuccessModalSend={successSend}
        hideSuccessModalSend={hidesuccessSendButton}
        titleModal={"تم التاكيد بنجاح."}
        titleSend={"تم تغيير البريد الإلكتروني بنجاح!"}
        isTrueText={true}
        textSend={"لقد تم الدفع بنجاح يمكنك متابعة الطلب من هنا"}
        textButton={"تم"}
      />
      <OtpForm
        showOtpForm={showOtp}
        hideOtpForm={hideOtp}
        successSendButton={successSendButton}
      />
      <CustomModal
        show={showModalEditInfoAccount}
        onHide={hideModalEditInfoAccount}
        title={"تعديل البريد الإلكتروني"}
        newClass={"modal-edit-info-account"}
      >
        {/* =============== START ALL INFO EDIT ============== */}
        <div className="all-info-edit">
          {/* ========== START FORM FIELD ========= */}
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <InputFiled
              label="البريد الإلكتروني أو رقم الهاتف"
              name="emailOrPhoneNumber"
              type="text"
              placeholder=""
              value={emailOrPhoneNumber}
              onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
              success
            />

            <button type="submit" className="btn-main btn-submit w-100 mt-3">
              حفظ
            </button>
          </FormField>
          {/* ========== END FORM FIELD ========= */}
        </div>
        {/* =============== END ALL INFO EDIT ============== */}
      </CustomModal>
    </>
  );
};

export default ModalEditInfoAccount;
