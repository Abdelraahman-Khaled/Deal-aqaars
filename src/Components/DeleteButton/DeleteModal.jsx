import React, { useState } from 'react'
import TrashIcon from '../../assets/Icons/TrashIcon'
import DeleteButton from './DeleteButton'
import PropertyAPI from '../../api/propertyApi'
import FinishingAPI from '../../api/finishingApi'
import SwapAPI from '../../api/swapApi'
import BuildingAPI from '../../api/buildingApi'
import LandAPI from '../../api/LandApi'
import FactoryAPI from '../../api/factoryApi'

const DeleteModal = ({ setShowProgress, propertyId, finishingServiceId, onDelete, type = "property" }) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (type === "property" && !propertyId) {
            console.error('Property ID is required for deletion')
            return
        } else if (type === "finishing" && !finishingServiceId) {
            console.error('Finishing Service ID is required for deletion')
            return
        } else if (type === "building" && !propertyId) {
            console.error('Building ID is required for deletion')
            return
        } else if (type === "land" && !propertyId) {
            console.error('Land ID is required for deletion')
            return
        } else if (type === "factory" && !propertyId) {
            console.error('Factory ID is required for deletion')
            return
        }

        try {
            setIsDeleting(true)
            if (type === "property") {
                await PropertyAPI.deleteProperty(propertyId)
                if (onDelete) {
                    onDelete(propertyId)
                }
            } else if (type === "finishing") {
                await FinishingAPI.deleteFinishingService(finishingServiceId)
                if (onDelete) {
                    onDelete(finishingServiceId)
                }
            } else if (type === "swap") {
                await SwapAPI.deleteSwap(propertyId) // Assuming propertyId will be the swapId
                if (onDelete) {
                    onDelete(propertyId)
                }
     } else if (type === "building") {
                await BuildingAPI.deleteBuilding(propertyId)
            } else if (type === "land") {
                await LandAPI.deleteLand(propertyId)
                if (onDelete) {
                    onDelete(propertyId)
                }
            } else if (type === "factory") {
                await FactoryAPI.deleteFactory(propertyId)
                if (onDelete) {
                    onDelete(propertyId)
                }
            }
            
            setShowProgress(false)
        } catch (error) {
            console.error(`Error deleting ${type}:`, error)
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
                    متأكد إنك عايز تحذف ال {type === "property" ? "عقار" : type === "finishing" ? "تشطيب" : type === "swap" ? "مبادلة" : type === "building" ? "مبنى" : type === "land" ? "أرض" : "مصنع"}؟
                </p>
                <p className="b-15">
                    لو حذفت ال {type === "property" ? "عقار" : type === "finishing" ? "تشطيب" : type === "swap" ? "مبادلة" : type === "building" ? "مبنى" : type === "land" ? "أرض" : "مصنع"}، مش هتقدر ترجعه تاني. تأكيدك مهم علشان نكمل.
                </p>
                <div className=' d-flex justify-content-between w-100 pt-4 space-2 '>
                    {/* delete */}
                    <div onClick={handleDelete} className='w-50'>
                        <DeleteButton 
                            text={isDeleting ? "جاري الحذف..." : `احذف ال${type === "property" ? "عقار" : type === "finishing" ? "تشطيب" : type === "swap" ? "مبادلة" : type === "building" ? "مبنى" : type === "land" ? "أرض" : "مصنع"}`}                            newClass='w-100' 
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