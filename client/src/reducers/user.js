// import * as types from '../constants/ActionTypes'
import * as types from '../actions/types';

const user = (state = [], action) => {
  switch (action.type) {
    case `${types.USER_LOGIN}_FAILD`:
      return {user: action.payload};
    case `${types.USER_LOGIN}_FULFILLED`:
      return {user: action.payload};
    case `${types.USER_LOGOUT}_FULFILLED`:
      return {user: undefined};
    case `${types.FETCH_USER}`:
      return action.payload || false;
    default:
      return state
  }
}

export default user