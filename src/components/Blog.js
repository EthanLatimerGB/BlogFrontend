import React, { useState } from 'react'
import blogService from '../services/blogs'
import Toggle from '../components/toggle'

const Blog = ({ blog }) => {
    const [BlogExpanded, setBlogExpanded] = useState(false)
    const [showError, setShowError] = useState(null)
    let [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        border: '3px solid black',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: '5px',
        backgroundColor: 'rgb(170,255,255)',
    }


    const toggleExpansion = () => {
        setBlogExpanded(!BlogExpanded)
    }

    const incrementLikes = async () => {
        const foundUser = await blogService.getOne(blog.id)

        const changedBlog = {
            title: foundUser.title,
            author: foundUser.author,
            url: foundUser.url,
            likes: ++foundUser.likes,
        }

        await blogService.putLike(changedBlog, `/api/blogs/${blog.id}`)
        setLikes(++likes)
    }

    const deleteBlog = async () => {
        if(window.confirm(`Are you sure you want to delete ${blog.title} created by ${blog.author}?`)){
            try{
                await blogService.deleteBlog(blog.id)
                toggleExpansion()
            }
            catch(error){
                setShowError('Failed to delete blog, you may not have permission to delete this')
                setTimeout(() => {
                    setShowError(null)
                }, 3000)
            }
        }
    }

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

    return(
        <div style={blogStyle}>
            <div>
                <ul>
                    <li>Title: {blog.title}</li>
                    <li>Created by: {blog.author}</li>
                    <Toggle buttonLabel = "Expand">
                        <DisplayError message={showError}/>
                        <li>URL: {blog.url}</li>
                        <li>Likes: {likes} <button onClick={incrementLikes}>Like</button> </li>
                        <button onClick={deleteBlog}>Remove blog</button>
                    </Toggle>
                </ul>
            </div>
        </div>
    )
}

export default Blog
