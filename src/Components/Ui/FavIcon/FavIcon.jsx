import React, { useState } from 'react'
import ActiveHeart from '../../../assets/Icons/ActiveHeart'
import AddToFavIcon from '../../../assets/Icons/AddToFavIcon'

const FavIcon = ({ isFav = false }) => {
    const [Fav, setFav] = useState(isFav);

    return (
        <div className="fav-icon" onClick={() => setFav(!Fav)}>
            {
                Fav ?
                    <span >
                        <ActiveHeart />
                    </span> :
                    <span >
                        <AddToFavIcon />
                    </span>
            }


        </div>
    )
}

export default FavIcon