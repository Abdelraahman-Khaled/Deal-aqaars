import React from 'react'
import { Link } from "react-router-dom";

const UploadImageCard = ({ children, className, desc }) => {
    return (
        <div
            className={` bg-white ${className}`}
            style={{ borderColor: 'var(--bs-gray-200)' }}
        >
            {/* Card Body */}
            <div className=" rounded-3 " style={{ borderColor: 'var(--bs-gray-200)' }}>
                <div className="gap-3 d-flex flex-column">{children}</div>
            </div>
        </div>
    );
}
export default UploadImageCard
