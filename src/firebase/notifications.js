
import React, {useState} from 'react';
// import {messaging} from '../component/firebase';
import classes from './notifications.css';

const notifications = (props) => {

    const [enabled, setEnabled] = useState(false);

    const renderSubscriptionOptions = () => {
        if (!('serviceWorker' in navigator) && !('PushManager' in window)) {
            return (
                <div className={classes.BrowserSupportMessage}>
                    Looks like notifications are not supported in this browsers.
                    To receive RealTime updates from your dumb friends on dumb facebook
                    consider switching to Chrome (version 50+), Firefox (version 44+)
                    or Opera on Mobile (version 37+)
                </div>
            )
        } else {
            return (
                <div className={classes.PermissionForm}>
                    <div className={classes.PermissionLabel}>Enable notification?</div>
                    <div className={classes.Controls}>
                        <div className={[classes.Button, classes.Deny].join(" ")} onClick={() => setEnabled(false)}>No, don't enable notifications</div>
                        <div className={[classes.Button, classes.Allow].join(" ")} onClick={() => setEnabled(true)}>Yes, enable notifications</div>
                    </div>
                </div>
            )
        }
    }
}

export default notifications