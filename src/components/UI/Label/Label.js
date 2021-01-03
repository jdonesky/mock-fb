
import React, {useState, useEffect, useRef} from 'react';
import classes from './Label.css';

const label = props => {

    const [show, setShow] = useState(false);
    // let showTimer = useRef(null)

    useEffect(() => {
        return () => {
            if (showTimer) {
                clearTimeout(showTimer);
            }
        }
    }, [])

    let showTimer;
    const startShowing = () => {
        if (!showTimer) {
            showTimer = setTimeout(() => {
                setShow(true);
            }, 400)
        }
    }

    const hide = () => {
        setShow(false);
    }

    const cancelShow = () => {
        clearTimeout(showTimer)
        hide();
    }


    let label;
    if (show) {
        label = (
            <div className={classes.Container}
                 style={{
                     top: props.top || null, bottom: props.bottom || null, left: props.left || null, right: props.right || null,
                     height: props.height || null, width: props.width || null, minWidth: props.minWidth || null, minHeight: props.minHeight || null,
                     backgroundColor: props.backgroundColor || null
                 }}
            >
                {props.label}
            </div>
        )
    }

    return (
        <div className={classes.Positioner}>
            {label}
            <div className={classes.HoverBox} onMouseEnter={startShowing} onMouseLeave={cancelShow}>
                {props.children}
            </div>
        </div>
    )
}

export default label;