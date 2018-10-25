import * as types from '../actions/types'
// import { addUser, messageReceived, populateUsersList } from '../actions'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989')

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
