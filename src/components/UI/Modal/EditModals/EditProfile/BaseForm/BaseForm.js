
import React from 'react';
import {connect} from 'react-redux';
import classes from './BaseForm.css';

const baseForm = props => {

    const {profileImage, coverImage, bio} = props


    return (
        <div className={classes.BaseContainer}>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Profile Picture</div>
                    <div className={classes.HeaderButton}>{profileImage ? 'Edit' : 'Add'}</div>
                </div>

                <div className={classes.FormBody}>

                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Cover Photo</div>
                    <div className={classes.HeaderButton}>{coverImage ? 'Edit' : 'Add'}</div>
                </div>
                <div className={classes.FormBody}>

                </div>
            </section>
            <section className={classes.FormContainer}>
                <div className={classes.FormHeader}>
                    <div className={classes.HeaderTitle}>Bio</div>
                    <div className={classes.HeaderButton}>{bio ? 'Edit' : 'Add'}</div>

                </div>
                <div className={classes.FormBody}>

                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profileImage: state.profile.profileImage,
        coverImage: state.profile.coverImage,
        bio: state.profile.bio
    }
}



export default connect(mapStateToProps)(baseForm);