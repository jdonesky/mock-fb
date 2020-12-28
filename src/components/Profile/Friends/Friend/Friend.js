
import React, {useState} from 'react';
import classes from './Friend.css';
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';
import Favorite from '../../../../assets/images/UserActionIcons/favorite';
import Unfollow from '../../../../assets/images/UserActionIcons/unfollow';
import Unfriend from '../../../../assets/images/UserActionIcons/unfriend';

const friend = (props) => {

    const [editing, setEditing] = useState(false);

    const isFriend = props.myFriends.findIndex(friend => friend.userId === props.this.userId)
    const editButtonClasses = [classes.EditButton];
    if (isFriend === -1) {
        editButtonClasses.push(classes.AddFriendButton)
    }

    let mutualFriends;
    if (props.this.friends && props.this.friends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.this.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    const openDropdown = () => {
        setEditing(true);
    }

    const closeDropdown = () => {
        setEditing(false);
    }

    let editDropdown;
    if (editing) {
        editDropdown = (
            <div className={classes.OptionsDropdown}>
                <div className={classes.BaseArrow}/>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}><Favorite /></div>
                    <span>Favorites</span>
                </div>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}><Unfollow /></div>
                    <span>Unfollow</span>
                </div>
                <div className={classes.DropdownOptionsButton}>
                    <div className={classes.DropdownIcon}><Unfriend /></div>
                    <span>Unfriend</span>
                </div>
            </div>
        )
    }


    return (
        <React.Fragment>
            <div className={classes.FriendContainer}>
                <div className={classes.IdContainer}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.this.profileImage ? `url(${props.this.profileImage})` : null}} onClick={() => props.navTo(props.this.userKey)}>
                        {props.this.profileImage ? null : <Avatar />}
                    </div>
                    <div className={classes.NameTag}>
                        <h3 className={classes.Name} onClick={() => props.navTo(props.this.userKey)}>{props.this.firstName + ' ' + props.this.lastName}</h3>
                        <p className={classes.MutualFriendCount}>{`${mutualFriends && mutualFriends.length && mutualFriends.length > 0 ? mutualFriends.length : 'No'} mutual friend${mutualFriends && mutualFriends.length && mutualFriends.length === 1 ? '': 's'}`}</p>
                    </div>
                </div>
                <div className={editButtonClasses.join(" ")} onClick={openDropdown}>{isFriend !== -1 ? 'Friends' : 'Add Friend'}</div>
            </div>
            <OutsideAlerter action={closeDropdown}>
                <div className={classes.OptionsDropdownPositioner}>
                    {editing ? <div className={classes.EditButtonBlocker} onClick={closeDropdown}/> : null}
                    {editDropdown}
                </div>
            </OutsideAlerter>
        </React.Fragment>
    );
}

export default friend;