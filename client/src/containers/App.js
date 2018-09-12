import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';  //this is helper from redux, this lib help react work nicely with redux
import * as actions from '../actions';


import '../assets/styles/App.css';
// import '../assets/styles/FontAwesome.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import PlayersList from '../components/PlayersList';
import HistoryList from '../components/HistoryList';
import Header from '../components/Header';
import AddPlayers from '../components/AddPlayers';

class App extends Component {
  // componentWillReceiveProps(nextProps) {
  //   debugger;
  //   if (true) {
  //     this.props.router.push('/dashboard');
  //   }
  // }
  //componentWillMount will be called several time 
  //so instead we use componentDidMount
  componentDidMount() {
    this.props.fetchPlayers();  //STEP: 2 (CALL ACTION CREATOR)   
    this.props.fetchHistory();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={PlayersList}></Route>
            <Route path="/hist" component={HistoryList}></Route>
            <Route path="/addPlayers" component={AddPlayers}></Route>
          </div>
         </BrowserRouter>
      </div>
    );
  }
}

export default connect(null,actions)(App); 
// REMBER: the above actions will be passed to the App as Props