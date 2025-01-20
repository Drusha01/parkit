import {React, useState, useEffect, useRef } from 'react';
import ViewModal from '../../../../../Components/Modals/ViewModal';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function LocationModal (props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [details,SetDetails] = useState({
        id:null,
        name:null,
        rules:null,
        description:null,
        location_long:null,
        location_lat:null,
    });

    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/spaceowner/spaces/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                name:detail.name,
                rules:detail.rules,
                description:detail.description,
                location_long:detail.location_long,
                location_lat:detail.location_lat,
            });
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach(field => {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: `${validationErrors[field].join(', ')}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }
    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, 
                center: [
                    details.location_long,
                    details.location_lat],
                zoom: 16,
                scrollZoom: false,
                // dragPan: false   
            });
            new mapboxgl.Marker({
                color: 'red' 
            })
            .setLngLat([ 
                details.location_long,
                details.location_lat]) 
            .addTo(mapRef.current);
        }
    }, [openModal]); 

    return (
        <ViewModal isOpen={openModal} closeModal={closeModal} title="View Location">
            <div className="col-span-4 mx-2 md:mx-5 mt-3">
                <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking location  <span className="text-red-600">*</span></label>
                <div className="h-96 bg-gray-200 rounded-lg relative">
                    <div
                        style={{ height: '100%' }}
                        ref={mapContainerRef}
                        className="map-container"
                    />
                </div>
            </div>
        </ViewModal>
    )
}
