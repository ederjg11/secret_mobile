import { useState } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <HomePage />;
  }

  return <LoginPage onLogin={() => setLoggedIn(true)} />;
}

export default App;

