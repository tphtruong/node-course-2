import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <nav className="nav nav-pills flex-row flex-sm-row">
                    <a className="flex-sm-fill text-sm-center nav-link active" href="/dashboard">Dashboard</a>
                    <a className="flex-sm-fill text-sm-center nav-link" href="/history">History</a>
                    <a className="flex-sm-fill text-sm-center nav-link disabled" href="/AddPlayers">Start</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;