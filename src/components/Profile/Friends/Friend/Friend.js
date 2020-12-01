
import React, {useState} from 'react';
import classes from './Friend.css';
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';

const friend = (props) => {

    const [editing, setEditing] = useState(false);

    const isFriend = props.myFriends.findIndex(friend => friend.userId === props.userId)
    const editButtonClasses = [classes.EditButton];
    if (isFriend === -1) {
        editButtonClasses.push(classes.AddFriendButton)
    }

    let mutualFriends;
    if (props.friends && props.friends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    const openDropdown = () => {
        console.log('clicked!')
        setEditing(true);
    }

    const closeDropdown = () => {
        setEditing(false);
    }

    let editDropdown;
    if (editing) {
        editDropdown = (
            <div className={classes.OptionsDropdown}>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}></div>
                    <span>Favorites</span>
                </div>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}></div>
                    <span>Unfollow</span>
                </div>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}></div>
                    <span>Unfriend</span>
                </div>
            </div>
        )
    }


    return (
        <React.Fragment>
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
                <div className={editButtonClasses.join(" ")} onClick={openDropdown}>{isFriend !== -1 ? 'Friends' : 'Add Friend'}</div>
            </div>
            <OutsideAlerter action={closeDropdown}>
                <div className={classes.OptionsDropdownPositioner}>
                    {editDropdown}
                </div>
            </OutsideAlerter>
        </React.Fragment>
    );
}

export default friend;