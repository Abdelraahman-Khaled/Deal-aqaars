import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../../Components/CustomModal/CustomModal';
import './UpdatePropertyModal.css';
import InputFiled from '../../Components/Forms/InputField';
import PropertyAPI from '../../api/propertyApi';
import { toast } from 'react-toastify';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import ImageUploadGrid from '../../Components/ImageUploadGrid/ImageUploadGrid';
import { Dropdown } from 'primereact/dropdown';
import { translations } from './translations';
import WhatsIcon from '../../assets/Icons/WhatsIcon';
import PhoneNumber from '../../Components/Forms/PhoneNumber';
import Switch from '../../Components/Forms/Switch';

const UpdatePropertyModal = ({ showModal, setShowModal, propertyId, onUpdate, propertyData: initialPropertyData }) => {
    // If initialPropertyData is not provided, use the data from the user's request
    const userProvidedData = {
        title: { 
            en: "Sunny 3BR", 
            ar: "شقة ٣ غرف مشمسة" 
        }, 
        description: { 
            en: "Great location", 
            ar: " iiiiiiiii حقا موقع رائع" 
        }, 
        details: { 
            space: 110, 
            view: "tree", 
            price: 1500000, 
            paymentMethods: [ 
                "cash" 
            ], 
            propertyType: "residential", 
            rooms: 3, 
            floor: 2, 
            bathrooms: 2, 
            handoverDate: "2025-12-01T00:00:00.000Z", 
            finishing: "lux" 
        }, 
        advertiser: { 
            phone: "+201234567891", 
            whatsapp: false 
        },
        type: "apartment", 
        category: "sale" 
    };
    
    // Use initialPropertyData if provided, otherwise use userProvidedData
    const effectiveInitialData = initialPropertyData || userProvidedData;
    const [isLoading, setIsLoading] = useState(false);
    const [propertyData, setPropertyData] = useState(null);
    const { currentLanguage } = useLanguage();

    const [selectType, setSelectType] = useState(effectiveInitialData?.type || "");
    const [selectCategory, setSelectCategory] = useState(effectiveInitialData?.category || translations[currentLanguage].aqarCategory);
    const [selectVeiw, setSelectView] = useState(effectiveInitialData?.details?.view || translations[currentLanguage].chooseView);
    const [finishing, setFinishing] = useState(effectiveInitialData?.details?.finishing || translations[currentLanguage].finishing);

    // Use effectiveInitialData or fetch property data when modal opens
    useEffect(() => {
        if (effectiveInitialData) {
            setPropertyData(effectiveInitialData);
            // Initialize dropdown selections with the provided data
            setSelectType(effectiveInitialData.type || "");
            setSelectCategory(effectiveInitialData.category || "");
            setSelectView(effectiveInitialData.details?.view || "");
            setFinishing(effectiveInitialData.details?.finishing || "");
        } else if (showModal && propertyId) {
            fetchPropertyData();
        }
    }, [showModal, propertyId, effectiveInitialData]);

    const fetchPropertyData = async () => {
        try {
            setIsLoading(true);
            const data = await PropertyAPI.getPropertyById(propertyId);
            setPropertyData(data);
        } catch (error) {
            console.error('Error fetching property data:', error);
            toast.error(currentLanguage === 'ar' ? 'حدث خطأ أثناء جلب بيانات العقار' : 'Error fetching property data');
        } finally {
            setIsLoading(false);
        }
    };

    const validationSchema = Yup.object({
        'title[en]': Yup.string(),
        'title[ar]': Yup.string(),
        'description[en]': Yup.string(),
        'description[ar]': Yup.string(),
        type: Yup.string(),
        category: Yup.string(),
        'location[coordinates][0]': Yup.number(),
        'location[coordinates][1]': Yup.number(),
        'details[space]': Yup.number(),
        'details[price]': Yup.number(),
        'details[rooms]': Yup.number(),
        'details[bathrooms]': Yup.number(),
        'advertiser[phone]': Yup.string(),
    });

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);

            // Format data according to the API requirements
            // Only include fields that have been changed
            const formattedData = {};

            // Check if title fields have been changed
            if (values['title[en]'] !== propertyData.title?.en || values['title[ar]'] !== propertyData.title?.ar) {
                formattedData.title = {
                    en: values['title[en]'] || propertyData.title?.en || '',
                    ar: values['title[ar]'] || propertyData.title?.ar || ''
                };
            }

            // Check if description fields have been changed
            if (values['description[en]'] !== propertyData.description?.en || values['description[ar]'] !== propertyData.description?.ar) {
                formattedData.description = {
                    en: values['description[en]'] || propertyData.description?.en || '',
                    ar: values['description[ar]'] || propertyData.description?.ar || ''
                };
            }

            // Check if type or category have been changed
            if (values.type !== propertyData.type) {
                formattedData.type = values.type || propertyData.type;
            }

            if (values.category !== propertyData.category) {
                formattedData.category = values.category || propertyData.category;
            }

            // Check if location coordinates have been changed
            if (values['location[coordinates][0]'] !== propertyData.location?.coordinates?.[0] ||
                values['location[coordinates][1]'] !== propertyData.location?.coordinates?.[1]) {
                formattedData.location = {
                    type: 'Point',
                    coordinates: [
                        values['location[coordinates][0]'] || propertyData.location?.coordinates?.[0] || 0,
                        values['location[coordinates][1]'] || propertyData.location?.coordinates?.[1] || 0
                    ]
                };
            }

            // Check if details have been changed
            const detailsChanged = [
                'space', 'view', 'price', 'paymentMethods', 'propertyType',
                'rooms', 'floor', 'bathrooms', 'handoverDate', 'finishing'
            ].some(field => values[`details[${field}]`] !== propertyData.details?.[field]);

            if (detailsChanged) {
                formattedData.details = {};

                // Only include changed detail fields
                if (values['details[space]'] !== propertyData.details?.space) {
                    formattedData.details.space = values['details[space]'] || propertyData.details?.space;
                }

                if (values['details[view]'] !== propertyData.details?.view) {
                    formattedData.details.view = values['details[view]'] || propertyData.details?.view;
                }

                if (values['details[price]'] !== propertyData.details?.price) {
                    formattedData.details.price = values['details[price]'] || propertyData.details?.price;
                }

                if (values['details[paymentMethods]'] !== propertyData.details?.paymentMethods) {
                    formattedData.details.paymentMethods = values['details[paymentMethods]'] || propertyData.details?.paymentMethods;
                }

                if (values['details[propertyType]'] !== propertyData.details?.propertyType) {
                    formattedData.details.propertyType = values['details[propertyType]'] || propertyData.details?.propertyType;
                }

                if (values['details[rooms]'] !== propertyData.details?.rooms) {
                    formattedData.details.rooms = values['details[rooms]'] || propertyData.details?.rooms;
                }

                if (values['details[floor]'] !== propertyData.details?.floor) {
                    formattedData.details.floor = values['details[floor]'] || propertyData.details?.floor;
                }

                if (values['details[bathrooms]'] !== propertyData.details?.bathrooms) {
                    formattedData.details.bathrooms = values['details[bathrooms]'] || propertyData.details?.bathrooms;
                }

                if (values['details[handoverDate]'] !== propertyData.details?.handoverDate) {
                    formattedData.details.handoverDate = values['details[handoverDate]'] || propertyData.details?.handoverDate;
                }

                if (values['details[finishing]'] !== propertyData.details?.finishing) {
                    formattedData.details.finishing = values['details[finishing]'] || propertyData.details?.finishing;
                }
            }

            // Check if advertiser fields have been changed
            if (values['advertiser[phone]'] !== propertyData.advertiser?.phone ||
                values['advertiser[whatsapp]'] !== propertyData.advertiser?.whatsapp) {
                formattedData.advertiser = {
                    phone: values['advertiser[phone]'] || propertyData.advertiser?.phone || '',
                    whatsapp: values['advertiser[whatsapp]'] !== undefined ? values['advertiser[whatsapp]'] : propertyData.advertiser?.whatsapp
                };
            }

            // Process images - separate existing URLs from new File objects
            const imageFiles = [];
            const existingImageUrls = [];

            if (values.images && values.images.length > 0) {
                values.images.forEach(image => {
                    if (image instanceof File) {
                        imageFiles.push(image);
                    } else if (typeof image === 'string') {
                        existingImageUrls.push(image);
                    }
                });
            }

            // Add existing image URLs to formattedData
            formattedData.existingImages = existingImageUrls;

            // Add new image files to formattedData
            formattedData.images = imageFiles;

            await PropertyAPI.updateProperty(propertyId, formattedData);
            toast.success(currentLanguage === 'ar' ? 'تم تحديث العقار بنجاح' : 'Property updated successfully');
            setShowModal(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error(currentLanguage === 'ar' ? 'حدث خطأ أثناء تحديث العقار' : 'Error updating property');
        } finally {
            setIsLoading(false);
        }
    };

    if (!propertyData && showModal) {
        return (
            <CustomModal
                title={currentLanguage === 'ar' ? 'تحديث العقار' : 'Update Property'}
                showModal={showModal}
                onHide={() => setShowModal(false)}
                newClass="update-property-modal"
            >
                <div className="text-center p-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">{currentLanguage === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...'}</p>
                </div>
            </CustomModal>
        );
    }

    return (
        <CustomModal
            title={currentLanguage === 'ar' ? 'تحديث العقار' : 'Update Property'}
            showModal={showModal}
            onHide={() => setShowModal(false)}
            newClass="update-property-modal"
        >
            <div className="alert alert-info mb-3">
                {currentLanguage === 'ar' ? 'يمكنك تحديث الحقول التي تريد تغييرها فقط. الحقول الأخرى ستبقى كما هي.' : 'You only need to update the fields you want to change. Other fields will remain as they are.'}
            </div>
            {propertyData && (
                <Formik
                    initialValues={{
                        'title[en]': propertyData.title?.en || '',
                        'title[ar]': propertyData.title?.ar || '',
                        'description[en]': propertyData.description?.en || '',
                        'description[ar]': propertyData.description?.ar || '',
                        type: propertyData.type || 'apartment',
                        category: propertyData.category || 'rent',
                        'location[type]': 'Point',
                        'location[coordinates][0]': propertyData.location?.coordinates?.[0] || 31.2001,
                        'location[coordinates][1]': propertyData.location?.coordinates?.[1] || 29.9187,
                        'details[space]': propertyData.details?.space || '',
                        'details[view]': propertyData.details?.view || 'sea',
                        'details[price]': propertyData.details?.price || '',
                        'details[paymentMethods]': propertyData.details?.paymentMethods || ['cash'],
                        'details[propertyType]': propertyData.details?.propertyType || 'residential',
                        'details[rooms]': propertyData.details?.rooms || '',
                        'details[floor]': propertyData.details?.floor || '',
                        'details[bathrooms]': propertyData.details?.bathrooms || '',
                        'details[handoverDate]': propertyData.details?.handoverDate || '',
                        'details[finishing]': propertyData.details?.finishing || 'superLux',
                        'advertiser[phone]': propertyData.advertiser?.phone || '',
                        'advertiser[whatsapp]': propertyData.advertiser?.whatsapp || false,
                        images: propertyData.images || []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className="p-3">
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'النوع' : 'Type'}</label>
                                    <Dropdown
                                        value={selectType}
                                        onChange={(e) => {
                                            setSelectType(e.value);
                                            setFieldValue("type", e.value);
                                        }}
                                        options={translations[currentLanguage].aqarType.map(type => ({ name: type, value: type }))}
                                        optionLabel="name"
                                        placeholder="Select Type"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الفئة' : 'Category'}</label>
                                    <Dropdown value={selectCategory} 
                                        options={translations[currentLanguage].aqarCategory.map(category => ({ name: category, value: category }))}
                                        optionLabel="name"
                                        placeholder="Select Category"
                                        onChange={(e) => {
                                            setSelectCategory(e.value);
                                            setFieldValue("category", e.value);
                                        }}
                                    >
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'العنوان (الإنجليزية)' : 'Title (English)'}</label>
                                    <InputFiled name="title[en]" type="text" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'العنوان (العربية)' : 'Title (Arabic)'}</label>
                                    <InputFiled name="title[ar]" type="text" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الوصف (الإنجليزية)' : 'Description (English)'}</label>
                                    <InputFiled name="description[en]" as="textarea" rows="3" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الوصف (العربية)' : 'Description (Arabic)'}</label>
                                    <InputFiled name="description[ar]" as="textarea" rows="3" />
                                </div>
                            </div>



                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'المساحة' : 'Space'}</label>
                                    <InputFiled name="details[space]" type="number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الإطلالة' : 'View'}</label>
                                    <Dropdown value={selectVeiw} onChange={(e) => {
                                        setSelectView(e.value);
                                        setFieldValue("details[view]", e.value);
                                    }}
                                        options={translations[currentLanguage].view.map(view => ({ name: view, value: view }))}
                                        optionLabel="name"
                                        placeholder="Select View" name='view' className="hide-scrollbar"
                                    >
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'السعر' : 'Price'}</label>
                                    <InputFiled name="details[price]" type="number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الغرف' : 'Rooms'}</label>
                                    <InputFiled name="details[rooms]" type="number" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الطابق' : 'Floor'}</label>
                                    <InputFiled name="details[floor]" type="number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'الحمامات' : 'Bathrooms'}</label>
                                    <InputFiled name="details[bathrooms]" type="number" />
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'تاريخ التسليم' : 'Handover Date'}</label>
                                    <InputFiled name="details[handoverDate]" type="number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'التشطيب' : 'Finishing'}</label>
                                    <Dropdown value={finishing} onChange={(e) => {
                                        setFinishing(e.value);
                                        setFieldValue("details[finishing]", e.value);
                                    }} options={translations[currentLanguage].finishingDetails.map(finish => ({ name: finish, value: finish }))}
                                        optionLabel="name"
                                        placeholder="Select Finish" name='finishing' >
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-md-12">
                                    <label className="form-label">{currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                                    <PhoneNumber name="advertiser[phone]" type="text" placeholder={"اكتب رقمك"} />
                                    <div className='d-flex flex-row space-1'>
                                        <WhatsIcon />
                                        يوجد واتساب علي هذا الرقم
                                    </div>
                                    <Switch name="advertiser[whatsapp]" />
                                </div>

                            </div>

                            <div className="mb-4">
                                <label className="form-label">{currentLanguage === 'ar' ? 'الصور' : 'Images'}</label>
                                <ImageUploadGrid name="images" existingImages={propertyData.images || []} />
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button
                                    type="button"
                                    className=" btn-main btn-secondary me-2"
                                    onClick={() => setShowModal(false)}
                                    disabled={isLoading}
                                >
                                    {currentLanguage === 'ar' ? 'إلغاء' : 'Cancel'}
                                </button>
                                <button
                                    type="submit"
                                    className="btn-main"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            {currentLanguage === 'ar' ? 'جاري التحديث...' : 'Updating...'}
                                        </>
                                    ) : (
                                        currentLanguage === 'ar' ? 'تحديث' : 'Update'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </CustomModal>
    );
};

export default UpdatePropertyModal;