import { takeEvery } from 'redux-saga/effects'
import * as types from '../actions/types'

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    action.author = params.username
    debugger;
    params.socket.send(JSON.stringify(action))
  })
}

export default handleNewMessage