import React from 'react';
// import logo from '../assets/images/main-logo.png';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import Loader from './Loader';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const { isLoading, user } = props;

    return (
        <div className="Header">

            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <h1 className="App-title">Welcome to XapXam</h1>
            </header>

             <div className="btn-group" role="group">

                <Link key="1" onClick={window.location.reload} to="/fetchPlayers" className="flex-sm-fill text-sm-center nav-link active">
                            Home
                </Link>

                {props.user.role === 'admin' &&
                <Link key="2"  to="/fetchPlayers" className="flex-sm-fill text-sm-center nav-link active"
                    onClick={props.clearHistory}>
                    Clear History
                </Link>
                }

                {props.user.role === 'admin' &&
                <Link key="3"  to="/AddPlayers" className="flex-sm-fill text-sm-center nav-link active">
                    Start New Game
                </Link>
                }

                {window.sessionStorage.getItem('usertoken') !== null && <Link key="4"  to="/" className="flex-sm-fill text-sm-center nav-link active"
                        onClick={props.handleUserLogout}>
                        Logout
                </Link>
                }

                <div className="flex-sm-fill text-sm-right text-white nav-link active" >
                    <span>name: {props.user && props.user.username} ({props.user.role})</span>
                </div>

            </div>

            {/* <Loader loading={isLoading} /> */}

        </div>
    )
}

function mapStateToProps(state){
    return {
        isLoading: state.players.isLoading
    }
}

export default connect(mapStateToProps, actions)(Header);