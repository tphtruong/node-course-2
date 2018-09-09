import { combineReducers } from 'redux';
import fetchPlayersReducer from './fetchPlayersReducer';

export default combineReducers ({
    playersReducer: fetchPlayersReducer
})