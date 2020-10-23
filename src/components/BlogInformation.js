import React from 'react'
import CreateAnonymousComment from '../components/CreateAnonymousComment'
import { useParams } from 'react-router-dom'


const BlogInformation = ({ blogs }) => {
    const { id } = useParams()
    const blog = blogs.find((blog) => blog.id === id)
    if(!blog){
        return null
    }
    return(
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <p>added by {blog.author}</p>
            <h3>Comments</h3>
            <ul>
                {
                    blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
                }
            </ul>
            <CreateAnonymousComment blog={blog}/>
        </div>
    )
}


export default BlogInformation