import React, { useState } from 'react'
import YellowArrow from '../../../assets/Icons/YellowArrow'
import './SpaceBox.css'
import { Link, useParams } from 'react-router-dom'
import MenuArrow from '../../../assets/Icons/MenuArrow'

const SpaceBox = ({ data, realEstate = false }) => {
    const { id } = useParams()
    const [showAllUnits, setShowAllUnits] = useState({});

    data = data || []
    return (
        Object.entries(data)?.map(([aqarType, item], index) => (
            <div key={index} className='d-flex flex-column space-4 pb-4 ' style={{ width: realEstate ? "48%" : "100%" }}>
                <p className='b-9 '>{aqarType}</p>
                <div className='space-box space-6' style={{ maxHeight: showAllUnits[aqarType] ? '1000px' : '150px' }}>
                    {
                        (showAllUnits[aqarType] ? item : [item[0]])?.map((unit, i) => (
                            <div key={i} className='d-flex justify-content-between align-items-center space-2'>
                                <p className='b-12'>{unit?.aqarDetails?.space} متر مربع</p>
                                <Link to={`/compound-details/${id}/${unit?._id}`} className='d-flex align-items-center space-2'>
                                    <p className='b-12'>{unit?.aqarDetails?.price} ج.م</p>
                                    <YellowArrow color={'var(--netural-1000)'} />
                                </Link>
                            </div>
                        ))
                    }
                    {item.length > 3 && (
                        <Link to="#" className='w-100' style={{ color: 'var(--yellow-100)' }} onClick={() => setShowAllUnits(prev => ({ ...prev, [aqarType]: !prev[aqarType] }))}>
                            {showAllUnits[aqarType] ? 'شوف اقل' : 'شوف اكتر'}
                            <span className='px-2'><MenuArrow color={'var(--yellow-100)'} /></span>
                        </Link>
                    )}
                </div>
            </div>
        ))
    )
}

export default SpaceBox
