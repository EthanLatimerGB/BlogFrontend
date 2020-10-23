import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    /*const incrementLikes = async () => {
        
    }*/

    return(
        <div className='bloglist'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
    )
}

export default Blog
