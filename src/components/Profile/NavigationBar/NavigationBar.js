import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.css';
import NavDropdown from './NavigationDropdown/NavigationDropdown';

import Eye from '../../../assets/images/eye';
import Pen from '../../../assets/images/edit';
import FbMessage from '../../../assets/images/UserActionIcons/fbMessage';
import Search from '../../../assets/images/search';
import ActivityLog from '../../../assets/images/UserActivityIcons/activityLog';
import SearchGlass from '../../../assets/images/search';
import Block from '../../../assets/images/UserActionIcons/blockUser';
import AddFriend from '../../../assets/images/UserActionIcons/addFriend';
import Follow from '../../../assets/images/UserActionIcons/follow';
import Dots from '../../../assets/images/dots';
import DownArrow from '../../../assets/images/down-arrow';

import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const navigationBar = (props) => {

    // useEffect(() => {
    //     console.log('navbar - My friends', props.myFriends)
    // })

    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const {width, height} = getWindowDimensions()


    const toggleNavDropdown = () => {
        setShowNavDropdown(prevState => {
            return !prevState;
        });
    }

    const closeNavDropdown = () => {
        setShowNavDropdown(false);
    }

    let navDropdown;
    if (showNavDropdown) {
        navDropdown = <NavDropdown displayProfile={props.displayProfile} />
    }

    const moreTabClasses = [classes.MoreTab]
    let moreFill;
    if (width < 859) {
        if (props.location.pathname === `/user-profile/${props.displayProfile}/photos` ) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    if (width < 777) {
        if (props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true
        }
    }

    if (width < 664) {
        if ( props.location.pathname === `/user-profile/${props.displayProfile}/about` || props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    let isFriend;
    if (props.display !== 'me') {
        if (props.myFriends && props.theirFullProfile) {
            isFriend = props.myFriends.findIndex(friend => friend.userKey === props.theirFullProfile.userKey)
        }
    }

    let firstEditButton;
    let secondEditButton;
    let thirdEditButton;
    let moreOptions;
    if (props.displayProfile === 'me') {
        firstEditButton =  <li className={[classes.EditControl, classes.FirstControlButton].join(" ")}><div className={classes.EditProfileButtonIcon}><Pen /></div>Edit Profile</li>
        secondEditButton = <li className={classes.EditControl}><div className={classes.EditControlIcon}><Eye /></div></li>
        thirdEditButton =  <li className={classes.EditControl}><div className={classes.EditControlIcon}><Search /></div></li>
        moreOptions = (
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><ActivityLog /></div>Activity Log</div>
        )
    } else {
        if (isFriend ) {
            firstEditButton = <li className={[classes.EditControl, classes.FirstControlButton].join(" ")}>
                <div className={classes.MessageUserButtonIcon}><FbMessage/></div>
                Message</li>
        } else {
            firstEditButton =  <li className={classes.AddFriendControlButton}>
                <div className={classes.AddFriendButtonIcon}><AddFriend fill="#155fe8" /></div>
                Add Friend
            </li>
            if (props.theirPublicProfile) {
                if (props.theirPublicProfile.privacy.AllowMessages === 'ALL') {
                    secondEditButton = <li className={classes.EditControl}>
                        <div className={classes.EditControlIcon}><FbMessage /></div>
                    </li>
                    if (props.theirPublicProfile.privacy.AllowFollowers) {
                        thirdEditButton = <li className={classes.EditControl}>
                            <div className={classes.EditControlIcon}><Follow /></div>
                        </li>
                    }
                } else {
                    secondEditButton = <li className={classes.EditControl}>
                        <div className={classes.EditControlIcon}><Follow /></div>
                    </li>
                }
            }
        }

        moreOptions = (
            <React.Fragment>
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><SearchGlass /></div>Search Profile</div>
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><Block /></div>Block</div>
            </React.Fragment>
        )
    }

    let moreOptionsDropdown;
    if (showMoreOptions) {
        moreOptionsDropdown = (
                <div className={classes.MoreOptionsDropdown} style={{padding: props.displayProfile === 'me' ? '2px 0' : null}}>
                    <div className={classes.BaseArrow} style={{bottom: props.displayProfile === 'me' ? '53px' : null}}/>
                    {moreOptions}
                </div>
        )
    }


    return (
            <React.Fragment>
            <div className={classes.Break} />
            <section className={classes.NavigationBar}>
                <nav>
                    <ul className={classes.TabControls}>
                        <div className={classes.TimelineTab}>
                            <NavLink
                                exact
                                to={`/user-profile/${props.displayProfile}`}
                                activeClassName={classes.active}
                            >{props.displayProfile === 'me' ? 'Timeline' : 'Posts'}
                            </NavLink>
                        </div>
                        <div className={classes.AboutTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/about`}
                                activeClassName={classes.active}
                            >About
                            </NavLink>
                        </div>
                        <div className={classes.FriendsTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/friends`}
                                activeClassName={classes.active}
                            >Friends
                            </NavLink>
                        </div>
                        <div className={classes.PhotosTab}>
                            <NavLink
                                to={`/user-profile/${props.displayProfile}/photos`}
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div>
                        <div className={moreTabClasses.join(" ")} onClick={toggleNavDropdown}>
                            <div
                            >More
                            </div>
                            <div className={classes.MoreArrowContainer}>
                                <DownArrow fill={moreFill ? '#1665f7' : null} />
                            </div>
                        </div>
                        <div className={classes.MoreTabBlockPositioner}>
                            <div className={classes.MoreTabBlocker} style={{display: showNavDropdown ? 'block' : 'none'}}/>
                            <OutsideAlerter action={closeNavDropdown}>
                                <div className={classes.DropdownNavPositioner}>
                                    {navDropdown}
                                </div>
                            </OutsideAlerter>
                        </div>
                    </ul>
                </nav>
                <nav>
                    <ul className={classes.EditControls}>
                        {firstEditButton}
                        {secondEditButton}
                        {thirdEditButton}
                        <OutsideAlerter action={() => setShowMoreOptions(false)}>
                            <li className={classes.EditControl} style={{backgroundColor: showMoreOptions ? 'rgba(0,0,0,0.15)': null}}onClick={() => setShowMoreOptions(prevState => {return !prevState})}><div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots /></div></li>
                            {moreOptionsDropdown}
                        </OutsideAlerter>
                    </ul>
                </nav>
            </section>
            </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile,
        theirFullProfile: state.users.fullProfile,
        theirPublicProfile: state.users.singleProfile
    }
}


export default connect(mapStateToProps)(withRouter(navigationBar));