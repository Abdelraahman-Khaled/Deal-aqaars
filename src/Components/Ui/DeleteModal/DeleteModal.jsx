import React, { useState } from 'react';
import CustomModal from '../../CustomModal/CustomModal';
import FinishingAPI from '../../../api/finishingApi';
import { toast } from 'react-toastify';
import { useLanguage } from '../../Languages/LanguageContext';
import { translations } from './translations'; // Assuming translations for DeleteModal

const DeleteModal = ({ showModal, setShowModal, finishingServiceId, type, onDelete }) => {
    const { currentLanguage } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            if (type === "finishing") {
                await FinishingAPI.deleteFinishingService(finishingServiceId);
                toast.success(translations[currentLanguage].deleteSuccess);
                onDelete(); // Callback to refresh data or update UI
            } else {
                // Handle other types of deletions if necessary
                toast.error("Unsupported deletion type.");
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error(translations[currentLanguage].deleteError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomModal
            showModal={showModal}
            onHide={() => setShowModal(false)}
            setShowModal={setShowModal}
            newClass="delete-modal"
        >
            <div className="p-4 text-center">
                <h5 className="mb-3">{translations[currentLanguage].confirmDeleteTitle}</h5>
                <p className="mb-4">{translations[currentLanguage].confirmDeleteMessage}</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={loading}>
                        {translations[currentLanguage].cancel}
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                        {loading ? translations[currentLanguage].deleting : translations[currentLanguage].delete}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default DeleteModal;