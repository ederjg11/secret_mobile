import { useState } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import FriendsPage from './FriendsPage';
import AddFriendPage from './AddFriendPage';
import RegisterFlow from './RegisterFlow';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [page, setPage] = useState('home');

  if (!loggedIn && registering) {
    return (
      <RegisterFlow
        onCancel={() => setRegistering(false)}
        onSuccess={() => { setRegistering(false); }}
      />
    );
  }

  if (!loggedIn) {
    return (
      <LoginPage
        onLogin={() => setLoggedIn(true)}
        onRegister={() => setRegistering(true)}
      />
    );
  }

  if (page === 'friends') {
    return (
      <FriendsPage
        onBack={() => setPage('home')}
        onAddFriend={() => setPage('addFriend')}
      />
    );
  }

  if (page === 'addFriend') {
    return (
      <AddFriendPage
        onBack={() => setPage('friends')}
      />
    );
  }

  return <HomePage onNavigate={setPage} />;
}

export default App;

