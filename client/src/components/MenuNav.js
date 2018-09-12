import React from 'react';
import logo from '../assets/images/main-logo.png';
import Payments from './Payments';

const MenuNav = () => {
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
             <button className="navbar-toggler navbar-toggler-right" type="button" 
                data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> 
             <a className="navbar-brand" href="#">Home</a> 
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/history">History</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/restart">Restart</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MenuNav;