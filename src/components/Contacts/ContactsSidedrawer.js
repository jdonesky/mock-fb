
import React from 'react';
import {connect} from 'react-router';
import classes from './ContactsSidedrawer.css';

const contactsSidedrawer = props => {

    const { myPublicProfile } = props;

    let myContacts;
    if (myPublicProfile && myPublicProfile.friends) {
        myContacts = myPublicProfile.friends;
    }

    return (
        <div className={classes.Container}>
            {myContacts}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile
    }
}

export default connect(mapStateToProps)(contactsSidedrawer);