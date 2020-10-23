import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const DisplayUsers = (props) => {

    return(
        <div style={ { padding: '10px' } }>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user) => {
                            return(
                                <tr key={user.id}>
                                    <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        users: state.users
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUsers)

