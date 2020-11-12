
import React from 'react';
import {connect} from 'react-redux';
import Post from './Post/Post';

const posts = ({posts}) => {

    const posted = posts && posts.length ? posts.map(post => (
        <Post
            key={post.id}
            status={post.text}
            background={post.background}
            image={post.image}
            date={post.date}
            location={post.location}
            comments={post.comments}
            id={post.id}
        />
    )) : null

    return (
        <React.Fragment>
            {posted}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.profile.posts
    }
}

export default connect(mapStateToProps)(posts);