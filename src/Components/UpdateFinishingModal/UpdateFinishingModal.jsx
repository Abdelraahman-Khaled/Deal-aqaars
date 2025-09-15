import React, { useState, useEffect } from 'react';
import CustomModal from '../CustomModal/CustomModal';
import FormField from '../Forms/FormField';
import InputField from '../Forms/InputField';
import { useLanguage } from '../Languages/LanguageContext';
import { translations } from './translations';
import FinishingAPI from '../../api/finishingApi';
import { useFinishing } from '../../contexts/FinishingContext';
import { toast } from 'react-toastify';
import Switch from '../Forms/Switch';

const UpdateFinishingModal = ({ showModal, setShowModal, finishingServiceData }) => {
    const { currentLanguage } = useLanguage();
    const { fetchMyFinishingServices } = useFinishing();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("finishingServiceData:", finishingServiceData);
    }, [finishingServiceData]);

     const [type, setType] = useState(finishingServiceData?.jobType?.en === "Fit-out & Renovation" ? "finishing" : "furnishing");

     const initialValues = {
         phoneNumber: finishingServiceData?.phoneNumber || '',
         hasWhatsapp: finishingServiceData?.hasWhatsapp || false,
         jobType: {
             ar: finishingServiceData?.jobType?.ar || '',
             en: finishingServiceData?.jobType?.en || ''
         },
         detailedAddress: {
             ar: finishingServiceData?.detailedAddress?.ar || '',
             en: finishingServiceData?.detailedAddress?.en || ''
         },
     };

     const handleSubmit = async (values) => {
         setLoading(true);
         try {
             const updatedData = {
                 phoneNumber: values.phoneNumber,
                 hasWhatsapp: values.hasWhatsapp,
                 jobType: {
                     ar: values.jobType?.ar || '',
                     en: values.jobType?.en || ''
                 },
                 detailedAddress: {
                     ar: values.detailedAddress?.ar || '',
                     en: values.detailedAddress?.en || ''
                 },
             };
             await FinishingAPI.updateFinishingService(finishingServiceData._id, updatedData);
             toast.success(translations[currentLanguage].updateSuccess);
             fetchMyFinishingServices(); // Refresh the list
             setShowModal(false);
         } catch (error) {
             console.error('Error updating finishing service:', error);
             toast.error(translations[currentLanguage].updateError);
         } finally {
             setLoading(false);
         }
     };

    return (
        <CustomModal
            showModal={showModal}
            onHide={() => setShowModal(false)}
            setShowModal={setShowModal}
            newClass="update-finishing-modal update-property-modal"
        >
            <div className="p-4">
                <h5 className="mb-4">{translations[currentLanguage].updateFinishingService}</h5>
                <FormField
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ handleChange, handleBlur, values }) => (
                        <form>
                            <div className="mb-4">
                                  <InputField
                                      label={translations[currentLanguage].phoneNumber}
                                      name="phoneNumber"
                                      type="text"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.phoneNumber}
                                  />
                              </div>
                              <div className="mb-4">
                                  <InputField
                                      label={translations[currentLanguage].jobType}
                                      name="jobType.ar"
                                      type="text"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.jobType?.ar || ''}
                                   />
                               </div>
                               <div className="mb-4">
                                   <InputField
                                       label={translations[currentLanguage].jobTypeEn}
                                       name="jobType.en"
                                       type="text"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.jobType?.en || ''}
                                   />
                              </div>
                              <div className="mb-4">
                                  <InputField
                                      label={translations[currentLanguage].detailedAddress}
                                      name="detailedAddress.ar"
                                      type="text"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.detailedAddress?.ar || ''}
                                   />
                               </div>
                               <div className="mb-4">
                                   <InputField
                                       label={translations[currentLanguage].detailedAddressEn}
                                       name="detailedAddress.en"
                                       type="text"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.detailedAddress?.en || ''}
                                   />
                              </div>

                              <div className="mb-4">
                                  <Switch
                                      name="hasWhatsapp"
                                      checked={values.hasWhatsapp}
                                      onChange={(e) => setFieldValue("hasWhatsapp", e.target.checked)}
                                      label={translations[currentLanguage].hasWhatsapp}
                                  />
                              </div>
                            <button type="submit" className="btn-main w-100 mt-4" disabled={loading}>
                                {loading ? translations[currentLanguage].updating : translations[currentLanguage].update}
                            </button>
                        </form>
                    )}
                </FormField>
            </div>
        </CustomModal>
    );
};

export default UpdateFinishingModal;