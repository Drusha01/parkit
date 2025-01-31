import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { React, useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geolocation from "../../Components/Location/Geolocation";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';


export default function Go(props) {
  
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const markerRef = useRef(null);
    const [isDriving,setIsDriving] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(9);
    const [userLocation, setUserLocation] = useState(null);
    const destination = { lng: 10.3380568, lat: 123.9409891 };
    const markersRef = useRef([]);

    const [mapCenter, setMapCenter] = useState({
        lng: 122.0748198,
        lat: 6.9022435,
    });


    useEffect(() => {
        RenderMap();
    }, []);

    const RenderMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [mapCenter.lng, mapCenter.lat],
            zoom: 15.5,
            maxZoom:20,
            // minZoom: 11,
        });

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current.getCenter();
            setMapCenter({ lng, lat });
            const currentZoom = mapRef.current.getZoom();
            setZoomLevel(currentZoom);
            console.log('Current Zoom Level:', currentZoom);
        });

    };

    // -------------------------------------- user marker ------------------------------------
    const { latitude, longitude, error } = Geolocation();

    const AddUserLocationMarker = (lat, lng) => {
        if (!mapRef.current) return;

        if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
        } else {
            markerRef.current = new mapboxgl.Marker({ color: "blue" })
                .setLngLat([lng, lat])
                .addTo(mapRef.current);
        }
    };
    useEffect(() => {
        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
    }, [latitude, longitude]);

    // -------------------------------------- user marker ------------------------------------
    

    const HandleDriveNow = () =>{
        setIsDriving(true)
        if (!mapRef.current) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat([longitude, latitude])
                    .addTo(mapRef.current);
                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([destination.lng, destination.lat])
                    .addTo(mapRef.current);
                
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving',
                });

                mapRef.current.addControl(directions, 'top-left');
                directions.setOrigin([longitude, latitude]);
                directions.setDestination([destination.lng, destination.lat]);
            },
            (error) => console.error('Error getting location', error),
            { enableHighAccuracy: true }
        );
    }
    
    const RecenterMap = () => {
        if (latitude && longitude && mapRef.current) {
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 15,
                essential: true,
            });
        }
    };
    const ResetNorth = () => {
        if (mapRef.current) {
            mapRef.current.easeTo({ bearing: 0 });
        }
    };

    return (
        <GuestLayout props={props}>
            <main className="bg-gray-100">
              
                <div className="relative">
                    <div className="h-4/5 bg-gray-200 rounded-lg relative">
                        <div
                            style={{ height: '100%' }}
                            ref={mapContainerRef}
                            className="map-container"
                        />
                    </div>
                    <div className="absolute block md:hidden bottom-28 right-3 space-y-2 h-10">
                        <button
                            onClick={ResetNorth}
                            className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                        >
                            <svg fill="#000000" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M3.1428179,22.8839028 L12,1.37360338 L20.8571821,22.8839028 L12,19.0879676 L3.1428179,22.8839028 Z M12,16.9120324 L17.1428179,19.1160972 L12,6.62639662 L6.8571821,19.1160972 L12,16.9120324 Z"></path> </g></svg>
                        </button>
                    </div>
                    <div className="absolute bottom-14 right-3 flex flex-col space-y-2  h-10">
                        <button
                            onClick={RecenterMap}
                            className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                        >
                            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="2.25" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <circle cx="12" cy="12" r="6.75" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M12 5.25V3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.75 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 18.75V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.25 12H3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
}
