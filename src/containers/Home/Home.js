
import React, {useState,useEffect, useRef} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import classes from './Home.css';
import StartCreating from "../../components/Profile/Timeline/Posts/Create/StartCreating";
import Post from '../../components/Profile/Timeline/Posts/Post/Post';
import Bookmarks from '../../components/Navigation/Bookmarks/Bookmarks';
import ContactsSidedrawer from "../../components/Contacts/ContactsSidedrawer";
import ContactsOptions from "../../components/Contacts/Dropdowns/ContactsOptions";

import Dots from '../../assets/images/dots';
import InlineDots from '../../components/UI/Spinner/InlineDots';
import useInfiniteScroll from "../../hooks/infiniteScroll";
import OutsideAlerter from "../../hooks/outsideClickHandler";

const home = (props) => {

    const [isBottom, setIsBottom] = useInfiniteScroll()
    const [showContacts, setShowContacts] = useState(true);
    const [showContactsOptions, setShowContactsOptions] = useState(false);
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

    let topLoadingIndicator;
    if (props.loadingOthersPosts) {
        topLoadingIndicator = <InlineDots />
    }

    let bottomLoadingIndicator
    if (isBottom && !props.scrollEnd) {
        bottomLoadingIndicator = <div className={classes.BottomLoader}><InlineDots /></div>
    }

    let posts;
    if (props.othersPosts && props.othersPosts.length) {
        posts = props.othersPosts.map(post => (
            <Post
                postedToOther={post.postedToOther}
                otherUser={post.otherUser}
                pagePosted={post.pagePosted}
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
                postLocation={post.location}
                comments={post.comments}
                reactions={post.reactions}
            />
        ))
    }

    const bookmarksSideDrawer = (
        <div className={classes.BookmarksSideDrawer}>
            <Bookmarks />
        </div>
    )

    let contactsOptions;
    if (showContactsOptions) {
        contactsOptions = (
            <OutsideAlerter action={() => setShowContactsOptions(false)}>
                <ContactsOptions showContacts={showContacts} toggleContacts={() => setShowContacts(prevState => {return !prevState})} close={() => setShowContactsOptions(false)}/>
            </OutsideAlerter>
        )
    }

    const contactsSideDrawer = (
        <div className={classes.ContactsSideDrawer}>
            <div className={classes.Break}/>
            <section className={classes.ContactsHeader}>
                <div className={classes.ContactsTitle}>Contacts</div>
                    <div className={classes.ContactsHeaderControl} style={{backgroundColor: showContactsOptions ? 'rgba(0,0,0,0.05)' : null}} onClick={() => setShowContactsOptions(true)}>
                        <Dots />
                    </div>
            </section>
            {contactsOptions}
            {showContacts ? <ContactsSidedrawer /> : null}
        </div>
    )

    return (
        <div className={classes.HomeContainer}>
            {bookmarksSideDrawer}
            {contactsSideDrawer}
            <section className={classes.PostsSection}>
                <StartCreating />
                {topLoadingIndicator}
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
        onClearScrollEnd: () => dispatch(actions.clearScrollEnd())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(home);