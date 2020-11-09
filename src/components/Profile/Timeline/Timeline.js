
import React from 'react';
import {connect} from 'react-redux';
import classes from './Timeline.css';
import Intro from './Intro/Intro';
import Photos from './Photos/Photos';
import Friends from './Friends/Friends';
import LifeEvents from "./LifeEvents/LifeEvents";
import CreatePost from './Posts/Create/StartCreating';
import Post from './Posts/Post/Post'

const timeLine = ({posts}) => {

    const posts_ = posts && posts.map(post => (
        <Post key={post.id} />
    ))

    return (
        <div className={classes.Timeline}>
            <Intro />
            <Photos />
            <Friends />
            <LifeEvents />
            <CreatePost />
            {posts_}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.profile.posts
    }
}

export default connect(mapStateToProps)(timeLine);