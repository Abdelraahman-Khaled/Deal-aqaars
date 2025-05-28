import React from 'react'
import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia';
import { useLanguage } from '../../Components/Languages/LanguageContext';
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo';

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
const Notifications = () => {

    const { currentLanguage } = useLanguage();
    const langContent = content[currentLanguage] || content.ar; // fallback to Arabic if undefined

    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "الاشعارات" : "Notifications"} />
            <ContainerMedia>
                <div className='py-4 my-4 d-flex flex-column  align-items-center'>
                    <div className='p-4 border-account-user mx-4 lg-w-50'>
                        <p className="b-5 d-flex flex-row align-items-center justify-content-between space-6 pb-2 border-gray mb-4">
                            التنبيهات
                        </p>
                        <div className='d-flex flex-column space-6'>
                            {langContent.notifications.map((notif, index) => (
                                <div key={index} className='d-flex flex-column space-3'>
                                    <div className='d-flex justify-content-between'>
                                        <p className='b-9'>{notif.title}</p>
                                        <span className='b-16 text-gray'>{notif.time}</span>
                                    </div>
                                    <p className='b-12 text-gray'>{notif.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContainerMedia>
        </>
    )
}

export default Notifications