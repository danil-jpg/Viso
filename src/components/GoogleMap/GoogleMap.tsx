import { Map } from '@vis.gl/react-google-maps';
import React from 'react';

const GoogleMap = () => {
    const cityPosition = { lat: 53.54, lng: 10 };

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative', display: 'block' }}>
            <Map center={cityPosition}></Map>
        </div>
    );
};

export default GoogleMap;
