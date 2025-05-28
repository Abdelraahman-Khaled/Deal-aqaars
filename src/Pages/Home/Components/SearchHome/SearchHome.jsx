import React from 'react'
import { Link } from 'react-router-dom';
import MenuArrow from '../../../../assets/Icons/MenuArrow';
import ContainerMedia from '../../../../Components/ContainerMedia/ContainerMedia';
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import "./SearchHome.css"
const SearchHome = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const tabsDataBio = [
        {
            eventKey: "tab1",
            title: (
                <>
                    {currentLanguage === "ar" ? "عقارات" : "Real estate"}
                </>
            ),
            content: (
                <ContainerMedia>
                    <div className='row justify-content-between '>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>شقق</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العبور</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مدينة بدر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>النزهة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العاصمة الإدارية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشيخ زايد</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>فيلات</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>السادس من أكتوبر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الزمالك</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التجمع الأول</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مصر الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>القاهرة الجديدة</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>كومباوندات</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشروق</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مدينة نصر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>المعادي</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الرحاب</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>6أكتوبر</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>مشاريع</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التجمع الخامس</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشيخ زايد</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>بالم هيلز</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>ماونتن فيو</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العبور</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>اراضي</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العاصمة الادارية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>أكتوبر الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التوسعات الشمالية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>المنصورة الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>سوهاج الجديدة</li>
                            </Link>
                        </ul>
                    </div>
                </ContainerMedia>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <>
                    {currentLanguage === "ar" ? "تشطيبات" : "Finishing"}
                </>
            ),
            content: (
                <ContainerMedia>
                    <div className='row justify-content-between '>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>شقق</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العبور</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مدينة بدر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>النزهة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العاصمة الإدارية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشيخ زايد</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>فيلات</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>السادس من أكتوبر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الزمالك</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التجمع الأول</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مصر الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>القاهرة الجديدة</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>كومباوندات</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشروق</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>مدينة نصر</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>المعادي</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الرحاب</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>6أكتوبر</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>مشاريع</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التجمع الخامس</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>الشيخ زايد</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>بالم هيلز</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>ماونتن فيو</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العبور</li>
                            </Link>
                        </ul>
                        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
                            <Link to="#">
                                <li className='b-5'>اراضي</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>العاصمة الادارية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>أكتوبر الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>التوسعات الشمالية</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>المنصورة الجديدة</li>
                            </Link>
                            <Link to="#">
                                <li className='b-12'>سوهاج الجديدة</li>
                            </Link>
                        </ul>
                    </div>
                </ContainerMedia>
            )
        }
    ];
    return (

        <div className='search-home d-flex space-9 justify-content-center flex-column'>
            <div className='d-flex space-4 flex-column'>
                <h5 className='text-center'>الناس بتدور على إيه؟ هتلاقيه هنا!</h5>
                <TabsContent
                    tabsData={tabsDataBio}
                    newClassTabsContent={"tabs-home "} />
            </div>
            <Link className='see-more b-11 text-end' to="#">
                {currentLanguage === "ar" ? "شوف اكتر" : "See More"}
                <span className='p-1'></span>
                <MenuArrow color={"#dfa027"} />
            </Link>

        </div>
    )
}

export default SearchHome