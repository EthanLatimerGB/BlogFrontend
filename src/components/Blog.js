import React, { useState } from 'react'
import Toggle from '../components/toggle'

const Blog = ({ blog, likeInc, handleDeleteBlog }) => {
    let [likes, setLikes] = useState(blog.likes)
    //replace with the action creator for liking a blog

    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        border: '3px solid black',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: '5px',
        backgroundColor: 'rgb(170,255,255)',
    }

    const incrementLikes = async () => {
        await likeInc(blog)
        setLikes(++likes)
    }

    return(
        <div style={blogStyle}>
            <div>
                <ul>
                    <li>Title: {blog.title}</li>
                    <li>Created by: {blog.author}</li>
                    <Toggle buttonLabel = "Expand">
                        <li>URL: {blog.url}</li>
                        <li>Likes: {likes} <button id = 'button-incrementlikes' onClick={incrementLikes}>Like</button> </li>
                    </Toggle>
                    <button id='button-deleteblog' onClick={handleDeleteBlog}>Remove blog</button>
                </ul>
            </div>
        </div>
    )
}

export default Blog
