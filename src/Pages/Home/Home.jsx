import ComparisonSlider from "../../Components/ComparisonSlider/ComparisonSlider";
import ContainerMedia from "../../Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "../../Components/Helmetinfo/HelmetInfo";
import { useLanguage } from "../../Components/Languages/LanguageContext";
import CardSlider from "../../Components/Ui/CardSlider/CardSlider";
import BannerHome from "./Components/BannerHome/BannerHome";
import CompoundSlider from "./Components/CompoundSlider/CompoundSlider";
import HeroSection from "./Components/HeroSection/HeroSection";
import HomePoster from "./Components/HomePoster/HomePoster";
import RealStateSlider from "./Components/RealStateSlider/RealStateSlider";
import SearchHome from "./Components/SearchHome/SearchHome";
import "./Home.css"



const Home = () => {
    const { currentLanguage } = useLanguage(); // Get the current language

    return (
        <>

            <HelmetInfo titlePage={currentLanguage === "ar" ? "الصفحة الرئيسية" : "Home"} />
            <ContainerMedia>

                <HeroSection />

                {/* Compounds */}
                <CardSlider title={currentLanguage === "ar" ? "دليل الكمبوندات" : "Compounds Guide"} havLink={true}>
                    <CompoundSlider />
                </CardSlider>

                {/* real state */}
                <CardSlider title={currentLanguage === "ar" ? "عقارات لسه نازله" : "New real estate"} havLink={true}>
                    <RealStateSlider />
                </CardSlider>

                {/* Poster */}
                <HomePoster />

                {/* Comparison */}
                <CardSlider title={currentLanguage === "ar" ? "شطب بيتك على مزاجك!" : "Decorate your home the way you like!"} havLink={false}>
                    <ComparisonSlider />
                </CardSlider>

                {/* Banner */}
                <BannerHome />

                {/*Home search */}
                <SearchHome />
            </ContainerMedia>
        </>
    );
};

export default Home;
