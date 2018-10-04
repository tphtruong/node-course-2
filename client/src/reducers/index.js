import { combineReducers } from 'redux';
import fetchPlayersReducer from './fetchPlayersReducer';
import user from './user';

export default combineReducers ({
    players: fetchPlayersReducer,
    user
})