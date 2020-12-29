
import React, {useState,useEffect} from 'react';

export const MessengerContext = React.createContext({
    showMessenger: false,
    openMessenger: () => {},
    closeMessenger: () => {},
    activeConversation: null,
    waitingConversations: null,
})

const messengerContextProvider = props => {

    const [showMessenger, setShowMessenger] = useState(true);
    const [activeConversation, setActiveConversation] = useState(false);



    const toggleMessenger = () => {
        setShowMessenger(prevState => {
            return !prevState;
        })
    }

    const openMessenger = () => {
        setShowMessenger(true);
    }

    const closeMessenger = () => {
        setShowMessenger(false);
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, closeMessenger: closeMessenger}}>
            {props.children}
        </MessengerContext.Provider>
    )
}

export default messengerContextProvider;