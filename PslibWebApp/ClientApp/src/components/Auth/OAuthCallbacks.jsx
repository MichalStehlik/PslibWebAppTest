import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider"
import axios from "axios"

export const SignInCallback = props => {
    const [{ userManager }] = useAuthContext();
    const [message, setMessage] = useState("");
    const [signResult, setSignResult] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            if (userManager !== null) {
                setMessage("Čekání na uživatelská data");
                const result = await userManager.signinRedirectCallback();
                setSignResult(result);
            }
        }
        fetchUser();
    }, [userManager]);
    useEffect(() => {
        if (signResult !== null) {
            setMessage("Ověřování existence uživatele " + signResult.profile.sub);
            axios.get( "/api/users/guid/" + signResult.profile.sub, {
                headers: {
                    Authorization: "Bearer " + signResult.accessToken,
                    "Content-Type": "application/json"
                }
            })
                .then(result => {
                    setMessage("Vítejte zpět");

                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setMessage("Založení nového uživatele");
                        const d = new Date();
                        axios.post("/api/users", {
                            FirstName: signResult.profile.given_name,
                            MiddleName: signResult.profile.middle_name,
                            LastName: signResult.profile.family_name,
                            Gender: (signResult.profile.gender === "Male") ? 1 : (signResult.profile.gender === "Female") ? 2 : (signResult.profile.gender === "Other") ? 3 : 0,
                            Email: signResult.profile.email,
                            IdentityId: signResult.profile.sub,
                            Phone: signResult.profile.phone,
                            //AuthorizedDate: d.toISOString()
                        })
                            .then(response => {
                                setMessage("Profil vytvořen");
                            })
                            .catch(error => {
                                setMessage("Došlo k chybě při vytváření profilu.");
                            })
                            .then(() => {

                            })
                    }
                    else {
                        setMessage("Došlo k nějaké chybě.");
                    }
                })
                .then(() => {
                    navigate("/");
                })      
        }   
    }, [signResult, navigate]);
    return (
        <p>{message}</p>
        );
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