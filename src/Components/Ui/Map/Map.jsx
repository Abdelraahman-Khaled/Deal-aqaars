import React, { useState } from 'react'
import "./Map.css"
import LocationIcon from '../../../assets/Icons/LocationIcon';
import YellowArrow from '../../../assets/Icons/YellowArrow';
const Map = ({ showOverlay: initialShowOverlay = true, lat, lon, locationName = "موقع العقار" }) => {
    const [showOverlay, setShowOverlay] = useState(initialShowOverlay);
    
    // Default coordinates (Cairo) if no lat/lon provided
    const defaultLat = 30.0444;
    const defaultLon = 31.2357;
    
    // Use provided coordinates or defaults
    const latitude = lat || defaultLat;
    const longitude = lon || defaultLon;
    
    // Generate dynamic Google Maps embed URL
const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

    return (
        <div className='d-flex flex-column space-6'>
            {
                showOverlay &&
                <p className='b-5'>الموقع</p>
            }
            <div style={{ position: 'relative', height: showOverlay ? '250px' : "400px" }}>
                <div className={`white-overlay z-n1 ${showOverlay && " opacity-100 z-3" }`} onClick={() => setShowOverlay(false)}>
                    <p className='b-11' dir='ltr'>
                        {locationName}
                        <span className='px-2'>
                            <LocationIcon />
                        </span>
                    </p>
                    <p className='b-11 d-flex flex-row space-4 align-items-center' style={{ color: 'var(--primary)' }}>
                        شوفوا علي الخريطه
                        <YellowArrow color={'var(--primary)'} />
                    </p>
                    {lat && lon && (
                        <p className='b-12' style={{ fontSize: '12px', opacity: 0.8 }}>
                            {latitude.toFixed(6)}, {longitude.toFixed(6)}
                        </p>
                    )}
                </div>

                <iframe
                    style={{
                        height: '100%',
                        width: '100%',
                        border: 0,
                        borderRadius: '8px',
                        position: 'relative',
                        cursor: showOverlay ? 'pointer' : 'default'
                    }}
                    className="iframe-map"
                    frameBorder={0}
                    src={mapUrl}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`خريطة موقع ${locationName}`}
                />
            </div>

        </div >
    )
}

export default Map

