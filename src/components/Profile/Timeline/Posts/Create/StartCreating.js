

import React, {useContext,useRef, useEffect} from 'react';
import classes from './StartCreating.css'
import NoGenderPlaceholder from '../../../../../assets/images/profile-placeholder-gender-neutral';
import Flag from '../../../../../assets/images/LifeEventIcons/finish';
import AddPhoto from '../../../../../assets/images/LifeEventIcons/addCamera';
import {LifeEventContext} from "../../../../../context/life-event-context";
import {PostContext} from "../../../../../context/post-context";

const startPost = () => {


    const lifeEventContext = useContext(LifeEventContext);
    const postContext = useContext(PostContext)
    const imageUploader = useRef(null);

    useEffect(() => {
        console.log(postContext)
    })

    const imageUploadHandler = (event) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                postContext.passData('image',event.target.result)
            };
            reader.readAsDataURL(file);
        }
        postContext.toggleModal()
    }

    return (
        <div className={classes.Container}>
            <section className={classes.Header}>
                <div className={classes.ProfileImageContainer}>
                    <div className={classes.ProfileImage}>
                        <NoGenderPlaceholder />
                    </div>
                </div>
                <div className={classes.QueryBar} onClick={postContext.toggleModal}>
                    <span>What's on your mind?</span>
                </div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.ButtonsContainer}>
                <div className={classes.Button} onClick={() => imageUploader.current.click()}>
                    <div className={classes.ButtonIcon}><AddPhoto fill="#069c1d" /></div>
                    <span>Add Photo</span>
                    <input
                        ref={imageUploader}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={imageUploadHandler}
                        style={{
                            display: "none"
                        }}
                    />
                </div>
                <div className={classes.Button} onClick={lifeEventContext.toggleModal}>
                    <div className={[classes.ButtonIcon,classes.Flag].join(" ")}><Flag fill="#0493cc" /></div>
                    <span>Life Event</span>
                </div>
            </section>
        </div>
    );
}

export default startPost;