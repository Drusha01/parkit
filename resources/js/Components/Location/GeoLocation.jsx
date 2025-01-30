import { useState, useEffect } from "react";

const Geolocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation((prev) => ({ ...prev, error: "Geolocation is not supported by your browser" }));
            return;
        }

        const success = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
        };

        const error = (err) => {
            setLocation((prev) => ({ ...prev, error: err.message }));
        };

        const watcher = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        });

        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    return location;
};

export default Geolocation;
