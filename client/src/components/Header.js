import React from 'react';
// import logo from '../assets/images/main-logo.png';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const { isLoading } = props;

    return (
        <div className="Header">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <h1 className="App-title">Welcome to XapXam</h1>
            </header>

             <div className="btn-group" role="group">

                <Link key="1"  to="/fetchPlayers" className="flex-sm-fill text-sm-center nav-link active">
                            Home
                </Link>

                <Link key="2"  to="/fetchPlayers" className="flex-sm-fill text-sm-center nav-link active"
                    onClick={props.clearHistory}>
                    Clear History
                </Link>

                <Link key="3"  to="/AddPlayers" className="flex-sm-fill text-sm-center nav-link active">
                    Start New Game
                </Link>

            </div>

            <Loader loading={isLoading} />

        </div>
    )
}

function mapStateToProps(state){
    return {
        isLoading: state.players.isLoading
    }
}

export default connect(mapStateToProps, actions)(Header);