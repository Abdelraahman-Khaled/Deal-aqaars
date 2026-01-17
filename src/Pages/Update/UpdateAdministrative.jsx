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
import { Link, useParams } from "react-router-dom";
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
import Loader from "../../Components/Loader/Loader";

const UpdateAdministrative = () => {
    const { id } = useParams();
    const [isHouse, setIsHouse] = useState(false);
    const { currentLanguage } = useLanguage();
    const [toggle, setToggle] = useState("sale");
    const [showModal, setShowModal] = useState(false);
    const [propertyData, setPropertyData] = useState(null);
    const [removedImages, setRemovedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        type: propertyData?.type || "",
        division: toggle,
        titleAr: propertyData?.title?.ar || "",
        titleEn: propertyData?.title?.en || "",
        descriptionAr: propertyData?.description?.ar || "",
        descriptionEn: propertyData?.description?.en || "",
        propertyType: propertyData?.details?.propertyType || "",
        space: propertyData?.details?.space || "",
        view: propertyData?.details?.view || "",
        price: propertyData?.details?.price || "",
        paymentMethod: propertyData?.details?.paymentMethod || "",
        rooms: propertyData?.details?.rooms || "",
        floor: propertyData?.details?.floor || "",
        bathrooms: propertyData?.details?.bathrooms || "",
        finishing: propertyData?.details?.finishing || "",
        buildingYear: propertyData?.details?.buildingYear || "",
        handingOverYear: propertyData?.details?.handingOverYear || "",
        phone: propertyData?.advertiserPhoneNumber || "",
        whatsapp: propertyData?.hasWhatsapp || false,
        images: propertyData?.images || [],
    };

    useEffect(() => {
        selectType === "shop" ? setIsHouse(true) : setIsHouse(false);
    }, [selectType]);

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            try {
                const response = await PropertyAPI.getAdministrativeById(id);

                setPropertyData(response.data);
                setToggle(response.data.division);

                setSelectType(response.data.type || "");
                setSelectView(response.data.details.view);
                setPaymentWay(response.data.details.paymentMethod);
                setAqarSouq(response.data.details.type || "");
                setFinishing(response.data.details.finishing || "");
                const coords = response.data.location.coordinates;
                if (coords) {
                    const lat = coords.coordinates ? coords.coordinates[1] : coords[1];
                    const lng = coords.coordinates ? coords.coordinates[0] : coords[0];
                    setLatitude(lat);
                    setLongitude(lng);
                }

                setLocationDetails(response.data.location.detailedLocation);
                setCity(response.data.location.city);
            } catch (error) {
                console.error("Error fetching administrative:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        // division
        formData.append("division", toggle);

        // type
        formData.append("type", selectType);

        // titles
        formData.append("title[ar]", values.titleAr);
        formData.append("title[en]", values.titleEn);

        // descriptions
        formData.append("description[ar]", values.descriptionAr);
        formData.append("description[en]", values.descriptionEn);

        // contact
        formData.append("advertiserPhoneNumber", values.phone);
        formData.append("hasWhatsapp", values.whatsapp);

        // location
        formData.append("location[city]", city);
        formData.append("location[detailedLocation]", locationDetails);
        formData.append("location[coordinates][]", longitude);
        formData.append("location[coordinates][]", latitude);

        // Details
        formData.append("details[space]", values.space);
        formData.append("details[view]", values.view);
        formData.append("details[finishing]", values.finishing);
        formData.append("details[paymentMethod]", values.paymentMethod);
        formData.append("details[propertyType]", values.propertyType);
        formData.append("details[price]", values.price);
        formData.append("details[buildingYear]", values.buildingYear);
        formData.append("details[handingOverYear]", values.handingOverYear);
        {
            !isHouse && formData.append("details[rooms]", values.rooms);
            !isHouse && formData.append("details[bathrooms]", values.bathrooms);
            formData.append("details[floor]", values.floor);
        }

        // images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                formData.append("images", file);
            });
        } else {
            console.log("No images to send");
        }

        // removed images
        if (removedImages.length > 0) {
            removedImages.forEach((imageName) => {
                formData.append("removeImages", imageName);
            });
        }

        setIsItemLoading(true);

        try {
            const response = await PropertyAPI.updateAdministrative(id, formData);
            setShowModal(true);
            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setIsItemLoading(false);
        }
    };

    return (
        <>
            <HelmetInfo
                titlePage={
                    currentLanguage === "ar" ? "تعديل الوحدة التجارية" : "Update Administrative"
                }
            />

            {isLoading ? (
                <ContainerMedia>
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                        <div className="text-center">
                            <Loader />
                            <p className="mt-3 b-12">جاري تحميل البيانات...</p>
                        </div>
                    </div>
                </ContainerMedia>
            ) : propertyData && (
                <FormField initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <ContainerMedia>
                            <div className="form-container finishing align-items-center px-0">
                                <div className="w-100">
                                    <div className="pb-4">
                                        <BreadcrumbsPage
                                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                            mainTitle={"تعديل الوحدة التجارية"}
                                            routeTitleTwoBread={false}
                                            titleTwoBread={false}
                                            secondArrow={false}
                                        />
                                    </div>

                                    <p className="b-1 mb-2 pb-3 ">تعديل الوحدة التجارية</p>
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
                                                نوع الوحدة
                                                <span className="required-asterisk"> *</span>
                                            </label>
                                            <Dropdown
                                                value={selectType}
                                                onChange={(e) => {
                                                    setSelectType(e.value);
                                                    setFieldValue("type", e.value);
                                                }}
                                                options={translations[currentLanguage].administrativeType}
                                                optionLabel="label"
                                                optionValue="value"
                                                name="type"
                                                placeholder={translations[currentLanguage].aqar}
                                            />
                                        </Col>
                                    </Row>

                                    {/* Details */}
                                    <SectionHeader text={"تفاصيل الوحدة"} />

                                    <div className="mb-4 ">
                                        <label className="b-12 mb-2">
                                            عنوان الاعلان <span className="required-asterisk">*</span>
                                        </label>
                                        <InputFiled name="titleAr" placeholder={"عنوان الاعلان"} />
                                    </div>

                                    {/* announcement details*/}
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

                                    {/* advertiser information*/}
                                    <SectionHeader text={"بيانات المعلن"} />

                                    {/* mobile */}
                                    <div className="mb-4 lg-w-30">
                                        <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                                            رقم الموبايل
                                            <span className="required-asterisk">*</span>
                                        </label>
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
                                            className={`form-check-input ${currentLanguage === "en" && "mx-0"
                                                }`}
                                            type="checkbox"
                                            id="flexCheckChecked"
                                            defaultChecked
                                            style={{ width: "20px", height: "20px" }}
                                        />
                                        تواصل معي عن طريق الايميل
                                    </div>

                                    {/* Administrative description */}
                                    <SectionHeader text={" وصف الوحدة"} />

                                    {/* Row 1 */}
                                    <Row className="g-3 mb-4">
                                        <Col xs={12} md={4}>
                                            <label className="b-12 mb-2">
                                                المساحة (بالمتر){" "}
                                                <span className="required-asterisk"> *</span>
                                            </label>
                                            <InputFiled name="space" placeholder={"2م"} />
                                        </Col>

                                        {/* front of unit */}
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
                                                optionValue="value"
                                                optionLabel="label"
                                            ></Dropdown>
                                        </Col>

                                        {/* Finishing */}
                                        <Col xs={12} md={4}>
                                            <label className="b-12 mb-2">
                                                نوع التشطيب <span className="required-asterisk"> *</span>
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
                                                className="hide-scrollbar"
                                                optionValue="value"
                                                optionLabel="label"
                                            ></Dropdown>
                                        </Col>

                                        {/* payment */}
                                        <Col xs={12} md={4}>
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
                                                optionValue="value"
                                                optionLabel="label"
                                            ></Dropdown>
                                        </Col>

                                        {/* property type in market */}
                                        <Col xs={12} md={4}>
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
                                                optionValue="value"
                                                optionLabel="label"
                                            ></Dropdown>
                                        </Col>

                                        {!isHouse && (
                                            <>
                                                {/* rooms number */}
                                                <Col xs={12} md={4}>
                                                    <label className="b-12 mb-2">
                                                        عدد الغرف{" "}
                                                        <span className="required-asterisk"> *</span>
                                                    </label>
                                                    <InputFiled name="rooms" placeholder={"عدد الغرف"} />
                                                </Col>

                                                {/* floor */}
                                                <Col xs={12} md={4}>
                                                    <label className="b-12 mb-2">
                                                        الدور <span className="required-asterisk"> *</span>
                                                    </label>
                                                    <InputFiled name="floor" placeholder={" رقم الدور "} />
                                                </Col>

                                                {/* bathrooms */}
                                                <Col xs={12} md={4}>
                                                    <label className="b-12 mb-2">
                                                        الحمامات <span className="required-asterisk"> *</span>
                                                    </label>
                                                    <InputFiled
                                                        name="bathrooms"
                                                        placeholder={" عدد الحمامات "}
                                                    />
                                                </Col>
                                            </>
                                        )}

                                        {/* building year */}
                                        <Col xs={12} md={4}>
                                            <label className="b-12 mb-2">
                                                سنة البناء<span className=""> *</span>
                                            </label>
                                            <InputFiled
                                                name="buildingYear"
                                                placeholder={"حدد سنة البناء (اختياري)"}
                                            />
                                        </Col>

                                        {/* handover year */}
                                        <Col xs={12} md={4}>
                                            <label className="b-12 mb-2">
                                                سنة التسليم <span className=""> *</span>
                                            </label>
                                            <InputFiled
                                                name="handingOverYear"
                                                placeholder={"حدد سنة التسليم (اختياري)"}
                                            />
                                        </Col>

                                        {/* price */}
                                        <Col xs={12} md={4}>
                                            <label className="b-12 mb-2">
                                                السعر <span className="required-asterisk"> *</span>
                                            </label>
                                            <InputFiled name="price" placeholder={"السعر"} />
                                        </Col>
                                    </Row>

                                    {/* Location of the administrative */}
                                    <SectionHeader text={"عنوان الوحدة"} />

                                    <div className="mb-4">
                                        <div className="mb-4">
                                            <label className="b-12 mb-2">
                                                عنوان الوحدة <span className="required-asterisk"> *</span>
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
                                                optionValue="value"
                                                optionLabel="label"
                                            ></Dropdown>
                                        </div>
                                        <label className="b-12 mb-2">
                                            عنوان الوحدة <span className="required-asterisk">*</span>
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
                                    <SectionHeader text={"صور الوحدة"} />

                                    <div className="mb-4">
                                        <ImageUploadGrid
                                            name="images"
                                            onRemove={(imageName) => {
                                                setRemovedImages((prev) => [...prev, imageName]);
                                            }}
                                        />
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
                                                تمام،تم تحديث الوحدة التجارية بنجاح، في انتظار الموافقة! ✨ هنراجع
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
            )}
        </>
    );
};

export default UpdateAdministrative;
