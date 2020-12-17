
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Post from './Post/Post';
import InlineDots from '../../../UI/Spinner/InlineDots';
import * as actions from '../../../../store/actions/index';

const posts = ({posts, authToken, postsKey, onFetchSelfPosts, deletingPost, loadingSelfPosts, displayProfile, otherProfile}) => {

    useEffect(() => {
        let key;
        if (displayProfile === 'me') {
            key = postsKey
        } else {
            if (otherProfile) {
                key = otherProfile.postsKey
            }
        }
        onFetchSelfPosts(authToken, key)
    }, [onFetchSelfPosts, authToken, postsKey, displayProfile])

    const posted = posts && posts.length && posts.length > 1 ? posts.slice(1).map(post => (
        <Post
            postsKey={post.postsKey}
            userKey={post.userKey}
            publicProfileKey={post.publicProfileKey}
            posterName={post.name}
            postProfileImage={post.profileImage}
            key={post.id}
            id={post.id}
            status={post.text}
            background={post.background}
            image={post.image}
            date={post.date}
            tagged={post.tagged}
            location={post.location}
            comments={post.comments}
            reactions={post.reactions}
        />
    )) : null

    let loadingIndicator;
    if (loadingSelfPosts || deletingPost) {
        loadingIndicator = <InlineDots />
    }

    return (
        <React.Fragment>
            {loadingIndicator}
            {posted}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        postsKey: state.profile.postsKey,
        posts: state.posts.posts,
        deletingPost: state.posts.deletingPost,
        loadingSelfPosts: state.posts.loadingSelfPosts,
        otherProfile: state.users.fullProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(posts);