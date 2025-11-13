import React, { useState, useEffect } from 'react';
import LocationIcon from '../../../assets/Icons/LocationIcon';
import { useLanguage } from '../../Languages/LanguageContext';

const LocationDisplay = ({ lat, lon, showIcon = true, className = '' }) => {
    const { currentLanguage } = useLanguage();
    const [locationName, setLocationName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Remove debug console log
    // Check if coordinates are valid
    const hasValidCoordinates = lat !== undefined && lon !== undefined && !isNaN(lat) && !isNaN(lon);

    // Function to get location name from coordinates using reverse geocoding
    const getLocationName = async (latitude, longitude) => {
        try {
            setLoading(true);
            setError('');

            // Using OpenStreetMap Nominatim API for reverse geocoding (free)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lon=${longitude}&lat=${latitude}&accept-language=${currentLanguage}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch location');
            }

            const data = await response.json();

            if (data && data.display_name) {
                // Extract relevant parts of the address
                const addressParts = [];

                if (data.address) {
                    const { city, town, village, state, country, suburb, neighbourhood } = data.address;

                    // Add city/town/village
                    if (city) addressParts.push(city);
                    else if (town) addressParts.push(town);
                    else if (village) addressParts.push(village);

                    // Add suburb or neighbourhood if available
                    if (suburb) addressParts.push(suburb);
                    else if (neighbourhood) addressParts.push(neighbourhood);

                    // Add state/country
                    if (state) addressParts.push(state);
                    if (country) addressParts.push(country);
                }

                const formattedLocation = addressParts.length > 0
                    ? addressParts.slice(0, 3).join(', ') // Limit to 3 parts
                    : data.display_name.split(',').slice(0, 3).join(', ');

                setLocationName(formattedLocation);
            } else {
                setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
        } catch (err) {
            console.error('Error fetching location:', err);
            setError('Unable to load location');
            // Fallback to coordinates
            setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasValidCoordinates) {
            getLocationName(lat, lon);
        } else {
            setLocationName(currentLanguage === 'ar' ? 'موقع غير محدد' : 'Location not specified');
        }
    }, [lat, lon, currentLanguage, hasValidCoordinates]);

    const handleLocationClick = () => {
        if (hasValidCoordinates) {
            // Open location in Google Maps
            const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
            window.open(mapsUrl, '_blank');
        }
    };

    if (!hasValidCoordinates) {
        return (
            <div className={`location-display ${className}`} dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} >
                {showIcon && <LocationIcon />}
                <span className="location-text" style={{ color: "var(--primary)" }}>
                    {currentLanguage === 'ar' ? 'موقع غير محدد' : 'Location not specified'}
                </span>
            </div>
        );
    }

    const getDisplayClasses = () => {
        let classes = `location-display ${className}`;
        if (hasValidCoordinates) classes += ' clickable';
        if (loading) classes += ' loading';
        if (error) classes += ' error';
        return classes;
    };

    return (
        <div
            className={getDisplayClasses()}
            dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
            onClick={handleLocationClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLocationClick();
                }
            }}
            tabIndex={hasValidCoordinates ? 0 : -1}
            role={hasValidCoordinates ? 'button' : undefined}
            title={currentLanguage === 'ar' ? 'انقر لفتح في خرائط جوجل' : 'Click to open in Google Maps'}
        >
            {showIcon && <LocationIcon />}
            <span className="location-text" style={{ color: "var(--primary)" }}>
                {loading ? (
                    currentLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...'
                ) : error ? (
                    currentLanguage === 'ar' ? 'خطأ في تحميل الموقع' : 'Error loading location'
                ) : (
                    locationName || `${lat.toFixed(4)}, ${lon.toFixed(4)}`
                )}
            </span>
            {hasValidCoordinates && !loading && (
                <span className="coordinates" title={`${lat}, ${lon}`}>
                </span>
            )}
        </div>
    );
};

export default LocationDisplay;