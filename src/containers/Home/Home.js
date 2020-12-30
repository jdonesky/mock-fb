
import React, {useEffect, useRef} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.css';

import StartCreating from "../../components/Profile/Timeline/Posts/Create/StartCreating";
import Post from '../../components/Profile/Timeline/Posts/Post/Post';
import InlineDots from '../../components/UI/Spinner/InlineDots';
import useInfiniteScroll from "../../hooks/infiniteScroll";
import {clearScrollEnd} from "../../store/actions/index";

const home = (props) => {

    const [isBottom, setIsBottom] = useInfiniteScroll()
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        props.onFetchOthersPosts(props.authToken, props.lastFetchedPage, props.othersPosts)
    }, [isBottom])


    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        props.onFetchOthersPosts(props.authToken);

        return () => {
            props.onClearOthersPostsPageCount()
            props.onClearScrollEnd()
        }
    }, [])


    let bottomLoadingIndicator
    if (isBottom && !props.scrollEnd) {
        bottomLoadingIndicator = <div className={classes.BottomLoader}><InlineDots /></div>
    }

    const navToFullProfile = (userKey) => {
        console.log('CLICKED!')
        if (userKey === props.firebaseKey) {
            props.history.push(`/user-profile/me`)
        } else {
            props.history.push(`/user-profile/${userKey}`)
        }

    }


    let posts;
    if (props.othersPosts && props.othersPosts.length) {
        posts = props.othersPosts.map(post => (
            <Post
                userType={post.userType}
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
                navToFullProfile={navToFullProfile}
            />
        ))
    }

    return (
        <div className={classes.HomeContainer}>
            <section className={classes.PostsSection}>
                <StartCreating />
                {posts}
            </section>
            {bottomLoadingIndicator}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        othersPosts: state.posts.othersPosts,
        loadingOthersPosts: state.posts.loadingOthersPosts,
        lastFetchedPage: state.posts.lastFetchedPage,
        scrollEnd: state.posts.scrollEnd
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOthersPosts: (authToken, lastFetchedPage, posts) => dispatch(actions.fetchOthersPostsAttempt(authToken, lastFetchedPage, posts)),
        onClearOthersPostsPageCount: () => dispatch(actions.clearOthersPostsPageCount()),
        onClearScrollEnd: () => dispatch(clearScrollEnd())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(home);