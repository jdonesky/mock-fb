
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './ContactsSidedrawer.css';
import Contact from './Contact/Contact';

const contactsSidedrawer = props => {

    const { myPublicProfile, online } = props;
    const [ usersOnline, setUsersOnline ] = useState(null);

    useEffect(() => {
        if (online) {
            setUsersOnline(online.map(obj => {
                let key = Object.keys(obj)[0]
                if (obj[key]) {
                    return key;
                }
            }))
        }
    }, [online])

    let myContacts;
    if (myPublicProfile && myPublicProfile.friends) {
        myContacts = myPublicProfile.friends.map(friend => (
            <Contact
                key={friend.userKey}
                name={friend.name}
                userKey={friend.userKey}
                userId={friend.userId}
                profileImage={friend.profileImage}
                online={usersOnline}
            />
        ))
    }

    return (
        <div className={classes.Container}>
            {myContacts}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile,
        online: state.friends.online
    }
}

export default connect(mapStateToProps)(contactsSidedrawer);