
import React, {useState, useContext, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import classes from "./BaseForm.css";
import {PostContext} from "../../../../../context/post-context";

import Close from "../../../../../assets/images/close";
import PrivacyButton from "../../../Button/PrivacyButton";
import NoGenderPlaceholder from "../../../../../assets/images/profile-placeholder-gender-neutral";
import Letters from "../../../../../assets/images/text-font";
import BackChevron from "../../../../../assets/images/left-chevron";
import GridView from "../../../../../assets/images/grid";

import AddPhoto from "../../../../../assets/images/polaroid";
import Tag from "../../../../../assets/images/tag";
import Pin from "../../../../../assets/images/Pin";
import Dots from "../../../../../assets/images/dots";


import Button from '../../../Button/Button';
import BackgroundSelectBar from './Background/BackgroundSelectBar';


const baseForm = (props) => {

    useEffect(() => {
        console.log(props.profileImage)
    })

    const postContext = useContext(PostContext);
    const backgroundContainer = useRef(null);
    const imageUploader = useRef(null);
    const [showBackgroundBar, setShowBackgroundBar] = useState(false);

    const uploadImage = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                postContext.passData('image', event.target.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleBackground = (pattern) => {
        postContext.passData('background',pattern)
    };

    const toggleBackgroundBar = () => {
        setShowBackgroundBar((prevState) => {
            return !prevState;
        });
    };

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

    const image = (
        <div className={classes.ImageSection}>
            <section className={[classes.StatusSection, classes.StatusWithImage].join(" ")}>
                    <textarea type="textarea" placeholder="What's on your mind?" className={classes.StatusTextArea}>
                    </textarea>
            </section>
            <div
                className={classes.ImageContainer}
                style={{backgroundImage: `url(${postContext.image && postContext.image})`}}
            >
                <div className={[classes.CancelIcon,classes.ImageCancel].join(" ")} onClick={() => postContext.passData('image',null)}>
                    <Close />
                </div>
            </div>
        </div>
        )

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
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})` : null}}>
                        {props.profileImage ? null : <NoGenderPlaceholder />}
                    </div>
                </div>
                <div className={classes.IdContainer}>
                    <div>{props.name && props.name}</div>
                    <PrivacyButton className={classes.PrivacyButton} privacy="public" />
                </div>
            </section>
            { postContext.image ? image : (
                <div ref={backgroundContainer} className={classes.Backdrop} style={{
                    backgroundImage: `url(${postContext.background && postContext.background.img ? postContext.background.img : postContext.background})`,
                    backgroundColor: postContext.background && postContext.background.color ? postContext.background.color : null,
                    height: postContext.background && "280px"
                }}>
                    <section className={classes.StatusSection}>
                    <textarea type="textarea" placeholder="What's on your mind?" className={classes.StatusTextArea}
                              style={postContext.background && {
                                  fontWeight: "bolder",
                                  fontSize: "30px",
                                  color: "#bababa",
                                  webkitTextStroke: "1px black",
                                  textAlign: "center",
                                  position: "relative",
                                  top: "40px",
                                  height: "250px"
                              }}>
                    </textarea>
                    </section>
                    <section className={classes.BackgroundSection}
                             style={postContext.background && {position: "relative", top: "100px"}}>
                        {backgroundButton}
                        {showBackgroundBar && <BackgroundSelectBar toggle={toggleBackground}/>}
                        {gridViewButton}
                    </section>
                </div>
                )}
            <input
                ref={imageUploader}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={uploadImage}
                style={{
                    display: "none"
                }}
            />
            <section className={classes.AddToPostSection}>
                <h5 className={classes.AddPostHeader}>Add to Your Post</h5>
                <div className={classes.AddToPostButtons}>
                    <div className={[classes.AddButton, classes.AddPhoto, postContext.image && classes.ImageSelected, postContext.background && classes.DisableImageSelect].join(" ")} onClick={postContext.background ? null : () => imageUploader.current.click()}><AddPhoto fill={postContext.background ? "rgba(0,0,0,0.3)" : "#08bf02"} /></div>
                    <div className={[classes.AddButton, classes.AddTag].join(" ")} onClick={() => postContext.toggleModalContent('TAG_FRIENDS')}><Tag fill="#386be0"/></div>
                    <div className={[classes.AddButton, classes.AddPin].join(" ")}><Pin fill="#e32727"/></div>
                    <div className={[classes.AddButton, classes.AddDots].join(" ")}><Dots /></div>
                </div>
            </section>
            <section className={classes.ShareSection}>
                <Button className={classes.ShareButton} addClass="Save">Post</Button>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        name: state.profile.firstName + ' ' + state.profile.lastName,
        profileImage: state.profile.profileImage
    }
}

export default connect(mapStateToProps)(baseForm);