// this is REDUX STORE
import { FETCH_PLAYERS } from '../actions/types';

const fetchPlayersReducer = (state={}, action) => {
    console.log('actionsss',action.payload); //STEP: 6 (REACT BOOTS UP)

    switch (action.type) {
        case FETCH_PLAYERS:
            return action.payload || false;
        //     break;
        //      //STEP: 7 (new 'playerReducer' piece of state will be sent to PlayerList
        default:
            return state;
    }
}

export default fetchPlayersReducer;