import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {
    return(
        <form onSubmit = {props.handleCreateBlog}>
            <div>Title: <input type = 'text' value = {props.title} name = 'Title' onChange = {props.handleTitle}/></div>
            <div>Author: <input type = 'text' value = {props.author} name = 'Author' onChange = {props.handleAuthor}/></div>
            <div>URL: <input type = 'text' value = {props.url} name = 'URL' onChange = {props.handleUrl}/></div>
            <div>Likes: <input type = 'number' value = {props.likes} nane = 'Likes' onChange = {props.handleLikes}/></div>
            <button type = 'submit'>Create Blog</button>
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