import React from 'react'
import CompoundCard from '../CompoundCard/CompoundCard';
import compoundImg from "../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../assets/images/compounds/compound2.png";
import { Link } from 'react-router-dom';

const CompoundsAds = () => {

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
                    <CompoundCard
                        key={index}
                        title={card.title}
                        location={card.location}
                        details={card.details}
                        price={card.price}
                        img={card.img}
                        slider={true}
                        status="شغالين عليه"
                        wrapperClass={"flex-wrap"}
                    />
                </div>
            ))}
            <Link to={"/compounds"} className='b-11' style={{ color: "var(--yellow-100)", cursor: "pointer" }}>المزيد من الاعلانات</Link>
        </>
    )
}

export default CompoundsAds