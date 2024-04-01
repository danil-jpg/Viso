import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useRef, useState } from 'react';
import { googleMapId } from '@/services/services';
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer';

const GoogleMap = () => {
    const cityPosition = { lat: 53.54, lng: 10 };

    const map = useMap();
    const [markersPosition, setMarkersPosition] = useState<{ lat: number; lng: number }[]>([]);
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

    const clusterRef = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!clusterRef.current) {
            clusterRef.current = new MarkerClusterer({ map });
        }
    }, [map]);

    const onMapClickHandler = (e: MapMouseEvent) => {
        setMarkersPosition((current) => [
            ...current,
            {
                lat: e.detail.latLng?.lat ? e.detail.latLng?.lat : 0,
                lng: e.detail.latLng?.lng ? e.detail.latLng?.lng : 0,
            },
        ]);
    };

    const onDragEndHandler = (e: google.maps.MapMouseEvent, index: number) => {
        const updatedMarkers = [...markersPosition];

        updatedMarkers[index] = {
            lat: e.latLng?.lat() ? e.latLng?.lat() : 0,
            lng: e.latLng?.lng() ? e.latLng?.lng() : 0,
        };

        setMarkersPosition(updatedMarkers);
    };

    const onRemoveButtonClickHandler = () => {
        setMarkersPosition([]);
    };

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    useEffect(() => {
        clusterRef.current?.clearMarkers();
        clusterRef.current?.addMarkers(Object.values(markers));
    }, [markers]);

    return (
        <div className='map-container'>
            <Map defaultZoom={9} defaultCenter={cityPosition} mapId={googleMapId} onClick={(e: MapMouseEvent) => onMapClickHandler(e)}>
                {markersPosition.map((marker, index) => {
                    return (
                        <AdvancedMarker
                            ref={(marker) => setMarkerRef(marker, index.toString())}
                            draggable
                            onDragEnd={(e) => {
                                onDragEndHandler(e, index);
                            }}
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setMarkersPosition((current) => {
                                    return current.filter((el, elIndex) => elIndex !== index);
                                });
                            }}>
                            <Pin>
                                <div className='pin'>
                                    <p>{index}</p>
                                </div>
                            </Pin>
                        </AdvancedMarker>
                    );
                })}
            </Map>
            <button className='button' onClick={onRemoveButtonClickHandler}>
                Remove all the marks
            </button>
        </div>
    );
};

export default GoogleMap;
