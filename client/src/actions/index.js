// ACTION CREATOR
import axios from 'axios';
import * as types from './types';

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
        dispatch({ 
            type : types.FETCH_PLAYERS, 
            players: res.data 
        })

        // const hist = await axios.get('/api/fetchHistory')
        // console.log('history-from-action',hist);
        // dispatch({ 
        //     type : types.FETCH_HISTORY, 
        //     histoty: hist.data 
        // })
}

export const fetchHistory = () =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.get('/api/fetchHistory')
        console.log('history-action',res);
        dispatch({ type : types.FETCH_HISTORY, history: res.data });


        // return axios.get(...)
        // .then((response) => {
        //      return axios.get(...); // using response.data
        // })
        // .then((response) => {
        //       return {
        //           type: FETCH_TRACKS,
        //           payload: response.data;
        //       };
        // });


}

export const handleToken = (token) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/stripe', token);
        console.log('action-stripe', token);
        console.log('action-res', res);
        
        dispatch({ type : types.FETCH_PLAYERS, payload: res.data });
    }


 export const handleUpdatePlayer = (player) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/updatePlayer', player);
        console.log('action-update-player', player);
        console.log('action-update-player-res', res);
        
        dispatch({ type : types.UPDATE_PLAYER, payload: res.data });
    }

export const handleSaveGameScores = (players) => 
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/saveGameScores',players)
        //console.log('action-players',players);

        console.log('action-res',res.config.data);
        dispatch({ type : types.SAVE_GAME_SCORES, payload: res.data });
    }

export const handleAddPlayers = (players) => 
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/addPlayers',players)
        //console.log('action-players',players);

        console.log('action-res',res.config.data);
        dispatch(addTodoSuccess(res.config.data));

        // dispatch({ type : types.ADD_PLAYERS, 
        //     payload: (action, state, res) => {
        //         console.log('action-action',action);
        //         console.log('action-state',state);
        //         console.log('action-res-res',res);
                
        //         return res.json().then(json => {
        //           //browserHistory.push('/dashboard');

        //           console.log('action-json',json);
        //           return json;
        //         })// res.config.data 
        //     }
        // });
    }

    
const addTodoSuccess = data => ({
    type: types.ADD_PLAYERS_SUCCESS,
        payload: {
            players: data
        }
});
      