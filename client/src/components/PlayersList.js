import React from 'react';
// import * as actions from '../actions';


const renderPlayersList = (props) => {

    console.log('renderPlayersList-props',props.user);

    if(props.players === undefined || props.players.length===0) return null;

     //debugger;
    var rows = []
    var count = 0;
    // for (var e in players){
    //     var player = players[e];

    const submitPlayerScores = (e) => {
        var firstRows = props.players[0];
        props.submitScore(e,firstRows.players);
    }
    
    const setGameDealer = (e) => {
        var firstRows = props.players[0];
        props.setDealer(e,firstRows.players);
    }

    const renderDealIcon = (props) => {
        if (props.nextDealerPos > -1 && props.nextDealerPos < 4) {
            return <span className="badge badge-primary badge-pill">{props.nextDealerPos}</span>;
        }
        return null;
    }

    var firstRows = props.players[0];
    var dealerName = "";

    firstRows.players.map((player,count) => {
        
        var dealerPos = (pos) => {
            if (firstRows.nextDealerPos > -1 && firstRows.nextDealerPos < 4 && firstRows.nextDealerPos === pos) {
                dealerName = player.name;

                return <span className="badge badge-primary badge-pill">{firstRows.dealingNumber}</span>;
            } 
            return null;
        }

        
        rows.push(
           <div key={player._id} className="card border-primary text-center bg-light mb-2" >
               
                <h3 id={player._id} 
                    onClick={setGameDealer} 
                    name={player.name}
                    className={`card-header badge-container ${dealerPos(count)!==null ? 'dealer-badge' : ''}`}>
                    {player.name}   
                    {dealerPos(count)}     
                </h3>

                <div className={`card-body ${player.total < 0 ? 'text-alert' : 'text-primary'}`}>
                    <h3 className="card-title center">{player.total}</h3>         
                </div>
                {props.user.role === 'admin' && <div className="card-footer">
                    <input id={count} value={props.value[count]} name={player.name}
                            className="form-control text-center gameScore" type="number"
                            onFocus={(e)=>e.target.select()}
                            onChange={props.onScoreChange}/>
                </div>}         
            </div>              
        )
        count++;
    });
    // }

    rows.push (
        <div key="ctrlSummary" className="card border-primary text-center bg-light mb-2 summary" >
            <h3 className="card-header">Total</h3>
            <div className="card-body">
                <h3 className="card-title center">{props.checkSum}</h3>    
            </div>              
            {props.user.role === 'admin' && <div className="card-footer summary">
                <button className="form-control btn btn-primary text-dark-lg" 
                        data-dealername={dealerName}
                        disabled={props.checkSum!==0 || !props.hasScore || props.user.role !== 'admin'}
                        onClick={submitPlayerScores} >Submit</button>
            </div>}                    
        </div> 
    )        
    return rows;
}


const PlayersList = (props) => {
    console.log('player-component-players:',props)
    return (
        <div className="card-group">
            {renderPlayersList(props)} 
        </div> 
    )
}

export default PlayersList;