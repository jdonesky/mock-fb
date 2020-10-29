
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index.js'
import {NavLink} from 'react-router-dom'
import classes from './ProfileHeader.css'
import EditBioForm from './EditHeader/EditBioForm'
import SearchSvg from '../../../assets/images/search'
import ViewSvg from '../../../assets/images/eye'
import DownArrow from '../../../assets/images/down-arrow'
import InlineDots from '../../UI/Spinner/InlineDots'

const profileHeader = (props) => {

    const [editingBio, setEditingBio] = useState(false)

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
            <div style={{width: '650px', margin: "0 auto", overflow: "auto"}}>
                <p>{props.bio && props.bio}</p>
                <p className={classes.EditBio} onClick={toggleBioForm}>Edit</p>
            </ div>
        )
    } else {
        bio = <p className={classes.EditBio} onClick={toggleBioForm}>Add Bio</p>
    }

    if (props.contentLoading) {
        bio = <InlineDots className={classes.LoadingIndicator}/>
    }

    return (
        <div className={classes.HeaderContainer}>
            <section className={classes.Intro}>
                <h1>{props.name || 'Your Name'}</h1>
                {bio}
            </section>
            <div className={classes.Break} />
            <section className={classes.NavigationBar}>
                <nav>
                    <ul className={classes.TabControls}>
                        <div className={classes.TimelineTab}>
                            <NavLink
                                exact
                                to="/user-profile"
                                activeClassName={classes.active}
                                >Timeline
                            </NavLink>
                        </div>
                        <div className={classes.AboutTab}>
                            <NavLink
                                to="/user-profile/about"
                                activeClassName={classes.active}
                                >About
                            </NavLink>
                        </div>
                        <div className={classes.FriendsTab}>
                            <NavLink
                                to="/user-profile/friends"
                                activeClassName={classes.active}
                                >Friends
                            </NavLink>
                        </div>
                        <div className={classes.PhotosTab}>
                            <NavLink
                                to="/user-profile/friends"
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div>
                        <div className={classes.MoreTab}>
                            <NavLink
                                to={"/user-profile/more"}
                                activeClassName={classes.active}
                                >More
                            </NavLink>
                            <DownArrow />
                        </div>
                    </ul>
                </nav>
                <nav>
                    <ul className={classes.EditControls}>
                        <li className={classes.EditProfile}>Edit Profile</li>
                        <li><ViewSvg /></li>
                        <li><SearchSvg /></li>
                        <li>...</li>
                    </ul>
                </nav>
            </section>
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

export default connect(mapStateToProps,mapDispatchToProps)(profileHeader);