import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // User's current location
  const [directions, setDirections] = useState(null);
  const [start, setStart] = useState(null);  // Default start will be current location
  const [end, setEnd] = useState([-73.5, 40]);  // Default end (Longitude, Latitude)

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

  // Function to fetch and display directions
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
          } else {
            console.error('No routes found');
          }
        })
        .catch((error) => console.error('Error fetching directions:', error));
    }
  };

//    const fetchRoute = (start, end) => {
//     if (map) {
//       const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}` +
//         `?access_token=${mapboxgl.accessToken}&geometries=geojson`;

//       fetch(routeUrl)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.routes && data.routes.length > 0) {
//             const route = data.routes[0].geometry.coordinates;
//             const geojson = {
//               type: 'Feature',
//               geometry: {
//                 type: 'LineString',
//                 coordinates: route,
//               },
//             };

//             // Add the route to the map
//             if (map.getSource('route')) {
//               map.getSource('route').setData(geojson);  // Update existing route
//             } else {
//               // Add the route layer if it doesn't exist
//               map.addLayer({
//                 id: 'route',
//                 type: 'line',
//                 source: {
//                   type: 'geojson',
//                   data: geojson,
//                 },
//                 paint: {
//                   'line-color': '#3887be',
//                   'line-width': 5,
//                 },
//               });
//             }

//             // Add a marker for the end location
//             new mapboxgl.Marker({ color: 'red' }) // Red marker for end
//               .setLngLat(end)
//               .addTo(map);
//           } else {
//             console.error('No routes found');
//           }
//         })
//         .catch((error) => console.error('Error fetching directions:', error));
//     }
//   };

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

  // Start Navigation when the button is clicked
  const handleStartNavigation = () => {
    if (currentLocation) {
      setStart(currentLocation); // Set current location as start point
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg"></div>

      {/* Directions UI */}
      <div className="absolute top-16 left-16 bg-white p-4 rounded-lg shadow-md z-10">
        {/* Start Navigation Button */}
        <button
          onClick={handleStartNavigation}
          className="mt-6 p-3 bg-blue-600 text-white rounded-md w-full"
        >
          Start Navigation
        </button>
      </div>

    </div>
  );
};

export default MapComponent;
