import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./Components/Languages/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import { PropertyProvider } from "./contexts/PropertyContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./styles/AllinOne.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import RegisterPage from "./Components/Auth/Register/RegisterPage";
import CompoundPage from "./Pages/Compound/CompoundPage";
import Aqar from "./Pages/Aqar/Aqar";
import CompoundDetailsPage from "./Pages/Compound/Components/CompoundDetails/CompoundDetailsPage";
import CompoundAqarDetails from "./Pages/Compound/Components/CompoundAqarDetails/CompoundAqarDetails";
import AqarGuide from "./Pages/Aqar/Components/AqarGuide";
import SalePage from "./Pages/salePage/SalePage";
import FinishPage from "./Pages/FinishPage/FinishPage";
import FurnishDetails from "./Pages/Furnish/FurnishDetails";
import FinishDetails from "./Pages/FinishPage/FinishDetails";
import AccountUser from "./Pages/AccountUser/AccountUser";
import Favorite from "./Pages/FavoritePage/Favorite";
import Notifications from "./Pages/Notifications/Notifications";
import Trade from "./Pages/Trade/Trade";
import NotFound from "./Pages/NotFound/NotFound";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import JoinAqar from "./Pages/JoinUs/JoinAqar";
import JoinCompany from "./Pages/JoinUs/JoinCompany";
import JoinTrade from "./Pages/JoinUs/JoinTrade";
import JoinFinish from "./Pages/JoinUs/JoinFinish";
import { Provider } from "react-redux";
import { store } from "./store";
import VendorAds from "./Pages/MyAds/VendorAds";
// import { ToastContainer } from "react-toastify";
import AiBot from "./Components/AiBot/AiBot";
import { PrimeReactProvider } from "primereact/api";
import { CompoundProvider } from "./contexts/CompoundContext";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./styles/PrimeReact.css";
import UpdateAqar from "./Pages/Update/UpdateAqar";
import UpdateFinish from "./Pages/Update/UpdateFinish";
import JoinLand from "./Pages/JoinUs/JoinLand";
import JoinCommercial from "./Pages/JoinUs/JoinCommercial";
import JoinIndustrial from "./Pages/JoinUs/JoinIndustrial";
import { AdsProvider } from "./contexts/AdsContext";
import Building from "./Pages/Building/Building";
import BuildingDetails from "./Pages/Building/BuidlingDetails";
import LandDetails from "./Pages/Land/LandDetails";
import Land from "./Pages/Land/Land";
import Factory from "./Pages/Factory/Factory";
import FactoryDetails from "./Pages/Factory/FactoryDetails";

const App = () => {
  return (
    <>
      <PrimeReactProvider>
        <Provider store={store}>
          <BrowserRouter>
            <LanguageProvider>
              <HelmetProvider>
                <PropertyProvider>
                  <CompoundProvider>
                    <AdsProvider>
                      <ScrollToTop />
                      {/* <ToastContainer rtl={true} /> */}
                      {/* in future to be add */}
                      {/* <AiBot /> */}
                      <Routes>
                        {/* Standalone Register Page (without navbar/footer) */}
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<RegisterPage />} />

                        <Route path="/" element={<Layout />}>
                          {/* pages */}
                          <Route path="/" element={<Home />} />

                          {/* UserProfile */}
                          <Route path="/profile" element={<AccountUser />} />

                          {/* pages */}
                          <Route path="/compounds" element={<CompoundPage />} />
                          <Route
                            path="/compounds-guide/:id"
                            element={<CompoundDetailsPage />}
                          />
                          <Route
                            path="/compound-details/:id"
                            element={<CompoundAqarDetails />}
                          />

                          {/* عقارات */}
                          <Route path="/realestate" element={<Aqar />} />
                          <Route
                            path="/aqar-guide/:id"
                            element={<AqarGuide />}
                          />

                          {/* مباني */}
                          <Route path="/building" element={<Building />} />
                          <Route
                            path="/building-guide/:id"
                            element={<BuildingDetails />}
                          />
                          
                          {/* اراضي */}
                          <Route path="/land" element={<Land />} />
                          <Route
                            path="/land-guide/:id"
                            element={<LandDetails />}
                          />

                          {/* مصانع */}
                          <Route path="/factory" element={<Factory />} />
                          <Route
                            path="/factory-guide/:id"
                            element={<FactoryDetails />}
                          />






                          <Route path="/sale" element={<SalePage />} />

                          {/* Furnish */}
                          <Route
                            path="/furnish-details"
                            element={<FurnishDetails />}
                          />

                          {/* Finish */}
                          <Route
                            path="/finish-details/:id"
                            element={<FinishDetails />}
                          />
                          {/* <Route path="/finish-details" element={<FinishDetails />} /> */}

                          {/* finishPage */}
                          <Route path="/finish" element={<FinishPage />} />

                          {/* join us */}
                          {/* <Route path="/join" element={<JoinUs />} /> */}
                          <Route path="/join-aqar" element={<JoinAqar />} />
                          <Route path="/joinLand" element={<JoinLand />} />
                          <Route
                            path="/joinCommercial"
                            element={<JoinCommercial />}
                          />
                          <Route
                            path="/joinIndustrial"
                            element={<JoinIndustrial />}
                          />
                          <Route
                            path="/join-company"
                            element={<JoinCompany />}
                          />
                          <Route path="/join-trade" element={<JoinTrade />} />
                          <Route path="/join-finish" element={<JoinFinish />} />
                          {/* Updates */}
                          <Route
                            path="/update-aqar/:id"
                            element={<UpdateAqar />}
                          />
                          <Route
                            path="/update-finish/:id"
                            element={<UpdateFinish />}
                          />

                          {/* ads */}
                          <Route path="/my-ads" element={<VendorAds />} />

                          {/* Favorite */}
                          <Route path="/favorite" element={<Favorite />} />

                          {/* Favorite */}
                          <Route
                            path="/notifications"
                            element={<Notifications />}
                          />

                          {/* Trade */}
                          <Route path="/trade" element={<Trade />} />

                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </AdsProvider>
                  </CompoundProvider>
                </PropertyProvider>
              </HelmetProvider>
            </LanguageProvider>
          </BrowserRouter>
        </Provider>
      </PrimeReactProvider>
    </>
  );
};

export default App;
