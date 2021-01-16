

import React from 'react';
import classes from './Link.css';

const link = props => {

    const pathsUnderConstruction = [
        '/groups',
        '/events',
        '/saved'
    ]

    return (
        <div className={classes.Container} onClick={pathsUnderConstruction.includes(props.path) ?  props.block : () => props.nav(props.path)}>
            <div className={classes.IconContainer}>{props.icon}</div>
            <span className={classes.Text}>{props.text}</span>
        </div>
    )
}

export default link;