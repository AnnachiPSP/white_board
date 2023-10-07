// App.tsx
import Forms from './components/Forms/index';
import IndexCreate from './components/Forms/index_create';
import IndexJoin from './components/Forms/index_join';
import RoomPage from './pages/RoomPage';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Authenticate from './components/Forms/login_page';
import io from "socket.io-client";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4} from "uuid";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    socket.on("userHasJoined", (data) => {
      if(data.success){
        console.log("userJoined");
        setUsers(data.users);
        setUser(data.user);
      }
      else{
        console.log("error in joining");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    socket.on("userJoinedMsg", (data) => {
      toast.info(`${data} joined the room!`)
    });

    socket.on("userLeftMsg", (data) => {
      toast.info(`${data} left the room!`)
    });

  }, []);

  const uuid = () => {
    const generatedUuid = uuidv4();
    return generatedUuid;
  };

  const [isLoggedIn, token] = useAuth();

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Forms token={token} /> : <Authenticate />}
        />
        <Route path="/createroom" element={<IndexCreate uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/joinroom" element={<IndexJoin socket={socket} setUser={setUser}/>} />
        <Route path="/:roomId" element={<RoomPage socket={socket} user={user} users={users}/>} />
      </Routes>
    </div>
  );
};

export default App;
