
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './AccountDropdown.css';
import Avatar from '../../../../../assets/images/BookmarkIcons/user';

import Feedback from '../../../../../assets/images/TopNavButtonIcons/feedback';
import Gear from '../../../../../assets/images/TopNavButtonIcons/gear';
import CrescentMoon from '../../../../../assets/images/TopNavButtonIcons/crescentMoon';
import Logout from '../../../../../assets/images/TopNavButtonIcons/logout';
import RightArrow from '../../../../../assets/images/TopNavButtonIcons/rightArrow';

const accountDropdown = (props) => {

    const navProfile = () => {
        if (props.location.pathname !== '/user-profile/me') {
            props.history.push('/user-profile/me')
        }
        props.close();
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
            <section className={classes.Button}>
                <div className={classes.Icon}>
                    <Feedback />
                </div>
                <div className={classes.NameTagContainer}>
                    <div className={classes.MainText}>Give Feedback</div>
                    <div className={classes.SmallText}>Help us improve the dumb facebook</div>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.Button}>
                <div className={classes.Icon}>
                    <Gear />
                </div>
                <div className={classes.MainText}>Setting & Privacy</div>
                <div className={classes.RightArrow}>
                    <RightArrow fill="rgba(0,0,0,0.6)"/>
                </div>
            </section>
            <section className={classes.Button}>
                <div className={classes.Icon}>
                    <CrescentMoon />
                </div>
                <div className={classes.MainText}>Display & Accessibility</div>
                <div className={classes.RightArrow}>
                    <RightArrow fill="rgba(0,0,0,0.6)"/>
                </div>
            </section>
            <section className={classes.Button} onClick={() => props.history.push('/logout')}>
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

export default connect(mapStateToProps)(withRouter(accountDropdown));