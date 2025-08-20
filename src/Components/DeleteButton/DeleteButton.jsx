import React, { useState } from 'react'
import TrashIcon from '../../assets/Icons/TrashIcon'

const DeleteButton = ({ text, newClass, fun }) => {

    return (
        <>
            <button className={`b-11 delete-button ${newClass}`} >
                <TrashIcon />
                {text}
            </button>
        </>
    )
}

export default DeleteButton