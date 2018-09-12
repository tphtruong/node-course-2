import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { Map, List } from 'immutable';

class AddPlayers extends Component {
    constructor(props){
        super(props);
        this.state = {
            players : [
                { id: 1, name: ''},
                { id: 2, name: ''},
                { id: 3, name: ''},
                { id: 4, name: ''}
            ]
            // players: List([
            //     { id: 1, name: ''},
            //     { id: 2, name: ''},
            //     { id: 3, name: ''},
            //     { id: 4, name: ''}
            // ])
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = function(e) {
        var playerName = e.target.value;
        var newPlayers = []
        for (var s of this.state.players) {
            if (s.id === e.target.id)
                newPlayers.push({ id: parseInt(e.target.id), name: playerName})
            else
                newPlayers.push(s)
        }

        // var idx = e.target.id;
        // const newPlayers = this.state.players;//.toArray();
        // newPlayers.map( (x,i) => {
        //     var newObj = Object.assign({}, x);
        //     if (parseInt(x.id)===parseInt(idx)) {
        //         newObj.name = playerName;
        //     } 
        //     return newObj;
        // })
        this.setState({ players: newPlayers });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        //console.log(this.state.players);
        this.props.handleAddPlayers(this.state.players);
      }

  render() {

    return (
        <form onSubmit={this.handleSubmit} noValidate> 
            <div className="form-group">
                {this.state.players.map((player, i) => {
                    return (
                        <div key={i+1}>
                            <label >Player {player.id}</label>
                            <input type="text" id={player.id}
                                name="playerName" value={player.name} 
                                onChange={this.handleInputChange}
                                    placeholder="Enter Player Name" />
                        </div>
                    )
                })}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
  }
}

// function mapStateToProps(state){
//     console.log(state.playersReducer);
//     return {
//         playersReducer : state.playersReducer
//     }
// }

export default connect(null, actions)(AddPlayers);
