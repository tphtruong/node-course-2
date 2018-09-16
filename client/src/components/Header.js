import React from 'react';
import logo from '../assets/images/main-logo.png';
import { connect } from 'react-redux';
import * as actions from '../actions';


const Header = (props) => {

    const handleSubmit = (props) => {
        // props.clearHistory()
        // .then((res) => {
        //     console.log('redirect to dashboard...');
        //     this.props.history.push("/fetchPlayers");
        // });
            console.log('here.....',props);
      }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to XapXam</h1>
            </header>
             <div className="btn-group" role="group">
                <a key="1" className="flex-sm-fill text-sm-center nav-link active" 
                    href="/fetchPlayers">Home</a>
                <a key="2" className="flex-sm-fill text-sm-center nav-link active" 
                        onClick={props.clearHistory} href="#">Clear History</a>
                <a key="3" className="flex-sm-fill text-sm-center nav-link disabled" 
                    href="/AddPlayers">Start New Game</a>
                
            </div> 
            {/* <ul className="nav nav-pills tablist">
                <li className="presentation" ><a href="/fetchPlayers">Home</a></li>
                <li className="presentation">Next Dealer : <span>⭐</span><span>⭐</span><span>⭐</span></li>
                <li className="presentation"><a href="/AddPlayers">New Game</a></li>
            </ul> */}
        </div>
    )
}

export default connect(null, actions)(Header);