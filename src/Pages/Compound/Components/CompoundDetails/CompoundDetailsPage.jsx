import React from 'react'
import HelmetInfo from '../../../../Components/Helmetinfo/HelmetInfo'
import BreadcrumbsPage from '../../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import ImageSlider from '../../../../Components/Ui/ImageSlider/ImageSlider';
import ContainerMedia from '../../../../Components/ContainerMedia/ContainerMedia';
import DescriptionGuide from '../../../../Components/Ui/DescriptionGuide/DescriptionGuide';
import CompoundTaps from './CompoundTaps';
import AdsDescription from '../../../../Components/Ui/AdsDescription/AdsDescription';
import Map from '../../../../Components/Ui/Map/Map';
import CompanyToSee from '../../../../Components/Ui/CompanyToSee/CompanyToSee';
import CompanyCard from '../../../../Components/Ui/CompanyCard/CompanyCard';
import CompoundsAds from '../../../../Components/Ui/CompoundsAds/CompoundsAds';

const CompoundDetailsPage = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    const OPTIONS = {}
    const SLIDES = [
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
        "/img02.jpg",
        "/img03.jpg",
        "/img04.jpg",
    ];

    const data = [
        {
            companies: ["عقارات مصر", "مشاريع جديدة", "كمباوندات العين السخنة"],
        },

    ];



    return (
        <>
            <HelmetInfo titlePage={currentLanguage === "ar" ? "دليل الكومباوندات" : "Compounds Guide"} />
            <div className="py-4">
                <ContainerMedia >
                    <header className='pb-4'>
                        <BreadcrumbsPage
                            newClassBreadHeader={"biography-bread breadcrumb-page-2"}
                            mainTitle={"دليل الكومباوندات"}
                            mainRoute={"/compounds"}
                            routeTitleTwoBread={false}
                            titleTwoBread={false}
                            textBreadActive={"IL Monte Galala - إل مونت جلاله"}
                        />
                    </header>
                    <main>
                        <ImageSlider slides={SLIDES} options={OPTIONS} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={"IL Monte Galala - إل مونت جلاله"}
                                    location={"العين السخنة - البحر الأحمر"}
                                    price={"7,457,874"}
                                />
                                <CompoundTaps />
                                <AdsDescription />
                                <Map 
                                    lat={29.6000} 
                                    lon={32.3500} 
                                    locationName={"IL Monte Galala - إل مونت جلاله"} 
                                />
                                <CompanyToSee data={data} />
                            </div>
                            <div className="col-12 col-xl-3 d-flex flex-column space-6">
                                <CompanyCard
                                    name={"تطوير مصر للتطوير العقاري"}
                                    since={"2014"}
                                    numberProjects={"8"}
                                    inhouse={"2"}
                                    notFinished={"1"}
                                    underDevelopment={"2"}
                                />
                                <CompoundsAds />
                            </div>
                        </div>
                    </main>
                </ContainerMedia>
            </div>
        </>)
}

export default CompoundDetailsPage