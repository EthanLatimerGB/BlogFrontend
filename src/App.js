import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import ToggleVisibility from './components/toggle'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)


    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlogs = await blogService.getAll()
            setBlogs(fetchedBlogs)
        }
        fetchBlog()
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJson){
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
            likes: likes
        }
        try{
            const response = await blogService.create(newBlog)
            setBlogs(blogs.concat(response))
            setTitle('')
            setAuthor('')
            setUrl('')
            setLikes(0)
            setNotification('Successfully made a blog: ', response.title)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }catch(exception){
            setError('Failed to create blog either due to server issues or missing/incorrect fields')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification('Logged in')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }catch(exception){
            setError('Wrong credentials')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit = {handleLogin}>
            <h2>Login to the application</h2>
            <div>
                Username
                <input
                    type = 'text'
                    value = {username}
                    name = 'Username'
                    onChange = {({ target }) => setUsername(target.value)} />
            </div>
            <div>
                Password
                <input
                    type = 'password'
                    value = {password}
                    name = 'Password'
                    onChange = {({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                <button type = 'submit'>Login</button>
            </div>
        </form>
    )

    const displayNotes = () => {
        return(
            <div>
                {
                    blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog}/> )
                }
            </div>
        )
    }

    const displayCreateBlogs = () => {
        return(
            <div>
                <ToggleVisibility buttonLabel="Create Blog">
                    <BlogForm
                        title={title}
                        author={author}
                        url={url}
                        likes={likes}
                        handleTitle={({ target }) => setTitle(target.value)}
                        handleAuthor={({ target }) => setAuthor(target.value)}
                        handleUrl={({ target }) => setUrl(target.value)}
                        handleLikes={({ target }) => setLikes(target.value)}
                        handleCreateBlog={handleCreateBlog}
                    />
                </ToggleVisibility>
            </div>
        )
    }

    const displayLoggedIn = () => (
        <div>
            <div>
                Logged in as {user.name}
                <button onClick = {handleLogout}>Log out</button>
            </div>
            <div>
                <h2>Create new blogs</h2>
                {displayCreateBlogs()}
            </div>
            <div>
                <h2>List of Blogs</h2>
                {displayNotes()}
            </div>
        </div>
    )

    const DisplayError = ({ message }) => {
        if(message === null){
            return null
        }else{
            return(
                <div className = 'errorStyle'>
                    <p>{message}</p>
                </div>
            )
        }
    }

    const DisplayNotification = ({ message }) => {
        if(message === null){
            return null
        }
        else{
            return(
                <div className='notificationStyle'>
                    <p>{message}</p>
                </div>
            )
        }
    }

    return(
        <div>
            <h1>Blogs</h1>
            <DisplayError message = {error}/>
            <DisplayNotification message = {notification}/>
            {user === null ? loginForm() : displayLoggedIn()}
        </div>
    )
}

export default App