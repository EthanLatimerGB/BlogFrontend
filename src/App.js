import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'

//redux
import { connect, useDispatch } from 'react-redux'
import { initialiseBlogs, createBlog, deleteBlog } from './reducers/blogReducer'
import { changeAuthor, changeLikes, changeTitle, changeURL } from './reducers/formReducer'
import { setTimedErrorNotification, setTimedNotification } from './reducers/notificationReducer'
import { changeUsername, changePassword, loginUser, initialiseUser } from './reducers/credentialReducer'
import { fetchAllUsers } from './reducers/usersReducer'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import ToggleVisibility from './components/toggle'

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

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: props.forms.Title,
            author: props.forms.Author,
            url: props.forms.URL,
            likes: props.forms.Likes
        }
        try{
            props.createBlog(newBlog)
            props.changeAuthor('')
            props.changeTitle('')
            props.changeLikes(0)
            props.changeURL('')
            props.setTimedNotification(`Sucessfully made a blog ${newBlog.title}`, 4000)
        }catch(exception){
            props.setTimedErrorNotification('Failed to create blog either due to server issues or missing/incorrect fields', 4000)
        }
    }

    const handleDeleteBlog = async (event, delBlog) => {
        event.preventDefault()
        if(window.confirm(`Are you sure you want to delete ${delBlog.title} created by ${delBlog.author}?`)){
            try{
                props.deleteBlog(delBlog.id)
                props.setTimedNotification(`Sucessfully deleted blog ${delBlog.title}`, 4000)
            }
            catch(error){
                props.setTimedErrorNotification('Failed to delete blog, you may not have permission to delete this', 4000)
            }
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: props.credentials.username, password: props.credentials.password
            })
            if(user){
                props.loginUser(user)
            }
            else{
                props.setTimedErrorNotification('Incorrect login details', 4000)
            }
        }
        catch(error){
            props.setTimedErrorNotification(`Error: ${error}`, 4000)
        }
    }

    const loginForm = () => (
        <form onSubmit = {handleLogin}>
            <h2>Login to the application</h2>
            <div>
                Username
                <input
                    type = 'text'
                    value = {props.credentials.username}
                    id = 'Username'
                    onChange = {({ target }) => props.changeUsername(target.value) } />
            </div>
            <div>
                Password
                <input
                    type = 'password'
                    value = {props.credentials.password}
                    id = 'Password'
                    onChange = {({ target }) => props.changePassword(target.value)}
                />
            </div>
            <div>
                <button id='login-button' type = 'submit'>Login</button>
            </div>
        </form>
    )

    const displayCreateBlogs = () => {
        return(
            <div>
                <ToggleVisibility buttonLabel="Create Blog">
                    <h2>Create new blogs</h2>
                    <BlogForm
                        title={props.forms.Title}
                        author={props.forms.Author}
                        url={props.forms.URL}
                        likes={props.forms.Likes}
                        handleTitle={({ target }) => props.changeTitle(target.value)}
                        handleAuthor={({ target }) => props.changeAuthor(target.value)}
                        handleUrl={({ target }) => props.changeURL(target.value)}
                        handleLikes={({ target }) => props.changeLikes(target.value)}
                        handleCreateBlog={handleCreateBlog}
                    />
                </ToggleVisibility>
            </div>
        )
    }

    const displayBlogs = () => {
        const blogs = props.blogs
        return(
            <div>
                <h2>List of Blogs</h2>
                <div>
                    {displayCreateBlogs()}
                </div>
                <div>
                    {
                        blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} handleDeleteBlog={(e) => handleDeleteBlog(e, blog)} likeInc={blogService.incrementBlogLikes}/> )
                    }
                </div>
            </div>
        )
    }

    const DisplayError = () => {
        if(props.notification.error === null){
            return null
        }else{
            return(
                <div className = 'errorStyle'>
                    <p>{props.notification.error}</p>
                </div>
            )
        }
    }

    const DisplayNotification = () => {
        if(props.notification.notification === null){
            return null
        }
        else{
            return(
                <div className='notificationStyle'>
                    <p>{props.notification.notification}</p>
                </div>
            )
        }
    }

    const DisplayUser = ( { users } ) => {
        const id = useParams().id
        const user = users.find((user) => user.id === id)
        if(!user){
            return null
        }
        return(
            <div>
                <h2>Users</h2>
                { user.blogs.length === 0 ? <p>No blogs have been created by this user</p> :
                    <ul>
                        {
                            user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
                        }
                    </ul>
                }
            </div>
        )
    }

    return(
        <Router>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/blogs'>Blogs</Link>
                <Link to='/users'>Users</Link>
            </div>
            <h1>BlogsList Application</h1>
            <DisplayError />
            <DisplayNotification />
            {props.credentials.user === null ? loginForm() : <div>
                <div>
                    Logged in as {props.credentials.user.name}
                    <button onClick = {handleLogout}>Log out</button>
                </div>
                <Switch>
                    <Route path='/blogs'>
                        <div>
                            {displayBlogs()}
                        </div>
                    </Route>
                    <Route path='/users/:id'>
                        <DisplayUser users={props.users}/>
                    </Route>
                    <Route path='/users'>
                        <div style={ { padding: '10px' } }>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Blogs Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.users.map((user) => {
                                            return(
                                                <tr key={user.id}>
                                                    <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                                                    <td>{user.blogs.length}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Route>
                    <Route path='/'>
                        <h2>Welcome to the BlogsList applicaton, use the navigation bar to look at users and blogs</h2>
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
    changeAuthor,
    changeTitle,
    changeLikes,
    changeURL,
    setTimedNotification,
    setTimedErrorNotification,
    changeUsername,
    changePassword,
    loginUser,
    initialiseUser,
    fetchAllUsers
}

export default connect(mapStateToProps,mapDispatchToProps)(App)