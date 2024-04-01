import { Map } from '@vis.gl/react-google-maps';
import React from 'react';

const GoogleMap = () => {
    const cityPosition = { lat: 53.56, lng: 10 };

    return (
        <div style={{ height: '100vh' }}>
            <Map></Map>;
        </div>
    );
};

export default GoogleMap;
