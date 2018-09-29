import * as types from '../actions/types'
import { addUser, messageReceived, populateUsersList } from '../actions'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onopen = () => {


    //socket.send('on open message from client', username);
    if (typeof(username) === 'string'){
      debugger;
      socket.send(JSON.stringify({
        type: types.ADD_USER,
        name: username
      }))
    }

  }
  socket.onmessage = (event) => {
    debugger;

    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      // case types.ADD_USER:
      //   dispatch(addUser(data.name))
      //   break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
      // case types.USER_LOGIN:
      //   dispatch(addUser(data.name))
      //   break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
