
import React, {useContext} from 'react';
import {connect} from 'react-redux'
import classes from "./BaseForm.css";
import Close from "../../../../../assets/images/close";
import {PostContext} from "../../../../../context/post-context";
import PrivacyButton from "../../../Button/PrivacyButton"
import NoGenderPlaceholder from "../../../../../assets/images/profile-placeholder-gender-neutral";
import Letters from "../../../../../assets/images/text-font"

const baseForm = (props) => {

    const postContext = useContext(PostContext);

    let backgroundOptions;

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
                <div className={classes.BackgroundButton}>
                    <Letters fill="white" />
                </div>
            </section>
            <section className={classes.BackgroundOptions}>
                {backgroundOptions}
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