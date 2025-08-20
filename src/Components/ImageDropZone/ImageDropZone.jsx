import React, { useState } from "react";
import UploadIcon from "../../assets/Icons/UploadIcon";

export default function ImageDropZone({ handleInputChange }) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
                handleInputChange("logo", file);
                setSelectedFile(file);
            }
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleInputChange("logo", file);
            setSelectedFile(file);
        }
    };

    return (
        <div
            className={` border-2 border-dashed rounded p-4 text-center transition-all "
                }`}
            style={{
                borderStyle: "dashed",
                borderColor: dragActive ? "var(--primary)" : "var(--netural-200)",
                transition: "border-color 0.3s ease",

            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="d-none"
                id="logo-upload"
            />
            <label htmlFor="logo-upload" className="d-block cursor-pointer">
                <div className="d-flex justify-content-center mb-2">
                    <div className="upload-icon">
                        <UploadIcon />
                    </div>
                </div>
                <p className="b-16 fw-semibold mb-2">
                    <span style={{ color: "var(--primary)!important " }} className="b-15">دوس للرفع </span>  أو اسحبها وأفلتها هنا
                </p>
                <p className="text-muted b-18">(أقصى حجم للملف: 25 ميغابايت)</p>

                {selectedFile && (
                    <p className="text-success small mt-2">
                        تم اختيار الملف: {selectedFile.name}
                    </p>
                )}
            </label>
        </div>
    );
}
