
import React, {useState} from 'react';
import classes from './EditOptions.css';

import CheckMark from '../../../../../../../assets/images/check';
import DeleteItem from '../../../../../../../assets/images/UserActionIcons/delete';

const editOptions = props => {


    const switchStatus = () => {
        props.switchRead()
    }

    let firstText;
    if (!props.readStatus) {
        if (props.read) {
            firstText = 'Unread';
        } else {
            firstText = 'Read'
        }
    }
    if (props.readStatus) {
        firstText = props.readStatus === 'true' ? 'Unread' : 'Read'
    }



    const firstOption = (
        <div className={classes.Option} onClick={switchStatus}>
            <div className={classes.IconContainer}>
                <div className={classes.OptionIcon}><CheckMark fill="rgba(0,0,0,0.5)"/></div>
            </div>
            <div className={classes.OptionText}>{`Mark as ${firstText}`}</div>
        </div>
    )


    return (
        <div className={classes.Positioner}>
            <div className={classes.Container}>
                {firstOption}
                <div className={classes.Option} onClick={props.deleteRecord}>
                    <div className={classes.IconContainer}>
                        <div className={[classes.OptionIcon, classes.DeleteOptionIcon].join(" ")}>
                            <DeleteItem fill="rgba(0,0,0,0.5)"/>
                        </div>
                    </div>
                    <div className={classes.OptionText}>{`Remove this notification`}</div>
                </div>
            </div>
        </div>
    )
}

export default editOptions;