import React from 'react'
import YellowArrow from '../../../assets/Icons/YellowArrow'
import './SpaceBox.css'
import { Link } from 'react-router-dom'
import MenuArrow from '../../../assets/Icons/MenuArrow'

const SpaceBox = ({ data, realEstate = false }) => {
    return (
        data?.map((item, index) => (
            <div key={index} className='d-flex flex-column space-4 pb-4' style={{ width: realEstate ? "48%" : "100%" }}>
                <p className='b-9 '>{item.title}</p>
                <div className='space-box space-6'>
                    {
                        item?.spaces.map((space, i) => (
                            <div key={i} className='d-flex justify-content-between align-items-center space-2'>
                                <p className='b-12'>{space} متر مربع</p>
                                <Link to={"#"} className='d-flex align-items-center space-2'>
                                    <p className='b-12'>{item.prices[i]} ج.م</p>
                                    <YellowArrow color={'var(--netural-1000)'} />
                                </Link>
                            </div>
                        ))
                    }
                    <Link to={'#'} className='w-100' style={{ color: 'var(--yellow-100)' }}>
                        شوف اكتر
                        <span className='px-2'><MenuArrow color={'var(--yellow-100)'} /></span>
                    </Link>
                </div>
            </div>
        ))
    )
}

export default SpaceBox
