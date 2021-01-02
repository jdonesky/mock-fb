
import React, {useState} from 'react';

export const EditProfileContext = React.createContext({
    showEditModal: false,
    modalContent: null,
    openEditModal: () => {},
    closeEditModal: () => {},
    toggleModalContent: () => {}
})

const ProfileContextProvider = (props) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [modalContent, setModalContent] = useState('BASE');

    const openEditModal = () => {
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false)
    }

    const toggleModalContent = (page) => {
        setModalContent(page);
    }

    return (
        <EditProfileContext.Provider value={{showEditModal: showEditModal, modalContent: modalContent, openEditModal: openEditModal, closeEditModal: closeEditModal, toggleModalContent: toggleModalContent}}>
            {props.children}
        </EditProfileContext.Provider>
    )
}

export default ProfileContextProvider;