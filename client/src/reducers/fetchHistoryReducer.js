// this is REDUX STORE
import * as types from '../actions/types';

const fetchHistoryReducer = (state={}, action) => {
    console.log('from history reducers',action); //STEP: 6 (REACT BOOTS UP)
    //debugger;
    switch (action.type) {
        case types.FETCH_HISTORY:
            return {
                history : action.history
            };
        default:
            return state;
    }
}

export default fetchHistoryReducer;
