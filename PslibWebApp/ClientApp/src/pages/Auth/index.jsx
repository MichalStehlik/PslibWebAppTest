import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { Flex } from "../../ui-components"

export const FullscreenContainer = styled(Flex)`
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

export const Auth = () => (
    <FullscreenContainer direction="column" justifyContent="center">
        <Outlet />
    </FullscreenContainer>
    )

export default Auth;