import { Alert, Button } from "../../ui-components";
import { useAppContext, ADD_MESSAGE } from "../../providers/ApplicationProvider";

export const Home = () => {
    const [, dispatch] = useAppContext();
    return (
        <>
            <Alert>
                You are beeing alerted!
            </Alert>
            <div>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "info", text: "Notifikace.", dismissible: true, expiration: 3 }) }}>Add Info</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "error", text: "Tohle je nějaká chyba.", dismissible: true, expiration: 3 }) }}>Add Error</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "warning", text: "Na tohle pozor.", dismissible: true, expiration: 3 }) }}>Add Warning</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "success", text: "Konečně se něco povedlo.", dismissible: true, expiration: 3 }) }}>Add Info</Button>
            </div>
        </>
    );
    
};

export default Home;