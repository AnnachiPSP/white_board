import React, {useState} from 'react'
import './style.css'
import { Link } from 'react-router-dom';

const IndexCreate = ({uuid}) => {

    const [roomId, setRoomId] = useState(uuid());

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="form-style justify-content-center border border-3 rounded-3">
                <h1 className="font-monospace text-primary">Create Room</h1>

                <form className="form col-md-12 mt-5">
                    <div className='form-group'>
                        <input type="text" className='form-control my-2' placeholder='Room Name'/>
                    </div>
                    <div className='form-group'>
                        <div className='input-group d-flex align-items-center justify-content-center'>
                            <input type="text" value={roomId} className="form-control my-2 border-0" disabled placeholder='Generate Code'/>
                            <div className="ps-1 input-group-append">
                                <button className='btn btn-primary btn-sm me-1' onClick={() => setRoomId(uuid())} type='button'>Generate</button>
                                <button className='btn btn-outline-danger btn-sm me-2'>Copy</button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='mt-4 btn btn-primary form-control'>CREATE!!</button>
                </form>
            </div>
        </div>
    );
};

export default IndexCreate