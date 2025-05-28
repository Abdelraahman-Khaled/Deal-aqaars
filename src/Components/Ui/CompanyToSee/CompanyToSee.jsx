import React from 'react'
import YellowArrow from '../../../assets/Icons/YellowArrow'
import './CompanyTosee.css'
import { Link } from 'react-router-dom'

const CompanyToSee = ({ data }) => {
    return (
        data?.map((item, index) => (
            <div key={index} className='d-flex flex-column space-4 pb-4'>
                <Link to={"#"} className='companies-box space-6 b-12'>
                    {
                        item?.companies.map((company, i) => (
                            <div key={i} className='d-flex justify-content-between align-items-center space-2'>
                                <p className='b-12'>{company} </p>
                                <div className='d-flex align-items-center'>
                                    <YellowArrow color={'var(--netural-1000)'} />
                                </div>
                            </div>
                        ))
                    }
                </Link>
            </div >
        ))
    )
}

export default CompanyToSee
