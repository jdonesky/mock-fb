import React, {useState} from 'react';
import classes from './DropdownsBar.css';

import CreateMenu from './Create/CreateMenu';
import Notifications from "./Notifications/Notifications";
import AccountDropdown from "./Account/AccountDropdown";

import OutsideAlerter from "../../../../hooks/outsideClickHandler";
import Plus from '../../../../assets/images/TopNavButtonIcons/plus';
import Bell from '../../../../assets/images/TopNavButtonIcons/bell';
import Down from '../../../../assets/images/TopNavButtonIcons/caret-down';

const dropdownsBar = (props) => {

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccountMenu,setShowAccountMenu] = useState(false);

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

    let createMenu;
    const createButtonClasses = [classes.Button, classes.Plus];
    if (showCreateMenu) {
        createMenu = <CreateMenu close={closeCreateMenu}/>
        createButtonClasses.push(classes.ButtonActive);
    }

    let accountDropdown;
    const accountButtonClasses = [classes.Button, classes.Down]
    if (showAccountMenu) {
        accountDropdown = <AccountDropdown close={closeAccountMenu}/>
        accountButtonClasses.push(classes.ButtonActive)
    }

    let notificationsDropdown;
    const notificationButtonClasses = [classes.Button, classes.Bell]
    if (showNotifications) {
        notificationsDropdown = <Notifications close={closeNotifications}/>
        notificationButtonClasses.push(classes.ButtonActive)
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

export default dropdownsBar;