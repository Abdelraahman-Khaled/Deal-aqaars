import React from 'react'
import ProgressIcon from '../../../assets/Icons/SuccesssModal'
import { Link } from 'react-router-dom'

const RequestProgress = ({ setShowProgress }) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100 gap-4 gap-md-5 p-4 p-md-5 text-center'>
            <ProgressIcon />
            <div className='d-flex flex-column align-items-center gap-3 gap-md-4'>
                <h4 className="b-1 m-0 fw-bold">
                    طلبك قيد المراجعة
                </h4>
                <p className="b-15 m-0 text-muted">
                    تم استلام طلب الإنضمام لدينا بنجاح. سيصلك إشعار في حالة القبول.
                </p>
                <Link to="/" onClick={() => setShowProgress(false)} className="w-100 mt-3 mt-md-4">
                    <button className="btn-main w-100" type="button">
                        عودة للرئيسية
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default RequestProgress