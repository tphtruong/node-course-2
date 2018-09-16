import React from 'react';
import { List } from 'immutable';

const renderHistoryList = (props) => {

    var historyList = props.players;//.reverse();
    var rows = [];
    for (var e in historyList){

        const players = historyList[e].players;

        players.map(player => {
            rows.push( 
                <div className="p-2 border flex-child">
                    <span><h6>{player.name} </h6></span>
                    <span className={`badge ${player.score < 0 ? 'bg-danger text-white' : 'badge-primary'} badge-pill`}>{player.score}</span>
                </div>
            )
        })
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