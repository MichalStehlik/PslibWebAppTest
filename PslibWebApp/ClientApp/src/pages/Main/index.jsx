import { Outlet } from "react-router-dom"
import { Panel } from "../../ui-components"
import Navigation from "../../components/Navigation"
import { ReactComponent as SpsseLogo } from '../../assets/images/logo.svg';

export const MainLayout = () => (
    <>
        <Panel p={0}>
            <SpsseLogo />
            <Navigation />
        </Panel>
        <Outlet />
    </>
)

export default MainLayout;