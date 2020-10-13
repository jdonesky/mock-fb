

import React from 'react';
import classes from './AddContentButton.css'

const addContentButton = props => {

    return (
        <div className={classes.AddButton} onClick={props.clicked}>
            <div className={classes.PlusIcon}></div>
            <span>{props.text}</span>
        </div>
    )
}

export default addContentButton;