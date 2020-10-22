let initialState = {
    Title: '',
    Author: '',
    URL: '',
    Likes: 0,
}

const formReducer = (state=initialState, action) => {
    switch(action.type){
    case'CHANGE-TITLE':
        return Object.assign({}, state, {
            Title: action.data
        })
    case'CHANGE-AUTHOR':
        return Object.assign({}, state, {
            Author: action.data
        })
    case'CHANGE-URL':
        return Object.assign({}, state, {
            URL: action.data
        })
    case'CHANGE-LIKES':
        return Object.assign({}, state, {
            Likes: action.data
        })
    default:
        return state
    }
}

export const changeTitle = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-TITLE',
            data: data,
        })
    }
}

export const changeAuthor = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-AUTHOR',
            data: data,
        })
    }
}

export const changeURL = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-URL',
            data: data,
        })
    }
}

export const changeLikes = (data) => {
    return async dispatch => {
        dispatch({
            type: 'CHANGE-LIKES',
            data: data,
        })
    }
}


export default formReducer