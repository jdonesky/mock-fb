
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import TOCsidedrawer from "../../UI/TOCsidedrawer/TOCsidedrawer";
import InboxTOC from './InboxTOC/InboxTOC';
// import InboxSideBar from './InboxSideBar/InboxSideBar'
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import classes from "../../UI/TOCsidedrawer/TOCsidedrawer.css";

const inboxSidedrawer = props => {

    const {width, height} = getWindowDimensions();

    useEffect(() => {
        console.log(
            'MOUNTED'
        )
    }, [])

    let paths;
    if (props.ownedPage) {
        paths = <div className={classes.Paths}><div className={[classes.Path, classes.PagePath].join(" ")}>{props.ownedPage.name}</div><span> &rsaquo;</span><div className={classes.Path}>Friend Requests</div></div>
    }
    
    return (
        <TOCsidedrawer
            title="Inbox"
            paths={paths}
        >
            <InboxTOC />
        </TOCsidedrawer>
    )
}

const mapStateToProps = state => {
    return {
        ownedPage: state.pages.ownedPage
    }
}

export default connect(mapStateToProps)(inboxSidedrawer);
