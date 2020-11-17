import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MessageContextProvider } from './context/MessagesContext'
import { useState, useEffect } from 'react'
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let obj = localStorage.getItem('auth_user');
    if (obj) { setUser(JSON.parse(obj)) }
  }, [])
  console.log('LoCAL STORAGE USER', user);
  return (
    <Router>
      <div className="app">
        <div className="app__body">
          {!user && <Login setUser={setUser} />}
          {user &&
            <MessageContextProvider>
              <Sidebar user={user} />
              <Switch>
                <Route path="/room/:roomId"><Chat user={user} /></Route>
              </Switch>
            </MessageContextProvider>
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
