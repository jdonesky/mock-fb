
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './Messages.css';
import * as actions from '../../../../../store/actions/index';
import Searchbar from '../../../../Search/Searchbar';
import Dots from '../../../../../assets/images/dots';
import ComposeMessage from '../../../../../assets/images/MessengerIcons/composeMessage';


const messagesDropdown = props => {

    const {authToken, myPublicProfileKey, onFetchMyChats, myChats} = props

    useEffect(() => {
        console.log(myChats)
    })

    useEffect(() => {
        onFetchMyChats(authToken, myPublicProfileKey);
    }, [])

    const filterResults = () => {
        return;
    }

    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.Header}>
                <div className={classes.Title}>Messenger</div>
                <div className={classes.HeaderButtons}>
                    <div className={classes.HeaderButton}>
                        <div className={classes.HeaderButtonIcon}>
                            <Dots />
                        </div>
                    </div>
                    <div className={classes.HeaderButton}>
                        <div className={[classes.HeaderButtonIcon,classes.ComposeIcon].join(" ")}>
                            <ComposeMessage />
                        </div>
                    </div>
                </div>
            </section>
            <Searchbar filterResults={filterResults} className={classes.SearchBar} iconClass={classes.SearchGlass}/>
            <section className={classes.ChatsContainer}></section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfileKey: state.profile.publicProfileKey,
        myChats: state.messenger.myChats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyChats: (authToken, userKey) => dispatch(actions.fetchMyChatsAttempt(authToken, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messagesDropdown);