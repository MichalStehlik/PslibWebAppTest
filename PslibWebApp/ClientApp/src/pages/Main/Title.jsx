import { useState } from "react"
import { Button, Panel, Modal, ModalFooter, ModalHeader, ModalBody, Icon } from "../../ui-components";
import { useAppContext, ADD_NOTIFICATION, NOTIFICATION_DEFAULT, NOTIFICATION_INFO, NOTIFICATION_DANGER, NOTIFICATION_WARNING, NOTIFICATION_SUCCESS } from "../../providers/ApplicationProvider"


export const Home = () => {
    const [, dispatch] = useAppContext();
    const [dialog, setDialog] = useState(false);
    return (
        <>
            <Panel p={ 10 } borderRadius="none">
                <Button variant="">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="info">Info</Button>
                <Button variant="danger" >Error</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="success">Success</Button>
            </Panel>
            <h1>Nadpis</h1>
            <h2>Podnadpis</h2>
            <h3>Nadpis</h3>
            <div>
                <Button onClick={e => {
                    dispatch({
                        type: ADD_NOTIFICATION,
                        content: <p>Notifikace</p>,
                        variant: NOTIFICATION_DEFAULT,
                        dismissible: true,
                        expiration: 5
                    });
                }}>Add Notification</Button>
                <Button onClick={e => {
                    dispatch({
                        type: ADD_NOTIFICATION,
                        content: <p>Something bad, bad just happened! Everyone start panicking now!</p>,
                        variant: NOTIFICATION_DANGER,
                        dismissible: true,
                        expiration: 5
                    });
                }}>Add Error</Button>
                <Button onClick={e => {
                    dispatch({
                        type: ADD_NOTIFICATION,
                        content: <p>I am informing you about something that just happened.</p>,
                        variant: NOTIFICATION_INFO,
                        dismissible: true,
                        expiration: 5
                    });
                }}>Add Info</Button>
                <Button onClick={e => {
                    dispatch({
                        type: ADD_NOTIFICATION,
                        content: <p>Do not go further. Dark omen looms there.</p>,
                        variant: NOTIFICATION_WARNING,
                        dismissible: true,
                        expiration: 5
                    });
                }}>Add Warning</Button>
                <Button onClick={e => {
                    dispatch({
                        type: ADD_NOTIFICATION,
                        content: <p>We did it.</p>,
                        variant: NOTIFICATION_SUCCESS,
                        dismissible: true,
                        expiration: 5
                    });
                }}>Add Success</Button>
            </div>
            <div>
                <Button onClick={e => { setDialog(true)}}>Dialog</Button>
            </div>
            <Modal active={dialog} onDismiss={() => { setDialog(false) }} variant="danger">
                <ModalHeader>
                    Dialog
                </ModalHeader>
                <ModalBody variant="danger">
                    <p>I was once told by a very wise man ...</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary">OK</Button>
                    <Button onClick={e => { setDialog(false)}}>Cancel</Button>
                </ModalFooter>          
            </Modal>
        </>
    );
    
};

export default Home;