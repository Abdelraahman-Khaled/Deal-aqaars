import React, { useEffect, useState } from 'react'
import CompoundCard from '../CompoundCard/CompoundCard';
import CompoundSkeleton from '../CompoundCard/CompoundSkeleton';
import compoundImg from "../../../assets/images/compounds/compound.png";
import { Link } from 'react-router-dom';
import CompoundAPI from '../../../api/compoundApi';

const CompoundsAds = ({ city, currentCompoundId }) => {
    const [compounds, setCompounds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCompounds = async () => {
            if (!city) return;

            try {
                setLoading(true);
                const filters = { city };
                const response = await CompoundAPI.getAllCompounds(filters);

                let compoundsList = [];
                if (Array.isArray(response)) {
                    compoundsList = response;
                } else if (response.data && Array.isArray(response.data)) {
                    compoundsList = response.data;
                }

                // Filter out current compound if ID is provided
                const filtered = currentCompoundId
                    ? compoundsList.filter(c => c._id !== currentCompoundId && c.id !== currentCompoundId)
                    : compoundsList;

                setCompounds(filtered.slice(0, 3)); // Limit to 3 compounds
            } catch (error) {
                console.error("Error fetching related compounds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompounds();
    }, [city, currentCompoundId]);

    console.log(compounds);

    if (loading) {
        return (
            <>
                <p className='b-5'>كمبوندات في {city}</p>
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className='w-100 compund-ads'>
                        <CompoundSkeleton wrapperClass={"flex-wrap"} />
                    </div>
                ))}
            </>
        );
    }

    if (compounds.length === 0) {
        return null;
    }

    return (
        <>
            <p className='b-5'>كمبوندات في {city}</p>
            {compounds.map((compound, index) => (
                <div key={compound._id || index} className='w-100 compund-ads'>
                    <CompoundCard
                        id={compound._id}
                        title={compound.name}
                        location={compound.location?.detailedLocation}
                        details={compound.details?.ar || compound.details?.en}
                        price={compound.units?.[0]?.aqarDetails?.price}
                        img={compound.compoundImages && compound.compoundImages.length > 0 ? compound.compoundImages[0].url : compoundImg}
                        slider={true}
                        status={compound.status}
                        wrapperClass={"flex-wrap"}
                    />
                </div>
            ))}
            <Link to={"/compounds"} className='b-11' style={{ color: "var(--yellow-100)", cursor: "pointer" }}>المزيد من الاعلانات</Link>
        </>
    )
}

export default CompoundsAds