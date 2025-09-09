import React, { useState } from 'react'
import TrashIcon from '../../assets/Icons/TrashIcon'
import DeleteButton from './DeleteButton'
import PropertyAPI from '../../api/propertyApi'

const DeleteModal = ({ setShowProgress, propertyId, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!propertyId) {
            console.error('Property ID is required for deletion')
            return
        }

        try {
            setIsDeleting(true)
            await PropertyAPI.deleteProperty(propertyId)
            
            // Call the onDelete callback to refresh the list
            if (onDelete) {
                onDelete(propertyId)
            }
            
            setShowProgress(false)
        } catch (error) {
            console.error('Error deleting property:', error)
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100 space-6 p-6'>
            <div className='rounded-circle border-1 p-4 ' style={{ backgroundColor: "#D004161A" }}>
                <TrashIcon width='80' height='80' />
            </div>
            <div className='d-flex flex-column align-items-center space-6 w-100 px-3'>
                <p className="b-1">
                    متأكد إنك عايز تحذف العقار؟
                </p>
                <p className="b-15">
                    لو حذفت العقار، مش هتقدر ترجعه تاني. تأكيدك مهم علشان نكمل.
                </p>
                <div className=' d-flex justify-content-between w-100 pt-4 space-2 '>
                    {/* delete */}
                    <div onClick={handleDelete} className='w-50'>
                        <DeleteButton 
                            text={isDeleting ? "جاري الحذف..." : "احذف العقار"} 
                            newClass='w-100' 
                            disabled={isDeleting}
                        />
                    </div>
                    {/* cancel */}
                    <button 
                        className='btn-main w-50' 
                        onClick={() => setShowProgress(false)}
                        disabled={isDeleting}
                    >
                        لأ، مش عايز احذفه
                    </button>
                </div>
            </div>
        </div >
    )
}

export default DeleteModal