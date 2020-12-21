
import React, {useState} from 'react';
import {connect} from 'react-redux';

export const PageContext = React.createContext({
    pageName: '',
    categories: [],
    description: '',
    profileImage: null,
    coverImage: null,
    formValid: false,
    updateName: () => {},
    updateCategory: () => {},
    updateDescription: () => {},
})

const PageContextProvider = (props) => {

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);

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

    const createInitialPage = () => {
        const baseInfo = {
            name: pageName,
            category: category,
            description: description,
            adminName: props.name,
            adminUserKey: props.userKey,
            adminPublicProfileKey: props.publicProfileKey

        }


    }

    return (
        <PageContext.Provider value={{pageName: pageName, category: category, description: description, formValid: formValid, updateName: updateName, updateCategory: updateCategory, updateDescription: updateDescription}}>
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

export default connect(mapStateToProps)(PageContextProvider);