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
  const { setLatitude, setLongitude, latitude, longitude ,setLocationDetails, locationDetails} = props;
  const [searchResult, setSearchResult] = useState(null);
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // ✅ Vite env
    libraries,
    language: "ar"
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [location, setLocation] = useState({
    lat: Number(latitude) || 30.0444,
    lng: Number(longitude) || 31.2357,
  });

useEffect(() => {
  if (!isLoaded || !map) return;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const newLocation = { lat, lng };
        setLocation(newLocation);
        setLatitude(lat);
        setLongitude(lng);
        map.setCenter(newLocation);

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: newLocation }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            setLocationDetails(results[0].formatted_address);
          } else {
            setLocationDetails(`${lat}, ${lng}`);
          }
        });
      },
      (error) => console.error("Error getting current location:", error)
    );
  }
}, [isLoaded, map]);


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
    const newLocation = { lat, lng };
    setLocation(newLocation);
    setLatitude(lat);
    setLongitude(lng);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newLocation }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setLocationDetails(results[0].formatted_address);
        setInputValue(results[0].formatted_address);
      } else {
        setLocationDetails(`${lat}, ${lng}`);
        setInputValue(`${lat}, ${lng}`);
      }
    });
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
        setLocationDetails(searchResult.gm_accessors_.place.eu?.formattedPrediction);
        setInputValue(searchResult.gm_accessors_.place.eu?.formattedPrediction);
      }
    } else {
      alert("Please enter text");
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      setLocation({ lat: Number(latitude), lng: Number(longitude) });
    }
    if (locationDetails) {
      setInputValue(locationDetails);
    } else {
      setInputValue("");
    }
  }, [latitude, longitude, locationDetails]);

  // useEffect(() => {
  //   if (map && location) {
  //     map.setCenter(location);
  //     map.setZoom(10); // Ensure a reasonable zoom level
  //   }
  // }, [map, location]);

  return isLoaded ? (
    <>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoadd}>
        <input
          type="text"
          className="form-control form-control-solid mb-5 ps-14"
          placeholder=" ابحث عن مكان على الخريطة ..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
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
