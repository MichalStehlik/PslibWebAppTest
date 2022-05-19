import { useAuthContext } from "../providers/AuthProvider";

export const Profile = () => {
    const [{ profile }] = useAuthContext();
    return (
        <pre>
            {JSON.stringify(profile," ",4)}
        </pre>
        );
}

export default Profile;