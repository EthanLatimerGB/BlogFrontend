import React from 'react'
import { connect } from 'react-redux'
import { changeUsername, changePassword, loginUser, initialiseUser } from '../reducers/credentialReducer'
import { setTimedErrorNotification, setTimedNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

const LoginForm = (props) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: props.credentials.username, password: props.credentials.password
            })
            if(user){
                props.loginUser(user)
            }
            else{
                props.setTimedErrorNotification('Incorrect login details', 4000)
            }
        }
        catch(error){
            props.setTimedErrorNotification(`Error: ${error}`, 4000)
        }
    }

    return(
        <form onSubmit = {handleLogin}>
            <h2>Login to the application</h2>
            <div>
                Username
                <input
                    type = 'text'
                    value = {props.credentials.username}
                    id = 'Username'
                    onChange = {({ target }) => props.changeUsername(target.value) } />
            </div>
            <div>
                Password
                <input
                    type = 'password'
                    value = {props.credentials.password}
                    id = 'Password'
                    onChange = {({ target }) => props.changePassword(target.value)}
                />
            </div>
            <div>
                <button id='login-button' type = 'submit'>Login</button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return{
        credentials: state.credentials,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    changePassword,
    changeUsername,
    loginUser,
    initialiseUser,
    setTimedErrorNotification,
    setTimedNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)