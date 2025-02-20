import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [start, setStart] = useState([123.977205,10.285977]); // Default start
  const [end, setEnd] = useState([123.948949,10.349645]);   // Default end
  const [started,setStarted] = useState(false);
  const [centered,setCentered] = useState(false);

  // Function to get the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
        //   Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: `Longitude: ${longitude}, Latitude: ${latitude}`,
        //     showConfirmButton: false,
        //     timer: 2000,
        //   });

            setStart([longitude, latitude]) 
            fetchRoute();
            setCurrentLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error getting current location:', error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to get location',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        {
          enableHighAccuracy: true, // Make sure we get an accurate location
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // Do not use cached location
        }
      );
    }
  };

  // Initialize the map when the component mounts
  useEffect(() => {
    getCurrentLocation(); // Get the current location on component mount

    const initializeMap = () => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: currentLocation || [-74, 40], // Default to New York if location is unavailable
            zoom: 16,
        });
    
        mapRef.current.on('zoom', () => {
            if(centered){
                setCentered(false)
            }
        });
    
        mapRef.current.on('drag', () => {
            if(centered){
                setCentered(false)
            }
        });
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        setMap(mapRef.current);
    };

    if (!map && currentLocation) initializeMap();
  }, [map, currentLocation]);

  // Function to update the map's center and add marker based on current location
  useEffect(() => {
    if (map && currentLocation) {
        if(centered){
            map.setCenter(currentLocation); // Update the map's center to the user's location
            map.flyTo({ center: currentLocation, zoom: 19, speed: 0.5 });
        }
    }
  }, [currentLocation, map]);

    const handleStartNavigation = () => {
        setStarted(true)
        fetchRoute();
        GoCentered();
    };

    const fetchRoute = () =>{
        if (map) {
            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?access_token=${mapboxgl.accessToken}&geometries=geojson`;
            fetch(routeUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0].geometry.coordinates;
                    const geojson = {
                        type: 'Feature',
                        geometry: {
                        type: 'LineString',
                        coordinates: route,
                        },
                    };
        
                    // Clear previous route if it exists
                    if (map.getLayer('route')) {
                        map.removeLayer('route');
                        map.removeSource('route');
                    }
        
                    // Add the new route to the map
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                        type: 'geojson',
                        data: geojson,
                        },
                        paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        },
                    });
                } else {
                    console.error('No route found in the response.');
                    alert('No route found!');
                }
            })
            .catch((error) => {
                console.error('Error fetching directions:', error);
                alert('Error fetching directions!');
            });
        }
    }
    const ResetNorth = () => {
        if (mapRef.current) {
            mapRef.current.easeTo({ bearing: 0 });
        }
    };

    const GoCentered = () =>{
        map.setCenter(currentLocation); // Update the map's center to the user's location
        map.flyTo({ center: currentLocation, zoom: 19, speed: 0.5 });
        delayAction(() => {
            setCentered(true)
          }, 5000);
       
    }

  return (
    <div className="w-full h-screen relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg"></div>
      {started ? (
  <>
    <button
      onClick={() => setStarted(false)}
      className="absolute top-4 left-4 mt-6 p-3 bg-blue-600 text-white rounded-md"
    >
      End Navigation
    </button>
  </>
) : (
  <>
    {/* <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md z-10">
      <label className="block text-sm font-medium text-gray-700">Start Location (Longitude, Latitude):</label>
      <input
        type="text"
        value={start.join(', ')}
        onChange={(e) => setStart(e.target.value.split(',').map(Number))}
        className="p-2 border border-gray-300 rounded-md w-full mt-1"
        disabled
      />
    </div>

    <div className="absolute top-32 left-4 bg-white p-4 rounded-lg shadow-md z-10">
      <label className="block text-sm font-medium text-gray-700">End Location (Longitude, Latitude):</label>
      <input
        type="text"
        value={end.join(', ')}
        onChange={(e) => setEnd(e.target.value.split(',').map(Number))}
        className="p-2 border border-gray-300 rounded-md w-full mt-1"
        disabled
      />
    </div> */}

    {/* Start Navigation Button */}
    <button
        onClick={handleStartNavigation}
        className="absolute top-4 left-4 mt-6 p-3 bg-blue-600 text-white rounded-md"
    >
      Start Navigation
    </button>
  </>
)}

            <div className="absolute bottom-14 right-3 flex flex-col space-y-2  h-10">
                <button
                    onClick={GoCentered}
                    className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                >
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="2.25" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <circle cx="12" cy="12" r="6.75" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M12 5.25V3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.75 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 18.75V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.25 12H3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
      {/* </div> */}
    </div>
  );
};

export default MapComponent;
