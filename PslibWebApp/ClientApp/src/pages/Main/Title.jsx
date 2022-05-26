import { Alert, Button } from "../../ui-components";
import { useAppContext, ADD_MESSAGE } from "../../providers/ApplicationProvider";

export const Home = () => {
    const [, dispatch] = useAppContext();
    return (
        <>
            <Alert variant="error">This is not right!</Alert>
            <Alert variant="warning">There might be something fishy.</Alert>
            <Alert variant="info">Just to let you know.</Alert>
            <Alert variant="success">That was great!</Alert>
            <div>
                <Button variant="">Default</Button>
                <Button variant="info">Info</Button>
                <Button variant="error" >Error</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="success">Info</Button>
            </div>
            <div>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "default", text: "Notifikace.", dismissible: true, expiration: 3 }) }}>Add Notification</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "info", text: "Informace.", dismissible: true, expiration: 3 }) }}>Add Info</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "error", text: "Tohle je nějaká chyba.", dismissible: true, expiration: 3 }) }}>Add Error</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "warning", text: "Na tohle pozor.", dismissible: true, expiration: 3 }) }}>Add Warning</Button>
                <Button onClick={e => { dispatch({ type: ADD_MESSAGE, variant: "success", text: "Konečně se něco povedlo.", dismissible: true, expiration: 3 }) }}>Add Info</Button>
            </div>
        </>
    );
    
};

export default Home;