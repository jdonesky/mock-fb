import React, {useState} from 'react';
import classes from './DropdownsBar.css';

import AccountDropdown from "./Account/AccountDropdown";

import OutsideAlerter from "../../../../hooks/outsideClickHandler";
import Plus from '../../../../assets/images/TopNavButtonIcons/plus';
import Bell from '../../../../assets/images/TopNavButtonIcons/bell';
import Down from '../../../../assets/images/TopNavButtonIcons/caret-down';

const dropdownsBar = (props) => {

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showNotification, setShowNotifications] = useState(false);
    const [showAccountMenu,setShowAccountMenu] = useState(true);

    const toggleAccountMenu = () => {
        setShowAccountMenu(prevState => {
            return !prevState;
        })
    }

    const closeAccountMenu = () => {
        setShowAccountMenu(false);
    }

    let accountDropdown;
    if (showAccountMenu) {
        accountDropdown = <AccountDropdown />
    }

        return (
        <div className={classes.DropdownsContainer}>
            <div className={[classes.Button, classes.Plus].join(" ")}>
                <Plus />
            </div>
            <div className={[classes.Button, classes.Bell].join(" ")}>
                <Bell />
            </div>
            <div className={[classes.Button, classes.Down].join(" ")} onClick={toggleAccountMenu}>
                <Down />
            </div>
            <OutsideAlerter action={closeAccountMenu}>
                <div className={classes.AccountDropdownPositioner}>
                    {showAccountMenu && <div className={classes.AccountButtonBlocker} onClick={closeAccountMenu}/>}
                    {accountDropdown}
                </div>
            </OutsideAlerter>
        </div>
    );
}

export default dropdownsBar;