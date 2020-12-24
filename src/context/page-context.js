
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
    updateName: () => {},
    updateCategory: () => {},
    updateDescription: () => {},
    clearAllInputs: () => {},
    startCreatePage: () => {},
    setProfileImage: () => {},
    setCoverImage: () => {},
    finishCreatePage: () => {},
    showEditModal: false,
    startEditing: () => {}
})

const PageContextProvider = (props) => {

    const {ownedPage, authToken} = props
    const [showModal, setShowModal] = useState(true);
    const [modalContent, setModalContent] = useState('LOCATION');

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [startedPage, setStartedPage] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [website, setWebsite] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

    const startEditing = (form) => {
        if (!ownedPage) {
            props.onFetchOwnedPage(props.authToken, props.history.location.pathname.split('/')[3])
        }
        setModalContent(form);
        setShowModal(true);
    }

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

    const passData = (type, payload) => {
        switch (type) {
            case 'name':
                setPageName(payload)
        }
    }


    return (
        <PageContext.Provider
            value={{
                pageName: pageName, category: category, description: description,
                formValid: formValid, startedPage: startedPage, profileImage: profileImage, coverImage: coverImage,
                updateName: updateName, updateCategory: updateCategory, updateDescription: updateDescription,
                setProfileImage: setProfileImage, setCoverImage: setCoverImage, clearAllInputs: clearAllInputs,
                startCreatePage: startCreatePage, finishCreatePage: finishCreatePage,
                showModal: showModal,setShowModal: setShowModal, startEditing: startEditing, modalContent: modalContent,
                setModalContent: setModalContent }}>
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
        pageInProgress: state.pages.pageInProgress,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartCreatePage: (authToken, page) => dispatch(actions.startCreatePageAttempt(authToken, page)),
        onFinishCreatePage: (authToken, page, cb) => dispatch(actions.finishCreatePageAttempt(authToken, page, cb)),
        onClearPageInProgress: () => dispatch(actions.clearPageInProgress()),
        onFetchOwnedPage: (authToken, pageKey) => dispatch(actions.fetchOwnedPageAttempt(authToken, pageKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageContextProvider));