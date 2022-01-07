import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useStateValue } from './StateProvider';

function App() {

  // use the StateValue instead to check if there is user
  const[{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
          <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
