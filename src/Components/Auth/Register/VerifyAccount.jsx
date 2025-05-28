import React from 'react'
import Verify from "../../../assets/images/RegisterSwpier/verifyemail.png"
import { Link } from "react-router-dom"
import "./Register.css"
import Gmail from '../../../assets/Icons/Gmail'
import { useLanguage } from '../../Languages/LanguageContext'
import HelmetInfo from '../../Helmetinfo/HelmetInfo'

const content = {
    title: {
        ar: "بعتنالك إيميل عشان تأكد حسابك",
        en: "We sent you an email to verify your account",
    },
    subTitle: {
        ar: "روح لصندوق البريد وافتح الرسالة، وفعل حسابك عشان تكمل التسجيل وتدخل ديل",
        en: "Go to your mailbox, open the message, and activate your account to complete the registration and enter the details",
    },
    goToMail: {
        ar: "روح للإيميل دلوقتي",
        en: "Go to Mail"
    },
    revice: {
        ar: "موصلكش الإيميل؟",
        en: "Did you not receive the email?"
    },
    resend: {
        ar: "نبعته تاني",
        en: "Send again"
    },
}
const VerifyAccount = () => {
    const { currentLanguage } = useLanguage()
    return (
        <div className=' verify d-flex flex-column justify-content-center align-items-right space-7'>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "تأكيد الاكونت" : "Verify Account"} />

            <div className='d-flex justify-content-center'>
                <img loading="lazy" src={Verify} alt="VerifyImg" />
            </div>
            <div className='d-flex flex-column space-4'>
                <h6>
                    {content.title[currentLanguage]}
                </h6>
                <p className='b-12'>
                    {content.subTitle[currentLanguage]}
                </p>
            </div>
            <Link to={"https://mail.google.com/mail/u/0/#inbox"} className="btn-main btn-second  w-100  b-11  " style={{ border: "1px solid var(--primary)" }}>
                <Gmail />
                <p>
                    {content.goToMail[currentLanguage]}
                </p>
            </Link>
            <p className='b-12'>
                {content.revice[currentLanguage]}
                <Link className='px-1 text-decoration-underline b-11' to={"#"}>
                    {content.resend[currentLanguage]}
                </Link>
            </p>
        </div>
    )
}

export default VerifyAccount