import { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { translations } from './translations';
import { Col, Row } from 'react-bootstrap';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import TextArea from '../../Components/Forms/TextArea';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import Switch from '../../Components/Forms/Switch';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';
import CustomModal from '../../Components/CustomModal/CustomModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import PropertyAPI from '../../api/propertyApi';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '../../styles/PrimeReact.css';
import GoogleSearchBoxWithMap from '../../Components/GoogleMap/GoogleSearchBoxWithMap';
import PlaceTypeDropdown from '../../Components/Ui/SearchComponents/PlaceTypeDropdown';


const JoinAqar = () => {
    const { currentLanguage } = useLanguage(); // Get the current language


    const [showModal, setShowModal] = useState(false);

    const [selectType, setSelectType] = useState("");
    const [selectVeiw, setSelectView] = useState(translations[currentLanguage].chooseView);
    const [selectCategory, setSelectCategory] = useState(translations[currentLanguage].aqarCategory);
    const [paymentWay, setPaymentWay] = useState(translations[currentLanguage].paymentWay);
    const [aqarSouq, setAqarSouq] = useState(translations[currentLanguage].aqarSouq);
    const [finishing, setFinishing] = useState(translations[currentLanguage].finishing);
    const [placeType, setPlaceType] = useState("نوع المكان");
    const [placeTypeDetails, setPlaceTypeDetails] = useState("");
    const [rotatePlace, setRotatePlace] = useState(false);

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [isItemLoading, setIsItemLoading] = useState(false)


    const [rotate, setRotate] = useState(false);
    const [rotate2, setRotate2] = useState(false);

    const [selectedGov, setSelectedGov] = useState("");
    const [selectedTown, setSelectedTown] = useState("");


    const egyptLocations = {
        "Cairo": {
            "Nasr City": ["1st District", "6th District"],
            "Heliopolis": ["Korba", "El-Montaza"]
        },
        "Giza": {
            "Dokki": ["Tahrir Street", "Mosadak"],
            "6th October": ["El Motamayez", "Sheikh Zayed"]
        },
        "Alexandria": {
            "Smouha": ["Green Plaza", "Sporting"],
            "Stanley": ["Bridge Area", "Beach Area"]
        }
    };

    const governorates = Object.keys(egyptLocations);
    const towns = selectedGov ? Object.keys(egyptLocations[selectedGov]) : [];
    const cities = selectedGov && selectedTown
        ? egyptLocations[selectedGov][selectedTown]
        : [];

    const tabsKind = [
        {
            eventKey: "tab1",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "سكني" : "residential"}`)}>
                    {currentLanguage === "ar" ? "سكني" : "residential"}
                </div >
            ),
            content: (
                <>
                    <div className="d-flex space-4">
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("ارض")}>
                                ارض
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("بيت")}>
                                بيت
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("كمبوند")}>
                                كمبوند
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "تجاري" : "Commercial"}`)}>
                    {currentLanguage === "ar" ? "تجاري" : "Commercial"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex space-4">
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                        <div className="d-flex flex-column space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("إداري")}>
                                إداري
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab3",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "زراعي" : "Agricultural"}`)}>
                    {currentLanguage === "ar" ? "زراعي" : "Agricultural"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex space-4">
                        <div className="d-flex  space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
                    </div>
                </>
            )
        },
        {
            eventKey: "tab4",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "صناعي" : "Industrial"}`)}>
                    {currentLanguage === "ar" ? "صناعي" : "Industrial"}
                </div>
            ),
            content: (
                <>
                    <div className="d-flex space-4">
                        <div className="d-flex  space-3 w-100">
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("مول")}>
                                مول
                            </p>
                            <p className="b-12 pick bg-light-gray" onClick={() => setPlaceTypeDetails("شقة")}>
                                شقة
                            </p>
                        </div>
                    </div>
                    <div className="d-flex flex-row space-4 mt-3">
                        <button className="btn-main submit-btn btn-reset btn-confirm w-100" onClick={() => { setPlaceType("نوع المكان"); setPlaceTypeDetails("") }}>رجّع كل حاجة</button>
                        <button className="btn-main btn-confirm  w-100 border">تمام</button>
                    </div>
                </>
            )
        },
    ];




    const initialValues = {
        type: "", // apartment
        category: "", // rent ,sale
        titleAr: "",
        titleEn: "",
        descriptionAr: "",
        descriptionEn: "",
        propertyType: "", //residential
        space: "",
        view: "",
        price: "",
        paymentMethods: "",
        rooms: "",
        floor: "",
        bathrooms: "",
        handoverDate: "",
        finishing: "",
        phone: "",
        whatsapp: false,
        images: [],
    };


    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        // whatIHave
        formData.append("type", values.type);
        formData.append("details[propertyType]", values.propertyType);

        // titles
        formData.append("title[ar]", values.titleAr);
        formData.append("title[en]", values.titleEn);

        // descritptions
        formData.append("description[ar]", values.descriptionAr);
        formData.append("description[en]", values.descriptionEn);

        // category
        formData.append("category", values.category);


        // lat long
        formData.append("location[type]", "Point");
        formData.append("location[coordinates][]", longitude);
        formData.append("location[coordinates][]", latitude);


        // Details
        formData.append("details[space]", values.space);
        formData.append("details[view]", values.view);
        formData.append("details[price]", values.price);
        formData.append("details[paymentMethods][]", values.paymentMethods);
        formData.append("details[rooms]", values.rooms);
        formData.append("details[floor]", values.floor);
        formData.append("details[bathrooms]", values.bathrooms);
        formData.append("details[handoverDate]", values.handoverDate);
        formData.append("details[finishing]", values.finishing);

        // contact
        formData.append("advertiser[phone]", values.phone);
        formData.append("advertiser[whatsapp]", values.whatsapp);



        // images
        if (values.images && values.images.length > 0) {
            values.images.forEach((file) => {
                formData.append("images", file);
            });
            console.log("Images being sent:", values.images.length, "files");
        } else {
            console.log("No images to send");
        }

        setIsItemLoading(true)
        try {
            const response = await PropertyAPI.createProperty(formData);
            console.log('Form Data:', JSON.stringify(values, null, 2));
            console.log('Images:', values.images);
            console.log(response);
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
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن عقارك" : "Advertise your property"} />

            <FormField initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <ContainerMedia>
                        <div className='form-container finishing align-items-center px-0'>
                            <div>

                                <div className='pb-4'>
                                    <BreadcrumbsPage
                                        newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                                        mainTitle={"اعلن عن اي حاجه عايز تبدلها"}
                                        routeTitleTwoBread={false}
                                        titleTwoBread={false}
                                        secondArrow={false}
                                    />
                                </div>

                                <p className='b-1 mb-2 pb-3 '>اعلن عن عقارك</p>

                                {/* Type */}
                                <Row className=" gx-4 mb-4">
                                    <Col xs={12} md={4}>
                                        <label className='b-12 mb-2' >
                                            النوع
                                            <span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown
                                            value={selectType}
                                            onChange={(e) => {
                                                setSelectType(e.value);
                                                setFieldValue("type", e.value);
                                            }}
                                            options={translations[currentLanguage].aqarType}
                                            optionLabel="name"
                                            name="type"
                                            placeholder="Select Type"
                                        />

                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label className='b-12 mb-2' >
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
                                                    onChange={(e) => {
                                                        setSelectType(e.value);
                                                        setFieldValue("propertyType", e.value);
                                                    }}

                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <label className='b-12 mb-2' >
                                            القسم
                                            <span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown value={selectCategory} options={translations[currentLanguage].aqarCategory} optionLabel="name"
                                            placeholder="Select Category"
                                            onChange={(e) => {
                                                setSelectCategory(e.value);
                                                setFieldValue("category", e.value);
                                            }}

                                        >
                                        </Dropdown>
                                    </Col>
                                </Row>
                                {/* <NestedDropdownAccordion data={nestedLocationData} title="عنوان العقار" placeholder="اختر المكان" /> */}

                                {/* Details */}
                                <SectionHeader text={"تفاصيل العقار"} />
                                {/* location */}

                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        عنوان الاعلان  <span className="required-asterisk">*</span>
                                    </label>
                                    <InputFiled name="titleAr" placeholder={"عنوان الاعلان"} />
                                </div>

                                {/* announcment details*/}

                                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                    <label className="b-12 ">
                                        تفاصيل الاعلان  <span className="required-asterisk">*</span>
                                    </label>
                                    <TextArea name="descriptionAr" maxLength="700" placeholder={"تفاصيل الاعلان"} />
                                </div>

                                {/* location in English*/}

                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        عنوان الاعلان بالانجليزي  <span className="required-asterisk">*</span>
                                    </label>
                                    <InputFiled name="titleEn" placeholder={"عنوان الاعلان بالانجليزي"} />
                                </div>

                                {/* announcment details in English*/}

                                <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                    <label className="b-12 ">
                                        تفاصيل الاعلان بالانجليزي <span className="required-asterisk">*</span>
                                    </label>
                                    <TextArea name="descriptionEn" maxLength="700" placeholder={" تفاصيل الاعلان بالانجليزي"} />
                                </div>


                                {/* announcmenter infomation*/}
                                <SectionHeader text={"بيانات المعلن"} />

                                {/* mobile */}

                                <div className="mb-4 lg-w-30">
                                    <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                                        رقم الموبايل
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <PhoneNumber name="phone" type="text" placeholder={"اكتب رقمك"} />
                                </div>


                                <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                                    <div className='d-flex flex-row space-1'>
                                        <WhatsIcon />
                                        يوجد واتساب علي هذا الرقم
                                    </div>
                                    <Switch name="whatsapp" />
                                </div>


                                <div className='mb-4 b-15 d-flex align-items-center space-2'>
                                    <input
                                        className={`form-check-input ${currentLanguage === "en" && "mx-0"}`}
                                        type="checkbox"
                                        id="flexCheckChecked"
                                        defaultChecked
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                    تواصل معي عن طريق الايميل
                                </div>



                                {/* Aqar description */}
                                <SectionHeader text={" وصف العقار"} />


                                {/* Row 1 */}
                                {/* size */}
                                <Row className="g-3 mb-4">
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            المساحة (بالمتر) <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="space" placeholder={"2م"} />
                                    </Col>
                                    {/* front of house */}
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            تطل على<span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown value={selectVeiw} onChange={(e) => {
                                            setSelectView(e.value);
                                            setFieldValue("view", e.value);
                                        }}
                                            options={translations[currentLanguage].view} optionLabel="name"
                                            placeholder="Select  View" name='view' className="hide-scrollbar"

                                        >
                                        </Dropdown>
                                    </Col>
                                    {/* price */}
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            السعر <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="price" placeholder={"السعر"} />
                                    </Col>


                                    {/* payment */}
                                    <Col xs={12} md={3}>
                                        <label className="b-12 mb-2">
                                            طريقة الدفع<span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown value={paymentWay} onChange={(e) => {
                                            setPaymentWay(e.value);
                                            setFieldValue("paymentMethods", e.value);
                                        }} options={translations[currentLanguage].paymentWayDetails} optionLabel="name"
                                            placeholder="Payment Way" name='paymentMethods' className="hide-scrollbar"
                                        >
                                        </Dropdown>
                                    </Col>


                                    {/* aqar souq */}
                                    <Col xs={12} md={3}>
                                        <label className="b-12 mb-2">
                                            نوع العقار ف السوق <span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown value={aqarSouq} onChange={(e) => {
                                            setAqarSouq(e.value);
                                            setFieldValue("souq", e.value);
                                        }} options={translations[currentLanguage].aqarSouqDetails} optionLabel="name"
                                            placeholder="Select Aqar Souq" name='souq'
                                        >
                                        </Dropdown>
                                    </Col>
                                </Row>


                                {/* Row 2 */}

                                <Row className="g-3 mb-4">

                                    {/* rooms number */}
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            عدد الغرف  <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="rooms" placeholder={"عدد الغرف"} />
                                    </Col>

                                    {/* no.floor */}
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            الدور  <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="floor" placeholder={" رقم الدور "} />
                                    </Col>


                                    {/* no.Bathroom */}
                                    <Col xs={12} md={2}>
                                        <label className="b-12 mb-2">
                                            الحمامات  <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="bathrooms" placeholder={" عدد الحمامات "} />
                                    </Col>

                                    {/* no.Year */}
                                    <Col xs={12} md={3}>
                                        <label className="b-12 mb-2">
                                            سنة التسليم   <span className="required-asterisk"> *</span>
                                        </label>
                                        <InputFiled name="handoverDate" placeholder={"حدد سنة التسليم "} />
                                    </Col>


                                    {/* Finishing */}
                                    <Col xs={12} md={3}>
                                        <label className="b-12 mb-2">
                                            نوع التطشيب <span className="required-asterisk"> *</span>
                                        </label>
                                        <Dropdown value={finishing} onChange={(e) => {
                                            setFinishing(e.value);
                                            setFieldValue("finishing", e.value);
                                        }} options={translations[currentLanguage].finishingDetails} optionLabel="name"
                                            placeholder="Select Finish" name='finishing' >
                                        </Dropdown>
                                    </Col>
                                </Row>



                                {/* Location of the property */}
                                <SectionHeader text={"عنوان العقار"} />

                                {/* location */}

                                <div className="mb-4 ">
                                    <label className="b-12 mb-2">
                                        عنوان العقار  <span className="required-asterisk">*</span>
                                    </label>


                                    <div className="mb-5">
                                        <GoogleSearchBoxWithMap
                                            setLatitude={setLatitude}
                                            setLongitude={setLongitude}
                                            isItemLoading={isItemLoading}
                                            longitude={longitude}
                                            latitude={latitude}
                                        />
                                    </div>
                                </div>

                                {/* photos */}
                                <SectionHeader text={"صور المشروع"} />


                                <div className='mb-4'>
                                    <ImageUploadGrid name="images" />
                                </div>


                                <div className="d-flex justify-content-center mt-5 pt-3">
                                    <button type='submit' className="btn-main btn-submit b-11" disabled={isItemLoading}>
                                        {isItemLoading ? 'جاري الإرسال...' : 'ابعت للموافقة'}
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
                                                src="./animation/success.lottie"
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
                                        <p className="b-15" style={{ color: "var(--netural-700)" }}>تمام، تسجيلك كتاجر في التشطيبات وصل بنجاح! ✨ هنراجع بياناتك وهنكلمك قريب عشان نكمل باقي الخطوات. خليك متابع تنبيهاتك لأي جديد! 🚀</p>
                                        <Link to={"/"} className="btn-main btn-submit mt-3 b-11 py-3 px-2">
                                            ارجع للرئيسية
                                        </Link>
                                    </div>

                                </CustomModal>
                            </div>

                        </div >
                    </ContainerMedia >
                )}
            </FormField>

        </>
    )
}

export default JoinAqar