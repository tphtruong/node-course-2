import React from 'react';
import { connect } from 'react-redux';


const renderPlayersList = (players) => {
    console.log('renderPlauyerList', players)        
    return null;
}

const mapStateToProps = ({players}) => ({
    players//: playersFunc.players
});

const PlayersList = ({ players }) => {
    // console.log(';;;;;;;;;;;;;;;loading', loading) 
    console.log('..............players', players) 

    return (
        <div className="card-group">
            {renderPlayersList(players)} 
        </div> 
    )
}

export default connect(mapStateToProps)(PlayersList);