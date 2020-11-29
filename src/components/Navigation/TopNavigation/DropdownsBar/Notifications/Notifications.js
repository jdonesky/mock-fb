
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './Notifications.css';
import Avatar from '../../../../../assets/images/profile-placeholder-gender-neutral';
import Dots from "../../../../../assets/images/dots";

const notifications = (props) => {

    let notifications;
    if (props.notifications && props.notifications.length) {
        notifications = props.notifications.map(note => (
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
        ))
    }

    const placeholder = (<span>No new notifications</span>)


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

                {notifications ? notifications : placeholder}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        notifications: state.profile.notifications
    }
}

export default connect(mapStateToProps)(withRouter(notifications));