import { Link } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

export const Navigation = () => {
    const [{ accessToken, userManager, profile, profileIcon, profileIconType }, dispatch] = useAuthContext();
    return (
        <div>
            <Link to="/">Home</Link>{" "}
            <Link to="/test">Test</Link>{" "}
            <Link to="/something">Something</Link>{" "}
            <a href="/swagger">Swagger</a>{" "}
            {accessToken
                ? <button onClick={() => { userManager.signoutRedirect() }} >Log Out</button>
                : <button onClick={() => { userManager.signinRedirect() }} >Log In</button>}
        </div>
        );
}

export default Navigation;