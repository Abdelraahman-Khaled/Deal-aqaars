import React from "react";
import LocationIcon from "../../../assets/Icons/LocationIcon";
import { Link } from "react-router-dom";
import FavIcon from "../FavIcon/FavIcon";
import Bed from "../../../assets/Icons/Bed";
import BathIcon from "../../../assets/Icons/BathIcon";
import AreaIcon from "../../../assets/Icons/AreaIcon";
import { useLanguage } from "../../Languages/LanguageContext";
import WhatsIcon from "../../../assets/Icons/WhatsIcon";
import CallIcon from "../../../assets/Icons/CallIcon";
import SimpleImageSlider from "../SimpleImageSlider/SimpleImageSlider";

const AdminstrativeCard = ({
  id,
  price,
  rooms,
  bath,
  space,
  details,
  location,
  img,
  company = false,
  wrapperClass,
  isFav,
  isSwiping = false,
  type,
  phone,
  haveWhatsapp,
  division,
}) => {
  const { currentLanguage } = useLanguage();

  const sliceWords = (text) => {
    const words = text ? text.split(" ") : [];
    return words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");
  };

  const handleClick = (e) => {
    if (isSwiping) e.preventDefault();
  };

  return (
    <div
      className={`position-relative compound-card space-4 d-flex ${wrapperClass} mb-4`}
      style={
        company & (wrapperClass === "flex-wrap")
          ? { width: "49%" }
          : { width: "100%" }
      }
      dir={currentLanguage === "ar" ? "rtl" : "ltr"}
    >
      <Link
        to={`/adminstrative-guide/${id}`}
        className={`   ${wrapperClass ? "w-100" : "w-50"}`}
        onClick={handleClick}
      >
        <div className=" compound-img">
          <SimpleImageSlider images={img} alt="img" />
          {/* favIcon */}
        </div>
      </Link>
      <FavIcon isFav={isFav} id={id} type="property" />
      {/* price */}
      <div className="d-flex flex-column space-4 w-100">
        <div className="d-flex justify-content-between w-100">
          <p className="b-3 min-w-max">{price} ج.م</p>
          <div className="d-flex gap-2 flex-wrap justify-content-end">
            <p className="b-11 available">
              {type === "sale" ? "للبيع" : "للايجار"}
            </p>
            <p className="b-11 available">
              {division ==="unit" ? "إداري":"محل"}
            </p>
          </div>
        </div>
        {/* specifications */}
        <div className="d-flex gap-2">
          {rooms > 0 && (
            <p className="d-flex align-items-center gap-2 b-11">
              <Bed />
              {rooms}
            </p>
          )}
          {bath > 0 && (
            <p className="d-flex align-items-center gap-2 b-11">
              <BathIcon />
              {bath}
            </p>
          )}
          <p className="d-flex align-items-center gap-2 b-11">
            <AreaIcon />
            {space} متر مربع
          </p>
        </div>
        {/* details */}
        <p className="b-12">{sliceWords(details)}</p>
        {/* locations */}
        <div className="b-11 d-flex">
          <LocationIcon />
          {location ||
            (currentLanguage === "ar"
              ? "موقع غير محدد"
              : "Location not specified")}
        </div>

        <div className="connections d-flex justify-content-between w-100 pt-4 space-2 ">
          {/* whats */}
          {haveWhatsapp && phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whats-button w-50 b-11 d-flex space-1 justify-content-center"
            >
              <WhatsIcon />
              واتساب
            </a>
          )}
          {/* call */}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="facebook-button w-50 b-11 d-flex space-1 justify-content-center"
            >
              <CallIcon />
              اتصل
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminstrativeCard;
