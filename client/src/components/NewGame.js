import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddPlayers extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: this.props.playersReducer
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    renderPlayersList() {
        var rows = [];
        var count = 0;
        //debugger;
        for (var e in this.props.playersReducer){
            count++;

            rows.push (
                <div key={count}>
                    <label >{`Player ${count}`}</label>
                    <input type="text" id={this.props.playersReducer[e]._id}
                        name="playerName" value={this.props.playersReducer[e].name} 
                        onChange={this.handleInputChange}
                            placeholder="Enter Player Name" />
                </div>
            );
            if (count>4) break;
        }  

        if (count+1 < 5){
            //var newPlayers = this.props.players;
           console.log('xxx', this.state.players);

            for (var i=count+1; i < 5; i++){

                //newPlayers.push({ id: count, name: '???'})

                rows.push (
                    <div key={i}>
                        <label >Player {i}</label>
                        <input type="text" id={i}
                            name="playerName" value="???"
                            onChange={this.handleInputChange}
                                placeholder="Enter Player Name" />
                    </div>
                );
            }

            //this.setState({ players: newPlayers });
        }   
        return rows;
    }


    handleInputChange = function(e) {
        var playerName = e.target.value;
        var newPlayers = []
        for (var s of this.state.players) {
            if (s.id == e.target.id)
                newPlayers.push({ id: parseInt(e.target.id), name: playerName})
            else
                newPlayers.push(s)
        }
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
                    {this.renderPlayersList()}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        );
    }
}

function mapStateToProps(state){
    //console.log(state.playersReducer);
    return {
        playersReducer : state.playersReducer
    }
}

export default connect(mapStateToProps, actions)(AddPlayers);
