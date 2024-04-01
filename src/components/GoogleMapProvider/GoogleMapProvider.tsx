'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';
import { googleApiKey } from '@/services/services';
import GoogleMap from '../GoogleMap/GoogleMap';

const GoogleMapProvider = ({ children }: { children: React.ReactNode }) => {
    const cityPosition = { lat: 53.56, lng: 10 };

    return <APIProvider apiKey={googleApiKey}>{children}</APIProvider>;
};

export default GoogleMapProvider;
