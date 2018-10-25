// ACTION CREATOR
import axios from 'axios';
import * as types from './types';
import { takeEvery } from 'redux-saga/effects';
import setupSocket from '../sockets/setupSocket';

//const socket = setupSocket(dispatch,'Me');

const handleNewMessage = function* handleNewMessage(params) {
    yield takeEvery(types.ADD_MESSAGE, (action) => {
      debugger;
      action.author = params.username
      params.socket.send(JSON.stringify(action))
    })
  }

let socket = () => {};

export const openSocket = (user) =>   
  async (dispatch) => {             // this is a dispatch function by Redux-Thunk
      console.log('openSocket ... user', user);
      console.log('dispatch-res', dispatch);
      
  }

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
  
    dispatch({ type:  `${types.FETCH_USER}`, payload: res.data });
  };
  
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
        dispatch({ 
            type : `${types.FETCH_PLAYERS}_PENDING`, 
            players: [] ,
            isLoading: true
        })       
        
        const res = await axios.get('/api/fetchPlayers')
        dispatch({ 
            type : `${types.FETCH_PLAYERS}_FULFILLED`, 
            players: res.data ,
            isLoading: false
        })
}
//removeGame
export const removeGame = (gamedId) =>   
async (dispatch) => {             // this is a dispatch function by Redux-Thunk
    dispatch({ 
        type : `${types.FETCH_PLAYERS}_PENDING`, 
        players: [] ,
        isLoading: true
    })       
    console.log('remve game iod...', gamedId);

    const res1 = await axios.post('/api/removeGame/'+gamedId)
    console.log('delete history for game...', res1);
    const res = await axios.get('/api/fetchPlayers')
    dispatch({ 
        type : `${types.FETCH_PLAYERS}_FULFILLED`, 
        players: res.data || [],
        isLoading: false
    });
}

export const handleUserLogin = (username, password) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const user = {username,password};
        const res = await axios.post('/api/userLogin', user);
        //debugger;

        //openSocket(user);
        socket = setupSocket(dispatch,user.username);
        //sagaMiddleware.run(handleNewMessage, { socket, username });
        console.log('sagaMiddleware',socket);

        //handleNewMessage, { socket, username }
        
        dispatch({ 
            type : `${types.USER_LOGIN}_FULFILLED`, 
            payload: res.data 
        });
    }

export const handleUserLogout = () =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        // localStorage.setItem('usertoken', null);
        // localStorage.setItem('username', null);
        //let user = localStorage.getItem('username');
        let user = window.sessionStorage.getItem('username');

        //localStorage.clear();
        window.sessionStorage.clear();
        //const res = await axios.post('/api/userLogout', user);
        socket.send(JSON.stringify({
            type: types.REMOVE_USER,
            author: user,
            message: 'user logout'
          }))

        dispatch({ 
            type : `${types.USER_LOGOUT}_FULFILLED`, 
            payload: null
        });
    }

export const clearHistory = () =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        dispatch({ 
            type : `${types.FETCH_PLAYERS}_PENDING`, 
            players: [] ,
            isLoading: true
        })       
        const res1 = await axios.post('/api/clearHistory')
        //console.log('clear history', res1);
        const res = await axios.get('/api/fetchPlayers')
        dispatch({ 
            type : `${types.FETCH_PLAYERS}_FULFILLED`, 
            players: res.data || [],
            isLoading: false
        });
}

export const handleToken = (token) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/stripe', token);
        console.log('action-stripe', token);
        console.log('action-res', res);
        
        dispatch({ type : types.FETCH_PLAYERS, payload: res.data });
    }

export const handleSaveGameScores = (game) => 
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk

        dispatch({ 
            type : `${types.ADD_PLAYERS}_PENDING`, 
            payload: [] ,
            isLoading: true
        })   

        const res = await axios.post('/api/addgame',game)
        console.log('action-save-game-score-response',res.config.data);

        dispatch({ 
            type : `${types.ADD_PLAYERS}_FULFILLED`, 
            payload: res.data ,
            isLoading: false
        });
    }

export const handleAddPlayers = (players) => 
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/addPlayers',players)
        //console.log('action-players',players);

        console.log('action-res',res.config.data);
        //dispatch(addTodoSuccess(res.config.data));
        dispatch({ type : types.ADD_PLAYERS, payload: res.data });
    }



export const handleUpdatePlayer = (player) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/updatePlayer', player);
        console.log('action-update-player', player);
        console.log('action-update-player-res', res);
        
        dispatch({ type : types.UPDATE_PLAYER, payload: res.data });
    }  
const addTodoSuccess = data => ({
    type: types.ADD_PLAYERS_SUCCESS,
        payload: {
            players: data
        }
});
      