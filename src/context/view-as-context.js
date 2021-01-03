
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';

export const ViewAsContext = React.createContext({
    showModal: false,
    viewingAs: false,
    openModal: () => {},
    closeModal: () => {},
    allowNav: false,
})

const ViewAsContextProvider = props => {

    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1])
    const [showModal, setShowModal] = useState(false);
    const [viewingAs, setViewingAs] = useState(false);
    const [allowNav, setAllowNav] = useState(false);

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
        setAllowNav(false);
    }

    const closeModal = (cb) => {
        setAllowNav(true);
        setShowModal(false);
        setViewingAs(false);
        if (cb) {
            cb();
        }
    }

    return (
        <ViewAsContext.Provider value={{showModal: showModal, viewingAs: viewingAs, openModal: openModal, closeModal: closeModal, allowNav: allowNav}}>
            {props.children}
        </ViewAsContext.Provider>
    )
}

export default withRouter(ViewAsContextProvider);