import React from 'react'
import Wallet from './Wallet';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Fund Raiser</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                    </li>
                    <li>
                    <Link className="nav-link active" aria-current="page" to='/campaigns'>All Fund Campaigns</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <Wallet/>
    </>
  )
}

export default Navbar