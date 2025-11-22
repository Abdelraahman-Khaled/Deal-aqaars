import { useEffect } from "react";
import Slidercontainer from "../../../../Components/Slider/Slidercontainer";
import RealStateCard from "../../../../Components/Ui/RealStateCard/RealStateCard";
import { useProperty } from "../../../../contexts/PropertyContext";
import { Skeleton } from "primereact/skeleton";

const RealStateSlider = () => {
  const { allProperties, fetchAllProperty, loading, error } = useProperty();
  useEffect(() => {
    fetchAllProperty();
  }, []);

  if (loading) {
    return (
      <Slidercontainer>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="p-2">
            <Skeleton height="200px" className="mb-3" borderRadius="10px"></Skeleton>
            <div className="d-flex justify-content-between mb-2">
              <Skeleton width="30%" height="1rem"></Skeleton>
              <Skeleton width="20%" height="1rem"></Skeleton>
            </div>
            <Skeleton width="80%" height="1rem" className="mb-2"></Skeleton>
            <Skeleton width="60%" height="1rem" className="mb-2"></Skeleton>
          </div>
        ))}
      </Slidercontainer>
    );
  }

  return (
    <Slidercontainer>
      {allProperties.map((card, index) => (
        <RealStateCard
          key={index}
          id={card._id}
          price={card.details.price}
          type={card.division}
          rooms={card.details.rooms}
          bath={card.details.bathrooms}
          space={card.details.space}
          details={card.description.ar}
          location={card.location.detailedLocation}
          img={card.images}
          wrapperClass="flex-wrap"
          phone={card.advertiserPhoneNumber}
          haveWhatsapp={card.haveWhatsapp}
        />
      ))}
    </Slidercontainer>
  );
};

export default RealStateSlider;
