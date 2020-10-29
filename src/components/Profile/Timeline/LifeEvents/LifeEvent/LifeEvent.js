
import React from 'react';
import classes from './LifeEvent.css'

const event = (props) => {
    return (
        <div className={classes.Container}>
            <section className={classes.Content}>
                <div className={classes.PhotoContainer}>{props.photo ? props.photo && props.photo : null}</div>
                <div className={classes.Icon}></div>
                <p className={classes.MainText}>{props.mainText && props.mainText}</p>
                <p className={classes.SubText}>{props.subText && props.subText}</p>
            </section>
        </div>
    );
}

export default event;