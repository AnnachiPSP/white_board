import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        {/* Left-end Users Online Button */}
        <div>
        <button className="btn btn-light btn-sm">Users Online: 0</button>
        </div>

        {/* Center-aligned Room Name */}
        <div className="navbar-brand mx-auto">
        <strong className="font-monospace text-light">Room Name</strong>
        </div>

        {/* Right-end Screenshot Button */}
        <div>
        <button className="btn btn-light btn-sm">Screenshot</button>
        </div>
    </nav>
  )
}

export default Navbar