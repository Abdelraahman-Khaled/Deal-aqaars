import React from 'react'
import ReadMoreText from '../ReadMore/ReadMoreText';
import { useLanguage } from '../../Languages/LanguageContext';

const AdsDescription = ({ title }) => {
    const { currentLanguage } = useLanguage()
    return (
        <div className='d-flex flex-column space-6'>
            <p className='b-5'>{currentLanguage === "ar" ? title || "وصف الاعلان" : "Description"}</p>
            <p className='b-4'>
                <ReadMoreText
                    text={"على بعد حوالي نصف ساعة من العاصمة الإدارية الجديدة، أقيمت قرية المونت جلالة العين السخنة لتكون أحد أهم معالم هضبة الجلالة والعين السخنة، فتصميمه الرائع على شكل مدرجات أعلى الجبل جعل وحداته كلها تطل على البحر بالإضافة الخدمات الترفيهية غير المسبوقة داخل المشروع."}
                    maxLength={200}
                />
            </p>
        </div>
    )
}

export default AdsDescription