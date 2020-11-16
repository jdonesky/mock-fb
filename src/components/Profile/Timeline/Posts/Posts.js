
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Post from './Post/Post';
import * as actions from '../../../../store/actions/index'

const posts = ({posts, authToken, postsKey, onFetchSelfPosts}) => {

    useEffect(() => {
        onFetchSelfPosts(authToken, postsKey)
    }, [])

    const posted = posts && posts.length ? posts.map(post => (
        <Post
            userPostKey={post.userPostKey}
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
        authToken: state.auth.token,
        postsKey: state.profile.postsKey,
        posts: state.posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(posts);