
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './AdminTOC.css';
import * as actions from '../../../../store/actions/index';
import OwnedPagesDropdown from "./Dropdowns/OwnedPagesDropdown";
import DownArrow from '../../../../assets/images/down-arrow';
import Flag from "../../../../assets/images/BookmarkIcons/flag";
import OutsideAlerter from "../../../../hooks/outsideClickHandler";


const adminTOC = props => {

    const {myPages, ownedPage, userKey, authToken} = props

    useEffect(() => {
        if (userKey) {
            props.onFetchOwnedPages(authToken, userKey);
        }
    }, [authToken, userKey])

    useEffect(() => {
        console.log('myPages', myPages);
    })

    const [viewOwnedPages, setViewOwnedPages] = useState(false)

    let ownedPagesDropdown;
    if (viewOwnedPages) {
        ownedPagesDropdown =
            <div className={classes.OwnedPagesDropdownPositioner}>
                <OutsideAlerter action={() => setViewOwnedPages(false)}>
                    <div className={classes.BarBlocker} onClick={() => setViewOwnedPages(false)}/>
                    <OwnedPagesDropdown close={() => setViewOwnedPages(false)} />
                </OutsideAlerter>
            </div>
    }

    return (
        <div className={classes.TocContainer}>
            <div className={classes.ProfilesDropdownBar} onClick={() => setViewOwnedPages(true)}>
                <div className={classes.ProfilesDropdownBarLeftBlock}>
                    <div className={classes.ProfileImage} style={{backgroundImage: ownedPage && ownedPage.profileImage ? `url(${ownedPage.profileImage})` : null}}>
                        {ownedPage && ownedPage.profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                    </div>
                    <div className={classes.Name}>{ownedPage && ownedPage.name ? ownedPage.name : null}</div>
                </div>
                <div className={classes.DownArrow} ><DownArrow fill='black' /></div>
            </div>
            {ownedPagesDropdown}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        userKey: state.profile.firebaseKey,
        myPages: state.pages.myPages,
        ownedPage: state.pages.ownedPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPages: (authToken,userKey) => dispatch(actions.fetchOwnedPagesAttempt(authToken, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(adminTOC));