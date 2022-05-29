import { Button, Panel } from "../../ui-components";
import { useNotificationContext, INFO, DANGER, WARNING, SUCCESS, DEFAULT } from "../../providers/NotificationProvider";

export const Home = () => {
    const { addNotification } = useNotificationContext();
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
            <div>
                <Button onClick={e => { addNotification(<p>Notifikace</p>, DEFAULT, true, 5); }}>Add Notification</Button>
                <Button onClick={e => { addNotification(<p>Informace</p>, INFO, true, 5); }}>Add Info</Button>
                <Button onClick={e => { addNotification(<p>Something bad happened.</p>, DANGER, true, 5); }}>Add Error</Button>
                <Button onClick={e => { addNotification(<p>I warn you.</p>, WARNING, true, 5); }}>Add Warning</Button>
                <Button onClick={e => { addNotification(<p>We did it.</p>, SUCCESS, true, 5); }}>Add Success</Button>
            </div>
        </>
    );
    
};

export default Home;