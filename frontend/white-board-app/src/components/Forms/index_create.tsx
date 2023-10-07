import React, {useState, useRef, useEffect} from 'react'
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Icon from 'react-bootstrap-icons';


const IndexCreate = ({uuid, socket, setUser}) => {

    const isRun = useRef(false);

    const [roomId, setRoomId] = useState(uuid());
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");

    const inputRef = useRef(null);

    const copyToClipboard = () => {

        const textToCopy = inputRef.current.value;

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              toast.info("Copied to clipboard!");
              console.log("copied");
            })
            .catch((error) => {
              alert('Failed to copy to clipboard: ' + error);
            });
        }

    };

    const navigate = useNavigate();

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

    const handleCreateRoom = (e) => {
        e.preventDefault();

        const roomData = {
            userName,
            roomName,
            roomId,
            host: true,
        };

        console.log(roomData);
        socket.emit("userJoined", roomData);
        setUser(roomData);
        navigate(`/${roomId}`);
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="form-style justify-content-center border border-3 rounded-3">
                <h1 className="font-monospace text-primary">Create Room</h1>

                <form className="form col-md-12 mt-5">
                    <div className='form-group'>
                        <input type="text" className='form-control my-2' placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <div className='input-group d-flex align-items-center justify-content-center'>
                            <input type="text" value={roomId} className="form-control my-2 border-0" disabled placeholder='Generate Code' ref={inputRef}/>
                            <div className="ps-1 input-group-append">
                                <button className='btn btn-primary btn-sm me-1' onClick={() => setRoomId(uuid())} type='button'>Generate</button>
                                <button className='btn btn-info btn-sm me-2' onClick={copyToClipboard}><Icon.Clipboard /></button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='mt-4 btn btn-primary form-control' onClick={handleCreateRoom}>CREATE!!</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default IndexCreate