
import React, {useEffect, useState} from 'react';
import {Prompt} from 'react-router-dom';
import {Location} from 'history';

const guardRoute = ({when, navigate, shouldBlock}) => {
    const [showModal, setShowModal] = useState(false);
    const [lastLocation, setLastLocation] = useState(Location || null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }


}

export default guardRoute;