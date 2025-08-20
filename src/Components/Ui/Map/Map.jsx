import React, { useState } from 'react'
import "./Map.css"
import LocationIcon from '../../../assets/Icons/LocationIcon';
import YellowArrow from '../../../assets/Icons/YellowArrow';
const Map = ({ showOverlay: initialShowOverlay = true }) => {
    const [showOverlay, setShowOverlay] = useState(initialShowOverlay);

    return (
        <div className='d-flex flex-column space-6'>
            {
                showOverlay &&
                <p className='b-5'>الموقع</p>
            }
            <div style={{ position: 'relative', height: showOverlay ? '250px' : "400px" }}>
                <div className={`white-overlay ${showOverlay && " opacity-100"}`} onClick={() => setShowOverlay(false)}>
                    <p className='b-11' dir='ltr'>
                        IL Monte Galala - إل مونت جلاله
                        <span className='px-2'>
                            <LocationIcon />
                        </span>
                    </p>
                    <p className='b-11 d-flex flex-row space-4 align-items-center' style={{ color: 'var(--primary)' }}>
                        شوفوا علي الخريطه
                        <YellowArrow color={'var(--primary)'} />
                    </p>

                </div>

                <iframe
                    style={{
                        height: '100%',
                        width: '100%',
                        border: 0,
                        borderRadius: '8px',
                        position: 'relative',
                    }}
                    className="iframe-map"
                    frameBorder={0}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.345874822466!2d31.18052478123479!3d30.05953976020076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1748447209591!5m2!1sen!2seg" allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

        </div >
    )
}

export default Map

