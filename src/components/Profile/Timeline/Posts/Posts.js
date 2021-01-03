
import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Post from './Post/Post';
import InlineDots from '../../../UI/Spinner/InlineDots';
import * as actions from '../../../../store/actions/index';

const posts = ({posts, authToken, postsKey, firebaseKey, onFetchSelfPosts, deletingPost, loadingSelfPosts, displayProfile, otherProfile, ownedPage, userType, history}) => {

    const [pathRoot, setPathRoot] = useState(history.location.pathname.split('/')[2])
    const [profileImage,setProfileImage] = useState(null);

    useEffect(() => {
      if (pathRoot !== history.location.pathname.split('/')[2]) {
          setPathRoot(history.location.pathname.split('/')[2]);
      }
    })

    useEffect(() => {
        let key;
        if (userType === 'USER') {
            if (displayProfile === 'me') {
                key = postsKey
            } else {
                if (otherProfile) {
                    key = otherProfile.postsKey
                }
            }
        } else if (userType === 'PAGE') {
            if (pathRoot === 'manage') {
                if (ownedPage) {
                    key = ownedPage.postsKey
                    setProfileImage(ownedPage.profileImage);
                }
            }
        }
        onFetchSelfPosts(authToken, key)
    }, [onFetchSelfPosts, authToken, postsKey, displayProfile, userType, ownedPage])

    const navToFullProfile = (userKey) => {
        if (userKey === firebaseKey) {
            history.push(`/user-profile/me`)
        } else {
            history.push(`/user-profile/${userKey}`)
        }

    }

    const posted = posts && posts.length && posts.length > 1 ? posts.slice(1).map(post => (
        <Post
            postedToOther={post.postedToOther}
            otherUser={post.otherUser}
            pagePosted={post.pagePosted}
            userType={post.userType}
            postsKey={post.postsKey}
            userKey={post.userKey}
            publicProfileKey={post.publicProfileKey}
            posterName={post.name}
            postProfileImage={post.profileImage || profileImage}
            key={post.id}
            id={post.id}
            status={post.text}
            background={post.background}
            image={post.image}
            date={post.date}
            tagged={post.tagged}
            postLocation={post.location}
            comments={post.comments}
            reactions={post.reactions}
            navToFullProfile={navToFullProfile}
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
        firebaseKey: state.profile.firebaseKey,
        posts: state.posts.posts,
        deletingPost: state.posts.deletingPost,
        loadingSelfPosts: state.posts.loadingSelfPosts,
        otherProfile: state.users.fullProfile,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelfPosts: (authToken, postsKey) => dispatch(actions.fetchSelfPostsAttempt(authToken, postsKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(posts));