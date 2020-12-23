

import React, {useState, useEffect, useContext, useRef} from 'react';
import {connect} from 'react-redux';
import {Prompt} from 'react-router';
import classes from './CreatePageForm.css';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';

import Info from '../../../../assets/images/MiscIcons/info';
import Photo from '../../../../assets/images/MiscIcons/landscapePhoto';
import Trash from '../../../../assets/images/delete';

import {PageContext} from "../../../../context/page-context";

const createPageForm = props => {

    const pageContext = useContext(PageContext);
    const profilePicUploader = useRef(null);
    const profilePicContainer = useRef(null);
    const coverPicUploader = useRef(null);
    const coverPicContainer = useRef(null);
    const [profileImageRemoved, setProfileImageRemoved] = useState(false);
    const [coverImageRemoved, setCoverImageRemoved] = useState(false);
    const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

    const {pageName, category, description, profileImage, coverImage, formValid} = pageContext

    useEffect(() => {
        if (shouldBlockNavigation) {
            window.onbeforeunload = () => {
                return true;
            }
        } else {
            window.onbeforeunload = null;
        }

    }, [shouldBlockNavigation])

    useEffect(() => {
        return () => {
            window.onbeforeunload = null;
            pageContext.clearAllInputs()
        }
    }, [])

    useEffect(() => {
        if (formValid) {
            setShouldBlockNavigation(true);
        } else {
            setShouldBlockNavigation(false);
        }
    }, [formValid])

    useEffect(() => {
        if (profileImage) {
            profilePicContainer.current.style.backgroundImage = `url(${profileImage})`
        } else if (!profileImage && profileImageRemoved) {
            profilePicContainer.current.style.backgroundImage = null;
        }
    }, [profileImage])

    useEffect(() => {
        if (coverImage) {
            coverPicContainer.current.style.backgroundImage = `url(${coverImage})`
        } else if (!coverImage && coverImageRemoved) {
            coverPicContainer.current.style.backgroundImage = null;
        }
    }, [coverImage])

    const imageUploadHandler = (event, type) => {
        const [file] = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (type === 'PROFILE') {
                    profilePicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    pageContext.setProfileImage(event.target.result);
                    setProfileImageRemoved(false);
                } else {
                    coverPicContainer.current.style.backgroundImage = `url(${event.target.result})`;
                    pageContext.setCoverImage(event.target.result);
                    setCoverImageRemoved(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeProfileImage = () => {
        pageContext.setProfileImage(null)
        setProfileImageRemoved(true);
    }

    const removeCoverImage = () => {
        pageContext.setCoverImage(null)
        setCoverImageRemoved(true);
    }


    const nameInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Page name (required)"
            value={pageName}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => pageContext.updateName(event)}
            className={classes.RequiredInput}
        />
    )

    const categoryInput = (
        <Input
            elementType="input"
            type="text"
            placeholder="Category (required)"
            value={category}
            validation={{required: true}}
            valid={false}
            touched={false}
            changed={(event) => pageContext.updateCategory(event)}
            className={classes.RequiredInput}
        />
    )

    const descriptionInput = (
        <Input
            elementType="textarea"
            placeholder="Description"
            value={description}
            changed={(event) => pageContext.updateDescription(event)}
            className={classes.DescriptionInput}
        />
    )

    const removeProfileImageButton = (
        <div className={classes.RemoveImageButton} onClick={removeProfileImage}>
            <Trash />
        </div>
    )

    const removeCoverImageButton = (
        <div className={classes.RemoveImageButton} onClick={removeCoverImage}>
            <Trash />
        </div>
    )

    let sidedrawerTitle = 'Page Information'
    let profileImageContainer;
    let coverImageContainer;
    let imageSection;
    let createButtonText = 'Create Page'
    if (pageContext.startedPage) {
        sidedrawerTitle = 'Set Up Your Page'
        profileImageContainer = (
            <div ref={profilePicContainer} className={classes.ImageContainer}>
                {profileImage ? removeProfileImageButton : <div className={classes.ImageUploadButton}  onClick={() => profilePicUploader.current.click()}>
                    <div className={classes.ImageUploadIcon}><Photo /></div>
                    <span className={classes.ImageUploadText}>Add Profile Picture</span>
                </div>}
                <input
                    ref={profilePicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(event) =>imageUploadHandler(event, 'PROFILE')}
                    style={{display: 'none'}}
                />
            </div>
        )
        coverImageContainer = (
            <div ref={coverPicContainer} className={classes.ImageContainer}>
                {coverImage ? removeCoverImageButton : <div className={classes.ImageUploadButton} onClick={() => coverPicUploader.current.click()}>
                    <div className={classes.ImageUploadIcon}><Photo /></div>
                    <span className={classes.ImageUploadText}>Add Cover Photo</span>
                </div>}
                <input
                    ref={coverPicUploader}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={imageUploadHandler}
                    style={{display: 'none'}}
                />
            </div>
        )
        imageSection = (
            <section className={classes.ImageSection}>
                <div className={classes.ImageSectionHeader}>Images</div>
                <div className={classes.ImageContainerHeader}>
                    <div className={classes.ImageTypeCaption}>Profile Photo <span className={classes.Optional}> · Optional</span></div>
                    <div className={classes.InfoIcon}><Info fill="rgba(0,0,0,0.5)"/></div>
                </div>
                {profileImageContainer}
                <div className={classes.ImageContainerCaption}>Use a logo or image that helps people identify this Page in search results.</div>
                <div className={classes.ImageContainerHeader}>
                    <div className={classes.ImageTypeCaption}>Cover Photo <span className={classes.Optional}> · Optional</span></div>
                    <div className={classes.InfoIcon}><Info fill="rgba(0,0,0,0.5)"/></div>
                </div>
                {coverImageContainer}
                <div className={classes.ImageContainerCaption}>Use an image that represents what this page is about.</div>
            </section>
        )
        createButtonText = "Save"
    }


    let createButtonClasses = [classes.CreateButton];
    if (!pageContext.formValid) {
        createButtonClasses.push(classes.CreateDisabled);
    }

    let createButtonAction;
    if (pageContext.startedPage) {
        createButtonAction = pageContext.finishCreatePage;
    } else {
        if (pageContext.formValid) {
            createButtonAction = pageContext.startCreatePage;
        }
    }

    return (
        <React.Fragment>
            <Prompt
                when={shouldBlockNavigation}
                message={'You have unsaved changes. Are you sure you want to leave?'}
            />
            <section className={classes.FormContainer}>
                <section className={classes.Form}>
                    <h1 className={classes.FormTitle}>{sidedrawerTitle}</h1>
                    {nameInput}
                    <span className={classes.Caption}>Use the name of your business, brand or organization, or a name that explains what the Page is about.</span>
                    {categoryInput}
                    <span className={classes.Caption}>Choose a category that describes what type of business, organization or topic the Page represents</span>
                    {descriptionInput}
                    <span className={classes.Caption}>Write about what your business does, the services you provide, or the purpose of the Page.</span>
                    <span className={classes.Caption}>Character Limit: 255</span>
                    {imageSection}
                </section>
                <section className={classes.ControlsContainer}>
                    <span className={classes.Caption}>You can add images, contact info and other details after you create the Page.</span>
                    <div className={createButtonClasses.join(" ")} onClick={createButtonAction}>{props.creatingNewPage ? <Spinner /> : createButtonText}</div>
                </section>
            </section>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
      creatingNewPage: state.pages.creatingNewPage
    }
}

export default connect(mapStateToProps)(createPageForm);