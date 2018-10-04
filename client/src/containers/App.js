import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';  //this is helper from redux, this lib help react work nicely with redux
import * as actions from '../actions';

//import 'materialize-css/dist/css/materialize.min.css';
import '../assets/styles/App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.theme.css';

import Header from '../components/Header';
import GameContainer from './GameContainer';
import AddPlayers from '../components/AddPlayers';
import SignUp from './SignUp';
import Login from './Login';
import Blank from '../components/Blank';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
          user: {
            token: localStorage.getItem('usertoken'),
            username: localStorage.getItem('username') ,
            error: '' //this.props.error
          },
          isLoggedIn: localStorage.getItem('usertoken') || undefined
      }

      if (this.props.user){
        this.setState({user:this.props.user})
      }
  }

  render() {
    if (this.props.user === undefined 
        || this.props.user &&  
        (this.props.user.token === undefined || this.props.user.token === null)) { 
        return <Login error={this.props.user && this.props.user.error} />
    } 

    const RenderGameContainer = (props) => {
      return (
        <GameContainer user={this.props.user && this.props.user} />
      );
    }


    return (
      <div className="App">
          <BrowserRouter>
            <div>
              <Header user={this.props.user && this.props.user}  />  
              <Route exact path="/fetchPlayers" render={RenderGameContainer}></Route>
              <Route path="/addPlayers" component={AddPlayers}></Route> 
              <Route exact path="/" component={Blank}></Route>   
              {/* <Route path="/userSignUp" component={SignUp}></Route>  
                        */}
            </div>
          </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps(state){
  let user;

  if (state.user.user){
    localStorage.setItem('usertoken', state.user.user.token)
    localStorage.setItem('username', state.user.user.username)  
    localStorage.setItem('userrole', state.user.user.role)  
    user = {username: state.user.user.username, 
      token: state.user.user.token,
      error: state.user.user.error,
      role: state.user.user.role
    }
  } else {
    if (localStorage.getItem('usertoken') !== 'undefined'){
      user = {username: localStorage.getItem('username'), 
        token: localStorage.getItem('usertoken'),
        role: localStorage.getItem('userrole'),
        error: undefined
      }
    }
  }

  return {
      user: user// state.user.user
  }
}

export default connect(mapStateToProps,actions)(App); 
// REMBER: the above actions will be passed to the App as Props