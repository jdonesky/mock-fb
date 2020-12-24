
import React from 'react';
import { Map, GoogleApiWrapper} from "google-maps-react";


const mapContainer = props => {
    return (
        <Map
        google={props.google}
        zoom={14}
        style={{height: '56%', width: '90%', borderRadius: '8px'}}
        initialCenter={{
            lat: 37.4846,
            lng: -122.1495
        }}
        />
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD4T1w5B2QyiyC4gFZ_f1dmvZ8_ghJkX0E'
})(mapContainer)