import React from 'react'


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

const DisplayNotification = ({ message }) => {
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

export default {
    DisplayError, DisplayNotification
}