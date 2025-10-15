import React, { useEffect } from 'react'
import HelmetInfo from '../../../../Components/Helmetinfo/HelmetInfo'
import BreadcrumbsPage from '../../../../Components/Ui/BreadcrumbsPage/BreadcrumbsPage'
import { useLanguage } from '../../../../Components/Languages/LanguageContext';
import ContainerMedia from '../../../../Components/ContainerMedia/ContainerMedia';
import DescriptionGuide from '../../../../Components/Ui/DescriptionGuide/DescriptionGuide';
import CompoundTaps from './CompoundTaps';
import AdsDescription from '../../../../Components/Ui/AdsDescription/AdsDescription';
import Map from '../../../../Components/Ui/Map/Map';
import CompanyToSee from '../../../../Components/Ui/CompanyToSee/CompanyToSee';
import CompanyCard from '../../../../Components/Ui/CompanyCard/CompanyCard';
import CompoundsAds from '../../../../Components/Ui/CompoundsAds/CompoundsAds';
import { useParams } from 'react-router-dom';
import { useCompound } from '../../../../contexts/CompoundContext';
import PropertyShowcaseExample from '../../../../Components/Ui/PropertyShowcase/PropertyShowcaseExample';
import Loader from '../../../../Components/Loader/Loader';

const CompoundDetailsPage = () => {
    const { currentLanguage } = useLanguage(); // Get the current language
    const { id } = useParams()
    const { compound, loading, error, fetchCompound, clearCompound } = useCompound();


    useEffect(() => {
        if (id) {
            fetchCompound(id);
        }
        return () => clearCompound(); // cleanup on unmount
    }, [id, fetchCompound, clearCompound]);

    console.log(compound);

 
    const data = [
        {
            companies: ["عقارات مصر", "مشاريع جديدة", "كمباوندات العين السخنة"],
        },

    ];

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center min-vh-100'>
                <Loader />
            </div>
        );
    }
    // Show error state
    if (error) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </ContainerMedia>
            </div>
        );
    }
    // Show not found message if no property data
    if (!compound && !loading) {
        return (
            <div className="py-4">
                <ContainerMedia>
                    <div className="text-center py-5">
                        <h3 className="mb-3">{currentLanguage === "ar" ? "العقار غير موجود" : "Property Not Found"}</h3>
                        <p className="text-muted">{currentLanguage === "ar" ? "لم يتم العثور على العقار المطلوب" : "The requested property could not be found"}</p>
                    </div>
                </ContainerMedia>
            </div>
        );
    }

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
                            textBreadActive={compound.title[currentLanguage]}
                        />
                    </header>
                    <main>
                        <PropertyShowcaseExample
                            images={compound.compoundImages.map((item) => item.url)}
                            lat={compound.detailedLocation.coordinates[0]}
                            lon={compound.detailedLocation.coordinates[1]} />
                        <div className="row gy-4">
                            <div className="col-12 col-xl-9 d-flex flex-column space-8">
                                <DescriptionGuide
                                    title={compound?.title[currentLanguage] || ""}
                                    location={compound?.compoundLocation || ""}
                                    price={compound?.unitData?.prices?.[0] || ""}
                                />
                                <CompoundTaps unitData={compound?.unitData} />
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