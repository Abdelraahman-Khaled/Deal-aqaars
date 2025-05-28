import React from 'react'
import "./HomePoster.css"
import poster from "../../../../assets/images/posters/homePoster.png"
import { Link } from 'react-router-dom'
const   HomePoster = () => {
    return (
        <div className='home-poster'>
            <Link to="#">
                <img className='w-100 h-100' src={poster} alt="poster" />
            </Link>
        </div>
    )
}

export default HomePoster