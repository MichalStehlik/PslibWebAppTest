import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useAppContext, SET_THEME, THEME_LIGHT, THEME_DARK } from "../providers/ApplicationProvider";

export const Navigation = () => {
    const [{ accessToken, userManager }] = useAuthContext();
    const [{ theme }, appDispatch] = useAppContext();
    return (
        <div>
            <Link to="/">Home</Link>{" "}
            <Link to="/test">Test</Link>{" "}
            <Link to="/users">Users</Link>{" "}
            <Link to="/profile">Profile</Link>{" "}
            <Link to="/something">Something</Link>{" "}
            <a href="/swagger">Swagger</a>{" "}
            <button onClick={() => { appDispatch({ type: SET_THEME, payload: (theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT) }) }}>Theme</button>
            {accessToken
                ? <button onClick={() => { userManager.signoutRedirect() }} >Log Out</button>
                : <button onClick={() => { userManager.signinRedirect() }} >Log In</button>}
        </div>
        );
}

export default Navigation;