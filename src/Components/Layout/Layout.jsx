// import ScrollToTopPage from "Components/ScrollToTopPage/ScrollToTopPage";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavbarMenu from "../NavbarMenu/NavbarMenu";

const Layout = () => {
    return (
        <>
            <NavbarMenu />
            <Outlet />
            {/* <ScrollToTopPage /> */}
            <Footer />
        </>
    );
};

export default Layout;
