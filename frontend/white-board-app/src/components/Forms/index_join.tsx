import React from 'react'
import './style.css'

const IndexJoin = () =>  {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="form-style justify-content-center border border-3 rounded-3">
            <h1 className="font-monospace text-primary">Join Room</h1>

            <form className="form col-md-12 mt-5">
                <div className='form-group'>
                    <input type="text" className='form-control my-2' placeholder='Room Code'/>
                </div>
                <button type="submit" className='mt-4 btn btn-primary form-control'>Join!!</button>
            </form>
        </div>
    </div>
  );
}

export default IndexJoin