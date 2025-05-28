import { toast } from "react-toastify";
import "./ModalRemove.css";
// import BookingAPI from "api/bookingApi";
import { useEffect, useState } from "react";
import CustomModal from "../../CustomModal/CustomModal";
import TrashIcon from "../../../assets/Icons/TrashIcon";

const ModalRemove = ({
  id,
  showModalPayRemove,
  hideModalPayRemove,
  titleModal,
  title,
  text,
  reservation,
  refresh
}) => {
  const [savedReservation, setSavedReservation] = useState(null);

  // When reservation changes, update state only if it's valid
  useEffect(() => {
    if (reservation) {
      setSavedReservation(reservation);
    }
  }, [reservation]);

  const cancelButton = () => {
    hideModalPayRemove();
  };

  const removeButton = async () => {
    try {
      let endpoint = "";
      if (savedReservation.trip_id) {
        endpoint = `trip/${savedReservation.id}`;
      } else if (savedReservation.effectivene_id) {
        endpoint = `effectivene/${savedReservation.id}`;
      } else if (savedReservation.gift_id) {
        endpoint = `gift/${savedReservation.id}`;
      } else {
        toast.error("لا يوجد حجز صالح للحذف");
        return;
      }

      // Call the API to cancel the booking
      await BookingAPI.cancelBooking(endpoint);
      hideModalPayRemove();
      toast.success("تم الحذف بنجاح");
      if (refresh) {
        refresh((prev) => !prev); // Call refresh to trigger re-fetch in parent
      }
    } catch (error) {
      // Handle any error that occurs during the API call
      hideModalPayRemove();
      toast.error("فشل في الحذف، حاول مرة اخرى");
    }
  };
  return (
    <CustomModal
      show={showModalPayRemove}
      onHide={hideModalPayRemove}
      title={titleModal}
      newClass={"modal-remove"}
    >
      <div className="content-modal-remove">
        <div className="icon-remove-top">
          <TrashIcon />
        </div>
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p>
        <div className="buttons-modal-bottom d-flex align-items-center gap-3">
          <button onClick={removeButton} className="btn-main btn-remove">
            حذف
          </button>
          <button onClick={cancelButton} className="btn-main btn-cancel">
            لا
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalRemove;
