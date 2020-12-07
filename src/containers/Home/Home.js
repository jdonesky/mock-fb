
import React, {useEffect, useRef} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.css';

import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';
import CreateLifeEventModal from '../../components/UI/Modal/LifeEventModals/LifeEventModal';
import StartCreating from "../../components/Profile/Timeline/Posts/Create/StartCreating";
import Post from '../../components/Profile/Timeline/Posts/Post/Post';
import InlineDots from '../../components/UI/Spinner/InlineDots';
import useInfiniteScroll from "../../hooks/infiniteScroll";

const home = (props) => {

    const [isBottom, setIsBottom] = useInfiniteScroll()

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        console.log('THIS SHOULD NOT FIRE ON FIRST RENDER')
        console.log('NOW UPDATING ON SCROLL');
        console.log('loadingOthersPosts ', props.loadingOthersPosts)
        console.log('othersPosts', props.othersPosts)
        console.log('lastFetchedPage', props.lastFetchedPage)
        props.onFetchOthersPosts(props.authToken, props.lastFetchedPage, props.othersPosts)
    }, [isBottom])

    useEffect(() => {
        console.log('THIS SHOULD FIRE ON FIRST RENDER')
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        console.log('lastFetchedPage on FIRST MOUNTING (should be 0)', props.lastFetchedPage)
        props.onFetchOthersPosts(props.authToken);

        return () => {
            props.onClearOthersPostsPageCount()
        }
    }, [])



    let posts;
    if (props.loadingOthersPosts) {
        posts = <InlineDots />
    }

    if (props.othersPosts && props.othersPosts.length) {
        posts = props.othersPosts.map(post => (
            <Post
                postsKey={post.postsKey}
                userKey={post.userKey}
                posterName={post.name}
                postProfileImage={post.postProfileImage}
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
        ))
    }

    return (
        <div className={classes.HomeContainer}>
            <CreatePostModal />
            <CreateLifeEventModal />
            <section className={classes.PostsSection}>
                <StartCreating />
                {posts}
            </section>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        othersPosts: state.posts.othersPosts,
        loadingOthersPosts: state.posts.loadingOthersPosts,
        lastFetchedPage: state.posts.lastFetchedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOthersPosts: (authToken, lastFetchedPage, posts) => dispatch(actions.fetchOthersPostsAttempt(authToken, lastFetchedPage, posts)),
        onClearOthersPostsPageCount: () => dispatch(actions.clearOthersPostsPageCount())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(home);