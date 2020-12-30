
import React, {useState} from 'react';
import classes from './Label.css';

const label = props => {

    const [show, setShow] = useState(false);

    let showTimer;
    const startShowing = () => {
        showTimer = setTimeout(() => {
                setShow(true);
            }, 300)
    }

    const hide = () => {
        setShow(false);
    }

    const cancelShow = () => {
        showTimer = null;
        hide();
    }


    let label;
    if (show) {
        label = (
            <div className={classes.Container}>
                {props.label}
            </div>
        )
    }

    return (
        <div className={classes.Positioner}>
            {label}
            <div onMouseEnter={startShowing} onMouseLeave={cancelShow}>
                {props.children}
            </div>
        </div>
    )
}

export default label;