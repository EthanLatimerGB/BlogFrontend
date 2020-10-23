import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//redux
import { connect, useDispatch } from 'react-redux'
import { initialiseBlogs, createBlog, deleteBlog, updateBlogComments } from './reducers/blogReducer'
import { setTimedErrorNotification, setTimedNotification } from './reducers/notificationReducer'
import { initialiseUser } from './reducers/credentialReducer'
import { fetchAllUsers } from './reducers/usersReducer'

import DisplayUser from './components/DisplayUser'
import DisplayUsers from './components/DisplayUsers'
import DisplayBlogs from './components/DisplayBlogs'
import blogService from './services/blogs'
import NavBar from './components/navBar'
import LoginForm from './components/LoginForm'
import BlogInformation from './components/BlogInformation'
import { DisplayError, DisplayNotification } from './components/Notifications'

const App = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const checkForLocalUser = () => {
            const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
            if(loggedUserJson){
                const user = JSON.parse(loggedUserJson)
                props.initialiseUser(user)
                blogService.setToken(user.token)
            }
        }

        dispatch(initialiseBlogs())
        checkForLocalUser()
        dispatch(fetchAllUsers())

    }, [dispatch])


    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        props.initialiseUser(null)
    }


    return(
        <Router>
            <NavBar/>
            <h1>BlogsList Application</h1>
            <DisplayError message={props.notification.error}/>
            <DisplayNotification message={props.notification.notification}/>
            {props.credentials.user === null ? <LoginForm/> : <div>
                <div>
                    Logged in as {props.credentials.user.name}
                    <button onClick = {handleLogout}>Log out</button>
                </div>
                <Switch>
                    <Route path='/blogs/:id'>
                        <BlogInformation blogs={props.blogs} />
                    </Route>
                    <Route path='/blogs'>
                        <DisplayBlogs/>
                    </Route>
                    <Route path='/users/:id'>
                        <DisplayUser users={props.users}/>
                    </Route>
                    <Route path='/users'>
                        <DisplayUsers/>
                    </Route>
                    <Route path='/'>
                        <h2>Welcome to the Blog applicaton, use the navigation bar to look at users and blogs</h2>
                    </Route>
                </Switch>
            </div>}
        </Router>
    )
}

const mapStateToProps = (state) => {
    return{
        blogs: state.blogs,
        forms: state.forms,
        notification: state.notification,
        credentials: state.credentials,
        users: state.users
    }
}

const mapDispatchToProps = {
    initialiseBlogs,
    deleteBlog,
    createBlog,
    setTimedNotification,
    setTimedErrorNotification,
    initialiseUser,
    fetchAllUsers,
    updateBlogComments
}

export default connect(mapStateToProps,mapDispatchToProps)(App)