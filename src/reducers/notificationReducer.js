const initialState = {
    notification: null,
    error: null
}

const notificationReducer = (state=initialState, action) => {
    switch(action.type){
    case'SAVE-NOTIFICATION':
        return Object.assign({}, state, {
            notification: action.data
        })
    case'SAVE-ERROR':
        return Object.assign({}, state, {
            error: action.data
        })
    default:
        return state
    }
}

let timeoutID

export const setTimedNotification = (data, time) => {
    return async dispatch => {
        clearTimeout(timeoutID)

        dispatch({
            type: 'SAVE-NOTIFICATION',
            data: data
        })

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'SAVE-NOTIFICATION',
                data: null
            })
        }, time)
    }
}

export const setTimedErrorNotification = (data, time) => {
    return async dispatch => {
        clearTimeout(timeoutID)

        dispatch({
            type: 'SAVE-ERROR',
            data: data
        })

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'SAVE-ERROR',
                data: null
            })
        }, time)
    }
}

export default notificationReducer
