import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';
import classes from './NavigationBar.css';
import DownArrow from "../../../assets/images/down-arrow";
import Like from "../../../assets/images/like";
import FbMessage from "../../../assets/images/UserActionIcons/fbMessage";
import SearchGlass from "../../../assets/images/search";
import Dots from "../../../assets/images/dots";
import Eye from "../../../assets/images/eye";
import getWindowDimensions from "../../../hooks/getWindowDimensions";


const navigationBar = props => {

    const { width, height } = getWindowDimensions()
    const [displayPage, setDisplayPage] = useState(props.match.params.id)
    const [pathBase, setPathBase] = useState(props.history.location.pathname.split("/")[1])
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[2])
    // const [ownedPage, setOwnedPage] = useState(props.owned);
    const {owned} = props

    // useEffect(() => {
    //     if (owned) {
    //         setOwnedPage(owned)
    //     }
    // }, [owned])

    useEffect(() => {
        if (pathRoot === 'manage' || pathRoot === 'view') {
            if (displayPage !== props.history.location.pathname.split('/')[3]) {
                setDisplayPage(props.history.location.pathname.split('/')[3])
            }
        }
     })

    const homeClasses = [classes.NavTab, classes.PageHome];
    const aboutClasses = [classes.NavTab, classes.PageAbout];
    const photosClasses = [classes.NavTab, classes.PagePhotos];
    const moreClasses = [classes.NavTab]


    if (props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}`) {
        homeClasses.push(classes.ActiveNavTab);
    }
    if (props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}/about`) {
        aboutClasses.push(classes.ActiveNavTab)
    }
    if (props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}/photos`) {
        photosClasses.push(classes.ActiveNavTab)
    }

    let widths;
    if (pathBase === 'pages') {
        widths = [840,905,955]
    } else if (pathBase === 'page') {
        widths = [550, 625, 665]
    }

    let arrowFill = "rgba(0,0,0,0.5)";
    if ( width < widths[2] && props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}/photos`) {
        moreClasses.push(classes.ActiveNavTab)
        arrowFill = "#1665f7"
    }

    if ( width < widths[1] && props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}/about`) {
        moreClasses.push(classes.ActiveNavTab)
        arrowFill = "#1665f7"
    }

    if ( width < widths[0] && props.history.location.pathname === `/${pathBase}/${pathRoot}/${displayPage}`) {
        moreClasses.push(classes.ActiveNavTab)
        arrowFill = "#1665f7"
    }


    const navTabs = (
            <React.Fragment>
                { width >= widths[0] ? <div className={homeClasses.join(" ")} onClick={() => props.history.push(`/${pathBase}/${pathRoot}/${displayPage}`)}>Home</div> : null }
                { width >= widths[1] ? <div className={aboutClasses.join(" ")} onClick={() => props.history.push(`/${pathBase}/${pathRoot}/${displayPage}/about`)}>About</div> : null}
                { width >= widths[2] ? <div className={photosClasses.join(" ")} onClick={() => props.history.push(`/${pathBase}/${pathRoot}/${displayPage}/photos`)}>Photos</div> : null}
                <div className={moreClasses.join(" ")} >More<div className={classes.MoreArrow}><DownArrow fill={arrowFill} /></div></div>
            </React.Fragment>
        )

    let navButtons;
    if (pathRoot === 'manage' || owned) {
        navButtons = (
            <React.Fragment>
                <div className={[classes.NavButton, classes.BigButton].join(" ")} style={{minWidth: '150px'}}><div className={classes.NavButtonIcon}><Eye /></div><div className={classes.NavButtonText}>View as Visitor</div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
            </React.Fragment>
        )
    } else if (pathRoot === 'discover' || pathRoot === 'view' ) {
        if (!owned) {
            navButtons = (
                <React.Fragment>
                    <div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><Like /></div><div className={classes.NavButtonText}>Like</div></div>
                    {/*<div className={[classes.NavButton, classes.BigButton].join(" ")}><div className={classes.NavButtonIcon}><FbMessage /></div><div className={classes.NavButtonText}>Conversation</div></div>*/}
                    <div className={classes.NavButton}><div className={classes.NavButtonIcon}><SearchGlass /></div></div>
                    <div className={classes.NavButton}><div className={classes.NavButtonIcon}><Dots /></div></div>
                </React.Fragment>
            )
        }
    }

    return (
        <div className={classes.SharedHeaderElements}>
            <div className={classes.SharedBreak}/>
            <div className={classes.SharedNavBar}>
                <div className={classes.SharedNavTabs}>
                    {navTabs}
                </div>
                <div className={classes.SharedNavButtons}>
                    {navButtons}
                </div>
            </div>
        </div>
    )
}

export default withRouter(navigationBar);