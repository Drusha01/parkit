import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { React, useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geolocation from "../../Components/Location/Geolocation";

export default function Browse(props) {
    const { latitude, longitude, error } = Geolocation();
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const markerRef = useRef(null);

    const [mapCenter, setMapCenter] = useState({
        lng: 122.0748198,
        lat: 6.9022435,
    });

    const locations = [
        { id: 1, name: "Parking A", lat: 6.9025, lng: 122.0750 },
        { id: 2, name: "Parking B", lat: 6.9015, lng: 122.0735 },
        { id: 3, name: "Parking C", lat: 6.9005, lng: 122.0740 },
    ];

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
            minZoom: 11,
        });

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current.getCenter();
            setMapCenter({ lng, lat });
        });

        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
        AddLocationMarkers();
    };

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

    
    const AddLocationMarkers = () => {
        if (!mapRef.current) return;

        locations.forEach(({ id, name, lat, lng }) => {
            const el = document.createElement("div");
            el.className = "custom-marker";
            el.style.backgroundImage = "url('/img/marker.png')"; // Change this to your marker image path
            el.style.width = "30px";  // Set marker size
            el.style.height = "30px";
            el.style.backgroundSize = "cover";
            el.style.cursor = "pointer";
    
            const marker = new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .addTo(mapRef.current);

            // 📝 Popup for each marker
            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
            .setText(name);


            // 🔥 Click event: Show popup
            marker.getElement().addEventListener("click", () => {
                console.log(lng+","+ lat);
                // popup.setLngLat([lng, lat]).addTo(mapRef.current);
            });
            marker.getElement().addEventListener("mouseenter", () => {
                popup.setLngLat([lng, lat]).addTo(mapRef.current);
            });
    
            marker.getElement().addEventListener("mouseleave", () => {
                popup.remove();
            });
        });
    };

    useEffect(() => {
        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
    }, [latitude, longitude]);

    // 🔄 Recenter map to user location
    const RecenterMap = () => {
        if (latitude && longitude && mapRef.current) {
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 15,
                essential: true,
            });
        }
    };

    // ⬆️ Reset map rotation to north
    const ResetNorth = () => {
        if (mapRef.current) {
            mapRef.current.easeTo({ bearing: 0 });
        }
    };

    return (
        <GuestLayout props={props}>
            <main className="bg-gray-100">
                <div className="absolute left-1/2 transform -translate-x-1/2 top-4 mt-20 z-20 bg-white p-1 shadow-lg rounded-lg w-10/12 md:3/5 lg:w-1/2 xl:w-1/2 xxl:w-1/2 max-h-[90vh] overflow-y-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id='search_parking' onKeyUp=""  className="block h-full w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." />
                    </div>
                    <p className="text-gray-600 mt-2 hidden md:block h-32">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut eros nec arcu fermentum placerat. 
                        Integer consequat, dolor ac elementum blandit, nisi purus vestibulum odio, at egestas metus elit non justo.
                        Fusce nec nisl tristique, suscipit augue vel, sagittis urna. Pellentesque habitant morbi tristique senectus 
                        et netus et malesuada fames ac turpis egestas. Nam vitae justo non dui convallis hendrerit eget eu felis.
                    </p>
                </div>
                <div className="relative">
                    <div className="h-4/5 bg-gray-200 rounded-lg relative">
                        <div
                            style={{ height: '100%' }}
                            ref={mapContainerRef}
                            className="map-container"
                        />
                    </div>
                    <div className="absolute top-16 md:top-4 right-3 space-y-2  h-10" >
                        <button
                            
                            className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-100 "
                        >
                           <svg viewBox="0 0 24 24" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
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
