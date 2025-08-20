import React, { useState } from 'react';
import CloseIcon from '../../assets/Icons/CloseIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';
import CameraUploadImg from '../../assets/Icons/CameraUploadImg';

const ImageUploadGrid = () => {
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setUploadedImages((prev) => [...prev, e.target.result]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-4">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="col">
                        {uploadedImages[index] ? (
                            <div className="position-relative">
                                <img
                                    src={uploadedImages[index]}
                                    alt={`Upload ${index + 1}`}
                                    className="img-fluid rounded border"
                                    style={{ height: '96px', objectFit: 'cover', width: '100%' }}
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    type="button"
                                    className="btn btn-sm position-absolute top-0 end-0 m-1"
                                    title="Remove"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        ) : index === uploadedImages.length && index < 9 ? (
                            <label className="d-flex align-items-center justify-content-center border rounded " style={{ height: '96px', cursor: 'pointer', background: "rgba(23, 55, 148, 0.1)" }}>
                                <PlusIcon />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="d-none"
                                    multiple
                                />
                            </label>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center border rounded bg-white" style={{ height: '96px' }}>
                                <CameraUploadImg />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploadGrid;
