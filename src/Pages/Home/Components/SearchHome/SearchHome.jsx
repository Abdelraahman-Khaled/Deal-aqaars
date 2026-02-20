import React from 'react'
import { Link } from 'react-router-dom';
import MenuArrow from '../../../../assets/Icons/MenuArrow';
import ContainerMedia from '../../../../Components/ContainerMedia/ContainerMedia';
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import TabsContent from '../../../../Components/Ui/TabsContent/TabsContent';
import "./SearchHome.css"

const cityMapping = {
    "العبور": "Obour",
    "مدينة بدر": "Badr",
    "النزهة": "El Nozha",
    "العاصمة الإدارية": "New Capital",
    "الشيخ زايد": "Sheikh Zayed",
    "السادس من أكتوبر": "6th of October",
    "الزمالك": "Zamalek",
    "التجمع الأول": "First Settlement",
    "مصر الجديدة": "Heliopolis",
    "القاهرة الجديدة": "New Cairo",
    "الشروق": "Shorouk",
    "مدينة نصر": "Nasr City",
    "المعادي": "Maadi",
    "الرحاب": "Rehab",
    "6أكتوبر": "6th of October",
    "التجمع الخامس": "Fifth Settlement",
    "بالم هيلز": "Palm Hills",
    "ماونتن فيو": "Mountain View",
    "العاصمة الادارية": "New Capital",
    "أكتوبر الجديدة": "New October",
    "التوسعات الشمالية": "Northern Expansions",
    "المنصورة الجديدة": "New Mansoura",
    "سوهاج الجديدة": "New Sohag"
};

const SearchHome = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const getLink = (division, subCategory, item) => {
        const cityEn = item ? (cityMapping[item] || item) : "";
        const cityParam = cityEn ? `&city=${cityEn}` : "";
        const cityParamQuery = cityEn ? `?city=${cityEn}` : "";
        const divisionParam = `division=${division}`;

        if (subCategory === "apartments") {
            return `/realestate?${divisionParam}&type=سكني&typeDetails=شقة${cityParam}`;
        } else if (subCategory === "villas") {
            return `/realestate?${divisionParam}&type=سكني&typeDetails=فيلا منفصلة${cityParam}`;
        } else if (subCategory === "compounds") {
            // Assuming compounds page supports division param if needed, or just city
            // If division is rent, compounds might not be the best target unless they have rentals
            return `/compounds?${divisionParam}${cityParam}`;
        } else if (subCategory === "projects") {
            if (item === "بالم هيلز" || item === "ماونتن فيو") {
                return `/compounds?${divisionParam}`;
            }
            return `/compounds?${divisionParam}${cityParam}`;
        } else if (subCategory === "lands") {
            return `/land?${divisionParam}${cityParam}`;
        }

        return "#";
    };

    const renderLinks = (division, subCategory, title, items) => (
        <ul className='col-12 col-sm-6 col-md-4 col-lg-2 mb-3 flex-column'>
            <Link to={getLink(division, subCategory, null)}>
                <li className='b-5'>{title}</li>
            </Link>
            {items.map((item, index) => (
                <Link key={index} to={getLink(division, subCategory, item)}>
                    <li className='b-12'>{item}</li>
                </Link>
            ))}
        </ul>
    );

    const tabsDataBio = [
        {
            eventKey: "tab1",
            title: (
                <>
                    {currentLanguage === "ar" ? "للبيع" : "For Sale"}
                </>
            ),
            content: (
                <ContainerMedia>
                    <div className='row justify-content-between '>
                        {renderLinks("sale", "apartments", "شقق", ["العبور", "مدينة بدر", "النزهة", "العاصمة الإدارية", "الشيخ زايد"])}
                        {renderLinks("sale", "villas", "فيلات", ["السادس من أكتوبر", "الزمالك", "التجمع الأول", "مصر الجديدة", "القاهرة الجديدة"])}
                        {renderLinks("sale", "compounds", "كومباوندات", ["الشروق", "مدينة نصر", "المعادي", "الرحاب", "6أكتوبر"])}
                        {renderLinks("sale", "projects", "مشاريع", ["التجمع الخامس", "الشيخ زايد", "بالم هيلز", "ماونتن فيو", "العبور"])}
                        {renderLinks("sale", "lands", "اراضي", ["العاصمة الادارية", "أكتوبر الجديدة", "التوسعات الشمالية", "المنصورة الجديدة", "سوهاج الجديدة"])}
                    </div>
                </ContainerMedia>
            )
        },
        {
            eventKey: "tab2",
            title: (
                <>
                    {currentLanguage === "ar" ? "للايجار" : "For Rent"}
                </>
            ),
            content: (
                <ContainerMedia>
                    <div className='row justify-content-between '>
                        {renderLinks("rent", "apartments", "شقق", ["العبور", "مدينة بدر", "النزهة", "العاصمة الإدارية", "الشيخ زايد"])}
                        {renderLinks("rent", "villas", "فيلات", ["السادس من أكتوبر", "الزمالك", "التجمع الأول", "مصر الجديدة", "القاهرة الجديدة"])}
                        {renderLinks("rent", "compounds", "كومباوندات", ["الشروق", "مدينة نصر", "المعادي", "الرحاب", "6أكتوبر"])}
                        {renderLinks("rent", "projects", "مشاريع", ["التجمع الخامس", "الشيخ زايد", "بالم هيلز", "ماونتن فيو", "العبور"])}
                        {renderLinks("rent", "lands", "اراضي", ["العاصمة الادارية", "أكتوبر الجديدة", "التوسعات الشمالية", "المنصورة الجديدة", "سوهاج الجديدة"])}
                    </div>
                </ContainerMedia>
            )
        }
    ];
    return (

        <div className='search-home d-flex space-9 justify-content-center flex-column'>
            <div className='d-flex space-4 flex-column'>
                <h6 className='text-center'>الناس بتدور على إيه؟ هتلاقيه هنا!</h6>
                <TabsContent
                    tabsData={tabsDataBio}
                    newClassTabsContent={"tabs-home "} />
            </div>
            <Link className='see-more b-11 text-end' to="/realestate">
                {currentLanguage === "ar" ? "شوف اكتر" : "See More"}
                <span className='p-1'></span>
                <MenuArrow color={"#dfa027"} />
            </Link>

        </div>
    )
}

export default SearchHome