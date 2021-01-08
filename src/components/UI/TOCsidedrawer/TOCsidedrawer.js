import React, {useEffect} from 'react';
import classes from "./TOCsidedrawer.css";

const tocSidedrawer = props => {

    let containerClass;
    let headerClass;
    if (props.adjustWidth === true) {
        containerClass = classes.SideDrawerContainer;
        headerClass = classes.Header;
    } else {
        containerClass = classes.FixedWidthSideDrawer;
        headerClass = classes.FixedWidthHeader;
    }

    return (
        <div className={containerClass}>
            {props.paths && props.paths}
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