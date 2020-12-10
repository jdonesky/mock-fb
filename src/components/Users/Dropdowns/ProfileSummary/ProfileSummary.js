import React from 'react';
import classes from './ProfileSummary.css';

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';

const profileSummaryDropdown = (props) => {

    let mutualFriends;
    if (props.friends && props.friends.length && props.myFriends && props.myFriends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    let firstInfo;
    if (mutualFriends) {
        firstInfo = mutualFriends
    }




    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderContainer}>
                <div className={classes.ProfileImageBlock}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}>
                        {props.profileImage ? null : <Avatar />}
                    </div>
                    <div className={classes.UserInfoContainer}>
                        <div className={classes.UserName}>{props.name}</div>
                        <div className={classes.InfoEntry}></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default profileSummaryDropdown;