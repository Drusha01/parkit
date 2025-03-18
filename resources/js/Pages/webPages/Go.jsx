import React, { useEffect, useState, useRef } from 'react';
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';

const MapComponent = (props) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // User's current location
  const [directions, setDirections] = useState(null);
  const [start, setStart] = useState(null);  // Default start will be current location
  const [end, setEnd] = useState([ 123.894745,10.303268]);  // Default end (Longitude, Latitude)

  // Function to get current location using Geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    }
  };

  // Initialize the map
  useEffect(() => {
    getCurrentLocation(); // Get current location on component mount

    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74, 40],
        zoom: 9,
      });

      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      setMap(newMap);
    };

    if (!map) initializeMap();
  }, [map]);

  // Update the map's center and markers when current location changes
  useEffect(() => {
    if (map && currentLocation) {
      map.setCenter(currentLocation); // Update the map's center to the user's current location
      map.flyTo({ center: currentLocation, zoom: 14, speed: 0.5 });

      // Add or update start marker
      new mapboxgl.Marker({ color: 'green' })  // Green marker for start
        .setLngLat(currentLocation)
        .addTo(map);

      // Add or update end marker
      new mapboxgl.Marker({ color: 'red' })  // Red marker for end
        .setLngLat(end)
        .addTo(map);

      // Recalculate the route whenever the current location changes
      if (start && end) {
        fetchRoute(start, end);
      }
    }
  }, [currentLocation, map, start, end]);

  const fetchRoute = (start, end) => {
    if (map) {
      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}` +
        `?access_token=${mapboxgl.accessToken}&geometries=geojson`;

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

            if (map.getSource('route')) {
              map.getSource('route').setData(geojson);  
            } else {
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
            }
          } else {
            console.error('No routes found');
          }
        })
        .catch((error) => console.error('Error fetching directions:', error));
    }
  };

  const startNav = () => {
        if (map) {
        // Fetch the route from Mapbox Directions API
            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')} +?access_token=${mapboxgl.accessToken}&geometries=geojson`;

        fetch(routeUrl)
            .then((response) => response.json())
            .then((data) => {
            const route = data.routes[0].geometry.coordinates;
            const geojson = {
                type: 'Feature',
                geometry: {
                type: 'LineString',
                coordinates: route,
                },
            };

            // Add the route to the map
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);  // Update existing route
            } else {
                // Add the route layer if it doesn't exist
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
            }
            })
            .catch((error) => console.error('Error fetching directions:', error));

        }
  };

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

  // Start Navigation when the button is clicked
  const handleStartNavigation = () => {
    if (currentLocation) {
      setStart(currentLocation); // Set current location as start point
    }
  };

  return (
    <GuestLayout props={props}>
    <main className="bg-gray-100">
    <div className="relative">
        <div className="h-4/5 bg-gray-200 rounded-lg relative">
            <div
                style={{ height: '100%' }}
                ref={mapContainer}
                className="map-container"
            />
        </div>
        <div className="absolute top-16 left-16 bg-white p-4 rounded-lg shadow-md z-10">
            <div className="absolute block bottom-0 right-0 space-y-2 h-10">
                <button
                    onClick={handleStartNavigation}
                    className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                >
                    Start
                </button>
            </div>
            <div className="absolute block bottom-16 right-0 space-y-2 h-10">
                <button
                    onClick={ResetNorth}
                    className="bg-white text-white p-2 rounded-md shadow-md hover:bg-gray-100"
                >
                    <svg fill="#000000" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill-rule="evenodd" d="M3.1428179,22.8839028 L12,1.37360338 L20.8571821,22.8839028 L12,19.0879676 L3.1428179,22.8839028 Z M12,16.9120324 L17.1428179,19.1160972 L12,6.62639662 L6.8571821,19.1160972 L12,16.9120324 Z"></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</main>

    </GuestLayout>
  );
};

export default MapComponent;
