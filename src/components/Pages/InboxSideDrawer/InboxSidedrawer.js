
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import classes from "../../UI/TOCsidedrawer/TOCsidedrawer.css";
import * as actions from '../../../store/actions/index';
import TOCsidedrawer from "../../UI/TOCsidedrawer/TOCsidedrawer";
import InboxTOC from './InboxTOC/InboxTOC';
import InboxSideBar from './InboxSideBar/InboxSideBar'
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const inboxSidedrawer = props => {

    const {width, height} = getWindowDimensions();
    const [displayPage, setDisplayPage] = useState(props.history.location.pathname.split('/')[3]);
    const {ownedPage} = props

    useEffect(() => {
        if (displayPage !== props.history.location.pathname.split('/')[3]) {
            setDisplayPage(props.history.location.pathname.split('/')[3])
        }
    })

    useEffect(() => {
        if (displayPage && !ownedPage) {
            props.onFetchOwnedPage(props.authToken, displayPage)
        }
    }, [displayPage])


    let paths;
    let profileImage;
    if (ownedPage) {
        paths = <div className={classes.Paths}><div className={[classes.Path, classes.PagePath].join(" ")} onClick={() => props.history.push(`/pages/manage/${displayPage}`)}>{ownedPage.name}</div><span> &rsaquo;</span><div className={[classes.Path, classes.PathDisabled].join(" ")}>Inbox</div></div>
        profileImage = ownedPage.profileImage
    }

    const sidedrawer = (
        <TOCsidedrawer
            title="Inbox"
            paths={paths}
        >
            <InboxTOC />
        </TOCsidedrawer>
    )

    const sidebar = (
        <InboxSideBar profileImage={profileImage}/>
    )

    let content;
    if (width > 1300) {
        content = sidedrawer
    } else {
        content = sidebar;
    }
    
    return content
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(inboxSidedrawer);
