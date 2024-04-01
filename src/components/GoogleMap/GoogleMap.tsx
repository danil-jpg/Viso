import { AdvancedMarker, Map, MapMouseEvent, Pin } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import { googleMapId } from '@/services/services';

const GoogleMap = () => {
    const cityPosition = { lat: 53.54, lng: 10 };

    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

    const onMapClickHandler = (e: MapMouseEvent) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.detail.latLng?.lat ? e.detail.latLng?.lat : 0,
                lng: e.detail.latLng?.lng ? e.detail.latLng?.lng : 0,
            },
        ]);
    };

    const onRemoveButtonClickHandler = () => {
        setMarkers([]);
    };

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative', display: 'block' }}>
            <Map zoom={9} center={cityPosition} mapId={googleMapId} onClick={(e: MapMouseEvent) => onMapClickHandler(e)}>
                {markers.map((marker, index) => {
                    return (
                        <AdvancedMarker
                            key={index}
                            title={'1'}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setMarkers((current) => {
                                    return current.filter((el, elIndex) => elIndex !== index);
                                });
                            }}>
                            <Pin>
                                <div style={{ fontSize: '18px', color: 'black' }}>
                                    <p>{index}</p>
                                </div>
                            </Pin>
                        </AdvancedMarker>
                    );
                })}
                {/* 
                {open && (
                    <InfoWindow position={cityPosition}>
                        <p>number of pin</p>
                    </InfoWindow>
                )} */}
            </Map>
            <button className='button' onClick={onRemoveButtonClickHandler}>
                Remove all the marks
            </button>
        </div>
    );
};

export default GoogleMap;
