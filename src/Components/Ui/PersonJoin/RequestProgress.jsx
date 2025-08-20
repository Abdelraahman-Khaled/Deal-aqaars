import React from 'react'
import ProgressIcon from '../../../assets/Icons/SuccesssModal'
import { Link } from 'react-router-dom'

const RequestProgress = ({ setShowProgress }) => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100 space-6 p-6'>
            <ProgressIcon />
            <div className='d-flex flex-column align-items-center space-6'>
                <p className="b-1">
                    طلبك قيد المراجعة
                </p>
                <p className="b-15">
                    تم استلام طلب الإنضمام لدينا بنجاح سيصلك إشعار في حالة القبول
                </p>
                <Link to="/" onClick={() => setShowProgress(false)}>
                    <button className="btn-main " type="submit">
                        عودة للرئيسية
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default RequestProgress