import React, { useState } from 'react'

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return(
        <div>
            <div style={hideWhenVisible} className="toggleableComponent">
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="toggledComponent">
                {props.children}
                <button onClick={toggleVisibility}>Close</button>
            </div>
        </div>
    )
}

export default Toggleable