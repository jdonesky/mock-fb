
import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import classes from './BaseForm.css';
import EditBioForm from '../../../../../Profile/ProfileHeader/EditHeader/EditBioForm';
import InlineDots from '../../../../Spinner/InlineDots';

import Avatar from '../../../../../../assets/images/BookmarkIcons/user';
import * as actions from "../../../../../../store/actions";



const baseForm = props => {

    const [editingBio, setEditingBio] = useState(false);
    const editBioRef = useRef(null)
    const {profileImage, coverImage, bio} = props

    const editBio = () => {
        setEditingBio(true);
        editBioRef.current.scrollIntoView({behavior: "smooth"})
    }

    const saveBioEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, "bio", payload, "edit")
        setEditingBio(false);
    }

    return (
        <div className={classes.BaseContainer}>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Profile Picture</div>
                    <div className={classes.HeaderButton}>{profileImage ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    <div className={classes.ProfileImage} style={{backgroundImage: profileImage ? `url(${profileImage})` : null}}>
                        {profileImage ? null : <Avatar fill="white" />}
                    </div>
                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Cover Photo</div>
                    <div className={classes.HeaderButton}>{coverImage ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    <div className={classes.CoverImage} style={{backgroundImage: coverImage ? `url(${coverImage})` : null }}/>
                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Bio</div>
                    <div className={classes.HeaderButton} onClick={editBio}>{bio ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    {bio ? <div>{bio}</div> : editingBio ? <EditBioForm save={saveBioEdits} cancel={() => setEditingBio(false)}/> : props.updatingProfile ? <InlineDots /> : <div className={classes.BioCaption}>Describe yourself...</div>}
                    <div style={{marginTop: '200px'}} ref={editBioRef}/>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        profileImage: state.profile.profileImage,
        coverImage: state.profile.coverImage,
        bio: state.profile.bio,
        updatingProfile: state.profile.contentEntryLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken,firebaseKey,fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken,firebaseKey,fieldName, payload, how, id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(baseForm);