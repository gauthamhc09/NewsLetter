import { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext({
    notification: null, //{title, message, status}
    showNotification: function () { },
    hideNotification: function () { }
})

export const NotificationContextProvider = ({ children }) => {
    const [activeNotification, setActiveNotification] = useState();

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    useEffect(() => {
        if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
            const timer = () => {
                return setTimeout(() => {
                    hideNotificationHandler()
                }, 3000);
            }
            timer();
            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])
    return (
        <NotificationContext.Provider value={context} >
            {children}
        </NotificationContext.Provider>
    )
}