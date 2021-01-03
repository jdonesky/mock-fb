
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';

export const ViewAsContext = React.createContext({
    showModal: false,
    viewingAs: false,
    openModal: () => {},
    closeModal: () => {},
    message: null,
})

const ViewAsContextProvider = props => {

    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1])
    const [showModal, setShowModal] = useState(false);
    const [viewingAs, setViewingAs] = useState(false);

    useEffect(() => {
        if (viewAsFlag !== props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1]) {
            setViewAsFlag(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1]);
        }
    })


    useEffect(() => {
        if (viewAsFlag === 'view-as' && viewingAs) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [viewAsFlag])

    const openModal = () => {
        setShowModal(true);
        setViewingAs(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setViewingAs(false);
    }

    return (
        <ViewAsContext.Provider value={{showModal: showModal, viewingAs: viewingAs, openModal: openModal, closeModal: closeModal}}>
            {props.children}
        </ViewAsContext.Provider>
    )
}

export default withRouter(ViewAsContextProvider);