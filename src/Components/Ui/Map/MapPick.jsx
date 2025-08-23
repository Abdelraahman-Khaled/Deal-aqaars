// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

// function LocationMarker({ onSelectPosition }) {
//     const [position, setPosition] = useState(null);

//     useMapEvents({
//         click(e) {
//             setPosition(e.latlng);
//             onSelectPosition(e.latlng); // بيرجع lat و lng
//         },
//     });

//     return position === null ? null : (
//         <Marker position={position}>
//             <Popup>
//                 Latitude: {position.lat} <br /> Longitude: {position.lng}
//             </Popup>
//         </Marker>
//     );
// }

// export default function MapPick() {
//     const [coords, setCoords] = useState(null);

//     return (
//         <div style={{ height: "400px" }}>
//             <MapContainer
//                 center={[30.0444, 31.2357]} // القاهرة
//                 zoom={13}
//                 style={{ height: "100%", width: "100%" }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                 />
//                 <LocationMarker onSelectPosition={setCoords} />
//             </MapContainer>

//             {coords && (
//                 <p style={{ marginTop: "10px" }}>
//                     Selected: Lat {coords.lat}, Lng {coords.lng}
//                 </p>
//             )}
//         </div>
//     );
// }
import React from 'react'

const MapPick = () => {
    return (
        <div>MapPick</div>
    )
}

export default MapPick