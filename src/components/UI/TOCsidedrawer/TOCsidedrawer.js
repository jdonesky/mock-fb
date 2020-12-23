import React from 'react';
import classes from "./TOCsidedrawer.css";

const tocSidedrawer = props => {

    let containerClass;
    let headerClass;
    let pathsClass;
    if (props.adjustWidth === true) {
        containerClass = classes.SideDrawerContainer;
        headerClass = classes.Header;
        pathsClass = classes.PathsContainer;
    } else {
        containerClass = classes.FixedWidthSideDrawer;
        headerClass = classes.FixedWidthHeader;
        pathsClass = classes.FixedWidthPathsContainer;
    }

    return (
        <div className={containerClass}>
            {props.path ? <div className={pathsClass}>
                {props.paths}
            </div> : null}
            <section className={headerClass}  style={{top: props.paths? null : '65px'}}>
                <h1 className={classes.HeaderTitle}>{props.title}</h1>
                {props.headerButton}
            </section>
            <div className={classes.Break}/>
            {props.children}
        </div>
    );
}

export default tocSidedrawer;