import React, {useEffect} from 'react';
import classes from "./TOCsidedrawer.css";
import Gear from "../../../assets/images/TopNavButtonIcons/gear";

const tocSidedrawer = props => {

    return (
        <div className={classes.SideDrawerContainer}>
            <div className={classes.PathsContainer}>
                {props.paths}
            </div>
            <section className={classes.Header} >
                <h1 className={classes.HeaderTitle}>{props.title}</h1>
                {props.headerButton}
            </section>
            <div className={classes.Break}/>
            {props.children}
        </div>
    );
}

export default tocSidedrawer;