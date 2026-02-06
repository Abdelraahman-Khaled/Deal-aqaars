import CompoundCard from "../../../../Components/Ui/CompoundCard/CompoundCard";
import Slidercontainer from "../../../../Components/Slider/Slidercontainer";
import { useCompound } from "../../../../contexts/CompoundContext";
import { useEffect } from "react";
import { Skeleton } from "primereact/skeleton";

const CompoundSlider = () => {
  const { allCompounds, fetchAllCompounds, loading, error } = useCompound();

  useEffect(() => {
    fetchAllCompounds()
  }, [])
  console.log("allCompounds", allCompounds)
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

  if (!allCompounds || allCompounds.length === 0) {
    return null;
  }


  return (
    <Slidercontainer>
      {allCompounds.map((card, index) => (
        <CompoundCard
          id={card._id}
          key={index}
          title={card.announcementLocation}
          location={card.location.detailedLocation}
          details={card.details.ar}
          price={""}
          img={card.compoundImages}
          slider={true}
          wrapperClass="flex-wrap"
          advertiser={{
            phoneNumber: card.contact.phoneNumber,
            hasWhatsapp: card.contact.hasWhatsapp
          }}
          connections={true}
        />
      ))}
    </Slidercontainer>
  );
};

export default CompoundSlider;
