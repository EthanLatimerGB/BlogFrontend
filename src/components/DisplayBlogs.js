import React from 'react'
import { connect } from 'react-redux'

import DisplayCreateBlogs from '../components/DisplayCreateBlogs'
import Blog from '../components/Blog'

const DisplayBlogs = (props) => {
    return(
        <div>
            <h2>List of Blogs</h2>
            <div>
                <DisplayCreateBlogs/>
                <div>
                    {
                        props.blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog}/> )
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        blogs: state.blogs
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBlogs)
