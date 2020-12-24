
import React from 'react';
import {withRouter} from 'react-router';
import classes from './NavTab.css';

import Flag from '../../../../../../assets/images/TopNavButtonIcons/flag';
import Inbox from '../../../../../../assets/images/MiscIcons/inbox';
import Bell from '../../../../../../assets/images/TopNavButtonIcons/bell';
import Pen from '../../../../../../assets/images/edit';
import Gear from '../../../../../../assets/images/TopNavButtonIcons/gear';

const navTab = props => {

    let tabContainerClasses = [classes.TabContainer]
    const iconClasses = [classes.IconContainer];
    let iconFill = "#000000"
    if (props.history.location.pathname === props.path) {
        tabContainerClasses.push(classes.ActiveTab);
        iconClasses.push(classes.ActiveIcon);
        iconFill = "white";
    }

    let icon;
    switch (props.name) {
        case 'Path':
            icon = <Flag fill={iconFill}/>
            break;
        case 'Inbox':
            icon = <Inbox fill={iconFill}/>
            break;
        case 'Notifications':
            icon = <Bell fill={iconFill}/>
            break;
        case 'Edit Page Info':
            icon = <Pen fill={iconFill}/>
            break;
        case 'Settings':
            icon = <Gear fill={iconFill}/>
            break;
        default:
            icon = <Flag fill={iconFill}/>
    }

    return (
        <div className={tabContainerClasses.join(" ")} onClick={() => props.history.push(props.path)}>
            <div className={classes.LeftBlock}>
                <div className={iconClasses.join(" ")}>{icon}</div>
                <div className={classes.Name}>{props.name}</div>
            </div>
        </div>
    )
}

export default withRouter(navTab);