import React from 'react';
import { Link } from 'react-router-dom';
import "./UnitDetails.css"
const UnitDetails = ({ data }) => {
    return (
        <>
            {data && data.map((unit, index) => (
                <div key={index} className='d-flex flex-column gap-4 '>
                    <div className='companies-box p-3  rounded shadow-sm bg-white'>
                        <div className='row g-3 p-0'>
                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                <div className='w-100  d-flex flex-row justify-content-between'>
                                    <p className='b-12'>المساحة</p>
                                    <p className='b-10'>{unit.space}</p>
                                </div>

                                <div className=' w-100 d-flex flex-row justify-content-between'>
                                    <p className='b-12'>عدد الأوض</p>
                                    <p className='b-10'>{unit.numRooms}</p>
                                </div>
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                <div className='w-100 d-flex flex-row justify-content-between'>
                                    <p className='b-12'>الدور</p>
                                    <p className='b-10'>{unit.floor}</p>
                                </div>
                                <div className='w-100 d-flex  flex-row justify-content-between'>
                                    <p className='b-12'>نوع التشطيب</p>
                                    <p className='b-10'>{unit.finishingType}</p>
                                </div>
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                <div className='w-100 d-flex  flex-row justify-content-between'>
                                    <p className='b-12'>بيطل على</p>
                                    <p className='b-10'>{unit.front}</p>
                                </div>

                                <div className='w-100 d-flex  flex-row justify-content-between'>
                                    <p className='b-12'>سنة التسليم</p>
                                    <p className='b-10'>{unit.yearDelivary}</p>
                                </div>
                            </div>

                            <div className='box-row col-12 d-flex   justify-content-between space-4'>
                                <div className='w-100 d-flex flex-row justify-content-between'>
                                    <p className='b-12'>رقم الإعلان</p>
                                    <p className='b-10'>{unit.numOfAds}</p>
                                </div>

                                <div className='w-100 d-flex  flex-row justify-content-between'>
                                    <p className='b-12'>سعر المتر</p>
                                    <p className='b-10'>{unit.meterPrice}</p>
                                </div>
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                <div className='w-100 d-flex flex-row justify-content-between'>
                                    <p className='b-12'>طريقة الدفع</p>
                                    <p className='b-10'>{unit.paymentWay}</p>
                                </div>

                                <div className='w-100 d-flex flex-row justify-content-between'>
                                    <p className='b-12'>نوع المعلن</p>
                                    <p className='b-10'>{unit.AdsType}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UnitDetails;
