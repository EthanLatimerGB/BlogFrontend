import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    return(
        <form onSubmit = {props.handleCreateBlog}>
            <div>Title: <input type = 'text' value = {props.title} id = 'input-Title' onChange = {props.handleTitle}/></div>
            <div>Author: <input type = 'text' value = {props.author} id = 'input-Author' onChange = {props.handleAuthor}/></div>
            <div>URL: <input type = 'text' value = {props.url} id = 'input-URL' onChange = {props.handleUrl}/></div>
            <div>Likes: <input type = 'number' value = {props.likes} id = 'input-Likes' onChange = {props.handleLikes}/></div>
            <button id='submit-Blog' type = 'submit'>Create Blog</button>
        </form>
    )
}


BlogForm.propTypes = {
    handleCreateBlog: PropTypes.func.isRequired,
    handleTitle: PropTypes.func.isRequired,
    handleAuthor: PropTypes.func.isRequired,
    handleUrl: PropTypes.func.isRequired,
    handleLikes: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
}


export default BlogForm