
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './Notifications.css';
import * as actions from '../../../../../store/actions/index';
import Dots from "../../../../../assets/images/dots";

import Notification from './Notification/Notification';

const notifications = (props) => {

    const {authToken, logKey, onFetchNewActivity, newActivity} = props;

    useEffect(() => {
        console.log('new', newActivity)
    })

    useEffect(() => {
        if (logKey)
            onFetchNewActivity(authToken, logKey)
    }, [authToken, logKey, onFetchNewActivity])


    let newNotifications;
    if (newActivity && Object.keys(newActivity).length) {
        newNotifications = Object.keys(newActivity).map(key => (
            <Notification
                image={newActivity[key].image}
                text={newActivity[key].text}
                type={newActivity[key].type}
                date={newActivity[key].date}
            />
        ))
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
                {newNotifications && newNotifications.length !== 0? newNotifications : placeholder}
                {/*<span className={[classes.DropdownTitle, classes.SubTitle].join(" ")}>Earlier</span>*/}
                {/*{earlierNotifications.length !== 0 ? earlierNotifications : placeholder}*/}
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