import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css";
import "./SliderDetailsContent.css";
const SliderDetailsContent = ({ images }) => {

  const backupImgs = ["./home.jpg", "./hom2.jpg", "./home1.jpg", "./home.jpg", "./hom2.jpg", "./home1.jpg", "./home.jpg", "./hom2.jpg", "./home1.jpg"]
  const [thumbs, setThumbs] = useState(null);
  const mapImages = images



  return (
    <div className="slider-details-info mt-4 pb-4 mb-4" data-aos="fade-up">
      {/* ================ START ALL SLIDER ==================== */}
      <div className="all-slider-info-details">
        <Swiper
          loop={true}
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          navigation={false}
          className="swiper-slider-1"
          spaceBetween={15}

        >
          {
            mapImages.length === 0 ? (backupImgs.map((mapImage, index) => (
              <SwiperSlide key={index}>
                <img src={mapImage.url} alt={`Map ${index + 1}`} />
              </SwiperSlide>
            ))) : (
              mapImages.map((mapImage, index) => (
                <SwiperSlide key={index}>
                  <img src={mapImage.url} alt={`Map ${index + 1}`} />
                </SwiperSlide>
              ))
            )
          }
        </Swiper>
        <Swiper
          className="swiper-slider-2 mt-3"
          slidesPerView={5}
          onSwiper={setThumbs}
          loop={true}
          spaceBetween={15}
          breakpoints={{
            0: {
              slidesPerView: 3,

            },
            768: {
              slidesPerView: 4,

            },
            1024: {
              slidesPerView: 5,

            }
          }}
        >
          {mapImages.map((mapImage, index) => (
            <SwiperSlide key={index}>
              <img src={mapImage.url} alt={`Map ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* ================ END ALL SLIDER ==================== */}
    </div>
  );
};

export default SliderDetailsContent;
