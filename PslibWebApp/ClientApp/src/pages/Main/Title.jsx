import { useState } from "react"
import { Button, Panel, Modal, ModalFooter, ModalHeader, ModalBody, Icon } from "../../ui-components";
import { useNotificationContext, INFO, DANGER, WARNING, SUCCESS, DEFAULT } from "../../providers/NotificationProvider";

export const Home = () => {
    const { addNotification } = useNotificationContext();
    const [dialog, setDialog] = useState(false);
    return (
        <>
            <Panel bg={"grays.800"} p={ 10 } borderRadius="none">
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
                <Button onClick={e => { addNotification(<p>Notifikace</p>, DEFAULT, true, 5); }}>Add Notification</Button>
                <Button onClick={e => { addNotification(<p>Informace</p>, INFO, true, 5); }}>Add Info</Button>
                <Button onClick={e => { addNotification(<p>Something bad happened.</p>, DANGER, true, 5); }}>Add Error</Button>
                <Button onClick={e => { addNotification(<p>I warn you.</p>, WARNING, true, 5); }}>Add Warning</Button>
                <Button onClick={e => { addNotification(<p>We did it.</p>, SUCCESS, true, 5); }}>Add Success</Button>
            </div>
            <div>
                <Button onClick={e => { setDialog(true)}}>Dialog</Button>
            </div>
            <Modal active={dialog} onDismiss={() => { setDialog(false) }} variant="danger">
                <ModalHeader variant="danger">
                    <h2><Icon icon="cross" size="1em" /> Dialog</h2>
                </ModalHeader>
                <ModalBody>
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