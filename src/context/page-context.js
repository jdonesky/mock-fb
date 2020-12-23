
import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

export const PageContext = React.createContext({
    pageName: '',
    category: '',
    description: '',
    profileImage: null,
    coverImage: null,
    formValid: false,
    startedPage: false,
    managing: null,
    viewing: null,
    updateName: () => {},
    updateCategory: () => {},
    updateDescription: () => {},
    clearAllInputs: () => {},
    startCreatePage: () => {},
    setProfileImage: () => {},
    setCoverImage: () => {},
    finishCreatePage: () => {},
    passData: () => {}
})

const PageContextProvider = (props) => {

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [startedPage, setStartedPage] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [currentlyManaging, setCurrentlyManaging] = useState(null);
    const [currentlyViewing, setCurrentlyViewing] = useState(null);

    const validateForm = () => {
        setFormValid(pageName !== '' && category !== '' && description.length <= 255);
    }

    const updateName = (event) => {
        setPageName(event.target.value);
        validateForm();
    }

    const updateCategory = (event) => {
        setCategory(event.target.value);
        validateForm();
    }

    const updateDescription = (event) => {
        setDescription(event.target.value);
        validateForm();
    }

    const clearAllInputs = () => {
        setPageName('');
        setCategory('');
        setDescription('');
        setProfileImage(null);
        setCoverImage(null);
        setFormValid(false);
        props.onClearPageInProgress();
    }

    const startCreatePage = () => {
        const baseInfo = {
            name: pageName,
            category: category,
            description: description,
            adminName: props.name,
            adminUserKey: props.userKey,
            adminPublicProfileKey: props.publicProfileKey
        }
        props.onStartCreatePage(props.authToken, baseInfo)
        setStartedPage(true);
    }

    const finishCreatePage = () => {
        const finishedPage = {
            name: pageName,
            category: category,
            description: description,
            profileImage: profileImage,
            coverImage: coverImage,
            adminName: props.name,
            adminUserKey: props.userKey,
            adminPublicProfileKey: props.publicProfileKey,
            dbKey: props.pageInProgress.dbKey,
            id: props.pageInProgress.id,
        }
        props.onFinishCreatePage(props.authToken, finishedPage, () => {
            props.history.push(`/pages/${finishedPage.dbKey}`)
            setStartedPage(false);
            clearAllInputs();
        })
    }

     const passData = (type, data) => {
        switch (type) {
            case 'MANAGE':
                setCurrentlyManaging(data);
                break;
            case 'VIEW':
                setCurrentlyViewing(data);
                break;
            default:
                return;
        }
     }

    return (
        <PageContext.Provider value={{pageName: pageName, category: category, description: description, formValid: formValid, startedPage: startedPage, profileImage: profileImage, coverImage: coverImage, managing: currentlyManaging, viewing: currentlyViewing, updateName: updateName, updateCategory: updateCategory, updateDescription: updateDescription, setProfileImage: setProfileImage, setCoverImage: setCoverImage, clearAllInputs: clearAllInputs, startCreatePage: startCreatePage, finishCreatePage: finishCreatePage, passData: passData}}>
            {props.children}
        </PageContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        publicProfileKey: state.profile.publicProfileKey,
        userKey: state.profile.firebaseKey,
        name: state.profile.firstName + ' ' + state.profile.lastName,
        pageInProgress: state.pages.pageInProgress
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartCreatePage: (authToken, page) => dispatch(actions.startCreatePageAttempt(authToken, page)),
        onFinishCreatePage: (authToken, page, cb) => dispatch(actions.finishCreatePageAttempt(authToken, page, cb)),
        onClearPageInProgress: () => dispatch(actions.clearPageInProgress())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageContextProvider));