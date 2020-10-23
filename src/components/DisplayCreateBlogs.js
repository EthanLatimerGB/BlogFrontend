import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { changeAuthor, changeLikes, changeTitle, changeURL } from '../reducers/formReducer'
import { setTimedErrorNotification, setTimedNotification } from '../reducers/notificationReducer'


import BlogForm from '../components/blogForm'
import ToggleVisibility from '../components/toggle'

const DisplayCreateBlogs = (props) => {
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

const mapStateToProps = (state) => {
    return{
        forms: state.forms,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    changeAuthor,
    changeLikes,
    changeTitle,
    changeURL,
    setTimedErrorNotification,
    setTimedNotification,
    createBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCreateBlogs)

