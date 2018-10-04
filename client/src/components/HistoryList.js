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
        const currDealerPos = historyList[e].nextDealerPos;
        console.log('curr',currDealerPos);

        //console.log(players[0].score + ',' + players[1].score  + ',' +  players[2].score  + ',' +  players[3].score  );

        if (players[0].score === 0 && players[1].score === 0  && players[2].score === 0  && players[3].score === 0 ) continue;

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
                    disabled={props.user.role !== 'admin'}
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