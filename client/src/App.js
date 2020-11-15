import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MessageContextProvider } from './context/MessagesContext'

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__body">
          <MessageContextProvider>
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId"><Chat /></Route>
            </Switch>
          </MessageContextProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
