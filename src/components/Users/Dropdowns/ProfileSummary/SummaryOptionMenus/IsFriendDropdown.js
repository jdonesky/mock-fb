import React from 'react';
import classes from './Shared.css';

import Star from '../../../../../assets/images/UserActionIcons/favorite';
import Unfollow from '../../../../../assets/images/UserActionIcons/unfollow';
import Unfriend from '../../../../../assets/images/UserActionIcons/unfriend';

const isFriendOptions = (props) => {
    return (
        <div className={classes.Positioner}>
            <div className={classes.Container}>
                <div className={classes.Option}>
                    <div className={classes.OptionIcon}><Star /></div>
                    <span className={classes.OptionText}>Favorite</span>
                </div>
                <div className={classes.Option}>
                    <div className={classes.OptionIcon}><Unfollow /></div>
                    <span className={classes.OptionText}>Unfollow</span>
                </div>
                <div className={classes.Option}>
                    <div className={classes.OptionIcon}><Unfriend /></div>
                    <span className={classes.OptionText}>Unfriend</span>
                </div>
            </div>
        </div>
    )
}

export default isFriendOptions;