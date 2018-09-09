import React, { Component } from 'react';
import logo from '../assets/images/main-logo.png';

const Header = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to XapXam</h1>
            </header>
        </div>
    )
}

export default Header;