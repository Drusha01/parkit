import React, { useEffect, useState, useRef } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w'; // Replace this with your real token

const MapComponent = (props) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const greenMarkerRef = useRef(null); // Store the green marker instance
  const [currentLocation, setCurrentLocation] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState([props.detail.location_long, props.detail.location_lat]);
  const [autoCenter, setAutoCenter] = useState(true); // default: true


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          Swal.close();
          const { latitude, longitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
          setStart([longitude, latitude]);
          if (autoCenter && mapRef.current) {
            mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              speed: 1.2,
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  };

  useEffect(() => {
    Swal.fire({
      title: 'Loading location...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    getCurrentLocation();

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74, 40], // Default center while loading
      zoom: 9,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      // Update map center without affecting marker
      mapRef.current.setCenter(currentLocation);
      mapRef.current.flyTo({ center: currentLocation, zoom: 14 });

      // Ensure the green marker is created only once
      if (!greenMarkerRef.current) {
        greenMarkerRef.current = new mapboxgl.Marker({ color: 'green', anchor: 'center' })
          .setLngLat(currentLocation)
          .addTo(mapRef.current);
      } else {
        // Only update the position of the green marker
        greenMarkerRef.current.setLngLat(currentLocation);
      }

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(end)
        .addTo(mapRef.current);

      fetchRoute(currentLocation, end);
    }
  }, [currentLocation]);

  const fetchRoute = (start, end) => {
    const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?access_token=${mapboxgl.accessToken}&geometries=polyline6&overview=full&steps=false`;

    fetch(routeUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!data.routes.length) return console.error('No route found.');

        const polyline = data.routes[0].geometry;
        const decodedCoordinates = decodePolyline(polyline);

        const geojson = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: decodedCoordinates,
          },
        };

        if (mapRef.current.getSource('route')) {
          mapRef.current.getSource('route').setData(geojson);
        } else {
          mapRef.current.addLayer({
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
      .catch((err) => console.error('Error fetching route:', err));
  };

  // Keep your decodePolyline function
  function decodePolyline(polyline) {
    const coordinates = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < polyline.length) {
      let shift = 0;
      let result = 0;
      let byte;

      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;

      do {
        byte = polyline.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      coordinates.push([lng / 1e6, lat / 1e6]);
    }

    return coordinates;
  }

  const handleStartNavigation = () => {
    if (currentLocation && mapRef.current) {
      setStart(currentLocation);
      fetchRoute(currentLocation, end);
  
      mapRef.current.flyTo({
        center: currentLocation,
        zoom: 14,
        speed: 1.2, // optional, make it smooth
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
          <div className="h-[80vh] bg-gray-200 rounded-lg relative">
            <div
              ref={mapContainer}
              style={{ height: '100%', width: '100%' }}
              className="rounded-lg"
            />
          </div>

          {/* Top Left Buttons */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button
              onClick={handleStartNavigation}
              className="bg-green-700 text-white text-center font-semibold p-2 rounded-md shadow-md hover:bg-green-800"
            >
              Start
            </button>
            <Link
              href="/browse"
              className="bg-gray-700 text-white text-center font-semibold p-2 rounded-md shadow-md hover:bg-gray-800"
            >
              Browse
            </Link>
            <button
              onClick={() => setAutoCenter(!autoCenter)}
              className="bg-blue-700 text-white font-semibold p-2 rounded-md shadow-md hover:bg-blue-800"
            >
              {autoCenter ? 'Disable Auto Center' : 'Enable Auto Center'}
            </button>
          </div>

          {/* Bottom Right Reset North Button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={ResetNorth}
              className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
            >
              <svg
                fill="#000000"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.1428179,22.8839028 L12,1.37360338 L20.8571821,22.8839028 L12,19.0879676 L3.1428179,22.8839028 Z M12,16.9120324 L17.1428179,19.1160972 L12,6.62639662 L6.8571821,19.1160972 L12,16.9120324 Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </GuestLayout>
  );
};

export default MapComponent;
