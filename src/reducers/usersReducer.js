import usersService from '../services/users'

const userReducer = (state=[], action) => {
    switch(action.type){
        case'INIT-USERS':
            return action.data
        default:
            return state
    }
}

export const fetchAllUsers = () => {
    return async dispatch => {
        const users = await usersService.fetchUsers()
        dispatch({
            type: 'INIT-USERS',
            data: users
        })
    }
}

export default userReducer