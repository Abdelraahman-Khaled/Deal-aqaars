import React from "react";
import CompoundCard from "../../../../Components/Ui/CompoundCard/CompoundCard";
import compoundImg from "../../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../../assets/images/compounds/compound2.png";
import Slidercontainer from "../../../../Components/Slider/Slidercontainer";

const CompoundSlider = () => {
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
        <Slidercontainer>
            {data.map((card, index) => (
                <CompoundCard
                    key={index}
                    title={card.title}
                    location={card.location}
                    details={card.details}
                    price={card.price}
                    img={card.img}
                    slider={true}
                    wrapperClass="flex-wrap"
                />
            ))}
        </Slidercontainer>
    );
};

export default CompoundSlider;
