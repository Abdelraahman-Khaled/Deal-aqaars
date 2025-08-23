import React, { useState } from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import { translations } from './translations';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import TabsContent from '../../Components/Ui/TabsContent/TabsContent';
import MenuArrow from '../../assets/Icons/MenuArrow';
import InputFiled from '../../Components/Forms/InputField';
import FormField from '../../Components/Forms/FormField';
import TextArea from '../../Components/Forms/TextArea';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import Switch from '../../Components/Forms/Switch';
import Map from '../../Components/Ui/Map/Map';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';
import CustomModal from '../../Components/CustomModal/CustomModal';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import BreadcrumbsPage from '../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage';
import PlaceTypeDropdown from '../../Components/Ui/SearchComponents/PlaceTypeDropdown ';
import NestedDropdownAccordion from '../../Components/NestedDropdownAccordion/NestedDropdownAccordion';
import { nestedLocationData } from '../../Components/NestedDropdownAccordion/nestedLocationData';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';

const JoinAqar = () => {
    const { currentLanguage } = useLanguage(); // Get the current language


    const [showModal, setShowModal] = useState(false);



    const [selectAqar, setSelectAqar] = useState(translations[currentLanguage].aqar);
    const [selectType, setSelectPart] = useState(translations[currentLanguage].type);
    const [selectVeiw, setSelectView] = useState(translations[currentLanguage].chooseView);
    const [paymentWay, setPaymentWay] = useState(translations[currentLanguage].paymentWay);
    const [aqarSouq, setAqarSouq] = useState(translations[currentLanguage].aqarSouq);
    const [finishing, setFinishing] = useState(translations[currentLanguage].finishing);
    const [placeType, setPlaceType] = useState("نوع المكان");
    const [placeTypeDetails, setPlaceTypeDetails] = useState("");
    const [rotatePlace, setRotatePlace] = useState(false);


    const [rotate, setRotate] = useState(false);
    const [rotate2, setRotate2] = useState(false);

    const [selectedGov, setSelectedGov] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [selectedCity, setSelectedCity] = useState("");


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

    const initialValues = {

    };

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

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "اعلن عن عقارك" : "Advertise your property"} />

            <FormField initialValues={initialValues}>
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
                                        نوع العقار في السوق
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
                            <NestedDropdownAccordion data={nestedLocationData} title="عنوان العقار"
                                placeholder="اختر المكان" />
                            {/* Location */}
                            {/* <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
                               
                                <div className="flex-fill min-w-0">
                                    <label className="form-label b-12">المحافظة <span>*</span></label>
                                    <Dropdown className="d-flex w-100">
                                        <Dropdown.Toggle variant="light" className="w-100 text-end">
                                            {selectedGov || "اختر محافظة"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100">
                                            <div className='d-flex space-4 flex-column'>

                                                {governorates.map((gov) => (
                                                    <p
                                                        key={gov}
                                                        className="b-12 pick rounded-2 bg-light-gray p-2 m-0"
                                                        onClick={() => {
                                                            setSelectedGov(gov);
                                                            setSelectedTown("");
                                                            setSelectedCity("");
                                                        }}
                                                    >
                                                        {gov}
                                                    </p>
                                                ))}
                                            </div>
                                        </Dropdown.Menu>
                                        <MenuArrow />
                                    </Dropdown>
                                </div>

                              

                                {
                                    selectedGov &&
                                    (<div className="flex-fill min-w-0">
                                        <label className="form-label b-12">المدينة <span>*</span></label>
                                        <Dropdown className="d-flex w-100">
                                            <Dropdown.Toggle variant="light" className="w-100 text-end">
                                                {selectedTown || "اختر المدينة"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="w-100">
                                                <div className='d-flex space-4 flex-column'>
                                                    {towns.map((town) => (
                                                        <p
                                                            key={town}
                                                            className="b-12 pick rounded-2 bg-light-gray p-2 m-0"
                                                            onClick={() => {
                                                                setSelectedTown(town);
                                                                setSelectedCity("");
                                                            }}
                                                        >
                                                            {`${selectedGov} / ${town}`}
                                                        </p>
                                                    ))}
                                                </div>
                                            </Dropdown.Menu>
                                            <MenuArrow />
                                        </Dropdown>
                                    </div>)
                                }

                                {
                                    selectedTown &&
                                    (
                                        <div className="flex-fill min-w-0">
                                            <label className="form-label b-12">المنطقة <span>*</span></label>
                                            <Dropdown className="d-flex w-100">
                                                <Dropdown.Toggle variant="light" className="w-100 text-end">
                                                    {selectedCity || "اختر المنطقة"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="w-100">
                                                    <div className='d-flex space-4 flex-column'>
                                                        {cities.map((city) => (
                                                            <p
                                                                key={city}
                                                                className="b-12 pick rounded-2 bg-light-gray p-2 m-0"
                                                                onClick={() => setSelectedCity(city)}
                                                            >
                                                                {`${selectedGov} / ${selectedTown} / ${city}`}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </Dropdown.Menu>
                                                <MenuArrow />
                                            </Dropdown>
                                        </div>
                                    )
                                }
                            </div> */}


                            {/* Details */}
                            <SectionHeader text={"تفاصيل العقار"} />
                            {/* location */}

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    عنوان الاعلان  <span>*</span>
                                </label>
                                <InputFiled name="location" placeholder={"عنوان الاعلان"} />
                            </div>

                            {/* announcment details*/}

                            <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                <label className="b-12 ">
                                    تفاصيل الاعلان  <span>*</span>
                                </label>
                                <TextArea name="description" maxLength="700" placeholder={"تفاصيل الاعلان"} />
                            </div>

                            {/* location in English*/}

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    عنوان الاعلان بالانجليزي  <span>*</span>
                                </label>
                                <InputFiled name="location-en" placeholder={"عنوان الاعلان بالانجليزي"} />
                            </div>

                            {/* announcment details in English*/}

                            <div className="mb-4 flex-wrap d-flex align-items-center justify-content-between ">
                                <label className="b-12 ">
                                    تفاصيل الاعلان بالانجليزي <span>*</span>
                                </label>
                                <TextArea name="description-en" maxLength="700" placeholder={" تفاصيل الاعلان بالانجليزي"} />
                            </div>


                            {/* announcmenter infomation*/}
                            <SectionHeader text={"بيانات المعلن"} />

                            {/* mobile */}

                            <div className="mb-4 lg-w-30">
                                <label className="b-12 mb-2" style={{ minWidth: "150px" }}>
                                    رقم الموبايل
                                    <span>*</span>
                                </label>
                                <PhoneNumber name="mobile" type="text" placeholder={"اكتب رقمك"} />
                            </div>


                            <div className='b-15 mb-4 d-flex justify-content-between align-items-center lg-w-30'>
                                <div className='d-flex flex-row space-1'>
                                    <WhatsIcon />
                                    يوجد واتساب علي هذا الرقم
                                </div>
                                <Switch />
                            </div>


                            <div className='mb-4 b-15 d-flex align-items-center space-2'>
                                <input className={`form-check-input  ${currentLanguage === "en" && "mx-0"}`} type="checkbox" value="" id="flexCheckChecked" checked="true" style={{ width: "20px", height: "20px" }} />
                                تواصل معي عن طريق الايميل
                            </div>



                            {/* Aqar description */}
                            <SectionHeader text={" وصف العقار"} />


                            {/* Row 1 */}
                            {/* size */}
                            <Row className="g-3 mb-4">
                                <Col xs={12} md={2}>
                                    <label className="b-12 mb-2">
                                        المساحة (بالمتر) <span> *</span>
                                    </label>
                                    <InputFiled name="space" placeholder={"2م"} />
                                </Col>
                                {/* front of house */}
                                <Col xs={12} md={2}>
                                    <label className="b-12 mb-2">
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
                                    <label className="b-12 mb-2">
                                        السعر <span> *</span>
                                    </label>
                                    <InputFiled name="price" placeholder={"السعر"} />
                                </Col>


                                {/* payment */}
                                <Col xs={12} md={3}>
                                    <label className="b-12 mb-2">
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
                                    <label className="b-12 mb-2">
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
                                    <label className="b-12 mb-2">
                                        عدد الغرف  <span> *</span>
                                    </label>
                                    <InputFiled name="rooms" placeholder={"عدد الغرف"} />
                                </Col>

                                {/* no.floor */}
                                <Col xs={12} md={2}>
                                    <label className="b-12 mb-2">
                                        الدور  <span> *</span>
                                    </label>
                                    <InputFiled name="floor" placeholder={" رقم الدور "} />
                                </Col>


                                {/* no.Bathroom */}
                                <Col xs={12} md={2}>
                                    <label className="b-12 mb-2">
                                        الحمامات  <span> *</span>
                                    </label>
                                    <InputFiled name="bathrooms" placeholder={" عدد الحمامات "} />
                                </Col>

                                {/* no.Year */}
                                <Col xs={12} md={3}>
                                    <label className="b-12 mb-2">
                                        سنة التسليم   <span> *</span>
                                    </label>
                                    <InputFiled name="year" placeholder={"حدد سنة التسليم "} />
                                </Col>


                                {/* Finishing */}
                                <Col xs={12} md={3}>
                                    <label className="b-12 mb-2">
                                        نوع التطشيب <span> *</span>
                                    </label>
                                    <Dropdown className="d-flex w-100">
                                        <Dropdown.Toggle variant="light" className="w-100 text-end">
                                            {aqarSouq || "نوع التطشيب "}
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



                            {/* Location of the property */}
                            <SectionHeader text={"عنوان العقار"} />

                            {/* location */}

                            <div className="mb-4 ">
                                <label className="b-12 mb-2">
                                    عنوان العقار  <span>*</span>
                                </label>
                                <InputFiled name="realestate-location" placeholder={"عنوان العقار"} />
                            </div>

                            {/* map */}
                            <div className="mb-5">
                                <Map showOverlay={false} />
                            </div>

                            {/* photos */}
                            <SectionHeader text={"صور المشروع"} />


                            <div className='mb-4'>
                                <ImageUploadGrid />
                            </div>


                            <div className="d-flex justify-content-center mt-5 pt-3">
                                <button type="submit" className="btn-main btn-submit b-11" onClick={() => setShowModal(true)}>
                                    ابعت للموافقة
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
            </FormField>

        </>
    )
}

export default JoinAqar