import React from "react";
import compoundImg from "../../../../assets/images/compounds/compound.png";
import compoundImg1 from "../../../../assets/images/compounds/compound1.png";
import compoundImg2 from "../../../../assets/images/compounds/compound2.png";
import Slidercontainer from "../../../../Components/Slider/Slidercontainer";
import RealStateCard from "../../../../Components/Ui/RealStateCard/RealStateCard";

const RealStateSlider = () => {
    const data = [
        {
            id: 1,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "3,500,000",
            offer: "450,000",
            img: compoundImg,
        },
        {
            id: 2,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق...",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "5,484,000",
            offer: 0,
            img: compoundImg1,
        },
        {
            id: 3,
            rooms: 2,
            bath: 1,
            space: 95,
            details: "شقة للبيع في الشيخ زايد متشطبة بالكامل باقل مق...",
            location: "الجيزة - الشيخ زايد - روضة زايد",
            price: "10,874,000",
            offer: "750,000",
            img: compoundImg2,
        },
    ];

    return (
        <Slidercontainer>
            {data.map((card, index) => (
                <RealStateCard
                    key={index}
                    price={card.price}
                    rooms={card.rooms}
                    bath={card.bath}
                    space={card.space}
                    details={card.details}
                    location={card.location}
                    offer={card.offer}
                    img={card.img}
                    wrapperClass="flex-wrap"

                />
            ))}
        </Slidercontainer>
    );
};

export default RealStateSlider;
