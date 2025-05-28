import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from './Components/Languages/LanguageContext';
import { HelmetProvider } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./styles/AllinOne.css"
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import RegisterPage from './Components/Auth/Register/RegisterPage';
import CompoundPage from './Pages/Compound/CompoundPage';
import Aqar from './Pages/Aqar/Aqar';
import CompoundDetailsPage from './Pages/Compound/Components/CompoundDetails/CompoundDetailsPage';
import CompoundAqarDetails from './Pages/Compound/Components/CompoundAqarDetails/CompoundAqarDetails';
import AqarGuide from './Pages/Aqar/Components/AqarGuide';
import SalePage from './Pages/salePage/SalePage';
import JoinUs from './Pages/JoinUs/JoinUs';
import FinishPage from './Pages/FinishPage/FinishPage';
import FurnishDetails from './Pages/Furnish/FurnishDetails';
import FinishDetails from './Pages/FinishPage/FinishDetails';
import AccountUser from './Pages/AccountUser/AccountUser';
import Favorite from './Pages/FavoritePage/Favorite';
import Notifications from './Pages/Notifications/Notifications';
import Trade from './Pages/Trade/Trade';
import NotFound from './Pages/NotFound/NotFound';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <LanguageProvider>
          <HelmetProvider>
              <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>

                {/* pages */}
                <Route path="/" element={<Home />} />


                <Route path="/compounds" element={<CompoundPage />} />
                <Route path="/compounds-guide" element={<CompoundDetailsPage />} />
                <Route path="/compound-details" element={<CompoundAqarDetails />} />

                <Route path="/realestate" element={<Aqar />} />
                <Route path="/aqar-guide" element={<AqarGuide />} />

                <Route path="/sale" element={<SalePage />} />



                {/* Furnish */}
                <Route path="/furnish-details" element={<FurnishDetails />} />

                {/* Finish */}
                <Route path="/finish-details" element={<FinishDetails />} />

                {/* finishPage */}
                <Route path="/finish" element={<FinishPage />} />

                {/* join us */}
                <Route path="/join" element={<JoinUs />} />

                {/* UserProfile */}
                <Route path="/profile" element={<AccountUser />} />

                {/* Favorite */}
                <Route path="/favorite" element={<Favorite />} />

                {/* Favorite */}
                <Route path="/notifications" element={<Notifications />} />

                {/* Trade */}
                <Route path="/trade" element={<Trade />} />

                <Route path="*" element={<NotFound />} />

              </Route>


              {/* Register */}
              <Route path="/login" element={<RegisterPage />} />



            </Routes>
          </HelmetProvider>
        </LanguageProvider>
      </BrowserRouter>
    </>
  )
}

export default App