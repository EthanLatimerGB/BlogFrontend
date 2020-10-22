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
            <div style={hideWhenVisible} className="toggleableContent">
                <button id = 'button-toggleExpansion' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="toggleOpen">
                {props.children}
                <button onClick={toggleVisibility}>Close</button>
            </div>
        </div>
    )
}

export default Toggleable