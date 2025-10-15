import { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import "./GoogleSearchBox.css";

const libraries = ["places"];

export default function GoogleSearchBoxWithMap(props) {
  const { setLatitude, setLongitude, latitude, longitude } = props;
  const [searchResult, setSearchResult] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // ✅ Vite env
    libraries
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [location, setLocation] = useState({
    lat: Number(latitude) || 30.0444,
    lng: Number(longitude) || 31.2357,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    map.setZoom(10);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onMapClicked = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocation({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  const onLoadd = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const place = searchResult.getPlace();
      const lat = place?.geometry?.location?.lat();
      const lng = place?.geometry?.location?.lng();

      if (lat && lng) {
        setLocation({ lat, lng });
        setLatitude(lat);
        setLongitude(lng);
      }
    } else {
      alert("Please enter text");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      setLocation({ lat: Number(latitude), lng: Number(longitude) });
    }
  }, [latitude, longitude]);

  return isLoaded ? (
    <>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadd}>
        <input
          type="text"
          className="form-control form-control-solid mb-5 ps-14"
          placeholder=" ابحث عن مكان على الخريطة ..."
          onChange={(e) => console.log(e.target.value)}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClicked}
      >
        <Marker position={location} />
      </GoogleMap>
    </>
  ) : null;
}
