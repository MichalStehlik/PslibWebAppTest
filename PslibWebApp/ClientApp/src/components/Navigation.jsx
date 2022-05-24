import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useAppContext, SET_DEFAULT_THEME, THEME_LIGHT, THEME_DARK, THEME_AUTO } from "../providers/ApplicationProvider";
import { Button, Menu, MenuBlock, MenuItem } from "../ui-components";

export const Navigation = () => {
    const [{ accessToken, userManager }] = useAuthContext();
    const [{ theme }, appDispatch] = useAppContext();
    return (
        <>
            <Menu>
                <MenuBlock>
                    <MenuItem><Link to="/">Home</Link></MenuItem>
                    <MenuItem><Link to="/test">Test</Link></MenuItem>
                    <MenuItem><Link to="/users">Users</Link></MenuItem>
                    <MenuItem><Link to="/profile">Profile</Link></MenuItem>
                    <MenuItem><Link to="/something">Something</Link></MenuItem>
                    <MenuItem><a href="/users">Users</a></MenuItem>
                </MenuBlock>
                <MenuBlock>
                    <MenuItem>Log In</MenuItem>
                </MenuBlock>
            </Menu>
            <div>
                <Button onClick={() => { appDispatch({ type: SET_DEFAULT_THEME, payload: (theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT) }) }}>Theme</Button>
                <Button as="span" onClick={() => { appDispatch({ type: SET_DEFAULT_THEME, payload: THEME_AUTO }) }}>Auto</Button>
                {accessToken
                    ? <Button onClick={() => { userManager.signoutRedirect() }} >Log Out</Button>
                    : <Button onClick={() => { userManager.signinRedirect() }} >Log In</Button>}
            </div>
        </>
        );
}

export default Navigation;