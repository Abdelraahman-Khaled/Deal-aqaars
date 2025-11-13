import PropertyShowcase from './PropertyShowcase';

const PropertyShowcaseExample = ({ images, lat, lon , location }) => {
    // Sample property images - More images to demonstrate drag scroll and modal functionality
    const sampleImages = [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    ];

    const totalImageCount = 12;

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <PropertyShowcase
                    images={images.length > 1 ? images : sampleImages}
                    totalImages={totalImageCount}
                    lat={lat}
                    lon={lon}
                    location={location}
                />
            </div>


        </div>
    );
};

export default PropertyShowcaseExample;