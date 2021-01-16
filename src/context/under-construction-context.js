
import React, {useState} from 'react';

export const UnderConstructionContext = React.createContext({
    showModal: false,
    message: null,
    openModal: () => {},
    closeModal: () => {}
})

const UnderConstructionContextProvider = props => {

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(null);

    const openModal = (message) => {
        console.log('clicked');
        setMessage(message)
        setShowModal(true);
    }

    const closeModal = () => {
        setMessage(null);
        setShowModal(false);
    }

    return (
        <UnderConstructionContext.Provider
            value={{
                showModal: showModal,
                message: message,
                openModal: openModal,
                closeModal: closeModal
            }}
        >
            {props.children}
        </UnderConstructionContext.Provider>
    )
}

export default UnderConstructionContextProvider;