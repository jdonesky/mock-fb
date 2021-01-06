
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './Notifications.css';
import * as actions from '../../../../../store/actions/index';
import Dots from "../../../../../assets/images/dots";

import Notification from './Notification/Notification';

const notifications = (props) => {

    const {authToken, logKey, onFetchNewActivity, newActivity, onSwitchReadStatus, idInProcess, switchingReadStatus, onDeleteRecord, deletedRecord} = props;

    useEffect(() => {
        console.log('new', newActivity)
    })

    useEffect(() => {
        if (logKey)
            onFetchNewActivity(authToken, logKey)
    }, [authToken, logKey, onFetchNewActivity])

    const switchRead = (key, record) => {
        const modifiedRecord = {
            ...record,
            read: record.read === "false" ? "true" : "false"
        }
        onSwitchReadStatus(authToken, logKey, key, modifiedRecord)
    }

    const deleteRecord = (key) => {
        onDeleteRecord(authToken, logKey, key)
    }

    let newNotifications;
    if (newActivity && Object.keys(newActivity).length) {
        newNotifications = Object.keys(newActivity).map(key => (
            <Notification
                key={key}
                id={key}
                switchingReadStatus={switchingReadStatus}
                deletedRecord={deletedRecord}
                idInProcess={idInProcess}
                image={newActivity[key].image}
                text={newActivity[key].text}
                subject={newActivity[key].subject}
                type={newActivity[key].type}
                date={newActivity[key].date}
                read={newActivity[key].read}
                myProfileImage={props.myProfileImage}
                switchRead={() => switchRead(key, newActivity[key])}
                deleteRecord={() => deleteRecord(key)}
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
        myProfileImage: state.profile.profileImage,
        newActivity: state.activity.newActivity,
        switchingReadStatus: state.activity.switchingReadStatus,
        deletedRecord: state.activity.deletedActivity,
        idInProcess: state.activity.idInProcess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNewActivity: (authToken, logKey) => dispatch(actions.fetchNewActivityRecordAttempt(authToken, logKey)),
        onSwitchReadStatus: (authToken, logKey, key, record) => dispatch(actions.switchReadStatusAttempt(authToken, logKey, key, record)),
        onDeleteRecord: (authToken, logKey, key) => dispatch(actions.deleteActivityAttempt(authToken, logKey, key))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(notifications));