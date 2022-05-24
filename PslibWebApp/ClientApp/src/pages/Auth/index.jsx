import { Outlet } from "react-router-dom"
import { Flex } from "../../ui-components";

export const Auth = () => (
    <Flex>
        <Outlet />
    </Flex>
    )

export default Auth;