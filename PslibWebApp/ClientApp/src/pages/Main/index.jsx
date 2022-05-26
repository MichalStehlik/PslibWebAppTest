import { Outlet } from "react-router-dom"
import Navigation from "../../components/Navigation"
import { ReactComponent as SpsseLogo } from '../../assets/images/logo.svg';

export const MainLayout = () => (
    <>
        <SpsseLogo />
        <Navigation />
        <Outlet />
    </>
)

export default MainLayout;