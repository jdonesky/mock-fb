
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const DeleteContext = React.createContext({
    field: null,
    id: null,
    passData: () => {},
    showModal: false,
    toggleModal: () => {},
    caption: null,
    deleteEntry: () => {}
})

const DeleteContextProvider = (props) => {
    const [field, setField] = useState(null)
    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [caption, setCaption] = useState(null);

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const passData = (field,id,caption) => {
        setField(field)
        setId(id)
        setCaption(caption)
    }

    const deleteEntry = () => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, field, null, 'delete', id);
        toggleModal();
    }

    return (
        <DeleteContext.Provider value={{field: field, id: id, passData: passData, showModal: showModal, toggleModal: toggleModal, caption: caption, deleteEntry: deleteEntry}}>
            {props.children}
        </DeleteContext.Provider>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DeleteContextProvider);
