import './App.css';

// src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Check if Telegram WebApp is available
    const tg = window.Telegram.WebApp;

    if (tg) {
      // Set user info
      setUser(tg.initDataUnsafe.user);

      // Set theme mode (dark or light)
      setTheme(tg.colorScheme);

      // Expand the app to full screen
      tg.expand();

      // Handle closing the app
      tg.onEvent('mainButtonClicked', () => tg.close());
    }

    return () => {
      if (tg) {
        tg.offEvent('mainButtonClicked');
      }
    };
  }, []);

  const closeApp = () => {
    window.Telegram.WebApp.close();
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

