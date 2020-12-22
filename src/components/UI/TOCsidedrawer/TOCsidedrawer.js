import React from 'react';
import classes from "./TOCsidedrawer.css";

const tocSidedrawer = props => {

    return (
        <div className={classes.SideDrawerContainer}>
            {props.path ? <div className={classes.PathsContainer}>
                {props.paths}
            </div> : null}
            <section className={classes.Header}  style={{top: props.paths? null : '65px'}}>
                <h1 className={classes.HeaderTitle}>{props.title}</h1>
                {props.headerButton}
            </section>
            <div className={classes.Break}/>
            {props.children}
        </div>
    );
}

export default tocSidedrawer;