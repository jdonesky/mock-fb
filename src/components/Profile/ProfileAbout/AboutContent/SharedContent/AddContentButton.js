

import React from 'react';
import classes from './AddContentButton.css'
import Plus from '../../../../../assets/images/plus'

const addContentButton = props => {

    return (
        <div className={classes.AddButton} onClick={props.clicked}>
            <div className={classes.PlusIcon}>
                <Plus fill="#0B86DE" className={classes.Plus}/>
            </div>
            <span>{props.text}</span>
        </div>
    )
}

export default addContentButton;