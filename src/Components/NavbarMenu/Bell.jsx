import React, { useState } from 'react';
import BellIcon from '../../assets/Icons/BellIcon';
import { Dropdown } from "react-bootstrap";
import CustomModal from '../CustomModal/CustomModal';
import { Link } from 'react-router-dom';
import { useLanguage } from '../Languages/LanguageContext';

const Bell = () => {
    const [showModal, setShowModal] = useState(false);
    const { currentLanguage } = useLanguage()

    const content = {
        ar: {
            notifications: [
                {
                    title: "📢 عقارات جديدة متاحة!",
                    time: "من دقيقتين",
                    message: "لسه نازلين عقارات جديدة، الحق شوف التفاصيل قبل ما تخلص! 🏡🔥"
                },
                {
                    title: "🏠 عقار جديد ممكن يعجبك!",
                    time: "من دقيقتين",
                    message: "في عقار متاح بمواصفات قريبة من اللي بتدور عليه، ادخل شوفه دلوقتي!"
                },
                {
                    title: "⏳ طلبك تحت المراجعة",
                    time: "من دقيقتين",
                    message: "طلبك بيتم مراجعته وهنتواصل معاك أول ما في جديد! 📩"
                },
                {
                    title: "🚀 طلبك اتقبل!",
                    time: "من دقيقتين",
                    message: "طلبك دلوقتي مقبول، ادخل شوف التفاصيل وابدا الخطوة الجاية!"
                },
                {
                    title: "❌ طلبك مرفوض",
                    time: "من دقيقتين",
                    message: "للأسف طلبك مرفوض، ممكن تراجع التفاصيل أو تحاول تاني بعرض جديد!"
                }
            ],
            viewAll: "شوف التنبيهات كلها"
        },
        en: {
            notifications: [
                {
                    title: "📢 New properties available!",
                    time: "2 minutes ago",
                    message: "Fresh properties just listed — check them out before they’re gone! 🏡🔥"
                },
                {
                    title: "🏠 A property you might like!",
                    time: "2 minutes ago",
                    message: "A property matching your preferences is available. Take a look now!"
                },
                {
                    title: "⏳ Your request is under review",
                    time: "2 minutes ago",
                    message: "Your request is being reviewed. We’ll contact you with updates! 📩"
                },
                {
                    title: "🚀 Your request is accepted!",
                    time: "2 minutes ago",
                    message: "Your request has been accepted! Check the details and take the next step."
                },
                {
                    title: "❌ Your request was rejected",
                    time: "2 minutes ago",
                    message: "Unfortunately, your request was rejected. Review it or try again with a new offer!"
                }
            ],
            viewAll: "View All Notifications"
        }
    };

    const langContent = content[currentLanguage] || content.ar; // fallback to Arabic if undefined

    return (
        <>
            <Dropdown className="b-12">
                <Dropdown.Toggle id="dropdown-basic" className="drop-lang" onClick={() => setShowModal(true)}>
                    <div className="relative lang bg-light-gray cursor-pointer-1 d-flex align-items-center gap-1 flex-row-reverse">
                        <BellIcon />
                    </div>
                </Dropdown.Toggle>
            </Dropdown>

            <CustomModal
                showModal={showModal}
                onHide={() => setShowModal(false)}
                setShowModal={setShowModal}
                title={currentLanguage === "ar" ? "التنبيهات" : "Alerts"}
            >
                {langContent.notifications.map((notif, index) => (
                    <div key={index} className='d-flex flex-column space-3'>
                        <div className='d-flex justify-content-between'>
                            <p className='b-9'>{notif.title}</p>
                            <span className='b-16'>{notif.time}</span>
                        </div>
                        <p className='b-12'>{notif.message}</p>
                    </div>
                ))}

                <Link to="/notifications" className='btn-main btn-second text-center' onClick={() => setShowModal(false)}>
                    {langContent.viewAll}
                </Link>
            </CustomModal>
        </>
    );
};

export default Bell;
