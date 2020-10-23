import React from 'react'

export const DisplayError = ({ message }) => {
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

export const DisplayNotification = ({ message }) => {
    if(message === null){
        return null
    }
    else{
        return(
            <div className='notificationStyle'>
                <p>{message}</p>
            </div>
        )
    }
}
