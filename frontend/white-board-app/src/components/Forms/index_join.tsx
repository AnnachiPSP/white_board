import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'

const IndexJoin = ({socket, setUser}) =>  {

  const isRun = useRef(false);

  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() =>{

    if (isRun.current) return;
    isRun.current = true;

    axios
    .post("/getUsername")
    .then((response) => {
      setUserName(response.data.datas.user_name);
    })
    .catch((error) => {
      console.error('Error fetching username:', error);
    });

}, []);

  const handleRoomJoin = (e) => {
    e.preventDefault();

    const roomData = {
        userName,
        roomName: "",
        roomId,
        host: false,
    };

    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="form-style justify-content-center border border-3 rounded-3">
            <h1 className="font-monospace text-primary">Join Room</h1>

            <form className="form col-md-12 mt-5">
                <div className='form-group'>
                    <input type="text" className='form-control my-2' placeholder='Room Code' value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
                </div>
                <button type="submit" className='mt-4 btn btn-primary form-control' onClick={handleRoomJoin}>Join!!</button>
            </form>
        </div>
    </div>
  );
}

export default IndexJoin