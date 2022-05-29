import { useNotificationContext } from "../../providers/NotificationProvider";

export const Test = () => {
    const { notifications, addNotification, removeNotification } = useNotificationContext();
    return (
        <>
            {notifications.map((item, index) => {
                return <div key={index} onClick={() => { removeNotification(index) }}>{ item.content}</div>
            })}
            <button onClick={e => { let a = Math.random()*100; addNotification(<p>{ a }</p>,"error",true,10)}}>Go</button>
        </>
        );
}
export default Test;