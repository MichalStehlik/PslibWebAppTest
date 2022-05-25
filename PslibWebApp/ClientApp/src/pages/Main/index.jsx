import { Outlet } from "react-router-dom"
import Navigation from "../../components/Navigation"

export const MainLayout = () => (
    <>
        <Navigation />
        <Outlet />
    </>
)

export default MainLayout;