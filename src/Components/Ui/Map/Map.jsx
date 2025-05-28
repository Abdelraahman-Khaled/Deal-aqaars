import React, { useState } from 'react'
import "./Map.css"
import LocationIcon from '../../../assets/Icons/LocationIcon';
import YellowArrow from '../../../assets/Icons/YellowArrow';
const Map = () => {
    const [showOverlay, setShowOverlay] = useState(true);

    return (
        <div className='d-flex flex-column space-6'>
            <p className='b-5'>الموقع</p>
            <div style={{ position: 'relative', height: '250px' }}>
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2223493.47904912!2d46.17788591953957!3d23.754085971515458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2seg!4v1737953063927!5m2!1sen!2seg"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

        </div>
    )
}

export default Map