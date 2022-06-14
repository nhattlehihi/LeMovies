import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = (props) => {
    return (
        <button 
            className={`btn ${props.className}`} 
            onClick={props.onPress ? () => props.onPress() : null}
            // onClick={props.onPress}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = props => {
    return(
        <Button
            className={`btn-outline ${props.className}`}
            onPress={props.onPress ? () => props.onPress() : null}
            // onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button
