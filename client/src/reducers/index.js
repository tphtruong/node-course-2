import { combineReducers } from 'redux';
import fetchPlayersReducer from './fetchPlayersReducer';
import fetchHistoryReducer from './fetchHistoryReducer';

export default combineReducers ({
    playersReducer: fetchPlayersReducer,
    historyReducer: fetchHistoryReducer
})