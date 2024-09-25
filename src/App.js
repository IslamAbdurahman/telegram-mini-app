import React, { useEffect, useState } from 'react';
import { useTelegram } from '@telegram-mini-apps/js'; // Importing useTelegram

function App() {
    const { WebApp } = useTelegram(); // Using useTelegram hook
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (WebApp) {
            // Set user and theme
            setUser(WebApp.initDataUnsafe.user); // Using initDataUnsafe for now
            setTheme(WebApp.colorScheme || 'light');

            // Expand the app and handle the close event
            WebApp.expand();
            WebApp.onEvent('mainButtonClicked', () => WebApp.close());
        }
    }, [WebApp]);

    const closeApp = () => {
        WebApp?.close(); // Safely close the app
    };

    return (
        <div className={`App ${theme}`}>
            {user ? (
                <div>
                    <h1>1122. Welcome {user.first_name}!</h1>
                    <p>Your Telegram ID: {user.id}</p>
                    <button onClick={closeApp}>Close Mini App</button>
                </div>
            ) : (
                <div>
                    <h1>1122. Loading user info...</h1>
                </div>
            )}
        </div>
    );
}

export default App;
