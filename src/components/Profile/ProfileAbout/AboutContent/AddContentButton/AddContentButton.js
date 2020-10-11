

import React from 'react';
import classes from './AddContentButton.css'

const addContentButton = props => {

    return (
        <div className={classes.AddButton}>
            <div className={classes.PlusIcon}></div>
            <span>Add a Workplace</span>
        </div>
    )
}

export default addContentButton;