
import React, {useEffect} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.css';
import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';
import CreateLifeEventModal from '../../components/UI/Modal/LifeEventModals/LifeEventModal';
import StartCreating from "../../components/Profile/Timeline/Posts/Create/StartCreating";

const home = (props) => {

    useEffect(() => {
        props.onFetchOthersPosts(props.authToken);
    }, [])

    useEffect(() => {
        console.log('shallow keys ', props.othersPosts)
    })



    // let posts;
    // if (props.posts)

    return (
        <div className={classes.HomeContainer}>
            <CreatePostModal />
            <CreateLifeEventModal />
            <section className={classes.PostsSection}>
                <StartCreating />
            </section>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        othersPosts: state.posts.othersPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOthersPosts: (authToken) => dispatch(actions.fetchOthersPostsAttempt(authToken))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(home);