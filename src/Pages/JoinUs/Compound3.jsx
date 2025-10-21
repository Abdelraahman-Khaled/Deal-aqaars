import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { translations } from './translations';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import Switch from '../../Components/Forms/Switch';
import Map from '../../Components/Ui/Map/Map';
import CustomModal from '../../Components/CustomModal/CustomModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import { Col, Dropdown, Row } from 'react-bootstrap';
import TabsContent from '../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../assets/Icons/MenuArrow';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import Select from "react-select";
import TextArea from '../../Components/Forms/TextArea';
import NestedDropdownAccordion from '../../Components/NestedDropdownAccordion/NestedDropdownAccordion';
import { nestedLocationData } from '../../Components/NestedDropdownAccordion/nestedLocationData';
import PlaceTypeDropdown from '../../Components/Ui/SearchComponents/PlaceTypeDropdown';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';

const Compound3 = ({ formData, setFormData }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [selectAqar, setSelectAqar] = useState(translations[currentLanguage].aqar);
    const [placeType, setPlaceType] = useState("نوع المكان");
    const [placeTypeDetails, setPlaceTypeDetails] = useState("");
    const [selectType, setSelectPart] = useState(translations[currentLanguage].type);
    const [selectVeiw, setSelectView] = useState(translations[currentLanguage].chooseView);
    const [paymentWay, setPaymentWay] = useState(translations[currentLanguage].paymentWay);
    const [aqarSouq, setAqarSouq] = useState(translations[currentLanguage].aqarSouq);
    const [finishing, setFinishing] = useState(translations[currentLanguage].finishing);

    const [rotate, setRotate] = useState(false);
    const [rotate2, setRotate2] = useState(false);
    const [rotatePlace, setRotatePlace] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectCompany, setSelectCompany] = useState(translations[currentLanguage].company);




    const options = [
        { value: "compunds", label: "سكني" },
        { value: "buldings", label: "تجاري" },
    ];
    const customStyles = {
        control: (base) => ({
            ...base,
            borderRadius: "8px",
            padding: "2px",
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "8px",
            marginTop: "4px",
            zIndex: 100,
        }),
        option: (base, state) => ({
            ...base,
            padding: "10px 15px",
            backgroundColor: state.isFocused ? "#e9ecef" : "white",
            color: "#212529",
            cursor: "pointer",
        }),
    };
    const tabsKind = [
        {
            eventKey: "tab1",
            title: (
                <div onClick={() => setPlaceType(`${currentLanguage === "ar" ? "سكني" : "Housing"}`)}>
                    {currentLanguage === "ar" ? "سكني" : "Housing"}
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
    const tabsAqar = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].aqarDetails.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {selectAqar === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];

    const TabsAqar = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].aqarSouqDetails.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {aqarSouq === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];

    const tabsType = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].aqarType.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {selectType === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];


    const TabsFinishing = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].finishingDetails.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {finishing === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];

    const tabsView = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].view.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {selectVeiw === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];

    const TabsPaymentWay = [
        {
            eventKey: "tab1",
            title: <></>,
            content: (
                <div className="d-flex flex-column space-6">
                    <div className="d-flex space-4 flex-column justify-content-center">
                        {
                            translations[currentLanguage].paymentWayDetails.map((item, index) => (
                                <p key={index} className={`b-12 pick rounded-3 bg-light-gray d-flex space-2`}
                                    onClick={() => setHome(item)}>
                                    {paymentWay === item}
                                    {item}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
        },
    ];


    return (
        <>

            <FormField initialValues={formData}>

                <div className='w-100'>

                    {/* company Details */}
                    <SectionHeader text={"وحدات المشروع"} />


                    <div className='trade-card finishing'>
                        <SectionHeader text={"تفاصيل الوحدة"} />

                        <Row className=" gx-4 mb-4">
                            <Col xs={12} md={4}>
                                <label className='b-12 mb-2' >
                                    نوع الوحدة
                                    <span> *</span>
                                </label>
                                <div onClick={() => setRotate(!rotate)}>
                                    <Dropdown className="d-flex w-100">
                                        <Dropdown.Toggle variant="light" className="w-100 text-end">
                                            {selectAqar}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <TabsContent
                                                tabsData={tabsAqar}
                                                newClassTabsContent="tabs-home rooms"
                                            />
                                        </Dropdown.Menu>
                                        <MenuArrow rotate={rotate} />
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <label className='b-12 mb-2' >
                                    نوع العقار
                                    <span> *</span>
                                </label>
                                <div onClick={() => setRotate2(!rotate2)}>
                                    <div onClick={() => setRotatePlace(!rotatePlace)}>
                                        <PlaceTypeDropdown placeType={placeType} placeTypeDetails={placeTypeDetails} tabsKind={tabsKind} rotate={rotatePlace} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <label className='b-12 mb-2' >
                                    القسم
                                    <span> *</span>
                                </label>
                                <div onClick={() => setRotate2(!rotate2)}>
                                    <Dropdown className="d-flex w-100">
                                        <Dropdown.Toggle variant="light" className="w-100 text-end">
                                            {selectType}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <TabsContent
                                                tabsData={tabsType}
                                                newClassTabsContent="tabs-home rooms"
                                            />
                                        </Dropdown.Menu>
                                        <MenuArrow rotate={rotate2} />
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        {/* location */}
                        <div className='row'>
                            <div className="mb-4 w-50">
                                <label className="b-12 mb-2">
                                    عنوان الاعلان  <span className="required-asterisk">*</span>
                                </label>
                                <InputFiled name="location" placeholder={"عنوان الاعلان"} />
                            </div>
                            <div className="mb-4 w-50 ">
                                <label className="b-12 mb-2">
                                    عنوان الاعلان بالانجليزي  <span className="required-asterisk">*</span>
                                </label>
                                <InputFiled name="location" placeholder={"عنوان الاعلان"} />
                            </div>
                        </div>

                        {/* Company */}
                        <div className="mb-4 ">
                            <label className="b-12 ">
                                تفاصيل الاعلان <span className="required-asterisk">*</span>
                            </label>
                            <TextArea name="location" placeholder={"عنوان الاعلان"} />
                        </div>

                        <div className="mb-4 ">
                            <label className="b-12 ">
                                تفاصيل الاعلان بالانجليزي<span className="required-asterisk">*</span>
                            </label>
                            <TextArea name="location" placeholder={"عنوان الاعلان بالانجليزي"} />
                        </div>


                        {/* Aqar description */}
                        <SectionHeader text={" وصف العقار"} />

                        {/* Row 1 */}
                        {/* size */}
                        <Row className="g-3 mb-4">
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    المساحة (بالمتر) <span> *</span>
                                </label>
                                <InputFiled name="space" placeholder={"2م"} />
                            </Col>
                            {/* front of house */}
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    تطل على<span> *</span>
                                </label>
                                <Dropdown className="d-flex w-100">
                                    <Dropdown.Toggle variant="light" className="w-100 text-end">
                                        {selectVeiw || "اختر الاطلالة"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        <TabsContent
                                            tabsData={tabsView}
                                            newClassTabsContent="tabs-home rooms"
                                        />
                                    </Dropdown.Menu>
                                    <MenuArrow />
                                </Dropdown>
                            </Col>
                            {/* price */}
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    السعر <span> *</span>
                                </label>
                                <InputFiled name="price" placeholder={"السعر"} />
                            </Col>


                            {/* payment */}
                            <Col xs={12} md={3}>
                                <label className="b-8 mb-2">
                                    طريقة الدفع<span> *</span>
                                </label>
                                <Dropdown className="d-flex w-100">
                                    <Dropdown.Toggle variant="light" className="w-100 text-end">
                                        {paymentWay || "اختار طريقة الدفع"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        <TabsContent
                                            tabsData={TabsPaymentWay}
                                            newClassTabsContent="tabs-home rooms"
                                        />
                                    </Dropdown.Menu>
                                    <MenuArrow />
                                </Dropdown>
                            </Col>


                            {/* aqar souq */}
                            <Col xs={12} md={3}>
                                <label className="b-8 mb-2">
                                    نوع العقار ف السوق <span> *</span>
                                </label>
                                <Dropdown className="d-flex w-100">
                                    <Dropdown.Toggle variant="light" className="w-100 text-end">
                                        {aqarSouq || "اختار نوع العقار ف السوق "}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        <TabsContent
                                            tabsData={TabsAqar}
                                            newClassTabsContent="tabs-home rooms"
                                        />
                                    </Dropdown.Menu>
                                    <MenuArrow />
                                </Dropdown>
                            </Col>
                        </Row>


                        {/* Row 2 */}

                        <Row className="g-3 mb-4">

                            {/* rooms number */}
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    عدد الغرف  <span> *</span>
                                </label>
                                <InputFiled name="rooms" placeholder={"عدد الغرف"} />
                            </Col>

                            {/* no.floor */}
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    الدور  <span> *</span>
                                </label>
                                <InputFiled name="floor" placeholder={" رقم الدور "} />
                            </Col>


                            {/* no.Bathroom */}
                            <Col xs={12} md={2}>
                                <label className="b-8 mb-2">
                                    الحمامات  <span> *</span>
                                </label>
                                <InputFiled name="bathrooms" placeholder={" عدد الحمامات "} />
                            </Col>

                            {/* no.Year */}
                            <Col xs={12} md={3}>
                                <label className="b-8 mb-2">
                                    سنة التسليم   <span> *</span>
                                </label>
                                <InputFiled name="year" placeholder={"حدد سنة التسليم "} />
                            </Col>


                            {/* Finishing */}
                            <Col xs={12} md={3}>
                                <label className="b-8 mb-2">
                                    نوع التطشيب <span> *</span>
                                </label>
                                <Dropdown className="d-flex w-100">
                                    <Dropdown.Toggle variant="light" className="w-100 text-end">
                                        {finishing || "نوع التطشيب "}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        <TabsContent
                                            tabsData={TabsFinishing}
                                            newClassTabsContent="tabs-home rooms"
                                        />
                                    </Dropdown.Menu>
                                    <MenuArrow />
                                </Dropdown>
                            </Col>
                        </Row>

                        <SectionHeader text={"صور المشروع"} />
                        <div className='mb-4'>
                            <ImageUploadGrid />
                        </div>


                        <button type="submit" className="btn-main btn-submit b-11" onClick={() => setShowModal(true)}>
                            إضافة الوحدة
                        </button>
                    </div>



                </div >
            </FormField>

        </>
    )
}

export default Compound3