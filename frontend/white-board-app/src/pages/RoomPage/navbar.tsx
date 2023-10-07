import React, { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './index.css';
import ChatRoom from './chat-room';

const Navbar = ({ user, users, SaveToLocal, socket }) => {
  const [openedChatTab, setOpenedChatTab] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        {/* Left-end Users Online Button */}
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Users Online: {users.length}
          </button>
          <ul className="dropdown-menu">
            {users.map((usr, index) => (
              <li key={index}>
                <a className="dropdown-item user-online" href="#">
                  {usr.userName} {user && user.userName === usr.userName && '(You)'}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Room Button */}
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={() => setOpenedChatTab(true)}
          style={{ marginLeft: '10px' }}
        >
          Chat Room
        </button>

        {/* Center-aligned Room Name */}
        <div className="navbar-brand mx-auto">
          <strong className="font-monospace text-light">{user.roomName}</strong>
        </div>

        {/* Right-end Screenshot Button */}
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Save Canvas
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#" id="download_as_pdf" onClick={SaveToLocal}>
                <Icon.FileEarmarkPdfFill />
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" id="download_as_img" onClick={SaveToLocal}>
                <Icon.Image />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ChatRoom openedChatTab={openedChatTab} setOpenedChatTab={setOpenedChatTab} socket={socket}/>
    </>
  );
};

export default Navbar;
