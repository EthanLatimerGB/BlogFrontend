import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import formRouter from './reducers/formReducer'
import notificationRouter from './reducers/notificationReducer'
import credentialReducer from './reducers/credentialReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    forms: formRouter,
    notification: notificationRouter,
    credentials: credentialReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

store.subscribe(() => console.log(store.getState()))

export default store