import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlayersList from '../components/PlayersList';
import HistoryList from '../components/HistoryList';

class GameContainer extends React.Component {
    componentDidMount() {
        // console.log('component mounted');
        this.props.fetchPlayers();
        this.input = React.createRef();
      }
      
    constructor(props){
        super(props);
        this.state = {
            checkSum: 0,
            value: [0,0,0,0],
            dealingPatern:'',
            dealingNumber: props.dealingNumber,
            nextDealerPos: props.nextDealerPos,
            nextKeyId:0,
            playersScore:[],
            dealerName: props.dealer,
            hasScore:false
        }
    }

    setPlayersScore = (playersScore) => {this.setState(playersScore)};

    setDealer = function(e, playerList) {
        e.preventDefault();
        var resp = 'y'; // prompt("Enter 'Y' to set dealer");
        //var person = e.target.name;
        
        var personId = e.target.id ;
        if (personId && (resp === 'Y' || resp === 'y')){
            //console.log(this.state.players[person].id);
            var nextDealerPos = -1;
            var dealingPatern = 'xxx' ;
            var nextPlayerPos =-1;

            if (playerList.length === 4){

                playerList.map( (x,count) => {
                    if(x._id === personId) {
                        nextPlayerPos=count;
                    }
                })

                var theNum = nextPlayerPos > 3 ? 0 : nextPlayerPos;
                if (theNum !== -1) {
                    dealingPatern = 'xxx';
                    this.setState({nextDealerPos:theNum, dealingPatern, value: [0,0,0,0], checkSum: 0}) 
                    console.log('nextPlayerPos',theNum);
                }
                
            }
        }

    }

    submitScore = function(e, playerList) {
        e.preventDefault();
        // if (nextPlayerPos === -1 || dealingPatern === ''){
        //     alert('Please set dealer name.');
        //     return false;
        // }
        //var players = this.props.players;
        var scores = this.state.value;
        var hasScore = false;
        var nextKeyId = this.state.nextKeyId;
        playerList.map((player,i) => {
            nextKeyId ++
            if (!hasScore && parseInt(scores[i]) !== 0)
                hasScore = true;

            player.score = scores[i];
            player.total += parseInt(player.score);
            player.gameKey = nextKeyId;
        })

        if (this.state.checkSum !== 0 || !hasScore) {
            alert('Something wrong with total scores.\nPlease check again.')
            return false;
        }

        var thisGame = this.props.players[0];

        // if (this.props.nextPlayerPos === -1 || dealingPatern === ''){
        //     alert('Please set dealer name.')
        // } else {

            //set next dealing position
            // dealingPatern = dealingPatern.substring(1) + 'O'; // this.state.dealingPatern.slice(1);
            let thisNumber =  thisGame.dealingNumber - 1;
            let nextPos = thisGame.nextDealerPos;
            if (thisNumber < 1) {
                nextPos++;
                if (nextPos === 4) nextPos = 0
                thisNumber = 3;
            }       
            this.setState({value: [0,0,0,0],checkSum: 0,hasScore:false}) 

            // console.log(playerList);



            const game = {gameKey:nextKeyId,
                        dealer: thisGame.dealer,
                        nextDealerPos: nextPos,
                        dealingNumber: thisNumber,
                        players: playerList
                    }
            this.props.handleSaveGameScores(game);  


        // }
    
    }

    onPlayerChange = function(e) {
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
        var checkSum = 0;
        if(e.target.id!==undefined){
            // const re = /^[0-9\b]+$/;
            var coll=[];
            let hasScore = false;
            var scores = this.state.value;
            var newVal = e.target.value; // parseInt(e.target.value); 
            this.state.value.map( (x,i) => {
                if (!hasScore && parseInt(scores[i]) !== 0)
                    hasScore = true;

                if (i===parseInt(e.target.id)){
                    coll.push(newVal)
                    checkSum += parseInt(newVal);
                }else{
                    coll.push(x);
                    checkSum += parseInt(x);
                }
            })
            this.setState({value: coll, checkSum, hasScore})
        }   
    }

    render(dealerList) {
        console.log('component rendering...', dealerList);
        return (
            <div className="card-group">
                <PlayersList
                  onScoreChange={this.onScoreChange.bind(this)}
                  onPlayerChange={this.onPlayerChange.bind(this)}
                  submitScore={this.submitScore.bind(this)}
                  checkSum={this.state.checkSum}
                  hasScore={this.state.hasScore}
                  value={this.state.value}
                  players={this.props.players}
                  setDealer={this.setDealer.bind(this)}
                  dealingPatern={this.state.dealingPatern}
                  nextDealerPos={this.props.nextDealerPos}
                  dealingNumber={this.props.dealingNumber}
                  dealerName={this.state.dealerName}

                   />
                <HistoryList {...this.props}  />
            </div> 
        )
    }
}

function mapStateToProps(state){
    //console.log('game-mapstatetoProp',state.players.length > 0 ? state.players[0].players : undefined);
    //const {gameKey , players} = state;
    //debugger;
    return {
        players : state.players
        // gameKey : state.players.length > 0 ? state.players[0].gameKey : undefined,
        // historyReducer : state.historyReducer
    }
}

export default connect(mapStateToProps,actions)(GameContainer);