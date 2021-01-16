
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './AccountDropdown.css';
import * as actions from '../../../../../store/actions/index';
import {MessengerContext} from "../../../../../context/messenger-context";
import Avatar from '../../../../../assets/images/BookmarkIcons/user';

import Feedback from '../../../../../assets/images/TopNavButtonIcons/feedback';
import Gear from '../../../../../assets/images/TopNavButtonIcons/gear';
import CrescentMoon from '../../../../../assets/images/TopNavButtonIcons/crescentMoon';
import Logout from '../../../../../assets/images/TopNavButtonIcons/logout';
import RightArrow from '../../../../../assets/images/TopNavButtonIcons/rightArrow';
import {UnderConstructionContext} from "../../../../../context/under-construction-context";

const accountDropdown = (props) => {

    const messengerContext = useContext(MessengerContext);
    const underConstruction = useContext(UnderConstructionContext)

    const navProfile = () => {
        if (props.location.pathname !== '/user-profile/me') {
            props.history.push('/user-profile/me')
        }
        props.close();
    }

    const blockRoute = () => {
        underConstruction.openModal()
        props.close();
    }

    const logout = () => {
        props.history.push('/logout')
        messengerContext.clearActiveChat()
        props.onClearProfile();
        props.onClearPosts();
        props.onClearPages();
        props.onClearFriends();
        props.onClearMessenger();
        props.onClearActivity();
        props.onClearSearch();
        props.onClearPhotos();
        props.onClearUsers();
    }

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderContainer} onClick={navProfile}>
                <div className={classes.ProfileImageContainer}
                     style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}
                >
                    {props.profileImage ? null : <Avatar fill="white"/>}
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.Name}>{props.name ? props.name : ''}</div>
                    <div className={classes.SubText}>See your profile</div>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.Button} onClick={blockRoute}>
                <div className={classes.Icon}>
                    <Feedback />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Give Feedback</div>
                    <div className={classes.SmallText}>Help us improve the dumb facebook</div>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.Button} onClick={blockRoute}>
                <div className={classes.Icon}>
                    <Gear />
                </div>
                <div className={classes.MainText}>Setting & Privacy</div>
                <div className={classes.RightArrow}>
                    <RightArrow fill="rgba(0,0,0,0.6)"/>
                </div>
            </section>
            <section className={classes.Button} onClick={blockRoute}>
                <div className={classes.Icon}>
                    <CrescentMoon />
                </div>
                <div className={classes.MainText}>Display & Accessibility</div>
                <div className={classes.RightArrow}>
                    <RightArrow fill="rgba(0,0,0,0.6)"/>
                </div>
            </section>
            <section className={classes.Button} onClick={logout}>
                <div className={[classes.Icon, classes.Logout].join(" ")}>
                    <Logout />
                </div>
                <div className={classes.MainText}>Log Out</div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profileImage: state.profile.profileImage,
        name: state.profile.firstName + ' ' + state.profile.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
        onClearProfile: () => dispatch(actions.logoutClearProfile()),
        onClearUsers: () => dispatch(actions.logoutClearUsers()),
        onClearPhotos: () => dispatch(actions.logoutClearPhotos()),
        onClearPosts: () => dispatch(actions.logoutClearPosts()),
        onClearFriends: () => dispatch(actions.logoutClearFriends()),
        onClearMessenger: () => dispatch(actions.logoutClearMessenger()),
        onClearPages: () => dispatch(actions.logoutClearPosts()),
        onClearActivity: () => dispatch(actions.logoutClearActivity()),
        onClearSearch: () => dispatch(actions.logoutClearSearch()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(accountDropdown));