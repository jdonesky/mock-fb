
import React, {useState} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import * as actions from '../../../store/actions/index.js'
import classes from './ProfileHeader.css'
import bioClasses from './EditHeader/EditBioForm.css'
import EditBioForm from './EditHeader/EditBioForm'
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
            <div className={bioClasses.BioContainer}>
                <p className={classes.Bio}>{props.bio && props.bio}</p>
                {props.displayProfile === 'me' ? <p className={classes.EditBio} onClick={toggleBioForm}>Edit</p> : null}
            </ div>
        )
    } else {
       bio = props.displayProfile === 'me' ? <p className={classes.EditBio} onClick={toggleBioForm}>Add Bio</p> : <div style={{backgroundColor: 'transparent', height: '20px', width: "100%"}}/>
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