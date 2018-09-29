// import * as types from '../constants/ActionTypes'
import * as types from '../actions/types';

const users = (state = [], action) => {
  debugger;
  switch (action.type) {
    // case types.ADD_USER:
    //   return state.concat([{ 
    //     username: action.username, 
    //     id: action.id,
    //     isLoggedIn: action.isLoggedIn || false, 
    //   }])
    case types.USERS_LIST:
      return action.users
    case `${types.USER_LOGIN}_FULFILLED`:
      return state.concat([{ 
        error: action.error, 
        users: action.users,
        me: action.me
      }])
    default:
      return state
  }
}

export default users