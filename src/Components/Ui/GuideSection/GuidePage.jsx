import React, { useState, useEffect } from 'react'
import SearchToggle from '../SearchComponents/SearchToggle '
import { translations } from './translations';
import { useLanguage } from '../../../Components/Languages/LanguageContext';
import DropDown from '../../DropDown/DropDown';
import CompoundCard from '../CompoundCard/CompoundCard';
import Ads from '../../Auth/Ads/Ads';
import PropertyAPI from '../../../api/propertyApi';
import "./Guide.css"
// images
import compoundImg from "../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../assets/images/compounds/compound2.png";
import RealStateCard from '../RealStateCard/RealStateCard';
import HouseLoader from '../../Loader/HouseLoader';



const GuidePage = ({ title, compound = true }) => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const [toggle, setToggle] = useState("inprogress");
    const [toggle1, setToggle1] = useState("nest");
    const [rotate, setRotate] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const progressTabs = [
        { value: "inprogress", label: translations[currentLanguage].inProgress },
        { value: "ready", label: translations[currentLanguage].ready },
        { value: "all", label: translations[currentLanguage].received },
    ];
    const ShowType = [
        { value: "nest", label: translations[currentLanguage].nest },
        { value: "list", label: translations[currentLanguage].list },
    ];
    const organizing = [
        "الاكثر مشاهدة", "الاجدد", "الاقل سعر", "اعلي سعر"
    ];

    // Fetch properties from API
    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await PropertyAPI.getAllProperties();
            if (response && response.data) {
                setProperties(response.data);
                console.log(response.data);

                setPagination(response.pagination);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    // Format location from coordinates
    const formatLocation = (location) => {
        if (location && location.coordinates && location.coordinates.length === 2) {
            return {
                lat: location.coordinates[1], // latitude
                lon: location.coordinates[0]  // longitude
            };
        }
        return null;
    };

    // Format price
    const formatPrice = (price) => {
        return price ? price.toLocaleString() : '0';
    };

    useEffect(() => {
        if (!compound) {
            fetchProperties();
        }
    }, [compound]);

    // card Data
    const data = [
        {
            id: 1,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg,
        },
        {
            id: 2,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg1,
        },
        {
            id: 3,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين ، ...",
            price: "7,457,874",
            img: compoundImg2,
        },
    ];

    return (
        <div className=' guide compound d-flex flex-wrap  flex-md-row  justify-content-between'>

            <div className='d-flex space-6 flex-column col-12  col-lg-8 '>
                {
                    compound &&
                    <h6>{title}</h6>
                }
                <div className='d-flex flex-wrap space-3 justify-content-between align-items-center'>
                    {!compound &&
                        <h6>{title}</h6>
                    }
                    {compound &&
                        <div className='max-w-max mb-3 mb-md-0'>
                            <SearchToggle
                                toggleState={toggle}
                                setToggleState={setToggle}
                                tabs={progressTabs}
                                newClass={"select-progress p-1"}
                            />
                        </div>
                    }
                    <div className='d-flex space-3 flex-wrap'>
                        {/* Drop Down */}
                        <DropDown title={"رتبها زي ما تحب"} details={organizing} rotate={rotate} setRotate={setRotate} />
                        <div className='max-w-max mb-3 mb-md-0'>
                            <SearchToggle
                                toggleState={toggle1}
                                setToggleState={setToggle1}
                                tabs={ShowType}
                                newClass={"select-type p-1"}
                            />
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-wrap  flex-row justify-content-between'>
                    {compound && data.map((card, index) => (
                        <CompoundCard
                            key={index}
                            title={card.title}
                            location={card.location}
                            details={card.details}
                            price={card.price}
                            img={card.img}
                            company={true}
                            connections={true}
                            wrapperClass={toggle1 === "nest" ? "flex-wrap" : ""}
                        />
                    ))}
                    {!compound && loading && (
                        <div className="loading-container">
                            <p>{currentLanguage === 'ar' ? 'جاري تحميل العقارات...' : 'Loading properties...'}</p>
                            <HouseLoader size="large" />
                        </div>
                    )}
                    {!compound && !loading && properties.length === 0 && (
                        <div className="no-properties">
                            <p>{currentLanguage === 'ar' ? 'لا توجد عقارات متاحة' : 'No properties available'}</p>
                        </div>
                    )}
                    {!compound && !loading && properties.map((property, index) => {
                        const locationCoords = formatLocation(property.location);
                        return (
                            <RealStateCard
                                id={property._id}
                                key={property._id || index}
                                title={property.title ? property.title[currentLanguage] : 'Property'}
                                location={locationCoords}
                                details={property.description ? property.description[currentLanguage] : ''}
                                price={formatPrice(property.details?.price)}
                                img={property.images && property.images.length > 0 ? property.images : '/aqar01.jpg'}
                                company={true}
                                connections={true}
                                wrapperClass={toggle1 === "nest" ? "flex-wrap" : "width-full"}
                                rooms={property.details?.rooms || 0}
                                bath={property.details?.bathrooms || 0}
                                space={property.details?.space || 0}
                                offer={formatPrice(property.details?.price)}
                                type={property.type}
                                category={property.category}
                                advertiser={property.advertiser}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Ads */}
            <Ads />


        </div>
    )
}

export default GuidePage