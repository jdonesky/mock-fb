
import React, {useState,useEffect } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './PagesTOC.css';
import * as actions from '../../../../store/actions/index';

import DownArrow from '../../../../assets/images/down-arrow';
import Plus from '../../../../assets/images/plus';
import Compass from '../../../../assets/images/MiscIcons/compass';
import Like from '../../../../assets/images/like';
import AddFriend from '../../../../assets/images/UserActionIcons/addFriend';
import Flag from "../../../../assets/images/BookmarkIcons/flag";
import SecondFlag from '../../../../assets/images/TopNavButtonIcons/flag';

const pagesTOC = props => {

    const {authToken, userKey, onFetchOwnedPages, myPages} = props
    const [activePage, setActivePage] = useState(null);
    const [showOwnedPages, setShowOwnedPages] = useState(true);

    useEffect(() => {
        onFetchOwnedPages(authToken, userKey)
    }, [authToken, userKey, onFetchOwnedPages])
    
    const manageOwnedPage = (key) => {
        props.onFetchOwnedPage(props.authToken, key);
        props.history.push(`/pages/manage/${key}`)
    }

    let ownedPages;
    if (myPages && Object.keys(myPages).length) {
        if (showOwnedPages) {
            ownedPages = Object.keys(myPages).map(key =>
                <div key={key} className={classes.OwnedPageButton}
                     onClick={() => manageOwnedPage(key)}>
                    <div className={classes.OwnedPageIcon}
                         style={{backgroundImage: myPages[key].profileImage ? `url(${myPages[key].profileImage})` : null}}>
                        {myPages[key].profileImage ? null : <Flag first="rgba(0,0,0,0.28)" second="rgba(0,0,0,0.29)"/>}
                    </div>
                    <div className={classes.OwnedPageText}>{myPages[key].name}</div>
                </div>
            )
        }
    }

    const toggleOwnedPages = () => {
        setShowOwnedPages(prevState => {
            return !prevState;
        })
    }

    let toggleBar;
    if (myPages && Object.keys(myPages).length) {
        toggleBar = (
            <div className={classes.ToggleBar}>
                <div className={classes.ToggleBarLeftBlock}>
                    <div className={classes.ToggleBarIcon}>
                        <SecondFlag fill="white" />
                    </div>
                    <div className={classes.ToggleBarText}>Your Pages</div>
                </div>
                <div className={classes.ToggleBarButton} onClick={toggleOwnedPages} style={{transform: showOwnedPages ? 'rotate(180deg)' : null}}>
                    <DownArrow fill="rgba(0,0,0,0.6)" />
                </div>
            </div>
        )
    }


    const switchPanelContent = (content) => {
        if (activePage !== content) {
            setActivePage(content);
        }
        let fetch;
        switch (content) {
            case 'DISCOVER':
                // fetch =
                break;
            case 'LIKED':
                // fetch =
                break;
            case 'INVITES':
                // fetch =
                break;
            default:
                fetch = () => {throw new Error('something went wrong')}
        }
        // fetch();
    }



    return (
        <div className={classes.TocContainer}>
            <section className={classes.MyPagesSection}>
                {toggleBar}
                {ownedPages}
                <div className={classes.CreateNewPageButton} onClick={() => props.history.push('/pages/create')}>
                    <div className={classes.CreateNewPageIcon}><Plus fill='#0B86DE'/></div>
                    <div className={classes.CreateNewPageText}>Create New Page</div>
                </div>
            </section>
            <div className={classes.SectionBreak}/>
            <section className={classes.NavButtons}>
                <div className={[classes.NavButton, activePage === 'DISCOVER' ? classes.ActiveNavButton : null].join(" ")} onClick={() => switchPanelContent('DISCOVER')}>
                    <div className={[classes.NavButtonIcon, classes.DiscoverIcon, activePage === 'DISCOVER' ? classes.ActiveNavIcon : null].join(" ")}><Compass fill={activePage === 'DISCOVER' ? 'white' : null} /></div>
                    <div className={classes.NavButtonText}>Discover</div>
                </div>
                <div className={[classes.NavButton, activePage === 'LIKED' ? classes.ActiveNavButton : null].join(" ")} onClick={() => switchPanelContent('LIKED')}>
                    <div className={[classes.NavButtonIcon, classes.LikeIcon, activePage === 'LIKED' ? classes.ActiveNavIcon : null].join(" ")}><Like fill={activePage === 'LIKED' ? 'white' : null}/></div>
                    <div className={classes.NavButtonText}>Liked Pages</div>
                </div>
                <div className={[classes.NavButton, activePage === 'INVITES' ? classes.ActiveNavButton : null].join(" ")} onClick={() => switchPanelContent('INVITES')}>
                    <div className={[classes.NavButtonIcon, classes.InvitesIcon, activePage === 'INVITES' ? classes.ActiveNavIcon : null].join(" ")}><AddFriend fill={activePage === 'INVITES' ? 'white' : null} /></div>
                    <div className={classes.NavButtonText}>Invites</div>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        userKey: state.profile.firebaseKey,
        myPages: state.pages.myPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOwnedPages: (authToken, userKey) => dispatch(actions.fetchOwnedPagesAttempt(authToken, userKey)),
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(pagesTOC))