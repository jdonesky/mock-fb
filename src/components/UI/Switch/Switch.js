
import React, {useState, useEffect, useRef} from 'react';
import classes from './Switch.css';

const toggleSwitch = props => {

    const switchState = useRef(null);

    return (
        <label className={classes.label}>
            <div className={classes.toggle}>
                <input checked={props.isSelected} onChange={props.onChange} className={classes['toggle-state']} type="checkbox" />
                <div className={classes['toggle-inner']}>
                    <div className={classes.indicator}></div>
                </div>
                <div className={classes['active-bg']}></div>
            </div>
            <div className={classes.labelText}></div>
        </label>

    )
}

export default toggleSwitch;

