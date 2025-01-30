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
                    <div className="absolute block md:hidden bottom-28 right-1 space-y-2">
                        <button
                            onClick={ResetNorth}
                            className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                        >
                           <svg viewBox="0 0 100 100" className="w-10 h-10"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M42.066 0v20h3.752V6.957L53.881 20h4.053V0h-3.752v13.355L45.996 0zm5.57 26.688l-25.77 69.949c-.823 2.238 1.658 4.248 3.677 2.978L50 84.195l24.455 15.42c2.02 1.273 4.504-.738 3.68-2.978l-25.79-70c-.472-1.096-1.283-1.632-2.384-1.635c-1.1-.003-2.017.856-2.324 1.686zm-.136 14.83V79.86L29.1 91.463z" fill="#000000" fill-rule="evenodd"></path></g></svg>
                        </button>
                    </div>
                    <div className="absolute bottom-12 right-1 flex flex-col space-y-2">
                        <button
                            onClick={RecenterMap}
                            className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                        >
                            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="2.25" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <circle cx="12" cy="12" r="6.75" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M12 5.25V3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.75 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 18.75V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.25 12H3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
                    </div>
                </div>
            </main>
        </GuestLayout>
    );
}
