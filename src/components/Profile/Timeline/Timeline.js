
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import classes from './Timeline.css';
import {connect} from 'react-redux';
import Greeting from './Greeting/Greeting';
import Intro from './Intro/Intro';
import Photos from './Photos/Photos';
import Friends from './Friends/Friends';
import LifeEvents from "./LifeEvents/LifeEvents";
import CreatePost from './Posts/Create/StartCreating';
import Posts from './Posts/Posts';

const timeLine = (props) => {

    const [acceptedFriendRequest, setAcceptedFriendRequest] = useState(false);
    const [displayProfile, setDisplayProfile] = useState(props.history.location.pathname.split('/')[2])

    useEffect(() => {
        if (displayProfile !== props.history.location.pathname.split('/')[2]) {
            setDisplayProfile(props.history.location.pathname.split('/')[2])
        }
    })

    useEffect(() => {
        setAcceptedFriendRequest(false);
    }, [displayProfile])


    let isFriend;
    if (props.myPublicProfile && props.myPublicProfile.friends) {
        if (props.theirPublicProfile) {
            isFriend = props.myPublicProfile.friends.findIndex(friend => friend.userKey === props.theirPublicProfile.userKey) !== -1
        }
    }

    let createPost;
    let greeting;
    if (props.displayProfile === 'me') {
        createPost = <CreatePost displayProfile={props.displayProfile}/>
    } else {
        if (isFriend || acceptedFriendRequest) {
            createPost = <CreatePost displayProfile={props.displayProfile}/>
        } else {
            if (props.theirPublicProfile) {
                greeting = <Greeting name={props.theirPublicProfile.firstName} acceptRequest={() => setAcceptedFriendRequest(true)}/>
            }
        }
    }

    return (
        <div className={classes.Timeline}>
            {greeting}
            <Intro displayProfile={props.displayProfile}/>
            <Photos displayProfile={props.displayProfile}/>
            <Friends displayProfile={props.displayProfile}/>
            <LifeEvents displayProfile={props.displayProfile}/>
            {createPost}
            <Posts displayProfile={props.displayProfile} userType="USER"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myPublicProfile: state.profile.publicProfile,
        theirPublicProfile: state.users.singleProfile
    }
}

export default connect(mapStateToProps)(withRouter(timeLine));