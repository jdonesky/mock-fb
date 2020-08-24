import React from 'react'
import classes from './User.css'


const user = props => {
    return (
        <div className={classes.User}>
            <img src={props.userImage} />
        </div>
    )
}

export default user;