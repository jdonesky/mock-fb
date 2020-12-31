
import React, {useState, useEffect} from 'react';
import classes from './Label.css';

const label = props => {

    const [show, setShow] = useState(false);
    let showTimer;

    useEffect(() => {
        return () => {
            if (showTimer) {
                showTimer = null;
            }
        }
    }, [])

    const startShowing = () => {
        showTimer = setTimeout(() => {
                setShow(true);
            }, 250)
    }

    const hide = () => {
        setShow(false);
    }

    const cancelShow = () => {
        if (showTimer) {
            showTimer = null;
        }
        hide();
    }


    let label;
    if (show) {
        label = (
            <div className={classes.Container}
                 style={{
                     top: props.top || null, bottom: props.bottom || null, left: props.left || null, right: props.right || null,
                     height: props.height || null, width: props.width || null
                 }}
            >
                {props.label}
            </div>
        )
    }

    return (
        <div className={classes.Positioner}>
            {label}
            <div onMouseEnter={startShowing} onMouseOut={cancelShow}>
                {props.children}
            </div>
        </div>
    )
}

export default label;