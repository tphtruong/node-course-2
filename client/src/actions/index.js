// ACTION CREATOR

import axios from 'axios';
import { FETCH_PLAYERS } from './types';

export const fetchPlayers = () => 
    //REMEMBER : Before, normally we would do the following
    /*
    const req = axios.get('/api/fetchPlayers');
    return {
        type : FETCH_PLAYERS,
        payload : req
    }
    */

    //STEP: 3 (FETCH PLAYERS) ====> EXPRESS API 
    //      4  SERVER SEND BACK payload : Players
    //      5  dispatch (action) ===> reducers

    //BUT now, we are going to get direct access to the dispatch function
    // with the help of Redux-thunk (see below)
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.get('/api/fetchPlayers')
        console.log('res',res);
        dispatch({ type : FETCH_PLAYERS, payload: res.data });
    }

    
