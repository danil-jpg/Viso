'use client';
import Home from '@/screens/Home';
import { googleApiKey } from '@/services/services';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function Page() {
    return (
        <main style={{ height: '100vh' }}>
            <APIProvider apiKey={googleApiKey}>
                <Map />
            </APIProvider>
        </main>
    );
}
