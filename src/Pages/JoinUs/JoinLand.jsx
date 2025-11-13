import { useEffect, useState } from "react";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import { translations } from "./translations";
import { Col, Row } from "react-bootstrap";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import InputFiled from "../../Components/Forms/InputField";
import FormField from "../../Components/Forms/FormField";
import TextArea from "../../Components/Forms/TextArea";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import WhatsIcon from "../../assets/Icons/WhatsIcon";
import Switch from "../../Components/Forms/Switch";
import ImageUploadGrid from "../../Components/ImageUploadGrid/ImageUploadGrid";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import BreadcrumbsPage from "../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import PropertyAPI from "../../api/propertyApi";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "../../styles/PrimeReact.css";
import GoogleSearchBoxWithMap from "../../Components/GoogleMap/GoogleSearchBoxWithMap";
import "./JoinUs.css";
import SearchToggle from "../../Components/Ui/SearchComponents/SearchToggle ";
import { Field } from "formik";
import PhoneNumberValidation from "../../Components/Forms/PhoneNumberInput";
import data from "../../data/cities.json";
import LandAPI from "../../api/LandApi";

const JoinLand = () => {
  const [isHouse, setIsHouse] = useState(false);
  const { currentLanguage } = useLanguage(); // Get the current language
  const [toggle, setToggle] = useState("sale");
  const [showModal, setShowModal] = useState(false);

  const [selectType, setSelectType] = useState("");
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

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [city, setCity] = useState("");

  const [isItemLoading, setIsItemLoading] = useState(false);

 

  const tabs = [
    { value: "sale", label: translations[currentLanguage].forSale },
    { value: "rent", label: translations[currentLanguage].forRent },
  ];

  const initialValues = {
    type: selectType, // سكني / تجاري / صناعي
    division: toggle, // rent ,sale
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    propertyType: "", //residential
    space: "",
    view: "",
    price: "",
    paymentMethod: "",
    rooms: "",
    floor: "",
    bathrooms: "",
    handoverDate: "",
    finishing: "",
    phone: "",
    whatsapp: false,
    images: [],
  };

  useEffect(() => {
    selectType === "house" ? setIsHouse(true) : setIsHouse(false);
  }, [selectType]);

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    // division
    formData.append("division", toggle);

    // type
    formData.append("type", selectType);

    // titles
    formData.append("title[ar]", values.titleAr);
    formData.append("title[en]", values.titleEn);

    // descritptions
    formData.append("description[ar]", values.descriptionAr);
    formData.append("description[en]", values.descriptionEn);

    // contact
    formData.append("advertiserPhoneNumber", values.phone);
    formData.append("haveWhatsapp", values.whatsapp);

    // lat long
    formData.append("location[city]", city);
    formData.append("location[detailedLocation]", locationDetails);
    formData.append("location[coordinates][]", longitude);
    formData.append("location[coordinates][]", latitude);

    // Details
    formData.append("details[space]", values.space);
    formData.append("details[view]", values.view);
    formData.append("details[paymentMethod]", values.paymentMethod);
    formData.append("details[type]", values.type);
    formData.append("details[price]", values.price);

    // images
    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      console.log("No images to send");
    }

    console.log("Data sent to backend:", Object.fromEntries(formData.entries()));

    setIsItemLoading(true);
    try {
      const response = await LandAPI.createLand(formData);
      console.log(response);
      setShowModal(true);
      resetForm();
    } catch (err) {
      console.error(err);
    } finally {
      setIsItemLoading(false);
      setSelectType("");
      setSelectView(translations[currentLanguage].chooseView);
      setPaymentWay(translations[currentLanguage].paymentWay);
      setAqarSouq(translations[currentLanguage].aqarSouq);
      setFinishing(translations[currentLanguage].finishing);
      setCity("");
      setLocationDetails("");
    }
  };

  return (
    <>
      <HelmetInfo
        titlePage={
          currentLanguage === "ar" ? "أعلن عن أرض" : "Advertise your property"
        }
      />

      <FormField initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <ContainerMedia>
            <div className="form-container finishing align-items-center px-0">
              <div className="w-100">
                <div className="pb-4">
                  <BreadcrumbsPage
                    newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                    mainTitle={"أعلن عن عقارك"}
                    routeTitleTwoBread={false}
                    titleTwoBread={false}
                    secondArrow={false}
                  />
                </div>

                <p className="b-1 mb-2 pb-3 ">أعلن عن أرض</p>
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
                {/* Type */}
                <Row className=" gx-4 mb-4">
                  <Col xs={12} md={12}>
                    <label className="b-12 mb-2">
                      نوع الأرض
                      <span className="required-asterisk"> *</span>
                    </label>
                    <Dropdown
                      value={selectType}
                      onChange={(e) => {
                        setSelectType(e.value); // القيمة الانجليزية
                        setFieldValue("type", e.value); // القيمة الانجليزية
                      }}
                      options={translations[currentLanguage].landType}
                      optionLabel="label" // هيعرض اللي في label
                      optionValue="value" // هيخزن value (انجليزي)
                      name="type"
                      placeholder={translations[currentLanguage].land}
                    />
                  </Col>
                  {/* <Col xs={12} md={4}>
                    <label className="b-12 mb-2">
                      نوع العقار في السوق
                      <span className="required-asterisk"> *</span>
                    </label>
                    <div onClick={() => setRotate2(!rotate2)}>
                      <div onClick={() => setRotatePlace(!rotatePlace)}>
                        <PlaceTypeDropdown
                          placeType={placeType}
                          placeTypeDetails={placeTypeDetails}
                          tabsKind={tabsKind}
                          rotate={rotatePlace}
                          onChange={(value) => {
                            setSelectType(value);
                            setFieldValue("type", value);
                          }}
                        />
                      </div>
                    </div>
                  </Col> */}
                </Row>
                {/* <NestedDropdownAccordion data={nestedLocationData} title="عنوان العقار" placeholder="اختر المكان" /> */}

                {/* Details */}
                <SectionHeader text={"تفاصيل الأرض"} />
                {/* location */}

                <div className="mb-4 ">
                  <label className="b-12 mb-2">
                    عنوان الاعلان <span className="required-asterisk">*</span>
                  </label>
                  <InputFiled name="titleAr" placeholder={"عنوان الاعلان"} />
                </div>

                {/* announcment details*/}

                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                  <label className="b-12 ">
                    تفاصيل الاعلان <span className="required-asterisk">*</span>
                  </label>
                  <TextArea
                    name="descriptionAr"
                    maxLength="700"
                    placeholder={"تفاصيل الاعلان"}
                  />
                </div>

                {/* location in English*/}

                {/* <div className="mb-4 ">
                  <label className="b-12 mb-2">
                    عنوان الاعلان بالانجليزي{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <InputFiled
                    name="titleEn"
                    placeholder={"عنوان الاعلان بالانجليزي"}
                  />
                </div> */}

                {/* announcment details in English*/}

                {/* <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                  <label className="b-12 ">
                    تفاصيل الاعلان بالانجليزي{" "}
                    <span className="required-asterisk">*</span>
                  </label>
                  <TextArea
                    name="descriptionEn"
                    maxLength="700"
                    placeholder={" تفاصيل الاعلان بالانجليزي"}
                  />
                </div> */}

                {/* announcmenter infomation*/}
                <SectionHeader text={"بيانات المعلن"} />

                {/* mobile */}

                <div className="mb-4 lg-w-30">
                  <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                    رقم الموبايل
                    <span className="required-asterisk">*</span>
                  </label>
                  {/* <PhoneNumber
                    name="phone"
                    type="text"
                    placeholder={"اكتب رقمك"}
                  /> */}
                  <Field name="phone" component={PhoneNumberValidation} />
                </div>

                <div className="b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30">
                  <div className="d-flex flex-row space-1">
                    <WhatsIcon />
                    يوجد واتساب علي هذا الرقم
                  </div>
                  <Switch name="whatsapp" />
                </div>

                <div className="mb-4 b-15 d-flex align-items-center space-2">
                  <input
                    className={`form-check-input ${
                      currentLanguage === "en" && "mx-0"
                    }`}
                    type="checkbox"
                    id="flexCheckChecked"
                    defaultChecked
                    style={{ width: "20px", height: "20px" }}
                  />
                  تواصل معي عن طريق الايميل
                </div>

                {/* Aqar description */}
                <SectionHeader text={" وصف الأرض"} />

                {/* Row 1 */}
                {/* size */}
                <Row className="g-3 mb-4">
                  <Col xs={12} md={4}>
                    <label className="b-12 mb-2">
                      المساحة (بالمتر){" "}
                      <span className="required-asterisk"> *</span>
                    </label>
                    <InputFiled name="space" placeholder={"2م"} />
                  </Col>
                  {/* front of house */}
                  <Col xs={12} md={4}>
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

                  {/* aqar souq */}
                  <Col xs={12} md={4}>
                    <label className="b-12 mb-2">
                      نوع العقار ف السوق{" "}
                      <span className="required-asterisk"> *</span>
                    </label>
                    <Dropdown
                      value={aqarSouq}
                      onChange={(e) => {
                        setAqarSouq(e.value);
                        setFieldValue("type", e.value);
                      }}
                      options={translations[currentLanguage].aqarSouqDetails}
                      placeholder={translations[currentLanguage].aqarSouq}
                      name="type"
                      optionValue="value" // هيخزن value (انجليزي)
                      optionLabel="label" // هيعرض اللي في label
                    ></Dropdown>
                  </Col>


                  <Col xs={12} md={6}>
                    <label className="b-12 mb-2">
                      السعر <span className="required-asterisk"> *</span>
                    </label>
                    <InputFiled name="price" placeholder={"السعر"} />
                  </Col>
                  
                  {/* payment */}
                  <Col xs={12} md={6}>
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

                </Row>

                {/* Row 2 */}

                <Row className="g-3 mb-4">{/* price */}</Row>

                {/* Location of the property */}
                <SectionHeader text={"عنوان الأرض"} />

                {/* location */}

                <div className="mb-4">
                  <div className="mb-4">
                    <label className="b-12 mb-2">
                      عنوان الأرض <span className="required-asterisk"> *</span>
                    </label>
                    <Dropdown
                      value={city}
                      onChange={(e) => {
                        setCity(e.value);
                        setFieldValue("city", e.value);
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
                    عنوان الأرض <span className="required-asterisk">*</span>
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

                {/* photos */}
                <SectionHeader text={"صور الأرض"} />

                <div className="mb-4">
                  <ImageUploadGrid name="images" />
                </div>

                <div className="d-flex justify-content-center mt-5 pt-3">
                  <button
                    type="submit"
                    className="btn-main btn-submit b-11"
                    disabled={isItemLoading}
                  >
                    {isItemLoading ? "جاري الإرسال..." : "ابعت للموافقة"}
                  </button>
                </div>

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
      </FormField>
    </>
  );
};

export default JoinLand;
