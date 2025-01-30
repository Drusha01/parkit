import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { React, useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geolocation from "../../Components/Location/Geolocation";

export default function Browse(props) {
    const { latitude, longitude, error } = Geolocation();
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const markerRef = useRef(null); // Reference for user location marker

    const [mapCenter, setMapCenter] = useState({
        lng: 122.0748198,
        lat: 6.9022435,
    });

    const debounceOnce = (func, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
                timer = null;
            }, delay);
        };
    };

    useEffect(() => {
        RenderMap();
    }, []);

    const RenderMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
        
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [mapCenter.lng, mapCenter.lat],
            zoom: 15.5,
        });

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current.getCenter();
            setMapCenter({ lng, lat });
            debouncedLogCenter({ lng, lat });
        });

        mapRef.current.on('drag', () => {
            const { lng, lat } = mapRef.current.getCenter();
            setMapCenter({ lng, lat });
            debouncedLogCenter({ lng, lat });
        });

        // If user's location is available, add marker
        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
    };

    const debouncedLogCenter = debounceOnce((center) => {
        GetParkingLocations();
    }, 200); 

    const GetParkingLocations = () => {
        console.log("Map Center:", mapCenter);
    };

    const AddUserLocationMarker = (lat, lng) => {
        if (!mapRef.current) return;

        // If marker exists, update position
        if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
        } else {
            // Create a new marker
            markerRef.current = new mapboxgl.Marker({ color: "red" })
                .setLngLat([lng, lat])
                .addTo(mapRef.current);
        }

        // Optionally, re-center map on user location
        mapRef.current.flyTo({
            center: [lng, lat],
            zoom: 15,
            essential: true,
        });
    };

    // When geolocation updates, update the marker
    useEffect(() => {
        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
    }, [latitude, longitude]);

    return (
        <GuestLayout props={props}>
            <main className="bg-gray-100">
                <h2>🌍 Your Location</h2>
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : latitude && longitude ? (
                    <p>📍 Latitude: {latitude}, Longitude: {longitude}</p>
                ) : (
                    <p>Loading location...</p>
                )}
                <div>
                    <div className="h-4/5 bg-gray-200 rounded-lg relative">
                        <div
                            style={{ height: '100%' }}
                            ref={mapContainerRef}
                            className="map-container"
                        />
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
}
