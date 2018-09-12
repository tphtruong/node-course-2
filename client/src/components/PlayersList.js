import React from 'react';
// import { List } from 'immutable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import HistoryList from './HistoryList';

// const { List } = require('immutable@4.0.0-rc.9')
class PlayersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checkSum: 0,
            scores: this.props.playersReducer,
            value: [0,0,0,0],
            // isReady:false
        }
        this.changePlayer = this.changePlayer.bind(this);
        this.submitScore = this.submitScore.bind(this)
        this.onScoreChange = this.onScoreChange.bind(this)
    }

    submitScore = function(e) {
        e.preventDefault();
        var players = this.props.playersReducer;
        var scores = this.state.value;
        players.map((player,i) => {
            console.log(player.name + '-' + player._id);
            console.log(scores[i]);
            player.score = scores[i];
            player.total += parseInt(player.score);
        })

        console.log(players);
        this.props.handleSaveGameScores(players);      
    }

    changePlayer = function(e) {
        var oldName = e.target.name;
        var person = prompt("Please enter your name", oldName !== undefined ? oldName : "???????");
        if (person != null) {
            var player = {
                _id: e.target.id,
                name: person,
                score:0,
                total:0
            }
            //this.setState({ players: newPlayers });
            this.props.handleUpdatePlayer(player);
        }
    }

    onScoreChange(e){

        // var hasScore = false;
        var checkSum = 0;
        // var isReady = false;
        if(e.target.id!==undefined){
            // const re = /^[0-9\b]+$/;
            var coll=[]
            var newVal = e.target.value; // parseInt(e.target.value); 
            
            //if (e.target.value == '' || re.test(e.target.value)){
            this.state.value.map( (x,i) => {
                // hasScore =  parseInt(x)>0 || parseInt(newVal)>0;
                //console.log('hascore',hasScore);

                if (i===parseInt(e.target.id)){
                    coll.push(newVal)
                    checkSum += parseInt(newVal);
                }else{
                    coll.push(x);
                    checkSum += parseInt(x);
                }
            })
            // if (hasScore && checkSum === 0 ){
            //     isReady=true;
            // }
            this.setState({value: coll, checkSum})
        }
     }
     
    renderPlayersList() {
        //const { instructions, properties } = this.props.playersReducer;
        //return <div>testing</div>;
        var rows = []
        var newScores = []
        var count = 0;
        for (var e in this.props.playersReducer){
            console.log('test', this.props.playersReducer[e].name)
            newScores.push({id:this.props.playersReducer[e]._id,score:0});
            rows.push (
                <div key={this.props.playersReducer[e]._id} className="card border-primary text-center bg-light mb-2" >
                    <h3 id={this.props.playersReducer[e]._id} 
                        onClick={this.changePlayer} 
                        name={this.props.playersReducer[e].name}
                        className="card-header">
                        {this.props.playersReducer[e].name}
                    </h3>
                    <div className="card-body">
                        <h5 className="card-title center">{this.props.playersReducer[e].total}</h5>         
                    </div>
                    <div className="card-footer">
                        <input id={count} value={this.state.value[count]} 
                                className="form-control text-center gameScore"
                                onChange={this.onScoreChange}/>
                    </div>         
                </div>              
            );
            count++;
        }

        rows.push (
            <div key="ctrlSummary" className="card border-primary text-center bg-light mb-2 summary" >
                <h3 className="card-header">Total</h3>
                <div className="card-body">
                    <h5 className="card-title center">{this.state.checkSum}</h5>    
                </div>              
                <div className="card-footer summary">
                    {/* {this.state.isReady ? ( */}
                        <button onClick={this.submitScore} >Submit</button>
                    {/* ) : (
                        <input type="text" value={this.state.checkSum} 
                            className="form-control text-center" />
                    )} */}
                    
                </div>                    
            </div> 
        )          
        return rows;
    }

    render() {
        //console.log('headerxxxs',this.props.scores);
        //debugger;
        if (!this.props.playersReducer) {
            return null;
        }
        return (
            <div className="card-group">
                {this.renderPlayersList()}
                {/* {this.props.playersReducer.map(player =>
                    <div key={player.id} className="card border-primary text-center bg-light mb-2" >
                        <h3 className="card-header">{player.name}</h3>
                        <div className="card-body">
                            <h5 className="card-title center">{player.total}</h5>         
                        </div>
                        <div className="card-footer">
                            <input type="text" value="0" className="form-control text-center"/>
                        </div>         
                    </div>                     
                )} */}

                 <HistoryList {...this.props.historyReducer} />    
            </div> 
        )
    }
}

function mapStateToProps(state){
    console.log('cccc',state);
    return {
        playersReducer : state.playersReducer,
        historyReducer : state.historyReducer
    }
}

export default connect(mapStateToProps,actions)(PlayersList);