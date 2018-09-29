// this is REDUX STORE
import * as types from '../actions/types';

const fetchPlayersReducer = (state=[], action) => {
    console.log('from players reducers',action); //STEP: 6 (REACT BOOTS UP)
    //debugger;
    switch (action.type) {
        case `${types.ADD_PLAYERS}_PENDING`:
            // return action.payload || false;
            return {
                payload: action.payload,
                isLoading: action.isLoading
            };
            
        case `${types.ADD_PLAYERS}_FULFILLED`:
            // return action.payload || false;
            return {
                payload: action.payload,
                isLoading: action.isLoading
            };      
            
        case types.CLEAR_HISTORY:
            return {
                history : action.history
            };
        case `${types.CLEAR_HISTORY}_PENDING`:
            // return action.payload || false;
            return {
                payload: action.players,
                isLoading: action.isLoading
            };
        case `${types.FETCH_PLAYERS}_PENDING`:
            // return action.payload || false;
            return {
                payload: action.players,
                isLoading: action.isLoading
            };
        case `${types.FETCH_PLAYERS}_FULFILLED`:
            // return action.payload || false;
            return {
                payload: action.players,
                isLoading: action.isLoading
            };

        case types.SAVE_GAME_SCORES:
            return action.payload;
        // case types.ADD_PLAYERS_SUCCESS:
        //     //return action.payload ;  //Object.assign(state.players,action.payload);
        //     return {
        //         loading: false,
        //         error: null,
        //         players: action.payload
        //     };
        // case types.ADD_PLAYERS_FAILURE:
        //     return {
        //         players: null,
        //         loading: false,
        //         error: action.payload.error
        //     };
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
