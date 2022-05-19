import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider"

export const SignInCallback = props => {
    const [{ userManager }] = useAuthContext();
    let navigate = useNavigate();
    useEffect(() => {
        if (userManager !== null)
        {
            userManager.signinRedirectCallback();
            navigate("/");
        }     
    }, [userManager, navigate]);
    return null;
}

export const SignOutCallback = props => {
    const [{ userManager }] = useAuthContext();
    let navigate = useNavigate();
    useEffect(() => {
        if (userManager !== null) {
            userManager.signoutRedirectCallback();
            navigate("/");
        }
    }, [userManager, navigate]);
    return null;
}

export const SilentRenewCallback = props => {
    const [{ userManager }] = useAuthContext();
    let navigate = useNavigate();
    useEffect(() => {
        if (userManager !== null) {
            userManager.signinSilentCallback();
            navigate("/");
        }
    }, [userManager, navigate]);
    return null;
}