import React, { useState } from 'react'
import "./places.css"

const Places = () => {
    const govenrments = [
        { name: "القاهرة", number: "29,130" },
        { name: "الجيزة", number: "29,130" },
        { name: "اسكندرية", number: "29,130" },
        { name: "مطروح", number: "29,130" },
        { name: "العلمين", number: "29,130" },
        { name: "القاهرة", number: "29,130" },
        { name: "الجيزة", number: "29,130" },
        { name: "اسكندرية", number: "29,130" },
        { name: "مطروح", number: "29,130" },
        { name: "العلمين", number: "29,130" },
        { name: "القاهرة", number: "29,130" },
        { name: "الجيزة", number: "29,130" },
        { name: "اسكندرية", number: "29,130" },
        { name: "مطروح", number: "29,130" },
        { name: "الجيزة", number: "29,130" },
        { name: "العلمين", number: "29,130" },
        { name: "الجيزة", number: "29,130" },
        { name: "مطروح", number: "29,130" },
    ]

    const [showAll, setShowAll] = useState(false)
    const displayedItems = showAll ? govenrments : govenrments.slice(0, 5)

    return (
        <div className='places py-4'>
            <ul className={`transition-container space-4 ${showAll ? 'expanded' : ''}`}>
                {displayedItems.map((item, index) => (
                    <li key={index} className='b-12 space-1 '>
                        <span>{item.name}</span> ({item.number})
                    </li>
                ))}

                {
                    showAll ?
                        <div className='w-100 d-flex justify-content-end mt-4'>
                            <button className='btn-main btn-second' onClick={() => setShowAll(!showAll)}>شوف اماكن اقل</button>
                        </div> :
                        <button className='btn-main btn-second' onClick={() => setShowAll(!showAll)}>شوف اماكن اكتر</button>
                }
            </ul>
        </div>
    )
}

export default Places
