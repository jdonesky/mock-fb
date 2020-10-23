
import React, {useState} from 'react';

export const DeleteContext = React.createContext({
    field: null,
    id: null,
    passData: () => {},
    showModal: false,
    toggleModal: () => {}
})

const DeleteContextProvider = (props) => {
    const [field, setField] = useState(null)
    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const passData = (field,id) => {
        setField(field)
        setId(id)
    }

    return (
        <DeleteContext.Provider value={{field: field, id: id, passData: passData, showModal: showModal, toggleModal: toggleModal}}>
            {props.children}
        </DeleteContext.Provider>
    );
}

export default DeleteContextProvider;
