import { Link } from 'react-router-dom'
import React from 'react'

const NavBar = () => {


    return(
        <div className='navBar'>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            <Link to='/blogs'>Blogs</Link>
        </div>
    )
}

export default NavBar