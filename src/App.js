// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure to import your CSS

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Default to light theme

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    if (tg) {
      // Set user info and theme mode
      setUser(tg.initDataUnsafe.user);
      setTheme(tg.colorScheme || 'light'); // Fallback to light theme
      setLoading(false); // Loading complete

      // Expand the app to full screen
      tg.expand();

      // Handle the close event
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
        {loading ? (
            <div className="loader">Loading user info...</div>
        ) : user ? (
            <div>
              <h1>Welcome {user.first_name}!</h1>
              <p>Your Telegram ID: {user.id}</p>
              <button onClick={closeApp}>Close Mini App</button>
            </div>
        ) : (
            <div>
              <h1>Error: User info not available.</h1>
              <button onClick={closeApp}>Close Mini App</button>
            </div>
        )}
      </div>
  );
}

export default App;
