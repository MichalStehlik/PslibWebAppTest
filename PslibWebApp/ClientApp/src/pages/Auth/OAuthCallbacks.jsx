import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext, SET_ICON } from "../../providers/AuthProvider"
import { Flex } from "../../ui-components"
import axios from "axios"

export const SignInCallback = props => {
    const [{ userManager, returnUrl }, dispatch] = useAuthContext();
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
            axios.get( "/api/users/" + signResult.profile.sub, {
                headers: {
                    Authorization: "Bearer " + signResult.access_token,
                    "Content-Type": "application/json"
                }
            })
                .then(result => {
                    setMessage("Vítejte zpět");
                    axios.put("/api/users/" + signResult.profile.sub, {
                        Id: signResult.profile.sub,
                        FirstName: signResult.profile.given_name,
                        MiddleName: signResult.profile.middle_name,
                        LastName: signResult.profile.family_name,
                        Gender: (signResult.profile.gender === "Male") ? 1 : (signResult.profile.gender === "Female") ? 2 : (signResult.profile.gender === "Other") ? 3 : 0,
                        Email: signResult.profile.email,
                        Phone: signResult.profile.phone
                    }, {
                        headers: {
                            Authorization: "Bearer " + signResult.access_token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            setMessage("Profil byl aktualizován");
                        })
                        .catch(error => {
                            setMessage("Došlo k chybě při aktualizaci profilu.");
                        })
                        .then(() => {

                        })
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setMessage("Založení nového uživatele");
                        axios.post("/api/users", {
                            Id: signResult.profile.sub,
                            FirstName: signResult.profile.given_name,
                            MiddleName: signResult.profile.middle_name,
                            LastName: signResult.profile.family_name,
                            Gender: (signResult.profile.gender === "Male") ? 1 : (signResult.profile.gender === "Female") ? 2 : (signResult.profile.gender === "Other") ? 3 : 0,
                            Email: signResult.profile.email,
                            Phone: signResult.profile.phone
                        }, {
                            headers: {
                                Authorization: "Bearer " + signResult.access_token,
                                "Content-Type": "application/json"
                            }
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
                    setMessage("Získávání uživatelské ikony");
                    let authorityUrl = userManager.settings.authority;
                    axios.get(authorityUrl + "/api/account/icon", {
                        responseType: "blob",
                        headers: {
                            Authorization: "Bearer " + signResult.access_token,
                        }
                    })
                        .then(response => {
                            let imageData = new Blob([response.data], { type: response.headers["content-type"] });
                            let reader = new FileReader();
                            reader.onloadend = function () {
                                var base64 = reader.result;
                                var base64data = base64.split(',')[1]
                                dispatch({ type: SET_ICON, icon: base64data, iconType: response.headers["content-type"] });
                            }
                            reader.readAsDataURL(imageData);
                            let formData = new FormData();
                            formData.append("file", imageData, "picture.jpg");
                            axios.post("/api/users/" + signResult.profile.sub + "/icon",
                                formData,
                                {
                                    headers: {
                                        Authorization: "Bearer " + signResult.access_token,
                                        "Content-Type": 'multipart/form-data'
                                    }
                                })
                                .then(response => {
                                })
                                .catch(error => {
                                    setMessage("Při ukládání ikony došlo k chybě.");
                                })
                                .then(() => {
                                    
                                })
                        })
                        .catch(error => {
                            setMessage("Při získávání ikony došlo k chybě.");
                        })
                        .then(() => {
                            navigate(returnUrl !== null ? returnUrl : "/");
                        })
                })      
        }   
    }, [signResult, navigate, userManager, dispatch, returnUrl]);
    return (
        <Flex>
            <h1>Přihlašování uživatele</h1>
            <p>{ message }</p>
        </Flex>
        );
}

export const SignOutCallback = props => {
    const [{ userManager, returnUrl }] = useAuthContext();
    let navigate = useNavigate();
    useEffect(() => {
        if (userManager !== null) {
            userManager.signoutRedirectCallback();
            navigate(returnUrl !== null ? returnUrl : "/");
        }
    }, [userManager, navigate, returnUrl]);
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