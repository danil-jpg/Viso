import { AdvancedMarker, Map, MapMouseEvent, Pin } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import { googleMapId } from '@/services/services';

const GoogleMap = () => {
    const cityPosition = { lat: 53.54, lng: 10 };

    const [open, setOpen] = useState(false);

    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

    const onMapClick = (e: MapMouseEvent) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.detail.latLng?.lat ? e.detail.latLng?.lat : 0,
                lng: e.detail.latLng?.lng ? e.detail.latLng?.lng : 0,
            },
        ]);
    };

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative', display: 'block' }}>
            <Map zoom={9} center={cityPosition} mapId={googleMapId} onClick={(e: MapMouseEvent) => onMapClick(e)}>
                {markers.map((marker, index) => {
                    return (
                        <AdvancedMarker key={index} title={'1'} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => setOpen(!open)}>
                            <Pin>
                                <p style={{ fontSize: '18px', color: 'black' }}>{index}</p>
                            </Pin>
                        </AdvancedMarker>
                    );
                })}

                {/* {open && (
                    <InfoWindow position={cityPosition}>
                        <p>number of pin</p>
                    </InfoWindow>
                )} */}
            </Map>
        </div>
    );
};

export default GoogleMap;
