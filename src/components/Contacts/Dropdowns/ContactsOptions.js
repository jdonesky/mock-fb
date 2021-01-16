
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './ContactsOptions.css';
import Switch from '../../UI/Switch/Switch';
import Id from "../../../assets/images/MiscIcons/idCard";
import ActiveUser from "../../../assets/images/UserActivityIcons/activeUser";
import Block from "../../../assets/images/MessengerIcons/blockMessage";

const contactsOptions = props => {

    const {authToken, userId, activeStatus, onSwitchActiveStatus, showContacts, toggleContacts, close} = props

    const toggleContactList = () => {
        toggleContacts();
        close();
    }

    const toggleActiveStatus = () => {
        if (activeStatus) {
            onSwitchActiveStatus(authToken, userId, false);
        } else {
            onSwitchActiveStatus(authToken, userId, true);
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Arrow}/>
            <div className={classes.DropdownOptionsButton} onClick={toggleContactList}>
                <div className={classes.DropdownIcon}><Id /></div>
                <span>{`${showContacts ? 'Hide' : 'Show'} Contacts`}</span>
            </div>
            <div className={classes.Break} />
            <div className={classes.DropdownOptionsButton}>
                <div className={classes.DropdownIcon}><ActiveUser /></div>
                <span>{`Turn ${activeStatus ? 'Off' : 'On'} Active Status`}</span>
                <div className={classes.SwitchBlock}>
                    <Switch isSelected={activeStatus} onChange={toggleActiveStatus}/>
                </div>
            </div>
            <div className={classes.DropdownOptionsButton}>
                <div className={classes.DropdownIcon}><Block /></div>
                <span>Block Settings</span>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        userId: state.auth.userId,
        activeStatus: state.profile.activeStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSwitchActiveStatus: (authToken, userId, status) => dispatch(actions.switchActiveStatusAttempt(authToken, userId, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(contactsOptions);