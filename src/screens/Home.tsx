'use client';

import GoogleMap from '@/components/GoogleMap/GoogleMap';
import GoogleMapProvider from '@/components/GoogleMapProvider/GoogleMapProvider';
import React from 'react';

const Home = () => {
    return (
        <GoogleMapProvider>
            <GoogleMap />
        </GoogleMapProvider>
    );
};

export default Home;
