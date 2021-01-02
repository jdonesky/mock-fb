
import React, {useState, useRef, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './BaseForm.css';
import EditBioForm from '../../../../../Profile/ProfileHeader/EditHeader/EditBioForm';
import InlineDots from '../../../../Spinner/InlineDots';

import * as actions from "../../../../../../store/actions";
import {EditProfileContext} from "../../../../../../context/edit-profile-context";
import Avatar from '../../../../../../assets/images/BookmarkIcons/user';
import House from '../../../../../../assets/images/home';
import Briefcase from '../../../../../../assets/images/briefcase';
import GraduationCap from '../../../../../../assets/images/graduation-cap';
import Pin from '../../../../../../assets/images/Pin';
import Heart from '../../../../../../assets/images/heart';


const baseForm = props => {


    const profilePicContainer = useRef(null);
    const profilePicUploader = useRef(null);
    const coverPicContainer = useRef(null);
    const coverPicUploader = useRef(null);

    const [editingBio, setEditingBio] = useState(false);
    const editBioRef = useRef(null)
    const {profileImage, coverImage, bio} = props
    const editProfileContext = useContext(EditProfileContext);

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profilePicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    props.onProfileUpdate(props.authToken,props.firebaseKey,"profileImage",event.target.result, 'edit')
                } else {
                    coverPicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    props.onProfileUpdate(props.authToken,props.firebaseKey,"coverImage",event.target.result, 'edit')
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const editBio = () => {
        setEditingBio(true);
        editBioRef.current.scrollIntoView({behavior: "smooth"})
    }

    const saveBioEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, "bio", payload, "edit")
        setEditingBio(false);
    }

    let bioContents

    if (bio) {
        bioContents = <div>{bio}</div>;
    }
    if (editingBio) {
        bioContents =  <EditBioForm save={saveBioEdits} cancel={() => setEditingBio(false)}/>
    }
    if (props.updatingProfile) {
        bioContents = <InlineDots />
    }
    if (!bio && !editingBio && !props.updatingProfile) {
        bioContents = <div className={classes.BioCaption}>Describe yourself...</div>
    }


    let currLocationIntro;
    let workplaceIntro;
    let schoolIntro;
    let hometownIntro;
    let relationshipIntro;

    if (props.currentLocation && props.currentLocation.introItem) {
        currLocationIntro = <span className={classes.FilledEntry}>{`Lives in ${props.currentLocation.name}`}</span>
    } else {
        currLocationIntro = 'Current City';
    }

    if (props.occupations && props.occupations.filter(occupation => occupation.introItem).length !== 0) {
        workplaceIntro = <span className={classes.FilledEntry}>{`${props.occupations.find(occupation => occupation.introItem).position} at ${props.occupations.find(occupation => occupation.introItem).company}`}</span>
    } else {
        workplaceIntro = 'Workplace';
    }

    if (props.education && props.education.filter(school => school.introItem).length !== 0) {
        schoolIntro = <span className={classes.FilledEntry}>{props.education.find(school => school.introItem).school}</span>
    } else {
        schoolIntro = 'School';
    }

    if (props.hometown && props.hometown.introItem) {
        hometownIntro = <span className={classes.FilledEntry}>{`From ${props.hometown.name}`}</span>
    } else {
        hometownIntro = 'Hometown';

    }

    if (props.relationships && props.relationships.filter(relationship => relationship.introItem).length !== 0) {
        relationshipIntro = <span className={classes.FilledEntry}>{props.relationships && props.relationships.find(relationship => relationship.introItem).status}</span>
    } else {
        relationshipIntro = 'Relationship Status'
    }


    return (
        <div className={classes.BaseContainer}>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Profile Picture</div>
                    <div className={classes.HeaderButton} onClick={() => profilePicUploader.current.click()}>{profileImage ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    <div className={classes.ProfileImage} ref={profilePicContainer} style={{backgroundImage: profileImage ? `url(${profileImage})` : null, filter: props.updatingProfile ? 'grayscale(100%)': null}} onClick={() => profilePicUploader.current.click()}>
                        {profileImage ? null : <Avatar fill="white" />}
                    </div>
                    <input
                        ref={profilePicUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(event) => imageUploadHandler(event, 'PROFILE')}
                        style={{
                            display: "none"
                        }}
                    />
                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Cover Photo</div>
                    <div className={classes.HeaderButton} onClick={() => coverPicUploader.current.click()}>{coverImage ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    <div className={classes.CoverImage} ref={coverPicContainer} style={{backgroundImage: coverImage ? `url(${coverImage})` : null, filter: props.updatingProfile ? 'grayscale(100%)': null }} onClick={() => coverPicUploader.current.click()}/>
                    <input
                        ref={coverPicUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={imageUploadHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Bio</div>
                    <div className={classes.HeaderButton} onClick={editBio}>{bio ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>
                    {bioContents}
                    <div style={{marginTop: '200px'}} ref={editBioRef}/>
                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Customize Your Intro</div>
                    <div className={classes.HeaderButton} onClick={() => editProfileContext.toggleModalContent('INTRO')}>{'Add'}</div>
                </div>
                <div className={[classes.FormBody, classes.CustomizeIntroForm].join(" ")}>
                    <div className={classes.IntroEntry}>
                        <div className={classes.IntroIcon}><House fill="rgba(0,0,0,0.4)"/></div>
                        {currLocationIntro}
                    </div>
                    <div className={classes.IntroEntry}>
                        <div className={[classes.IntroIcon, classes.Briefcase].join(" ")}><Briefcase fill="rgba(0,0,0,0.4)"/></div>
                        {workplaceIntro}
                    </div>
                    <div className={classes.IntroEntry}>
                        <div className={[classes.IntroIcon, classes.GradCap].join(" ")}><GraduationCap fill="rgba(0,0,0,0.4)"/></div>
                        {schoolIntro}
                    </div>
                    <div className={classes.IntroEntry}>
                        <div className={classes.IntroIcon}><Pin fill="rgba(0,0,0,0.4)"/></div>
                        {hometownIntro}
                    </div>
                    <div className={classes.IntroEntry}>
                        <div className={classes.IntroIcon}><Heart fill="rgba(0,0,0,0.4)"/></div>
                        {relationshipIntro}
                    </div>
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
        currentLocation: state.profile.currLocation,
        occupations: state.profile.occupations,
        education: state.profile.education,
        hometown: state.profile.hometown,
        relationships: state.profile.relationships,
        intro: state.profile.intro,
        updatingProfile: state.profile.contentEntryLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken,firebaseKey,fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken,firebaseKey,fieldName, payload, how, id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(baseForm);