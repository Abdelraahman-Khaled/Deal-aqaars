import React from 'react'
import ReadMoreText from '../ReadMore/ReadMoreText';
import { useLanguage } from '../../Languages/LanguageContext';

const AdsDescription = ({ title, description }) => {
    return (
        <div className='d-flex flex-column space-6'>
            <p className='b-5'>{title}</p>
            <p className='b-4'>
                <ReadMoreText
                    text={description}
                    maxLength={200}
                />
            </p>
        </div>
    )
}

export default AdsDescription