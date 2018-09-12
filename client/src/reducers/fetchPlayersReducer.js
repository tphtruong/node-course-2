// this is REDUX STORE
import * as types from '../actions/types';

const fetchPlayersReducer = (state={}, action) => {
    console.log('from reducers',action); //STEP: 6 (REACT BOOTS UP)
    //debugger;
    switch (action.type) {
        case types.ADD_PLAYERS:
            //return action.payload || false;
            return {
                loading: true,
                error: null,
                players: action.payload || false
            };
        case types.UPDATE_PLAYER:
            return action.payload || false;
        case types.FETCH_PLAYERS:
            return action.players || false;
        case types.SAVE_GAME_SCORES:
            return action.payload;
        case types.ADD_PLAYERS_SUCCESS:
            //return action.payload ;  //Object.assign(state.players,action.payload);
            return {
                loading: false,
                error: null,
                players: action.payload
            };
        case types.ADD_PLAYERS_FAILURE:
            return {
                players: null,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default fetchPlayersReducer;

// import { Map } from 'immutable';
// import { handleActions } from 'redux-actions';
// import * as types from '../actions/types';

// const fetchPlayersReducer = handleActions({
//     [`${types.ADD_PLAYERS}_FULFILLED`]: (state, action) => state
//         .setIn(['loading'], false)
//         .setIn(['unauthorizedReason'], undefined)
//         .setIn(['successMessage'], action.payload),
//     [`${types.ADD_PLAYERS}_PENDING`]: (state) => state
//         .set('loading', true)
//         .set('unauthorizedReason', undefined),
//     [`${types.ADD_PLAYERS}_REJECTED`]: (state, action) => state
//         .set('loading', false)
//         .set('unauthorizedReason', action.payload),
//     [`${types.ADD_PLAYERS}_FULFILLED`]: (state, action) => state
//         .setIn(['loading'], false)
//         .setIn(['unauthorizedReason'], undefined)
//         .setIn(['successMessage'], action.payload),
//     [`${types.ADD_PLAYERS}_PENDING`]: (state) => state
//         .set('loading', true)
//         .set('unauthorizedReason', undefined),
//     [`${types.ADD_PLAYERS}_REJECTED`]: (state, action) => state
//         .set('loading', false)
//         .set('unauthorizedReason', action.payload),
// }, new Map({ loading: false, unauthorizedReason: undefined, successMessage: undefined }));

// export default fetchPlayersReducer;
