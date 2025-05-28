import { useRef, useState } from "react";
import image_1 from "../../../../../assets/images/home.jpg";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModal from "../../../../../Components/CustomModal/CustomModal";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import InputFiled from "../../../../../Components/Forms/InputField";
import FormField from "../../../../../Components/Forms/FormField";

const ModalEditPersonalInformation = ({
  showModalEditInformation,
  hideModalEditInformation,
  onSubmitProfileUpdate,
  initialProfile,
  currentLanguage, // Inject current language
}) => {
  const [image, setImage] = useState(initialProfile?.image || image_1);
  const [name, setName] = useState(initialProfile?.name || "");

  const translations = {
    name: { ar: "الإسم", en: "Name" },
    save: { ar: "حفظ", en: "Save" },
    editTitle: { ar: "تعديل المعلومات الشخصية", en: "Edit Personal Information" },
    enterName: { ar: "أدخل اسمك", en: "Enter your name" },
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    onSubmitProfileUpdate({
      name: values.name,
      image: image !== image_1 ? fileInputRef.current.files[0] : null,
    });
    setSubmitting(false);
    hideModalEditInformation();
    toast.success(translations.save[currentLanguage]);
  };

  return (
    <CustomModal
      show={showModalEditInformation}
      onHide={hideModalEditInformation}
      title={translations.editTitle[currentLanguage]}
      newClass={"modal-edit-information"}
    >
      <div className="all-content-edit-info">
        <div className="image-user-edit position-relative overlay-bg">
          <img src={image} alt="User" className="image-edit" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            className="edit-btn--1"
            onClick={() => fileInputRef.current.click()}
          >
            <EditIcon />
          </button>
        </div>

        <div className="form-edit-content">
          <FormField
            initialValues={{ name }}
            onSubmit={handleSubmit}
          >
            <div className="row g-3">
              <div className="col-12">
                <InputFiled
                  label={translations.name[currentLanguage]}
                  name="name"
                  type="text"
                  placeholder={translations.enterName[currentLanguage]}
                  value={name}
                  success
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn-main btn-save mt-5 btn-height">
                {translations.save[currentLanguage]}
              </button>
            </div>
          </FormField>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalEditPersonalInformation;

