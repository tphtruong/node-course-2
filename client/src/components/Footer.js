import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <nav class="nav nav-pills flex-row flex-sm-row">
                    <a class="flex-sm-fill text-sm-center nav-link active" href="#">Active</a>
                    <a class="flex-sm-fill text-sm-center nav-link" href="#">Link</a>
                    <a class="flex-sm-fill text-sm-center nav-link" href="#">Link</a>
                    <a class="flex-sm-fill text-sm-center nav-link disabled" href="#">Disabled</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;