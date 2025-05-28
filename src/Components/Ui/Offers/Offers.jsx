import React from 'react'
import OfferCard from './OfferCard'

const Offers = ({ title, offers }) => {
    return (
        <div className='d-flex flex-column space-4'>

            <p className="b-9">
                {title}
            </p>
            <div className='d-flex flex-wrap space-4 '>
                {
                    offers.map((offer, index) => (
                        <OfferCard key={index} offer={offer} />
                    ))
                }
            </div>
        </div>
    )
}

export default Offers