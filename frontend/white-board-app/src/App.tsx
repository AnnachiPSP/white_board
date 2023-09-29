// App.tsx
import './App.css';
import Forms from './components/Forms/index';
import IndexCreate from './components/Forms/index_create';
import IndexJoin from './components/Forms/index_join';
import RoomPage from './pages/RoomPage';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Authenticate from './components/Forms/login_page';

const App = () => {
  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  };

  const [isLoggedIn, token] = useAuth(); // Destructure isLoggedIn and username

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ?<Authenticate /> : <Forms token={token} />}
        />
        <Route path="/createroom" element={<IndexCreate uuid={uuid} />} />
        <Route path="/joinroom" element={<RoomPage />} />
        <Route path="/room" element={<RoomPage />} />
      </Routes>
    </div>
  );
};

export default App;
