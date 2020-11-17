
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Post from './Post/Post';
import InlineDots from '../../../UI/Spinner/InlineDots';
import * as actions from '../../../../store/actions/index';

const posts = ({posts, authToken, postsKey, onFetchSelfPosts, deletingPost}) => {

    useEffect(() => {
        onFetchSelfPosts(authToken, postsKey)
    }, [onFetchSelfPosts, authToken, postsKey])

    const posted = posts && posts.length && posts.length > 1 ? posts.slice(1).map(post => (
        <Post
            postsKey={post.postsKey}
            userKey={post.userKey}
            postProfileImage={post.postProfileImage}
            key={post.id}
            id={post.id}
            status={post.text}
            background={post.background}
            image={post.image}
            date={post.date}
            location={post.location}
            comments={post.comments}
        />
    )) : null

    let deletingPostIndicator;
    if (deletingPost) {
        deletingPostIndicator = <InlineDots />
    }

    return (
        <React.Fragment>
            {deletingPostIndicator}
            {posted}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        postsKey: state.profile.postsKey,
        posts: state.posts.posts,
        deletingPost: state.posts.deletingPost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(posts);