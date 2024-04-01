import { AdvancedMarker, Map, MapMouseEvent, Pin, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useRef, useState } from 'react';
import { googleMapId } from '@/services/services';
import { Marker, MarkerClusterer } from '@googlemaps/markerclusterer';
import { Timestamp } from '@firebase/firestore';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { DB } from '@/config/firebase-config';
import firebase from 'firebase/compat/app';

interface IMarkerData {
    Location: {
        lat: number;
        lng: number;
    };
    next: number | null;
    TimeStamp: Timestamp;
}

const GoogleMap = () => {
    const cityPosition = { lat: 53.54, lng: 10 };

    const map = useMap();
    const [markersData, setMarkersData] = useState<IMarkerData[]>([]);
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

    const clusterRef = useRef<MarkerClusterer | null>(null);

    const postData = async () => {
        const questsRef = collection(DB, 'Quests');

        const docRef = doc(questsRef);
        await setDoc(docRef, markersData[markersData.length - 1]);

        console.log(markersData);
    };

    useEffect(() => {
        if (markersData.length) {
            postData();
        }
    }, [markersData]);

    useEffect(() => {
        if (!map) return;
        if (!clusterRef.current) {
            clusterRef.current = new MarkerClusterer({ map });
        }
    }, [map]);

    const onMapClickHandler = (e: MapMouseEvent) => {
        const timeStamp = Timestamp.fromDate(new Date());

        setMarkersData((current) => {
            return [
                ...current,
                {
                    Location: {
                        lat: e.detail.latLng?.lat ? e.detail.latLng?.lat : 0,
                        lng: e.detail.latLng?.lng ? e.detail.latLng?.lng : 0,
                    },
                    next: null,
                    TimeStamp: timeStamp,
                },
            ];
        });
    };

    const onDragEndHandler = (e: google.maps.MapMouseEvent, index: number) => {
        const updatedMarkers = [...markersData];

        updatedMarkers[index] = {
            Location: {
                lat: e.latLng?.lat() ? e.latLng?.lat() : 0,
                lng: e.latLng?.lng() ? e.latLng?.lng() : 0,
            },
            next: updatedMarkers[index].next,
            TimeStamp: updatedMarkers[index].TimeStamp,
        };

        setMarkersData(updatedMarkers);
    };

    const onRemoveButtonClickHandler = () => {
        setMarkersData([]);
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
                {markersData.map((marker, index) => {
                    return (
                        <AdvancedMarker
                            ref={(marker) => setMarkerRef(marker, index.toString())}
                            draggable
                            onDragEnd={(e) => {
                                onDragEndHandler(e, index);
                            }}
                            key={+marker.TimeStamp}
                            position={{ lat: marker.Location.lat, lng: marker.Location.lng }}
                            onClick={() => {
                                setMarkersData((current) => {
                                    return current.filter((el, elIndex) => elIndex !== index);
                                });
                            }}>
                            <Pin>
                                <div className='pin'>
                                    <p>{index + 1}</p>
                                </div>
                            </Pin>
                        </AdvancedMarker>
                    );
                })}
            </Map>
            <button className='button button_left' onClick={onRemoveButtonClickHandler}>
                Remove all the marks
            </button>
        </div>
    );
};

export default GoogleMap;
