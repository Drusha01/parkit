import { useState, useEffect } from "react";

const Geolocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
        locationDisabled: false, // New state to track system-level location settings
    });

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({
                ...prev,
                error: "Geolocation is not supported by your browser",
            }));
            return;
        }

        navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
            if (permissionStatus.state === "denied") {
                setLocation((prev) => ({
                    ...prev,
                    error: "Location access is denied. Please enable it in browser settings.",
                }));
                return;
            }
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    locationDisabled: false,
                });
            },
            (err) => {
                if (err.code === 1) { // User denied permission
                    alert("Location access is denied. Please enable it in browser settings.");
                } else if (err.code === 2) { // Location unavailable
                    setLocation((prev) => ({
                        ...prev,
                        error: "Location information is unavailable.",
                    }));
                } else if (err.code === 3) { // Timeout
                    setLocation((prev) => ({
                        ...prev,
                        error: "Location request timed out. Try again.",
                    }));
                } else {
                    setLocation((prev) => ({
                        ...prev,
                        error: err.message,
                    }));
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    useEffect(() => {
        requestLocation();
    }, []);

    return (
        <div className="text-center">
            {location.error && (
                <div className="text-red-600">
                    <p>{location.error}</p>
                    <button
                        onClick={requestLocation}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Retry Location Access
                    </button>
                </div>
            )}
            {location.latitude && location.longitude && (
                <p className="text-green-600">
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
            )}
            {location.locationDisabled && (
                <p className="text-red-500 mt-2">
                    Location services are disabled. Please enable them in your device settings.
                </p>
            )}
        </div>
    );
};

export default Geolocation;
