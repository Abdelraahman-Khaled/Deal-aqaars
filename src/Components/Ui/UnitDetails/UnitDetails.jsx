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
                                {unit.space && (
                                    <div className='w-100  d-flex flex-row justify-content-between'>
                                        <p className='b-12'>المساحة</p>
                                        <p className='b-10'>{unit.space}</p>
                                    </div>
                                )}

                                {unit.numRooms && (
                                    <div className=' w-100 d-flex flex-row justify-content-between'>
                                        <p className='b-12'>عدد الأوض</p>
                                        <p className='b-10'>{unit.numRooms}</p>
                                    </div>
                                )}
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                {unit.floor && (
                                    <div className='w-100 d-flex flex-row justify-content-between'>
                                        <p className='b-12'>الدور</p>
                                        <p className='b-10'>{unit.floor}</p>
                                    </div>
                                )}
                                {unit.finishingType && (
                                    <div className='w-100 d-flex  flex-row justify-content-between'>
                                        <p className='b-12'>نوع التشطيب</p>
                                        <p className='b-10'>{unit.finishingType}</p>
                                    </div>
                                )}
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                {unit.front && (
                                    <div className='w-100 d-flex  flex-row justify-content-between'>
                                        <p className='b-12'>بيطل على</p>
                                        <p className='b-10'>{unit.front}</p>
                                    </div>
                                )}

                                {unit.yearDelivary && (
                                    <div className='w-100 d-flex  flex-row justify-content-between'>
                                        <p className='b-12'>سنة التسليم</p>
                                        <p className='b-10'>{unit.yearDelivary}</p>
                                    </div>
                                )}
                            </div>

                            <div className='box-row col-12 d-flex   justify-content-between space-4'>
                                {unit.numOfAds && (
                                    <div className='w-100 d-flex flex-row justify-content-between'>
                                        <p className='b-12'>رقم الإعلان</p>
                                        <p className='b-10'>{unit.numOfAds}</p>
                                    </div>
                                )}

                                {unit.meterPrice && (
                                    <div className='w-100 d-flex  flex-row justify-content-between'>
                                        <p className='b-12'>سعر المتر</p>
                                        <p className='b-10'>{unit.meterPrice}</p>
                                    </div>
                                )}
                            </div>

                            <div className='box-row col-12 d-flex  justify-content-between space-4'>
                                {unit.paymentWay && unit.paymentWay.length > 0 && (
                                    <div className='w-100 d-flex flex-row justify-content-between'>
                                        <p className='b-12'>طريقة الدفع</p>
                                        {unit.paymentWay.map((payment, index) => (
                                            <p key={index} className='b-10'>{payment}</p>
                                        ))}
                                    </div>
                                )}

                                {unit.AdsType && (
                                    <div className='w-100 d-flex flex-row justify-content-between'>
                                        <p className='b-12'>نوع المعلن</p>
                                        <p className='b-10'>{unit.AdsType}</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UnitDetails;
