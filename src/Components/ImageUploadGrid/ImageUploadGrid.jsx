import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import CloseIcon from '../../assets/Icons/CloseIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';
import CameraUploadImg from '../../assets/Icons/CameraUploadImg';

const ImageUploadGrid = ({ name }) => {
    const [field, , helpers] = useField(name); // formik field
    const [uploadedImages, setUploadedImages] = useState([]);

    // Effect to initialize previews from existing field value and log current state
    useEffect(() => {
        console.log('ImageUploadGrid field value:', field.value);

        // If field has values but no previews, generate previews
        if (field.value?.length > 0 && uploadedImages.length === 0) {
            field.value.forEach((file) => {
                if (file instanceof File) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target?.result) {
                            setUploadedImages((prev) => [...prev, e.target.result]);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }, [field.value]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            console.log('New files selected:', newFiles.length, 'files');

            // Validate files are images and not too large
            const validFiles = newFiles.filter(file => {
                const isImage = file.type.startsWith('image/');
                const isNotTooBig = file.size <= 5 * 1024 * 1024; // 5MB limit

                if (!isImage) {
                    console.warn('File rejected: not an image', file.name, file.type);
                }
                if (!isNotTooBig) {
                    console.warn('File rejected: too large', file.name, file.size);
                }

                return isImage && isNotTooBig;
            });

            // Update formik value (keep old + new)
            const updatedFiles = [...(field.value || []), ...validFiles];
            helpers.setValue(updatedFiles);
            console.log('Updated Formik field with', updatedFiles.length, 'total files');

            // Preview images
            validFiles.forEach((file) => {
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
        console.log('Removing image at index:', index);

        // Remove from previews
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));

        // Remove from formik field
        const newFiles = (field.value || []).filter((_, i) => i !== index);
        helpers.setValue(newFiles);

        console.log('After removal, remaining files:', newFiles.length);
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
                            <label
                                className="d-flex align-items-center justify-content-center border rounded"
                                style={{ height: '96px', cursor: 'pointer', background: 'rgba(23, 55, 148, 0.1)' }}
                            >
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
                            <div
                                className="d-flex align-items-center justify-content-center border rounded bg-white"
                                style={{ height: '96px' }}
                            >
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
