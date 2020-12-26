
import React, {useEffect} from 'react';
import classes from './Timeline.css';
import {connect} from 'react-redux';
import Intro from './Intro/Intro';
import Photos from './Photos/Photos';
import Friends from './Friends/Friends';
import LifeEvents from "./LifeEvents/LifeEvents";
import CreatePost from './Posts/Create/StartCreating';
import Posts from './Posts/Posts';

const timeLine = (props) => {

    let isFriend;
    if (props.myPublicProfile && props.myPublicProfile.friends) {
        if (props.theirPublicProfile) {
            isFriend = props.myPublicProfile.friends.findIndex(friend => friend.userKey === props.theirPublicProfile.userKey) !== -1
        }
    }

    let createPost;
    if (props.displayProfile === 'me') {
        createPost = <CreatePost displayProfile={props.displayProfile}/>
    } else {
        if (isFriend) {
            createPost = <CreatePost displayProfile={props.displayProfile}/>
        }
    }

    return (
        <div className={classes.Timeline}>
            <Intro displayProfile={props.displayProfile}/>
            <Photos displayProfile={props.displayProfile}/>
            <Friends displayProfile={props.displayProfile}/>
            <LifeEvents displayProfile={props.displayProfile}/>
            {createPost}
            <Posts displayProfile={props.displayProfile} type="USER"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile,
        theirPublicProfile: state.users.singleProfile
    }
}

export default connect(mapStateToProps)(timeLine);