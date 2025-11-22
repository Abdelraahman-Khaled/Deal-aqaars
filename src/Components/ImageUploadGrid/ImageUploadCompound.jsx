import React, { useState, useEffect } from "react";
import CloseIcon from "../../assets/Icons/CloseIcon";
import PlusIcon from "../../assets/Icons/PlusIcon";
import CameraUploadImg from "../../assets/Icons/CameraUploadImg";

const ImageUploadCompound = ({ value = [], onChange }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const previews = [];

      for (const file of value) {
        if (file instanceof File) {
          previews.push(await readFileAsDataURL(file));
        } else {
          previews.push(file);
        }
      }

      setUploadedImages(previews);
    };

    loadImages();
  }, [value]);

  const readFileAsDataURL = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const valid = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );

    const updated = [...value, ...valid];
    onChange(updated);
  };

  const removeImage = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
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
                  className="img-fluid rounded border w-100 "
                  style={{ height: "130px", objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-0 end-0 m-1"
                  onClick={() => removeImage(index)}
                >
                  <CloseIcon />
                </button>
              </div>
            ) : index === uploadedImages.length && index < 9 ? (
              <label className="d-flex align-items-center justify-content-center border rounded"
                style={{ height: "130px", cursor: "pointer" }}>
                <PlusIcon />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="d-flex align-items-center justify-content-center border rounded bg-white"
                style={{ height: "130px" }}>
                <CameraUploadImg />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadCompound;
