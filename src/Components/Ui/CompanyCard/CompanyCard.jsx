import React from 'react'
import { Link } from 'react-router-dom'
import WhatsIcon from '../../../assets/Icons/WhatsIcon'
import CallIcon from '../../../assets/Icons/CallIcon'
import "./CompanyCard.css"

const CompanyCard = ({ name, since, numberProjects, inhouse, notFinished, underDevelopment }) => {
    return (
        <div className='company-card'>
            <Link to="/sale" className='pt-3 d-flex flex-column space-2 w-100'>
                <div className='d-flex flex-row space-1 align-items-center'>
                    <div className='logo'>
                        <img src="/Logo icon.png" alt="company" className='company' />
                    </div>
                    <div className='d-flex flex-column gap-2 text '>
                        <p className="b-5">{name}</p>
                        <p className='b-12'>من {since}، {numberProjects} مشاريع</p>
                    </div>
                </div>
                <div className='d-flex flex-wrap space-3 text-right justify-content-center align-items-center mb-3'>
                    <ul className='m-0 p-0'>
                        <li className='b-16'>{inhouse}</li>
                        <li className='b-16'>ساكنين خلاص</li>
                    </ul>
                    <ul className='m-0 p-0'>
                        <li className='b-16'>{notFinished}</li>
                        <li className='b-16'>متسلمش لسه</li>
                    </ul>
                    <ul className='m-0 p-0'>
                        <li className='b-16'>{underDevelopment}</li>
                        <li className='b-16'>تحت التطوير</li>
                    </ul>
                </div>
            </Link>

            <div className='connections d-flex flex-column flex-sm-row justify-content-between w-100 pt-4 gap-2 pb-2'>
                <Link className='whats-button w-100 b-11 d-flex gap-2 justify-content-center align-items-center'>
                    <WhatsIcon />
                    واتساب
                </Link>
                <Link className='facebook-button w-100 b-11 d-flex gap-2 justify-content-center align-items-center'>
                    <CallIcon />
                    اتصل
                </Link>
            </div>
        </div>

    )
}

export default CompanyCard