
import React, {useState} from 'react';

export const ViewAsContext = React.createContext({
    showModal: false,
    openModal: () => {},
    closeModal: () => {},
    message: null,
})

const ViewAsContextProvider = props => {

    const [showModal, setShowModal] = useState(true);


    const openModal = (message) => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <ViewAsContext.Provider value={{showModal: showModal, openModal: openModal, closeModal: closeModal}}>
            {props.children}
        </ViewAsContext.Provider>
    )
}

export default ViewAsContextProvider;