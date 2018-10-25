import axios from 'axios';
import * as types from '../actions/types'
// import { addUser, messageReceived, populateUsersList } from '../actions'

const setupSocket = (dispatch, username) => {
  
  let HOST //= window.location.origin.replace(/^http/, 'ws').replace('3000','8989')
  if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys
    HOST = window.location.origin.replace(/^http/, 'ws') + ':8989'
  } else {
    // we are in development - return the dev keys!!!
    HOST = window.location.origin.replace(/^http/, 'ws').replace('3000','8989')
  }

  //var socketURL = HOST + ':' + process.env.PORT||'8989'
  //HOST = 'ws://localhost:8989'
  //console.log('host',HOST);
  //var ws = new WebSocket(HOST);
  const socket = new WebSocket(HOST) //'ws://localhost:8989')

  socket.onopen = () => {

    //socket.send('on open message from client', username);
    if (typeof(username) === 'string'){
      socket.send(JSON.stringify({
        type: types.ADD_USER,
        author: username,
        message: 'user login'
      }))
    }

  }

  socket.onmessage = (event) => {
    //debugger;
    console.log('onmessage',event.data);

    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        console.log(data.message + ',' + data.author);
        //dispatch(messageReceived(data.message, data.author))
        break
      case types.ADD_SCORE:
        //dispatch(addUser(data.name))
        console.log('add score',data);

        const temp = async (dispatch) => {             // TODO: make this as a global func
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

        temp(dispatch);

        break
      case types.USERS_LIST:
        //dispatch(populateUsersList(data.users))
        console.log('USER LIST:...',data);
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
