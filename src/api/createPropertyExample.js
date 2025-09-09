// Example usage of the createProperty API with the specified body format
import PropertyAPI from './propertyApi';

// Example function to create a property with the exact format requested
export const createPropertyExample = async (imageFiles = []) => {
  const propertyData = {
    type: 'apartment',
    details: {
      propertyType: 'residential',
      space: 120,
      view: 'sea',
      price: 6000,
      paymentMethods: ['cash'],
      rooms: 3,
      floor: 2,
      bathrooms: 2,
      handoverDate: '2025-12-01',
      finishing: 'superLux'
    },
    category: 'rent',
    title: {
      en: 'Modern Apartment',
      ar: 'شقة حديثة'
    },
    description: {
      en: 'Great location',
      ar: 'حقا موقع رائع'
    },
    location: {
      type: 'Point',
      coordinates: [31.2001, 29.9187]
    },
    advertiser: {
      phone: '+201234567890',
      whatsapp: false
    },
    images: imageFiles // Array of File objects
  };

  try {
    const result = await PropertyAPI.createProperty(propertyData);
    console.log('Property created successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to create property:', error);
    throw error;
  }
};

// Example of how to use it in a React component
export const useCreateProperty = () => {
  const handleCreateProperty = async (formData, selectedImages) => {
    const propertyData = {
      type: formData.type || 'apartment',
      details: {
        propertyType: formData.propertyType || 'residential',
        space: formData.space,
        view: formData.view,
        price: formData.price,
        paymentMethods: formData.paymentMethods || [],
        rooms: formData.rooms,
        floor: formData.floor,
        bathrooms: formData.bathrooms,
        handoverDate: formData.handoverDate,
        finishing: formData.finishing
      },
      category: formData.category,
      title: {
        en: formData.titleEn,
        ar: formData.titleAr
      },
      description: {
        en: formData.descriptionEn,
        ar: formData.descriptionAr
      },
      location: {
        type: 'Point',
        coordinates: [formData.longitude, formData.latitude]
      },
      advertiser: {
        phone: formData.phone,
        whatsapp: formData.whatsapp || false
      },
      images: selectedImages
    };

    return await PropertyAPI.createProperty(propertyData);
  };

  return { handleCreateProperty };
};