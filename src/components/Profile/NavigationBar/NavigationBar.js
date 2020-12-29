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
import InlineDots from '../../UI/Spinner/InlineDots';

import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const navigationBar = (props) => {

    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [isFriend, setIsFriend] = useState(null);
    const {width, height} = getWindowDimensions()
    const { myPublicProfile, otherProfile, otherPublicProfile } = props

    useEffect(() => {
        if (props.displayProfile !== 'me') {
            if (myPublicProfile && otherProfile) {
                if (myPublicProfile.friends) {
                    setIsFriend(myPublicProfile.friends.find(friend => friend.userKey === otherProfile.userKey))
                }
            }
        }
    }, [myPublicProfile,otherProfile])

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
        navDropdown = <NavDropdown pathRoot={props.pathRoot} displayProfile={props.displayProfile} />
    }

    const moreTabClasses = [classes.MoreTab]
    let moreFill;
    if (width < 859 && props.location.pathname === `/user-profile/${props.displayProfile}/photos` || width < 1160 && props.location.pathname === `/friends/${props.displayProfile}/photos`) {
        if (props.location.pathname === `/${props.pathRoot}/${props.displayProfile}/photos` ) {
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
    if (width < 1035) {
        if (props.location.pathname === `/friends/${props.displayProfile}/friends` || props.location.pathname === `/friends/${props.displayProfile}/photos`) {
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
    if (width < 940) {
        if (props.location.pathname === `/friends/${props.displayProfile}/about` || props.location.pathname === `/friends/${props.displayProfile}/friends` || props.location.pathname === `/friends/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    if (width < 840) {
        if (props.location.pathname === `/friends/${props.displayProfile}`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
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
        if (myPublicProfile && otherProfile && otherPublicProfile) {
            if (isFriend) {
                firstEditButton = <li className={[classes.EditControl, classes.FirstControlButton].join(" ")}>
                    <div className={classes.MessageUserButtonIcon}><FbMessage/></div>
                    Message</li>
            } else {
                firstEditButton = <li className={classes.AddFriendControlButton}>
                    <div className={classes.AddFriendButtonIcon}><AddFriend fill="#155fe8"/></div>
                    Add Friend
                </li>

                if (otherPublicProfile.privacy.AllowMessages === 'ALL') {
                    secondEditButton = <li className={classes.EditControl}>
                        <div className={classes.EditControlIcon}><FbMessage/></div>
                    </li>
                    if (otherPublicProfile.privacy.AllowFollowers) {
                        thirdEditButton = <li className={classes.EditControl}>
                            <div className={classes.EditControlIcon}><Follow/></div>
                        </li>
                    }
                } else {
                    secondEditButton = <li className={classes.EditControl}>
                        <div className={classes.EditControlIcon}><Follow/></div>
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

    let editControls;
    if (props.displayProfile === 'me') {
        editControls = (
            <ul className={classes.EditControls}>
                {firstEditButton}
                {secondEditButton}
                {thirdEditButton}
                <OutsideAlerter action={() => setShowMoreOptions(false)}>
                    <li className={classes.EditControl} style={{backgroundColor: showMoreOptions ? 'rgba(0,0,0,0.15)': null}}onClick={() => setShowMoreOptions(prevState => {return !prevState})}><div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots /></div></li>
                    {moreOptionsDropdown}
                </OutsideAlerter>
            </ul>
        )
    } else if (props.displayProfile !== 'me') {
        if (myPublicProfile && otherPublicProfile && otherProfile) {
            editControls = (
                <ul className={classes.EditControls}>
                    {firstEditButton}
                    {secondEditButton}
                    {thirdEditButton}
                    <OutsideAlerter action={() => setShowMoreOptions(false)}>
                        <li className={classes.EditControl}
                            style={{backgroundColor: showMoreOptions ? 'rgba(0,0,0,0.15)' : null}}
                            onClick={() => setShowMoreOptions(prevState => {
                                return !prevState
                            })}>
                            <div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots/></div>
                        </li>
                        {moreOptionsDropdown}
                    </OutsideAlerter>
                </ul>
            )
        }
    }
    if (props.fetchingMyPublicProfile || props.fetchingOtherPublicProfile || props.fetchingOtherProfile) {
        editControls = <InlineDots />
    }

    return (
            <React.Fragment>
            <div className={classes.Break} />
            <section className={classes.NavigationBar}>
                <nav>
                    <ul className={classes.TabControls}>
                        {  props.pathRoot === 'friends' && width >= 840  || props.pathRoot === 'user-profile' && width >= 588 ? <div className={classes.TimelineTab}>
                            <NavLink
                                exact
                                to={`/${props.pathRoot}/${props.displayProfile}`}
                                activeClassName={classes.active}
                            >{props.displayProfile === 'me' ? 'Timeline' : 'Posts'}
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 940 || props.pathRoot === 'user-profile' && width >= 664 ? <div className={classes.AboutTab}>
                            <NavLink
                                to={`/${props.pathRoot}/${props.displayProfile}/about`}
                                activeClassName={classes.active}
                            >About
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 1035 || props.pathRoot === 'user-profile' && width >= 777 ? <div className={classes.FriendsTab}>
                            <NavLink
                                to={`/${props.pathRoot}/${props.displayProfile}/friends`}
                                activeClassName={classes.active}
                            >Friends
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 1160 || props.pathRoot === 'user-profile' && width >=  859 ? <div className={classes.PhotosTab}>
                            <NavLink
                                to={`/${props.pathRoot}/${props.displayProfile}/photos`}
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div> : null }
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
                    {editControls}
                </nav>
            </section>
            </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.fullProfile,
        otherPublicProfile: state.users.singleProfile,
        fetchingMyPublicProfile: state.profile.publicProfileLoading,
        fetchingOtherProfile: state.users.loadingFullProfile,
        fetchingOtherPublicProfile: state.users.loadingSingleProfile
    }
}


export default connect(mapStateToProps)(withRouter(navigationBar));