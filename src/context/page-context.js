
import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

export const PageContext = React.createContext({
    pageName: '',
    categories: [],
    description: '',
    profileImage: null,
    coverImage: null,
    formValid: false,
    startedPage: false,
    updateName: () => {},
    updateCategory: () => {},
    updateDescription: () => {},
    startCreatePage: () => {},
    finishCreatePage: () => {}
})

const PageContextProvider = (props) => {

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [startedPage, setStartedPage] = useState(false);

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
        alert('IM NOT FINISHED')
    }

    return (
        <PageContext.Provider value={{pageName: pageName, category: category, description: description, formValid: formValid, startedPage: startedPage, updateName: updateName, updateCategory: updateCategory, updateDescription: updateDescription, startCreatePage: startCreatePage, finishCreatePage: finishCreatePage}}>
            {props.children}
        </PageContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        publicProfileKey: state.profile.publicProfileKey,
        userKey: state.profile.firebaseKey,
        name: state.profile.firstName + ' ' + state.profile.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartCreatePage: (authToken, page) => dispatch(actions.startCreatePageAttempt(authToken, page)),
        onFinishCreatePage: (authToken, page) => dispatch(actions.finishCreatePageAttempt(authToken, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContextProvider);