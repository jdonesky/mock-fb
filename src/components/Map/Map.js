
import React, {useState, useEffect, useRef} from 'react';
import { Map, GoogleApiWrapper, Marker} from "google-maps-react";


const mapContainer = props => {

    const [pin, setPin] = useState(null)
    const [center, setCenter] = useState({
        lat: 37.4846,
        lng: -122.1495
    })
    const map = useRef(null);

    const {userLocation} = props


    useEffect(() => {
        if (userLocation) {
            setPin(userLocation)
            setCenter(userLocation)
        }
    }, [userLocation])


    return (
        <Map
        google={props.google}
        ref={map}
        zoom={props.zoom}
        style={{
            height: props.height || '51.5%', width: props.width || '87.3%',
            minHeight: props.minHeight || null, minWidth: props.minWidth || null,
            borderRadius: '8px',
        }}
        center={center}
        >
            {pin ? <Marker position={{lat: pin.lat, lng: pin.lng}}/> : null}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD4T1w5B2QyiyC4gFZ_f1dmvZ8_ghJkX0E'
})(mapContainer)