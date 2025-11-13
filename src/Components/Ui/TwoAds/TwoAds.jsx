import React from "react";
import { useAds } from "../../../contexts/AdsContext";

const TwoAds = () => {
  const { ads } = useAds();

  return (
    <div className="ads w-100 d-flex flex-wrap space-6 flex-column">
      {ads
        .filter((ad) => ad.name === "side ad")
        .flatMap((ad) => ad.images)
        .map((img) => {
          return <img src={img.url} alt="ads-img" className="w-100" />;
        })}
    </div>
  );
};

export default TwoAds;
