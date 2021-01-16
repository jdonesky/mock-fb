import React, { useState, useEffect, useContext } from 'react';
import {connect} from 'react-redux';
import classes from './DropdownsBar.css';
import {MessengerContext} from '../../../../context/messenger-context';

import CreateMenu from './Create/CreateMenu';
import Notifications from "./Notifications/Notifications";
import AccountDropdown from "./Account/AccountDropdown";
import Messages from "./Messages/Messages"
import NewCounter from '../Shared/NewCounter/NewCounter';

import OutsideAlerter from "../../../../hooks/outsideClickHandler";
import Plus from '../../../../assets/images/TopNavButtonIcons/plus';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import Bell from '../../../../assets/images/TopNavButtonIcons/bell';
import Down from '../../../../assets/images/TopNavButtonIcons/caretDown';


const dropdownsBar = (props) => {

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccountMenu,setShowAccountMenu] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const messengerContext = useContext(MessengerContext);
    const { firebaseKey, newMessages, activeChat } = props;

    const toggleAccountMenu = () => {
        setShowAccountMenu(prevState => {
            return !prevState;
        })
    }

    const closeAccountMenu = () => {
        setShowAccountMenu(false);
    }

    const toggleNotifications = () => {
        setShowNotifications(prevState => {
            return !prevState;
        })
    }

    const closeNotifications = () => {
        setShowNotifications(false);
    }

    const toggleCreateMenu = () => {
        setShowCreateMenu(prevState => {
            return !prevState;
        })
    }

    const closeCreateMenu = () => {
        setShowCreateMenu(false);
    }

    const toggleMessages = () => {
        setShowMessages(prevState => {
            return !prevState
        })
    }

    const closeMessages = () => {
        setShowMessages(false);
    }

    let createMenu;
    const createButtonClasses = [classes.Button, classes.Plus];
    if (showCreateMenu) {
        createMenu = <CreateMenu close={closeCreateMenu}/>
        createButtonClasses.push(classes.ButtonActive);
    }

    let accountDropdown;
    const accountButtonClasses = [classes.Button, classes.Down];
    if (showAccountMenu) {
        accountDropdown = <AccountDropdown close={closeAccountMenu}/>
        accountButtonClasses.push(classes.ButtonActive);
    }

    let notificationsDropdown;
    const notificationButtonClasses = [classes.Button, classes.Bell];
    if (showNotifications) {
        notificationsDropdown = <Notifications close={closeNotifications}/>
        notificationButtonClasses.push(classes.ButtonActive);
    }

    let messagesDropdown;
    const messagesButtonClasses = [classes.Button, classes.Messages];
    if (showMessages) {
        messagesDropdown = <Messages close={closeMessages}/>
        messagesButtonClasses.push(classes.ButtonActive);
    }

    let filtered
    let newMessageCount;
    if (newMessages && newMessages.filter(msg => msg.senderKey !== firebaseKey).length) {
        filtered = newMessages.filter(msg => msg.senderKey !== firebaseKey)
        if (filtered.length && activeChat && messengerContext.showMessenger) {
            filtered = filtered.filter(msg => msg.chatKey !== activeChat.key)
        }
        // if (filtered.length && removedMessageKey) {
        //     console.log('IN REMOVED MESSAGE KEY BLOCK')
        //     filtered = filtered.filter(msg => msg.senderKey !== removedMessageKey)
        // }
        if (filtered.length) {
            newMessageCount = <NewCounter count={filtered.length}/>
        }
    }

    return (
        <div className={classes.DropdownsContainer}>
            <div className={createButtonClasses.join(" ")} onClick={toggleCreateMenu}>
                <Plus fill={showCreateMenu ? '#1b6ee3' : null}/>
            </div>
            <OutsideAlerter action={closeCreateMenu}>
                <div className={classes.AccountDropdownPositioner}>
                    {showCreateMenu && <div className={classes.ButtonBlocker} onClick={closeCreateMenu}/>}
                    {createMenu}
                </div>
            </OutsideAlerter>
            {newMessageCount}
            <div className={messagesButtonClasses.join(" ")} onClick={toggleMessages}>
                <FbMessage fill={showMessages ? '#1b6ee3' : null}/>
            </div>
            <OutsideAlerter action={closeMessages}>
                <div className={classes.AccountDropdownPositioner}>
                    {showMessages && <div className={classes.ButtonBlocker} onClick={closeMessages}/>}
                    {messagesDropdown}
                </div>
            </OutsideAlerter>
            <div className={notificationButtonClasses.join(" ")} onClick={toggleNotifications}>
                <Bell fill={showNotifications ? '#1b6ee3' : null}/>
            </div>
            <OutsideAlerter action={closeNotifications}>
                <div className={classes.AccountDropdownPositioner}>
                    {showNotifications && <div className={classes.ButtonBlocker} onClick={closeNotifications}/>}
                    {notificationsDropdown}
                </div>
            </OutsideAlerter>
            <div className={accountButtonClasses.join(" ")} onClick={toggleAccountMenu}>
                <Down fill={showAccountMenu ? '#1b6ee3' : null}/>
            </div>
            <OutsideAlerter action={closeAccountMenu}>
                <div className={classes.AccountDropdownPositioner}>
                    {showAccountMenu && <div className={classes.ButtonBlocker} onClick={closeAccountMenu}/>}
                    {accountDropdown}
                </div>
            </OutsideAlerter>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        newMessages: state.messenger.newMessages,
        firebaseKey: state.profile.firebaseKey,
        activeChat: state.profile.activeChat,
    }
}

export default connect(mapStateToProps)(dropdownsBar);