import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateBlogComments } from '../reducers/blogReducer'
import { setTimedErrorNotification, setTimedNotification } from '../reducers/notificationReducer'


const CreateAnonymousComment = ({ blog, props }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            props.updateBlogComments(blog, comment)
            props.setTimedNotification(`Created new blog: ${comment}`, 5000)
        }
        catch(error){
            props.setTimedErrorNotification(`Failed to communicate to blog service ${error}`, 5000)
        }
    }

    return(
        <div>
            <h3>Write anonymous comment</h3>
            <form onSubmit={handleSubmit}>
                <input value={comment} onChange={(e) => {
                    setComment(e.target.value)
                }}/>
                <button type='submit'>Submit comment</button>
            </form>
        </div>
    )
}

const mapStateToProps = () => {
    return{}
}

const mapDispatchToProps = {
    updateBlogComments,
    setTimedErrorNotification,
    setTimedNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnonymousComment)