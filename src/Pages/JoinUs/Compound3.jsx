import React, { useState } from "react";
import { translations } from "./translations";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import InputFiled from "../../Components/Forms/InputField";
import FormField from "../../Components/Forms/FormField";
import { Col, Row } from "react-bootstrap";
import TabsContent from "../../Components/Ui/TabsContent/TabsContent";
import MenuArrow from "../../assets/Icons/MenuArrow";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import TextArea from "../../Components/Forms/TextArea";
import ImageUploadGrid from "../../Components/ImageUploadGrid/ImageUploadGrid";
import SearchToggle from "../../Components/Ui/SearchComponents/SearchToggle ";
import { Dropdown } from "primereact/dropdown";
import RealStateCard from "../../Components/Ui/RealStateCard/RealStateCard";

const Compound3 = ({ formData, setFormData }) => {
  const [currentUnit, setCurrentUnit] = useState({
    unitDetails: { unitType: "", aqarType: "" },
    aqarDetails: { space: 0, price: 0 },
  });
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle, setToggle] = useState("sale");
  const [selectType, setSelectType] = useState("");

  const [selectAqar, setSelectAqar] = useState(
    translations[currentLanguage].aqar
  );
  const [placeType, setPlaceType] = useState("نوع المكان");
  const [placeTypeDetails, setPlaceTypeDetails] = useState("");

  const [selectVeiw, setSelectView] = useState(
    translations[currentLanguage].chooseView
  );
  const [paymentWay, setPaymentWay] = useState(
    translations[currentLanguage].paymentWay
  );
  const [aqarSouq, setAqarSouq] = useState(
    translations[currentLanguage].aqarSouq
  );
  const [finishing, setFinishing] = useState(
    translations[currentLanguage].finishing
  );

  const [rotate, setRotate] = useState(false);
  const [rotate2, setRotate2] = useState(false);
  const [rotatePlace, setRotatePlace] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectCompany, setSelectCompany] = useState(
    translations[currentLanguage].company
  );

  const handleAddUnit = () => {
    if (validateCurrentUnit()) {
      setFormData((prev) => ({ ...prev, units: [...prev.units, currentUnit] }));
      setCurrentUnit({
        unitDetails: { unitType: "", aqarType: "" },
        aqarDetails: { space: 0, price: 0 },
      });
    }
  };

  const validateCurrentUnit = () => {
    // if (!currentUnit.unitDetails.unitType) {
    //   alert("Please select a Unit Type.");
    //   return false;
    // }
    // if (currentUnit.aqarDetails.space <= 0) {
    //   alert("Please enter a valid space for the unit.");
    //   return false;
    // }
    // if (currentUnit.aqarDetails.price <= 0) {
    //   alert("Please enter a valid price for the unit.");
    //   return false;
    // }
    return true;
  };

  const tabs = [
    { value: "sale", label: translations[currentLanguage].forSale },
    { value: "rent", label: translations[currentLanguage].forRent },
  ];

  return (
    <>
      <FormField initialValues={formData}>
        <div className="w-100">
          {/* company Details */}
          <SectionHeader text={"وحدات المشروع"} />
          {formData.units.length > 0 && (
            <div className="mt-4">
              <SectionHeader text={"الوحدات المضافة"} />
              {formData.units.map((unit, index) => (
                <RealStateCard
                  key={index}
                  price={unit.aqarDetails.price}
                  space={unit.aqarDetails.space}
                  company={true}
                  connections={true}
                  // You might need to map other unit details to RealStateCard props
                  // For example, if unitDetails.unitType maps to a 'type' prop in RealStateCard
                  // type={unit.unitDetails.unitType}
                  // img={unit.aqarImages} // Assuming you have an array of images in currentUnit
                  wrapperClass="flex-wrap"
                />
              ))}
            </div>
          )}
          <div className="trade-card finishing">
            <SectionHeader text={"تفاصيل الوحدة"} />
            <label className="b-12 mb-2">
              القسم
              <span className="required-asterisk"> *</span>
            </label>

            <div className="select-type join tabs-home justify-content-center mb-4">
              <SearchToggle
                toggleState={toggle}
                setToggleState={setToggle}
                tabs={tabs}
              />
            </div>

            <Row className=" gx-4 mb-4">
              <Col xs={12} md={12}>
                <label className="b-12 mb-2">
                  نوع العقار
                  <span className="required-asterisk"> *</span>
                </label>
                <Dropdown
                  value={currentUnit.unitDetails.unitType}
                  onChange={(e) => {
                    setCurrentUnit((prev) => ({
                      ...prev,
                      unitDetails: { ...prev.unitDetails, unitType: e.value },
                    }));
                  }}
                  options={translations[currentLanguage].aqarType}
                  optionLabel="label" // هيعرض اللي في label
                  optionValue="value" // هيخزن value (انجليزي)
                  name="type"
                  placeholder={translations[currentLanguage].aqar}
                />
              </Col>
            </Row>

            {/* location */}
            <div className="row">
              <div className="mb-4 w-100">
                <label className="b-12 mb-2">
                  عنوان الاعلان <span className="required-asterisk">*</span>
                </label>
                <InputFiled name="location" placeholder={"عنوان الاعلان"} />
              </div>
              {/* <div className="mb-4 w-50 ">
                <label className="b-12 mb-2">
                  عنوان الاعلان بالانجليزي{" "}
                  <span className="required-asterisk">*</span>
                </label>
                <InputFiled name="location" placeholder={"عنوان الاعلان"} />
              </div> */}
            </div>

            {/* Company */}
            <div className="mb-4 ">
              <label className="b-12 ">
                تفاصيل الاعلان <span className="required-asterisk">*</span>
              </label>
              <TextArea name="location" placeholder={"عنوان الاعلان"} />
            </div>

            {/* <div className="mb-4 ">
              <label className="b-12 ">
                تفاصيل الاعلان بالانجليزي
                <span className="required-asterisk">*</span>
              </label>
              <TextArea
                name="location"
                placeholder={"عنوان الاعلان بالانجليزي"}
              />
            </div> */}

            {/* Aqar description */}
            <SectionHeader text={" وصف العقار"} />

            {/* Row 1 */}
            {/* size */}
            <Row className="g-3 mb-4">
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  المساحة (بالمتر) <span className="required-asterisk"> *</span>
                </label>
                <InputFiled
                  name="space"
                  placeholder={"2م"}
                  value={currentUnit.aqarDetails.space}
                  onChange={(e) =>
                    setCurrentUnit((prev) => ({
                      ...prev,
                      aqarDetails: {
                        ...prev.aqarDetails,
                        space: e.target.value,
                      },
                    }))
                  }
                />
              </Col>
              {/* front of house */}
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  تطل على<span className="required-asterisk"> *</span>
                </label>
                <Dropdown
                  value={selectVeiw}
                  onChange={(e) => {
                    setSelectView(e.value);
                    setFieldValue("view", e.value);
                  }}
                  options={translations[currentLanguage].view}
                  placeholder={translations[currentLanguage].chooseView}
                  name="view"
                  className="hide-scrollbar"
                  optionValue="value" // هيخزن value (انجليزي)
                  optionLabel="label" // هيعرض اللي في label
                ></Dropdown>
              </Col>

              {/* Finishing */}
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  نوع التطشيب <span className="required-asterisk"> *</span>
                </label>
                <Dropdown
                  value={finishing}
                  onChange={(e) => {
                    setFinishing(e.value);
                    setFieldValue("finishing", e.value);
                  }}
                  options={translations[currentLanguage].finishingDetails}
                  placeholder={translations[currentLanguage].finishing}
                  name="finishing"
                >
                  optionValue="value" // هيخزن value (انجليزي)
                  optionLabel="label" // هيعرض اللي في label
                </Dropdown>
              </Col>

              {/* payment */}
              <Col xs={12} md={3}>
                <label className="b-12 mb-2">
                  طريقة الدفع<span className="required-asterisk"> *</span>
                </label>
                <Dropdown
                  value={paymentWay}
                  onChange={(e) => {
                    setPaymentWay(e.value);
                    setFieldValue("paymentMethod", e.value);
                  }}
                  options={translations[currentLanguage].paymentWayDetails}
                  placeholder={translations[currentLanguage].paymentWay}
                  name="paymentMethod"
                  className="hide-scrollbar"
                  optionValue="value" // هيخزن value (انجليزي)
                  optionLabel="label" // هيعرض اللي في label
                ></Dropdown>
              </Col>

              {/* aqar souq */}
              <Col xs={12} md={3}>
                <label className="b-12 mb-2">
                  نوع العقار ف السوق{" "}
                  <span className="required-asterisk"> *</span>
                </label>
                <Dropdown
                  value={aqarSouq}
                  onChange={(e) => {
                    setAqarSouq(e.value);
                    setFieldValue("propertyType", e.value);
                  }}
                  options={translations[currentLanguage].aqarSouqDetails}
                  placeholder={translations[currentLanguage].aqarSouq}
                  name="propertyType"
                  optionValue="value" // هيخزن value (انجليزي)
                  optionLabel="label" // هيعرض اللي في label
                ></Dropdown>
              </Col>

              {/* rooms number */}
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  عدد الغرف <span className="required-asterisk"> *</span>
                </label>
                <InputFiled name="rooms" placeholder={"عدد الغرف"} />
              </Col>

              {/* no.floor */}
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  الدور <span className="required-asterisk"> *</span>
                </label>
                <InputFiled name="floor" placeholder={" رقم الدور "} />
              </Col>

              {/* no.Bathroom */}
              <Col xs={12} md={2}>
                <label className="b-12 mb-2">
                  الحمامات <span className="required-asterisk"> *</span>
                </label>
                <InputFiled name="bathrooms" placeholder={" عدد الحمامات "} />
              </Col>

              {/* Row 2 */}

              {/* no.Year */}
              <Col xs={12} md={3}>
                <label className="b-12 mb-2">
                  سنة التسليم <span className="required-asterisk"> *</span>
                </label>
                <InputFiled
                  name="handoverYear"
                  placeholder={"حدد سنة التسليم "}
                />
              </Col>
              {/* price */}
              <Col xs={12} md={3}>
                <label className="b-12 mb-2">
                  السعر <span className="required-asterisk"> *</span>
                </label>
                <InputFiled
                  name="price"
                  placeholder={"السعر"}
                  value={currentUnit.aqarDetails.price}
                  onChange={(e) =>
                    setCurrentUnit((prev) => ({
                      ...prev,
                      aqarDetails: {
                        ...prev.aqarDetails,
                        price: e.target.value,
                      },
                    }))
                  }
                />
              </Col>
            </Row>

            <SectionHeader text={"صور المشروع"} />
            <div className="mb-4">
              <ImageUploadGrid name={"units[index][aqarImages]"} />
            </div>

            <button
              type="button"
              className="btn-main btn-submit b-11"
              onClick={(e) => {
                e.preventDefault();
                handleAddUnit();
              }}
            >
              إضافة الوحدة
            </button>
          </div>
        </div>
      </FormField>
    </>
  );
};

export default Compound3;
