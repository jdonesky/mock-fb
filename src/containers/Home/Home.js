
import React, {useEffect} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.css';

import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';
import CreateLifeEventModal from '../../components/UI/Modal/LifeEventModals/LifeEventModal';
import StartCreating from "../../components/Profile/Timeline/Posts/Create/StartCreating";
import Post from '../../components/Profile/Timeline/Posts/Post/Post';
import InlineDots from '../../components/UI/Spinner/InlineDots';


const home = (props) => {


    useEffect(() => {
        props.onFetchOthersPosts(props.authToken);

        // return () => {                   update pageCount to fetch next page, store page count in redux? pass back in callback to fetch action ?
        //     props.clearOtherPostsPageCount
        // }
    }, [])



    useEffect(() => {
        console.log('loadingOthersPosts ', props.loadingOthersPosts)
        console.log('othersPosts', props.othersPosts)
        console.log('lastFetchedPage', props.lastFetchedPage)
    })



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
        onFetchOthersPosts: (authToken, lastFetchedPage) => dispatch(actions.fetchOthersPostsAttempt(authToken, lastFetchedPage))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(home);