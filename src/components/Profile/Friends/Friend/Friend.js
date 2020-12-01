
import React from 'react';
import classes from './Friend.css';

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';

const friend = (props) => {

    const isFriend = props.myFriends.findIndex(friend => friend.userId === props.userId)
    const editButtonClasses = [classes.EditButton];
    if (isFriend === -1) {
        editButtonClasses.push(classes.AddFriendButton)
    }

    let mutualFriends;
    if (props.friends && props.friends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    return (
        <div className={classes.FriendContainer}>
            <div className={classes.IdContainer}>
                <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                    {props.profileImage ? null : <Avatar />}
                </div>
                <div className={classes.NameTag}>
                    <h3 className={classes.Name}>{props.name}</h3>
                    <p className={classes.MutualFriendCount}>{`${mutualFriends && mutualFriends.length && mutualFriends.length > 0 ? mutualFriends.length : 'No'} mutual friend${mutualFriends && mutualFriends.length && mutualFriends.length === 1 ? '': 's'}`}</p>
                </div>
            </div>
            <div className={editButtonClasses.join(" ")}>{isFriend !== -1 ? 'Friend' : 'Add Friend'}</div>
        </div>
    );
}

export default friend;