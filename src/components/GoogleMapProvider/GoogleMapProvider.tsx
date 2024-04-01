'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';
import { googleApiKey } from '@/services/services';

const GoogleMapProvider = ({ children }: { children: React.ReactNode }) => {
    return <APIProvider apiKey={googleApiKey}>{children}</APIProvider>;
};

export default GoogleMapProvider;
