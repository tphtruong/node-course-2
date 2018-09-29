import React from 'react';
import { List } from 'immutable';

const renderHistoryList = (props) => {

    const removeGame = (e) => {
        
       // var thisRow = props.players[0];
        var ans = window.confirm('Are you sure you want to remove this item ?');
        if (e.target.id && ans){
            props.removeGame(e.target.id);
        }

    }

    var historyList = props.players;//.reverse();
    var rows = [];
    for (var e in historyList){

        const players = historyList[e].players;
        const dealer = historyList[e].dealer;

        players.map(player => {
            rows.push( 
                <div className="p-2 border flex-child">
                    <span className={`badge ${player.name === dealer ? 'icon-dealer' : ''}`}>
                        <h6>{player.name} </h6>
                    </span>
                    <span className={`badge ${player.score < 0 ? 'bg-danger text-white' : 'badge-primary'} badge-pill`}>{player.score}</span>
                </div>
            )
        })
        
        rows.push( 
            <div className="p-2 border flex-child btn-remove">
                <button className="form-control btn btn-primary text-dark-lg" 
                    id={historyList[e]._id}
                onClick={removeGame} >Remove ...</button>
            </div>
        )
    }

    return rows;
}

const HistoryList = (props) => {
    
    if(props.players === undefined || props.players.length===0) return null;
    console.log('hisstory:',props.players[0].dealer);

    return (
        <div className="panel panel-primary flex-wrapper">
            <div className="panel-heading">
                <h5>History</h5>
            </div>
            <div className="d-flex flex-wrap bg-light flex-parent">
                {props && renderHistoryList(props)}
            </div> 
        </div>
    )
}

export default HistoryList;