import React, { useState } from "react";
import { translations } from "./translations";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import InputFiled from "../../Components/Forms/InputField";
import { Col, Row } from "react-bootstrap";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import ImageUploadGrid from "../../Components/ImageUploadGrid/ImageUploadGrid";
import SearchToggle from "../../Components/Ui/SearchComponents/SearchToggle ";
import { Dropdown } from "primereact/dropdown";
import RealStateCard from "../../Components/Ui/RealStateCard/RealStateCard";
import CloseIcon from "../../assets/Icons/CloseIcon";
import ImageUploadCompound from "../../Components/ImageUploadGrid/ImageUploadCompound";
import TextArea from "../../Components/Forms/TextArea";

const Compound3 = ({ formData, setFormData }) => {
  const { currentLanguage } = useLanguage();

  const [currentUnit, setCurrentUnit] = useState({
    unitDetails: {
      unitType: "",
      aqarType: "",
      announcementTitle: { ar: "" },
      announcementDetails: { ar: "" },
    },
    aqarDetails: {
      space: "",
      price: "",
      view: "",
      paymentType: "",
      type: "",
      rooms: "",
      floor: "",
      bathrooms: "",
      handingYear: "",
      finishingType: "",
    },
    aqarImages: [],
  });

  const [toggle, setToggle] = useState("sale"); // sale/rent
  const [selectVeiw, setSelectView] = useState("");
  const [paymentWay, setPaymentWay] = useState("");
  const [aqarSouq, setAqarSouq] = useState("");
  const [finishing, setFinishing] = useState("");

  const readFileAsDataURL = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  // ------------------------------
  // Add Unit
  // ------------------------------
  // inside Compound3 component
  const handleAddUnit = async () => {
    // Normalize images: keep File and preview string for each entry
    const normalizedImages = await Promise.all(
      currentUnit.aqarImages.map(async (image) => {
        // If already an object { file, preview } return as-is
        if (image && image.file instanceof File) return image;

        // If it's a File, create a preview URL (do not convert to base64 to send)
        if (image instanceof File) {
          return {
            file: image,
            preview: URL.createObjectURL(image),
          };
        }

        // If it's a string (base64 or url), keep it as preview, file=null
        if (typeof image === "string") {
          return { file: null, preview: image };
        }

        // If it's an object with url (from previous code), preserve file if present
        if (image && image.url) {
          return { file: image.file || null, preview: image.url };
        }

        return { file: null, preview: "" };
      })
    );

    const newUnit = {
      unitDetails: {
        unitType: toggle,
        aqarType: currentUnit.unitDetails.unitType,
        announcementTitle: { ar: currentUnit.unitDetails.announcementTitle.ar },
        announcementDetails: { ar: currentUnit.unitDetails.announcementDetails.ar },
      },
      aqarDetails: {
        space: currentUnit.aqarDetails.space,
        price: currentUnit.aqarDetails.price,
        view: selectVeiw,
        paymentType: paymentWay,
        type: aqarSouq,
        rooms: currentUnit.aqarDetails.rooms,
        floor: currentUnit.aqarDetails.floor,
        bathrooms: currentUnit.aqarDetails.bathrooms,
        handingYear: currentUnit.aqarDetails.handingYear,
        finishingType: finishing,
      },
      // keep normalized objects so you can preview and upload
      aqarImages: normalizedImages,
    };

    setFormData((prev) => ({
      ...prev,
      units: [...prev.units, newUnit],
    }));

    // Reset and revoke previews from created object URLs
    normalizedImages.forEach((img) => {
      if (img && img.preview && img.file instanceof File) {
        // Optional: revoke object URL later when not needed to avoid memory leaks:
        // URL.revokeObjectURL(img.preview);
      }
    });

    setCurrentUnit({
      unitDetails: { unitType: "", aqarType: "", announcementTitle: { ar: "" }, announcementDetails: { ar: "" } },
      aqarDetails: { space: "", price: "", view: "", paymentType: "", type: "", rooms: "", floor: "", bathrooms: "", handingYear: "", finishingType: "" },
      aqarImages: [],
    });
    setSelectView("");
    setPaymentWay("");
    setAqarSouq("");
    setFinishing("");
  };


  // ------------------------------
  // Remove Unit
  // ------------------------------
  const handleRemoveUnit = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      units: prev.units.filter((_, index) => index !== indexToRemove),
    }));
  };

  const tabs = [
    { value: "sale", label: translations[currentLanguage].forSale },
    { value: "rent", label: translations[currentLanguage].forRent },
  ];

  return (
    <div className="w-100">
      <SectionHeader text={"وحدات المشروع"} />

      {/* Render Added Units */}
      {formData.units.length > 0 && (
        <div className="mt-4">
          <SectionHeader text={"الوحدات المضافة"} />
          <Row className="d-flex flex-wrap ">
            {formData.units.map((unit, index) => (
              <div className="col-4 position-relative" key={index}>
                <RealStateCard
                  id={index}
                  price={unit.aqarDetails.price}
                  space={unit.aqarDetails.space}
                  division={unit.unitDetails.unitType}
                  img={unit.aqarImages.map((img) => img.preview || img.url || img)}
                  bath={unit.aqarDetails.bathrooms}
                  rooms={unit.aqarDetails.rooms}
                  title={unit.unitDetails?.announcementTitle?.ar}
                  details={unit.unitDetails?.announcementDetails?.ar}
                  deleteItem={true}
                  remove={handleRemoveUnit}
                  wrapperClass="flex-wrap"
                />
              </div>
            ))}
          </Row>
        </div>
      )}

      {/* ADD NEW UNIT */}
      <div className="trade-card finishing">
        <SectionHeader text={"تفاصيل الوحدة"} />

        <label className="b-12 mb-2">
          القسم <span className="required-asterisk">*</span>
        </label>
        <div className="select-type join tabs-home justify-content-center mb-4">
          <SearchToggle
            toggleState={toggle}
            setToggleState={setToggle}
            tabs={tabs}
          />
        </div>

        {/* Property Type */}
        <Row className=" gx-4 mb-4">
          <Col xs={12} md={12}>
            <label className="b-12 mb-2">
              نوع الوحدة <span className="required-asterisk">*</span>
            </label>
            <Dropdown
              value={currentUnit.unitDetails.unitType}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  unitDetails: { ...prev.unitDetails, unitType: e.value },
                }))
              }
              options={translations[currentLanguage].aqarType}
              optionLabel="label"
              optionValue="value"
              placeholder={translations[currentLanguage].aqar}
            />
          </Col>
        </Row>

        {/* location */}
        <div className="mb-4 ">
          <label className="b-12 mb-2">
            عنوان الاعلان <span className="required-asterisk">*</span>
          </label>
          <input
            name="announcementTitle"
            className="form-control"
            placeholder={"عنوان الاعلان"}
            value={currentUnit.unitDetails.announcementTitle.ar}
            onChange={(e) =>
              setCurrentUnit((prev) => ({
                ...prev,
                unitDetails: {
                  ...prev.unitDetails,
                  announcementTitle: { ar: e.target.value },
                },
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
            name="announcementDetails"
            placeholder="تفاصيل الاعلان"
            value={currentUnit.unitDetails.announcementDetails.ar}
            onChange={(e) =>
              setCurrentUnit((prev) => ({
                ...prev,
                unitDetails: {
                  ...prev.unitDetails,
                  announcementDetails: { ar: e.target.value },
                },
              }))
            }
          />
        </div>

        {/* Aqar Description */}
        <SectionHeader text={"وصف العقار"} />
        <Row className="g-3 mb-4">
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              المساحة بالمتر
              <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="space"
              placeholder={"2م"}
              value={currentUnit.aqarDetails.space}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: { ...prev.aqarDetails, space: e.target.value },
                }))
              }
              className="input-field form-control"
            />
          </Col>
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              تطل على <span className="required-asterisk"> *</span>
            </label>
            <Dropdown
              value={selectVeiw}
              onChange={(e) => setSelectView(e.value)}
              options={translations[currentLanguage].view}
              placeholder={translations[currentLanguage].chooseView}
              optionValue="value"
              optionLabel="label"
            />
          </Col>
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              التشطيب <span className="required-asterisk"> *</span>
            </label>
            <Dropdown
              value={finishing}
              onChange={(e) => setFinishing(e.value)}
              options={translations[currentLanguage].finishingDetails}
              placeholder={translations[currentLanguage].finishing}
              optionValue="value"
              optionLabel="label"
            />
          </Col>
          <Col xs={12} md={3}>
            <label className="b-12 mb-2">
              طريقة الدفع <span className="required-asterisk"> *</span>
            </label>
            <Dropdown
              value={paymentWay}
              onChange={(e) => setPaymentWay(e.value)}
              options={translations[currentLanguage].paymentWayDetails}
              placeholder={translations[currentLanguage].paymentWay}
              optionValue="value"
              optionLabel="label"
            />
          </Col>
          <Col xs={12} md={3}>
            <label className="b-12 mb-2">
              نوع العقار في السوق <span className="required-asterisk"> *</span>
            </label>
            <Dropdown
              value={aqarSouq}
              onChange={(e) => setAqarSouq(e.value)}
              options={translations[currentLanguage].aqarSouqDetails}
              placeholder={translations[currentLanguage].aqarSouq}
              optionValue="value"
              optionLabel="label"
            />
          </Col>
          {/*  Rooms, Floor, Bathrooms, Year, Price  */}
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              عدد الغرف <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="rooms"
              placeholder={"عدد الغرف"}
              value={currentUnit.aqarDetails.rooms}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: { ...prev.aqarDetails, rooms: e.target.value },
                }))
              }
              className="input-field form-control"
            />
          </Col>
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              الدور <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="floor"
              placeholder={"الدور"}
              value={currentUnit.aqarDetails.floor}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: { ...prev.aqarDetails, floor: e.target.value },
                }))
              }
              className="input-field form-control"
            />
          </Col>
          <Col xs={12} md={2}>
            <label className="b-12 mb-2">
              عدد الحمامات <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="bathrooms"
              placeholder={"عدد الحمامات"}
              value={currentUnit.aqarDetails.bathrooms}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: {
                    ...prev.aqarDetails,
                    bathrooms: e.target.value,
                  },
                }))
              }
              className="input-field form-control"
            />
          </Col>
          <Col xs={12} md={3}>
            <label className="b-12 mb-2">
              سنة التسليم <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="handingYear"
              placeholder={"سنة التسليم"}
              value={currentUnit.aqarDetails.handingYear}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: {
                    ...prev.aqarDetails,
                    handingYear: e.target.value,
                  },
                }))
              }
              className="input-field form-control"
            />
          </Col>
          <Col xs={12} md={3}>
            <label className="b-12 mb-2">
              السعر <span className="required-asterisk"> *</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder={"السعر"}
              value={currentUnit.aqarDetails.price}
              onChange={(e) =>
                setCurrentUnit((prev) => ({
                  ...prev,
                  aqarDetails: { ...prev.aqarDetails, price: e.target.value },
                }))
              }
              className="input-field form-control"
            />
          </Col>
        </Row>

        {/* IMAGES */}
        <SectionHeader text={"صور الوحدة"} />
        <div className="mb-4">
          <ImageUploadCompound
            value={currentUnit.aqarImages}
            onChange={(imgs) =>
              setCurrentUnit((prev) => ({ ...prev, aqarImages: imgs }))
            }
          />
        </div>

        {/* Add Unit Button */}
        <button
          type="button"
          className="btn-main btn-submit b-11"
          onClick={handleAddUnit}
        >
          إضافة الوحدة
        </button>
      </div>
    </div>
  );
};

export default Compound3;
