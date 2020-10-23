import React from 'react'
import { useParams } from 'react-router-dom'

const DisplayUser = ( { users } ) => {
    const { id } = useParams()
    const user = users.find((user) => user.id === id)
    if(!user){
        return null
    }
    return(
        <div>
            <h2>Users</h2>
            { user.blogs.length === 0 ? <p>No blogs have been created by this user</p> :
                <ul>
                    {
                        user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
                    }
                </ul>
            }
        </div>
    )
}

export default DisplayUser