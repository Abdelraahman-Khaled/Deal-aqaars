import React from 'react'
import compoundImg from "../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../assets/images/compounds/compound2.png";
import RealStateCard from '../RealStateCard/RealStateCard';

const RealEstateAds = () => {

    const data = [
        {
            id: 1,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين.",
            price: "7,457,874",
            img: compoundImg,
        },
        {
            id: 2,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين .",
            price: "7,457,874",
            img: compoundImg1,
        },
        {
            id: 3,
            title: "IL Monte Galala - إل مونت جلاله",
            location: "العين السخنة - البحر الأحمر",
            details: "ستوديو ، ستوديو بحديقة ، شقه غرفتين .",
            price: "7,457,874",
            img: compoundImg2,
        },
    ];

    return (
        <>
            <p className='b-5'>كمبوندات في العين السخنه</p>
            {data.map((card, index) => (
                <div className='w-100 compund-ads'>
                    <RealStateCard
                        key={index}
                        title={card.title}
                        location={card.location}
                        details={card.details}
                        price={card.price}
                        img={card.img}
                        slider={true}
                        status="شغالين عليه"
                        wrapperClass={"flex-wrap"}
                        rooms={3}
                        bath={2}
                        space={130}
                        offer={"4500,00"}
                    />
                </div>
            ))}
            <p className='b-11' style={{ color: "var(--yellow-100)", cursor: "pointer" }}>المزيد من الاعلانات</p>
        </>
    )
}

export default RealEstateAds