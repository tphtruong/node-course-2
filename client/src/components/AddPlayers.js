import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router';

class AddPlayers extends Component {
    constructor(props){
        super(props);
        this.state = {
            players : ['','','',''],
            checkedDealers : ['','','',''],
            dealerName : '',
            dealingNumber: 3,
            nextDealerPos:0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    }

    handleInputChange = function(e) {
        var newVal = e.target.value;
        var coll = [];
        this.state.players.map( (x,i) => {
            if (i===parseInt(e.target.id)){
                coll.push(newVal)
            }else{
                coll.push(x);
            }
        })
        this.setState({ players: coll});
        //console.log('sorte....change..',this.state.players);
    }

    handleCheckBoxClick = function(e) {
        var dealerName = '';
        var nextDealerPos = 0;
        var dealingNumber = 3; //'xxx' ;
        var coll = [];
        coll = this.state.checkedDealers.map( (x,i) => {
            if (i===parseInt(e.target.value)){
                dealerName = this.state.players[i];
                nextDealerPos = i;
            }
           
            return i===parseInt(e.target.value) ? 'checked' : ''
        })
        this.setState({ checkedDealers: coll, dealerName, nextDealerPos, dealingNumber });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var allOK = true;

        var newPlayers = this.state.players && this.state.players.map( (x,i) => {
            if(allOK) allOK = x.length > 0
            return {name:x, score:0, total:0}
        })

        if (!allOK)
            alert('Please enter all players names')
        else{
            if (this.state.dealerName === '') {
                alert('Please select dealer')
                return false
            }
            const game = {gameKey:-999, 
                dealer: this.state.dealerName,
                nextDealerPos: this.state.nextDealerPos,
                dealingNumber: this.state.dealingNumber,
                players: newPlayers}
            this.props.handleSaveGameScores(game)
            .then((res) => {
                //console.log('redirect to dashboard...');
                this.props.history.push("/fetchPlayers");
            });
        }
            
      }

  render() {

    return (
        <form onSubmit={this.handleSubmit} noValidate> 
            <table class="table">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Player Name</th>
                        <th scope="col">1st Dealer</th>
                    </tr>
                </thead>
            
                <tbody>
                    {this.state.players.map((player, i) => {
                        //console.log('this.state.checkedDealers[i]',this.state.checkedDealers[i])
                        return (
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td><input type="text" id={i} className="playerName"
                                        name="playerName" value={player.name} 
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Player Name" />
                                </td>
                                <td><input type="checkbox" value={i} 
                                        checked={this.state.checkedDealers[i]}
                                        onClick={this.handleCheckBoxClick}  />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
  }
}

const mapStateToProps = ({players}) => ({
    players//: playersFunc.players
});

export default connect(null, actions)(AddPlayers);
