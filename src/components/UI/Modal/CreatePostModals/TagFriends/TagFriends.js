
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import baseClasses from '../ChooseBackground/ChooseBackground.css';
import classes from "./TagFriends.css";
import BackArrow from "../../../../../assets/images/LifeEventIcons/left-arrow";
import {PostContext} from "../../../../../context/post-context";

import SearchBar from '../../../../Search/Searchbar';


const tagFriends = () => {
    const postContext = useContext(PostContext)



    return (
        <div className={classes.PageContent}>
            <section className={baseClasses.Header}>
                <div className={baseClasses.CancelIcon} onClick={() => postContext.toggleModalContent('CREATE_POST')}>
                    <BackArrow />
                </div>
                <div className={baseClasses.Title}>
                    <h3>Tag Friends</h3>
                </div>
            </section>
        </div>
    );
};

export default tagFriends;