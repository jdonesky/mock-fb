
import React, {useState, useEffect, useRef} from 'react'
import ProfilePlaceholder from "../../../assets/images/placeholder-profile-pic.png";

import classes from './ProfilePics.css'

const profilePics = (props) => {
    const [profilePic, uploadProfilePic] = useState(null);
    const [coverPic, uploadCoverPic] = useState(null);
    const profilePicUploader = useRef(null);
    const profilePicContainer = useRef(null);
    const coverPicUploader = useRef(null);
    const coverPicContainer = useRef(null);

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profilePicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                  uploadProfilePic(event.target.result);
                } else {
                    coverPicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    uploadCoverPic(event.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <React.Fragment>
        <form>
            <div className={classes.CoverPicContainer} ref={coverPicContainer}>
                <input
                    ref={coverPicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={imageUploadHandler}
                    style={{
                        display: "none"
                    }}
                />
                <div
                    className={classes.CoverPicUploadButton}
                    onClick={() => coverPicUploader.current.click()}
                >
                    <div></div>
                    <p>Add Cover Photo</p>
                </div>
            </div>
        </form>
        <form>
            <div
                className={classes.ProfilePicContainer}
                ref={profilePicContainer}
            >
                <input
                    ref={profilePicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={event => imageUploadHandler(event, "PROFILE")}
                    style={{
                        display: "none"
                    }}
                />
                <div className={classes.ProfileUploadButton}
                    onClick={() => profilePicUploader.current.click()}
                ></div>
            </div>
        </form>
        </React.Fragment>
    )
}

export default profilePics;

