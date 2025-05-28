import "./PayInformationTab.css";
import imgPay_1 from "../../../../../assets/images/payment/01.png";
import imgPay_2 from "../../../../../assets/images/payment/01.png";
import TrashIcon from "assets/Icons/TrashIcon";
import { useState } from "react";
import ModalRemove from "../../../../../Components/Ui/ModalRemove/ModalRemove";

const PayInformationTab = () => {
  const [showModalRemove, setShowModalRemove] = useState(false);
  const buttonShowModal = () => {
    setShowModalRemove(true);
  };
  const hideShowModal = () => {
    setShowModalRemove(false);
  };

  return (
    <>
      <ModalRemove
        showModalPayRemove={showModalRemove}
        hideModalPayRemove={hideShowModal}
        titleModal={"حذف وسيلة الدفع"}
        title={"هل أنت متأكد من حذف وسيلة الدفع ؟"}
        text={
          "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
        }
      />
      <div className="all-pay-information-tab">
        <h2 className="title title-info-top-account pb-3">معلومات الدفع</h2>

        {/* ============ START PAY ONE CONTENT ============ */}
        <div className="pay-one-content-info border  d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div className="info-pay d-flex align-items-center gap-2">
            <img src={imgPay_1} alt="imagePay" />
            <div className="num-pay ">xxx 595 8955</div>
          </div>
          <div onClick={buttonShowModal} className="icon-trash-remove">
            <TrashIcon />
          </div>
        </div>
        {/* ============ END PAY ONE CONTENT ============ */}
        {/* ============ START PAY ONE CONTENT ============ */}
        <div className="pay-one-content-info border  d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div className="info-pay d-flex align-items-center gap-2">
            <img src={imgPay_2} alt="imagePay" />
            <div className="num-pay ">xxx 595 8955</div>
          </div>
          <div onClick={buttonShowModal} className="icon-trash-remove">
            <TrashIcon />
          </div>
        </div>
        {/* ============ END PAY ONE CONTENT ============ */}
        {/* ============ START PAY ONE CONTENT ============ */}
        <div className="pay-one-content-info border  d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div className="info-pay d-flex align-items-center gap-2">
            <img src={imgPay_1} alt="imagePay" />
            <div className="num-pay ">xxx 595 8955</div>
          </div>
          <div onClick={buttonShowModal} className="icon-trash-remove">
            <TrashIcon />
          </div>
        </div>
        {/* ============ END PAY ONE CONTENT ============ */}
      </div>
    </>
  );
};

export default PayInformationTab;
