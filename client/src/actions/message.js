// ACTION CREATOR
import axios from 'axios';
import * as types from './types';

let nextMessageId = 0
const nextUserId = 0

export const addMessage = (message) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const res = await axios.post('/api/addMessage', message);
        console.log('action-add message', message);
        console.log('action-res', res);
        
        dispatch({ 
            type : `${types.ADD_MESSAGE}`, 
            id: nextMessageId++,
            message: res.message,
            author: res.author
        });
    }

export const handleUserLogin = (username,password) =>   
    async (dispatch) => {             // this is a dispatch function by Redux-Thunk
        const user = {username,password}
        const res = await axios.post('/api/userLogin', user);

        if (res.data === "OK"){           
            dispatch({ 
                type : `${types.USER_LOGIN_SUSSESS}`, 
                author: username
            });
        } else {
            dispatch({ 
                type : `${types.USER_LOGIN_FAILED}`, 
                author: null
            });
        }
    }

// export const addUser = name => ({
//         type: types.ADD_USER,
//         id: nextUserId++,
//         name
//       })
    //console.log('action-players',players);

    //console.log('action-res',res.config.data);
    //dispatch(addTodoSuccess(res.config.data));
    
}




    //   export const messageReceived = (message, author) => ({
    //     type: types.MESSAGE_RECEIVED,
    //     id: nextMessageId++,
    //     message,
    //     author
    //   })
      
    //   export const populateUsersList = users => ({
    //     type: types.USERS_LIST,
    //     users
    //   })