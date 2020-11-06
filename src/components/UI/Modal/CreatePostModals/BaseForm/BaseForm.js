
import React, {useState, useContext} from 'react';
import {connect} from 'react-redux'
import classes from "./BaseForm.css";
import {PostContext} from "../../../../../context/post-context";

import Close from "../../../../../assets/images/close";
import PrivacyButton from "../../../Button/PrivacyButton"
import NoGenderPlaceholder from "../../../../../assets/images/profile-placeholder-gender-neutral";
import Letters from "../../../../../assets/images/text-font"
import BackChevron from "../../../../../assets/images/left-chevron"
import GridView from "../../../../../assets/images/grid"
import BackgroundSelectBar from './Background/Backgrounds'


const baseForm = (props) => {

    const postContext = useContext(PostContext);
    const [showBackgroundBar, setShowBackgroundBar] = useState(false);

    const toggleBackgroundBar = () => {
        setShowBackgroundBar((prevState) => {
            return !prevState;
        })
    }

    let backgroundButton = (
        <div className={classes.BackgroundButton} onClick={toggleBackgroundBar}>
            <Letters fill="white" />
        </div>
    );

    if (showBackgroundBar) {
        backgroundButton = (
            <div className={classes.CloseBackgroundOptions} onClick={toggleBackgroundBar}>
                <BackChevron />
            </div>
        );
    }

    let gridViewButton;
    if (showBackgroundBar) {
        gridViewButton = (
            <div className={classes.GridViewButton} onClick={() => postContext.toggleModalContent('CHOOSE_BACKGROUND')}>
                <GridView />
            </div>
        );
    }

    return (
        <div>
            <section className={classes.Header}>
                <div className={classes.Title}>
                    <h3>Create Post</h3>
                </div>
                <div className={classes.CancelIcon} onClick={postContext.cancelModal}>
                    <Close />
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.NameSection}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage}>
                        <NoGenderPlaceholder />
                    </div>
                </div>
                <div className={classes.IdContainer}>
                    <div>{props.name && props.name}</div>
                    <PrivacyButton className={classes.PrivacyButton} privacy="public" />
                </div>
            </section>
            <section className={classes.StatusSection}>
                <textarea type="textarea" placeholder="What's on your mind?" className={classes.StatusTextArea}></textarea>
            </section>
            <section className={classes.BackgroundSection}>
                {backgroundButton}
                {showBackgroundBar && <BackgroundSelectBar />}
                {gridViewButton}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        name: state.profile.firstName + ' ' + state.profile.lastName,
    }
}

export default connect(mapStateToProps)(baseForm);