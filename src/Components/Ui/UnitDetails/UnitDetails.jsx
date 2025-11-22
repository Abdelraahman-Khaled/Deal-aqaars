import React from "react";
import "./UnitDetails.css";
const UnitDetails = ({ data }) => {

  return (
    <>
      {data &&
        data.map((unit, index) => (
          <div key={index} className="d-flex flex-column gap-4 ">
            <div className="companies-box p-3  rounded shadow-sm bg-white">
              <div className="row g-3 p-0">
                {unit.floor || unit.finishingType ? (
                  <div className="box-row col-12 d-flex  justify-content-between space-4">
                    {unit.floor && (
                      <div className="w-100 d-flex flex-row justify-content-between">
                        <p className="b-12">الدور</p>
                        <p className="b-10">{unit.floor}</p>
                      </div>
                    )}
                    {unit.finishingType && (
                      <div className="w-100 d-flex  flex-row justify-content-between">
                        <p className="b-12">نوع التشطيب</p>
                        <p className="b-10">{unit.finishingType}</p>
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="box-row col-12 d-flex   justify-content-between space-4">
                  {unit.buildingYear && (
                    <div className="w-100 d-flex flex-row justify-content-between">
                      <p className="b-12">سنة الإنشاء</p>
                      <p className="b-10">{unit.buildingYear}</p>
                    </div>
                  )}

                  {unit.meterPrice && (
                    <div className="w-100 d-flex  flex-row justify-content-between">
                      <p className="b-12">سعر المتر</p>
                      <p className="b-10">{unit.meterPrice} ج.م/متر²</p>
                    </div>
                  )}
                </div>
                {
                  unit.handingOverYear &&
                  <div className="box-row col-12 d-flex  justify-content-between space-4">
                    <div className="w-100  d-flex flex-row justify-content-between">
                      <p className="b-12">تاريخ التسليم</p>
                      <p className="b-10">{unit.handingOverYear}</p>
                    </div>
                  </div>
                }
                <div className="box-row col-12 d-flex  justify-content-between space-4">
                  {unit.space && (
                    <div className="w-100  d-flex flex-row justify-content-between">
                      <p className="b-12">المساحة</p>
                      <p className="b-10">{unit.space} متر مربع</p>
                    </div>
                  )}

                  {unit.numRooms && (
                    <div className=" w-100 d-flex flex-row justify-content-between">
                      <p className="b-12">عدد الأوض</p>
                      <p className="b-10">{unit.numRooms}</p>
                    </div>
                  )}
                </div>

                <div className="box-row col-12 d-flex  justify-content-between space-4">
                  {unit.paymentWay && unit.paymentWay.length > 0 && (
                    <div className="w-100 d-flex flex-row justify-content-between">
                      <p className="b-12">طريقة الدفع</p>
                      <p className="b-10">
                        {unit.paymentWay.join(" & ")}
                      </p>
                    </div>
                  )}
                  {unit.paymentLand && (
                    <div className="w-100 d-flex flex-row justify-content-between">
                      <p className="b-12">طريقة الدفع</p>
                      <p className="b-10">{unit.paymentLand}</p>
                    </div>
                  )}

                  {unit.AdsType && (
                    <div className="w-100 d-flex flex-row justify-content-between">
                      <p className="b-12">نوع المعلن</p>
                      <p className="b-10">{unit.AdsType}</p>
                    </div>
                  )}
                </div>

                <div className="box-row col-12 d-flex  justify-content-between space-4">
                  {unit.front && (
                    <div className="w-100 d-flex  flex-row justify-content-between">
                      <p className="b-12">بيطل على</p>
                      <p className="b-10">{unit.front}</p>
                    </div>
                  )}

                  {unit.yearDelivary && (
                    <div className="w-100 d-flex  flex-row justify-content-between">
                      <p className="b-12">سنة التسليم</p>
                      <p className="b-10">
                        {new Date(unit.yearDelivary).getFullYear()}
                      </p>
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
