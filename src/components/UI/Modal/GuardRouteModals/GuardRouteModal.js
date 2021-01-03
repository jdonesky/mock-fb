
import React, {useEffect, useState} from 'react';
import classes from './GuardRouterModal.css';
import {Prompt} from 'react-router-dom';
import Modal from '../Modal';

const guardRoute = ({when, navigate, shouldBlock, cleanUp, allowNav, caption, permittedPaths}) => {
    const [showModal, setShowModal] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [allow, setAllow] = useState(allowNav);



    useEffect(() => {
        if (allow !== allowNav) {
            setAllow(allowNav);
        }
    })

    const closeModal = () => {
        setShowModal(false);
    }

    const handleGuardedPath = (nextLocation) => {
        if (!confirmedNavigation && shouldBlock(nextLocation) && !allow && !permittedPaths.includes(nextLocation.pathname)) {
            setShowModal(true);
            setLastLocation(nextLocation);
            return false
        }
        if (cleanUp && !permittedPaths.includes(nextLocation.pathname)) {
            cleanUp();
        }
        return true;
    }

    const handleConfirmNavigation = () => {
        setShowModal(false);
        setConfirmedNavigation(true);
    }

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            navigate(lastLocation.pathname)
        }
    }, [confirmedNavigation, lastLocation])

    return (
        <React.Fragment>
            <Prompt
                when={when}
                message={handleGuardedPath}
            />
            <Modal
                show={showModal && !allowNav && !permittedPaths.includes(lastLocation.pathname) || undefined}
                addClass={classes.GuardModal}
            >
                <div className={classes.WarningContainer}>
                    <div className={classes.Header}>Are you sure?</div>
                    <div className={classes.SubHeader}>{caption}</div>
                    <section className={classes.Controls}>
                        <div className={[classes.Control,classes.Cancel].join(" ")} onClick={closeModal}>Cancel</div>
                        <div className={[classes.Control,classes.Confirm].join(" ")} onClick={handleConfirmNavigation}>Confirm</div>
                    </section>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default guardRoute;