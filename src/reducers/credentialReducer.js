import blogService from '../services/blogs'
import { setTimedErrorNotification, setTimedNotification } from '../reducers/notificationReducer'

let initialState = {
    username: '',
    password: '',
    user: null
}

const credentialReducer = (state=initialState, action) => {
    switch(action.type){
    case'SAVE-USER':
        return Object.assign({}, state, {
            user: action.data
        })
    case'CHANGE-USERNAME':
        return Object.assign({}, state, {
            username: action.data
        })
    case'CHANGE-PASSWORD':
        return Object.assign({}, state, {
            password: action.data
        })
    default:
        return state
    }
}

export const changeUsername = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-USERNAME',
            data: data
        })
    }
}

export const changePassword = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-PASSWORD',
            data: data
        })
    }
}

export const loginUser = (user) => {
    return async (dispatch) => {
        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'SAVE-USER',
            data: user
        })
        dispatch({
            type: 'CHANGE-USERNAME',
            data: ''
        })
        dispatch({
            type: 'CHANGE-PASSWORD',
            data: ''
        })
        setTimedNotification('Logged in')
    }
}

export const initialiseUser = (data) => {
    return async dispatch => {
        dispatch({
            type: 'SAVE-USER',
            data: data
        })
    }
}


export default credentialReducer