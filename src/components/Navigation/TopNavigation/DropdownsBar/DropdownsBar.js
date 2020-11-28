import React from 'react';
import classes from './DropdownsBar.css';

import Plus from '../../../../assets/images/TopNavButtonIcons/plus';
import Bell from '../../../../assets/images/TopNavButtonIcons/bell';
import Down from '../../../../assets/images/TopNavButtonIcons/caret-down';

const dropdownsBar = (props) => {
    return (
        <div className={classes.DropdownsContainer}>
            <div className={classes.Button}>
                <Plus />
            </div>
            <div className={classes.Button}>
                <Bell />
            </div>
            <div className={classes.Button}>
                <Down />
            </div>
        </div>
    );
}

export default dropdownsBar;