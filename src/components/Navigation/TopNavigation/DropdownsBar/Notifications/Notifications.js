
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './Notifications.css';
import * as actions from '../../../../../store/actions/index';
import Avatar from '../../../../../assets/images/profile-placeholder-gender-neutral';
import Dots from "../../../../../assets/images/dots";

const notifications = (props) => {

    const {authToken, logKey, onFetchNewActivity} = props;

    useEffect(() => {
        if (logKey)
            onFetchNewActivity(authToken, logKey)
    }, [authToken, logKey, onFetchNewActivity])

    let newNotifications = [];
    let earlierNotifications = [];
    if (props.newActivity && props.newActivity.length) {
        props.newActivity.forEach(note => {
            if (note.date && new Date(note.date) < new Date()) {
                newNotifications.push(
                    <section className={classes.NotificationContainer}>
                        <div className={classes.ImageContainer}
                             style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}
                        >
                            {props.profileImage ? null : <Avatar />}
                        </div>
                        <div className={classes.TextContainer}>
                            <div className={classes.Name}>{props.name ? props.name : ''}</div>
                            <div className={classes.SubText}>See your profile</div>
                        </div>
                        <div className={classes.EditButtonContainer}>
                            <div className={classes.EditButton}></div>
                        </div>
                    </section>
                )
            }
        });
    }

    const placeholder = (<span className={classes.Placeholder}>No activity</span>)


    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderContainer}>
                <div className={classes.DropdownTitle}>
                    <b>Notifications</b>
                </div>
                <div className={classes.HeaderOptionsButton}>
                    <Dots />
                </div>
            </section>
            <section className={classes.NotificationsContainer}>
                <span className={[classes.DropdownTitle, classes.SubTitle].join(" ")}>New</span>
                {newNotifications.length !== 0? newNotifications : placeholder}
                <span className={[classes.DropdownTitle, classes.SubTitle].join(" ")}>Earlier</span>
                {earlierNotifications.length !== 0 ? earlierNotifications : placeholder}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        logKey: state.profile.activityLogKey,
        newActivity: state.activity.newActivity,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNewActivity: (authToken, key) => dispatch(actions.fetchNewActivityRecordAttempt(authToken, key))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(notifications));