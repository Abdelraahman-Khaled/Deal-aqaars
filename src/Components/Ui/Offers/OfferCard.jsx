import React from 'react'
import "./Offers.css"
import Electricity from '../../../assets/Icons/Electricity'

const OfferCard = ({ offer }) => {
    return (
        <div className='offer-card d-flex flex-column space-3 justify-content-center align-items-center'>
            <Electricity />
            <p className='b-12 d-flex min-w-max'>{offer}</p>
        </div>
    )
}

export default OfferCard