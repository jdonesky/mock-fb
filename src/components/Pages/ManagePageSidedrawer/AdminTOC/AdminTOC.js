
import React from 'react';
import classes from './AdminTOC.css';

import DownArrow from '../../../../assets/images/down-arrow';

const adminTOC = props => {


    return (
        <div className={classes.TocContainer}>
            <div className={classes.ProfilesDropdownBar}>
                <div className={classes.ProfilesDropdownBarLeftBlock}>
                    <div className={classes.ProfileImage}>

                    </div>
                    <div className={classes.Name}>Example</div>
                </div>
                <div className={classes.DownArrow}><DownArrow fill='black' /></div>
            </div>
        </div>
    )
}

export default adminTOC;