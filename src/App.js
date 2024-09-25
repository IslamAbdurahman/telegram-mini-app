// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const tg = window.Telegram?.WebApp; // Use optional chaining

    if (tg) {
      // Set user info and theme mode
      setUser(tg.initData.user);
      setTheme(tg.colorScheme || 'light'); // Fallback to light theme
      setLoading(false); // Loading complete

      // Expand the app to full screen
      tg.expand();

      // Handle the close event
      tg.onEvent('mainButtonClicked', () => tg.close());
    } else {
      // If not running in Telegram, handle accordingly
      setLoading(false);
      console.error("Telegram WebApp not found. Make sure the app is running in Telegram.");
    }

    return () => {
      if (tg) {
        tg.offEvent('mainButtonClicked');
      }
    };
  }, []);

  const closeApp = () => {
    window.Telegram?.WebApp.close(); // Optional chaining
  };

  return (
      <div className={`App ${theme}`}>
        {loading ? (
            <div className="loader">11. Loading user info...</div>
        ) : user ? (
            <div>
              <h1>Welcome {user.first_name}!</h1>
              <p>Your Telegram ID: {user.id}</p>
              <button onClick={closeApp}>Close Mini App</button>
            </div>
        ) : (
            <div>

              <h1>11. Error: User info not available.</h1>
              <button onClick={closeApp}>Close Mini App</button>
            </div>
        )}
      </div>
  );
}

export default App;
