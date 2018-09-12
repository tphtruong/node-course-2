import React from 'react';
import logo from '../assets/images/main-logo.png';

const Header = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to XapXam</h1>
            </header>
            <div className="btn-group" role="group">
                <a key="1" className="flex-sm-fill text-sm-center nav-link active" href="/">Home</a>
                <a key="2" className="flex-sm-fill text-sm-center nav-link" href="/history">History</a>
                <a key="3" className="flex-sm-fill text-sm-center nav-link disabled" 
                    href="/AddPlayers">Start New Game</a>
            </div>
        </div>
    )
}

export default Header;