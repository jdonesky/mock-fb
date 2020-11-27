
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import * as actions from '../../../store/actions/index.js'
import classes from './ProfileHeader.css'
import bioClasses from './EditHeader/EditBioForm.css'
import EditBioForm from './EditHeader/EditBioForm'
import NavDropdown from './NavigationDropdown/NavigationDropdown'

import SearchSvg from '../../../assets/images/search'
import ViewSvg from '../../../assets/images/eye'
import DownArrow from '../../../assets/images/down-arrow'
import InlineDots from '../../UI/Spinner/InlineDots'
import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";

const profileHeader = (props) => {

    const [editingBio, setEditingBio] = useState(false)
    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const {width, height} = getWindowDimensions()


    useEffect(() => {
        console.log('width', width)
        console.log('height', height)
        console.log('props.match', props.location.pathname);
    })

    const toggleNavDropdown = () => {
        setShowNavDropdown(prevState => {
            return !prevState;
        });
    }

    const closeNavDropdown = () => {
        setShowNavDropdown(false);
    }

    const toggleBioForm = () => {
        setEditingBio((prevState => {
            return !prevState;
        }));
    }

    const saveBioEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, "bio", payload, "edit")
        toggleBioForm()
    }

    let bio;
    if (editingBio) {
        bio = <EditBioForm bio={props.bio && props.bio} cancel={toggleBioForm} save={saveBioEdits}/>;
    } else if (!editingBio && props.bio) {
        bio = (
            <div className={bioClasses.BioContainer}>
                <p className={classes.Bio}>{props.bio && props.bio}</p>
                <p className={classes.EditBio} onClick={toggleBioForm}>Edit</p>
            </ div>
        )
    } else {
        bio = <p className={classes.EditBio} onClick={toggleBioForm}>Add Bio</p>
    }

    if (props.contentLoading) {
        bio = <InlineDots className={classes.LoadingIndicator}/>
    }

    let navDropdown;
    if (showNavDropdown) {
        navDropdown = <NavDropdown />
    }

    const moreTabClasses = [classes.MoreTab]
    if (width <= 859) {
        if (props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    if (width <= 777) {
        if (props.location.pathname === '/user-profile/friends' || props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    if (width <= 664) {
        if ( props.location.pathname === '/user-profile/about' || props.location.pathname === '/user-profile/friends' || props.location.pathname === '/user-profile/photos') {
            moreTabClasses.push(classes.ActiveMoreTab);
        }
    }

    return (
        <div className={classes.HeaderContainer}>
            <section className={classes.Intro}>
                <h1>{props.name || 'Your Name'}</h1>
                {bio}
            </section>
            {/*<section className={classes.NavigationBar}>*/}
            {/*    <nav>*/}
            {/*        <ul className={classes.TabControls}>*/}
            {/*            <div className={classes.TimelineTab}>*/}
            {/*                <NavLink*/}
            {/*                    exact*/}
            {/*                    to="/user-profile"*/}
            {/*                    activeClassName={classes.active}*/}
            {/*                    >Timeline*/}
            {/*                </NavLink>*/}
            {/*            </div>*/}
            {/*            <div className={classes.AboutTab}>*/}
            {/*                <NavLink*/}
            {/*                    to="/user-profile/about"*/}
            {/*                    activeClassName={classes.active}*/}
            {/*                    >About*/}
            {/*                </NavLink>*/}
            {/*            </div>*/}
            {/*            <div className={classes.FriendsTab}>*/}
            {/*                <NavLink*/}
            {/*                    to="/user-profile/friends"*/}
            {/*                    activeClassName={classes.active}*/}
            {/*                    >Friends*/}
            {/*                </NavLink>*/}
            {/*            </div>*/}
            {/*            <div className={classes.PhotosTab}>*/}
            {/*                <NavLink*/}
            {/*                    to="/user-profile/photos"*/}
            {/*                    activeClassName={classes.active}*/}
            {/*                >Photos*/}
            {/*                </NavLink>*/}
            {/*            </div>*/}
            {/*            <div className={moreTabClasses.join(" ")} onClick={toggleNavDropdown}>*/}
            {/*                <div*/}
            {/*                    >More*/}
            {/*                </div>*/}
            {/*                <div className={classes.MoreArrowContainer}>*/}
            {/*                    <DownArrow />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={classes.MoreTabBlockPositioner}>*/}
            {/*                <div className={classes.MoreTabBlocker} style={{display: showNavDropdown ? 'block' : 'none'}}/>*/}
            {/*                <OutsideAlerter action={closeNavDropdown}>*/}
            {/*                    <div className={classes.DropdownNavPositioner}>*/}
            {/*                        {navDropdown}*/}
            {/*                    </div>*/}
            {/*                </OutsideAlerter>*/}
            {/*            </div>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*    <nav>*/}
            {/*        <ul className={classes.EditControls}>*/}
            {/*            <li className={classes.EditProfile}>Edit Profile</li>*/}
            {/*            <li><ViewSvg /></li>*/}
            {/*            <li><SearchSvg /></li>*/}
            {/*            <li>...</li>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</section>*/}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        contentLoading: state.profile.contentEntryLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken,firebaseKey,fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken,firebaseKey,fieldName, payload, how, id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(profileHeader));