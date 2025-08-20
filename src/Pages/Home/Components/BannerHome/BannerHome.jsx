import React from "react";
import imageBannerHome from "../../../../assets/images/bannerHome/phoneBanner.png";
import "./BannerHome.css";
import { useLanguage } from "../../../../Components/Languages/LanguageContext";
import appGoogle from "../../../../assets/images/footer/googlePlay.png"
import appStore from "../../../../assets/images/footer/appStore.png"
import rectangles from "../../../../assets/images/bannerHome/Shape.png";
import eclipse from "../../../../assets/images/bannerHome/Ellipse.png";

const BannerHome = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    // Localization for text content
    const localization = {
        ar: {
            title: "نزّل تطبيقنا دلوقتي وخلّي كل العقارات في جيبك!",
            description: "كل العقارات اللي بتدور عليها في مكان واحد! حمل التطبيق على موبايلك من المتجر واستكشف العروض الجديدة بسهولة.",
        },
        en: {
            title: "Download our app now and have all your properties in your pocket!",
            description: "All the properties you're looking for in one place! Download the app to your mobile from the store and easily explore new offers."
        },
    };

    const { title, description, appsTitle } = localization[currentLanguage]; // Retrieve localized text

    return (

        <div className="banner-home ">
            {/* Shapes */}
            <div className="rectangles">
                <img src={rectangles} alt="rectangles" />
            </div>
            <div className="eclipse">
                <img className="h-100" src={eclipse} alt="eclipse" />
            </div>
            {/* ========== START ALL BANNER HOME ========= */}
            <div className="all-banner-home">
                {/* =========== START ROW ========= */}
                <div className=" row g-4 g-md-3 align-items-center justify-content-between">
                    {/* ============ START COL ============ */}
                    <div className="col-12 col-md-7 col-lg-5">
                        {/* ============ START INFO BANNER CONTENT =========== */}
                        <div className="info-banner-content d-flex flex-column space-7 text-center ">
                            <h6 >
                                {localization[currentLanguage].title}
                            </h6>
                            <p className="b-12">
                                {localization[currentLanguage].description}
                            </p>
                            {/* ============= START APPS CONTENT INFO ============ */}
                            <div className="apps-content-info">
                                {/* ============== START APPS LINKS ============= */}
                                <div className="apps-links d-flex align-items-center  gap-3 mt-3">
                                    <a
                                        href="https://apps.apple.com/us/app/atour/id6743371891"
                                        target="_blank"
                                        className="link-app-one"
                                        rel="noreferrer"
                                    >
                                        <img src={appStore} alt="app store" />
                                    </a>
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.app.atour"
                                        target="_blank"
                                        className="link-app-one"
                                        rel="noreferrer"
                                    >
                                        <img src={appGoogle} alt="google play" />
                                    </a>
                                </div>
                                {/* ============== END APPS LINKS ============= */}
                            </div>
                            {/* ============= END APPS CONTENT INFO ============ */}
                        </div>
                        {/* ============ END INFO BANNER CONTENT =========== */}
                    </div>
                    {/* ============ END COL ============ */}
                    {/* ============ START COL ============ */}
                    <div className="col-12 col-md-5 col-lg-6 z-1">
                        {/* =========== START IMAGE BANNER ============= */}
                        <div className="image-banner-home">
                            <img
                                src={imageBannerHome}
                                alt="imageBannerHome"
                                className="object-fit-cover"
                                height={"482.04px"}
                                width={"399.71px"}
                            />
                        </div>
                        {/* =========== END IMAGE BANNER ============= */}
                    </div>
                    {/* ============ END COL ============ */}
                </div>
                {/* =========== END ROW ========= */}
            </div>
            {/* ========== END ALL BANNER HOME ========= */}
        </div>
    );
};

export default BannerHome;
