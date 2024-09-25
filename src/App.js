import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Set user info
      setUser(tg.initDataUnsafe?.user);

      // Set theme mode (dark or light)
      setTheme(tg.colorScheme);

      // Expand the app to full screen
      tg.expand();

      // Handle closing the app
      tg.onEvent('mainButtonClicked', () => tg.close());
    } else {
      console.warn("Telegram WebApp object is not available. Make sure you're running the app inside Telegram.");
    }
  }, []);

  const closeApp = () => {
    window.Telegram?.WebApp?.close();
  };

  return (
      <div className={`App ${theme}`}>
        {user ? (
            <div>
              <h1>Welcome {user.first_name}!</h1>
              <p>Your Telegram ID: {user.id}</p>
            </div>
        ) : (
            <p>Loading user info...</p>
        )}
        <button onClick={closeApp}>Close Mini App</button>
      </div>
  );
}

export default App;
