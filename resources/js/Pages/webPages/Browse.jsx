import { GuestLayout } from '../../Layout/GuestLayout.jsx';
import { React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geolocation from "../../Components/Location/Geolocation";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useNavigate } from "react-router-dom";


export default function Browse(props) {

    const [details,SetDetails] = useState({
        id:null,
        status_id:null,
        full_address:null,
        name:null,
        rules:null,
        description:null,
        location_long:null,
        location_lat:null,
        files:[],
        allotments:[],
        space_sumations:[],
    });

    const [user,setUser] = useState(usePage().props.auth)
    const [license,setLicense] = useState(usePage().props.license)
    const [defaultVehicle,setDefaultVehicle] = useState()
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const markerRef = useRef(null);
    const [isDriving,setIsDriving] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(9);
    const [userLocation, setUserLocation] = useState(null);
    const destination = { lng: 10.3380568, lat: 123.9409891 };
    const markersRef = useRef([]);
    const popupRef = useRef([]);
    const [parkingSpaces,setParkingSpaces] = useState({
        search:null,
    })

    const [mapCenter, setMapCenter] = useState({
        lng: 122.0748198,
        lat: 6.9022435,
    });
   // ----------------------------------- Carousel  ----------------------------------------

    const images = [
        '/img/logo.png',
        'img/background/background_3.jpg',
        '/img/logo.png',
        'img/background/background_3.jpg',
        '/img/logo.png',
    ];
      
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // ----------------------------------- Parking Spaces ----------------------------------------
    const [locations, setLocations] = useState([
      
    ]);
    const getDefaultVehicle = () =>{
        if(user.id){
            axios.get( "/renter/vehicles/default" , {  
            })
            .then(res => {
                setDefaultVehicle(JSON.parse(res.data.detail));
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
    }

    const GetParkingSpaces = ()=>{
        setLocations([]); 
        axios.post( "/spaces/all" , {  
            search:parkingSpaces.search,
        })
        .then(res => {
            console.log(res.data.data);
            markersRef.current.forEach(marker => marker.remove());
            popupRef.current.forEach(popup => popup.remove());
            setLocations(res.data.data.map(item => ({
                id: item.id,
                name: item.name,
                slot: (item.current_vehicle_count ? item.current_vehicle_count + '/' + item.vehicle_count + " slots": ""),
                lat: parseFloat(item.location_lat),
                lng: parseFloat(item.location_long)
            })));
            
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

    const HandleSearchChange = (e) =>{
        const key = e.target.id;
        const value = e.target.value
        setParkingSpaces(values => ({
            ...values,
            [key]: value,
        }))
    }

    const HandleGetInformation = (id) =>{
        axios.get( "/spaces/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            const files = JSON.parse(res.data.space_pictures)
            const allotments = JSON.parse(res.data.allotments)
            console.log(allotments)
            const space_sumations = JSON.parse(res.data.space_sumations)
            SetDetails({
                ...details,
                id:detail.id,
                full_address:detail.full_address,
                status_id:detail.status,
                name:detail.name,
                rules:detail.rules,
                description:detail.description,
                location_long:detail.location_long,
                location_lat:detail.location_lat,
                files:files,
                allotments:allotments,
                space_sumations:space_sumations,
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

    // ----------------------------------- Parking Spaces ----------------------------------------
    useEffect(() => {
        RenderMap();
        getDefaultVehicle();
        GetParkingSpaces();
    }, []);
    
    useEffect(() => {
        AddMarkers();
    }, [locations.length]);
    useEffect(() => {
        if (parkingSpaces.search !== null)
        GetParkingSpaces();
    }, [parkingSpaces.search]);
   
    const RenderMap = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [mapCenter.lng, mapCenter.lat],
            zoom: 12,
            maxZoom:20,
            // minZoom: 11,
        });

        mapRef.current.on('move', () => {
            const { lng, lat } = mapRef.current.getCenter();
            setMapCenter({ lng, lat });
            const currentZoom = mapRef.current.getZoom();
            setZoomLevel(currentZoom);
        });
    };

    // -------------------------------------- user marker ------------------------------------
    const { latitude, longitude, error } = Geolocation();

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
    useEffect(() => {
        if (latitude && longitude) {
            AddUserLocationMarker(latitude, longitude);
        }
    }, [latitude, longitude]);

    // -------------------------------------- user marker ------------------------------------
    // markersRef.current.forEach(marker => marker.remove());
    // markersRef.current = []; // Clear the array
    const AddMarkers = () => {
        if (!mapRef.current) return;
        locations.forEach(({ id, name,slot, lat, lng }) => {
            const el = document.createElement("div");
            el.className = "custom-marker";
            el.style.backgroundImage = "url('/img/marker.png')";
            el.style.width = "35px";  
            el.style.height = "35px";
            el.style.backgroundSize = "cover";
            el.style.cursor = "pointer";
    
            const marker = new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .addTo(mapRef.current);
            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
            popup
            .setHTML(`
                <div style="text-align: center; margin:0px; background-color: #fff; color: black; border-radius: 8px; font-size: 12px; font-weight: bold;">
                    <p style="font-size: 12px;">${name}</p>
                    <p style="font-size: 10px;">${slot}</p>
                </div>
            `);
            popup.setLngLat([lng, lat]).addTo(mapRef.current);
            marker.getElement().addEventListener("click", () => {
                HandleGetInformation(id);
            });
            marker.getElement().addEventListener("mouseenter", () => {
              
            });
    
            marker.getElement().addEventListener("mouseleave", () => {
                
            });
            marker.id = id;
            popup.id = id;
            markersRef.current.push(marker); 
            popupRef.current.push(popup); 
        });
    };
    
    const removeMarker = (id) => {
        const markerToRemove = markersRef.current.find((marker) => marker.id === id); // Assuming each marker has a unique 'id'
        if (markerToRemove) {
            markerToRemove.remove(); // Remove the marker from the map
            markersRef.current = markersRef.current.filter((marker) => marker.id !== id); // Remove from the markers array
        }
        const popupToRemove = popupRef.current.find((popup) => popup.id === id); // Assuming each marker has a unique 'id'
        if (popupToRemove) {
            popupToRemove.remove(); // Remove the marker from the map
            popupRef.current = popupRef.current.filter((popup) => popup.id !== id); // Remove from the markers array
        }
    };
    
    // --------------------------------- Marker ------------------------------------
    const HandleDriveNow = () =>{
        setIsDriving(true)
        if (!mapRef.current) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat([longitude, latitude])
                    .addTo(mapRef.current);
                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([destination.lng, destination.lat])
                    .addTo(mapRef.current);
                
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving',
                });

                mapRef.current.addControl(directions, 'top-left');
                directions.setOrigin([longitude, latitude]);
                directions.setDestination([destination.lng, destination.lat]);
            },
            (error) => console.error('Error getting location', error),
            { enableHighAccuracy: true }
        );
    }
    
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

    // --------------------------------- Vehicles ------------------------------------
    const [vehicles, setVehicles] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })
    const GetVehicleData = () =>{
        axios.post( "/renter/vehicles/all" , {  
            rows: 10000,
            search: "",
            page: 1,
        })
        .then(res => {
            setVehicles((prevContent) => ({
                ...prevContent,
                data: res.data.data,
                total:res.data.total,
                page:res.data.page,
              }));
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
    
    function dropDownToggle(dropDownTarget,dropDownContainer){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
    }
    
    const HandleViewVehicles = () => {
        if(user.id){
            GetVehicleData();
            console.log(vehicles.data)
            dropDownToggle('dropdownProvince','dropDownProvinceContainer')
        }else{
            Swal.fire({
                title: "You aren't logged in, do you want to login?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Login",
                denyButtonText: `Stay`
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Redirecting you to login!", "", "success");
                  window.location.href = "/login";
                } else if (result.isDenied) {
                  Swal.fire("Feel free to sign up anytime", "", "info");
                }
              });
        }
    }


    const setUserDefaultVehicle = (vehicle_id) =>{
        axios.post( "/renter/vehicles/default" , {  
            id: vehicle_id,
        })
        .then(res => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Sucessfully updated`,
                showConfirmButton: false,
                timer: 1500
            });
            getDefaultVehicle();
            GetParkingSpaces();
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
    function selectedDropDown(dropDownTarget,dropDownContainer,key,item,value,value_id){
        document.getElementById(dropDownTarget).classList.toggle('hidden');
        document.getElementById(dropDownContainer).classList.toggle('relative');
        setUserDefaultVehicle(value)       
    }

    return (
        <GuestLayout props={props}>
            <main className="bg-gray-100">
                {(isDriving) !== true ? (
                <div className="absolute left-1/2 md:transform -translate-x-1/2 top-4 mt-20 z-20 bg-white p-1 shadow-lg rounded-lg w-10/12 md:w-3/5 lg:w-1/2 xl:w-1/2 max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white z-30">
                        <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input 
                            type="search"
                            id='search'
                            onKeyUp={HandleSearchChange}
                            className="block h-full w-full pl-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search ..."
                        />
                        </div>
                    </div>
                    {details.id !== null &&(
                        <>
                            <div className="space">
                                <div className="sticky top-12 bg-white z-20 ">
                                    <div className="flex justify-between">
                                        <h4 className="font-semibold text-xl p-3 text-black">{details.name}</h4>
                                        <div className="flex items-center">
                                            <Link href={`/go/`+details.id} className="bg-green-600 text-white rounded-md px-3 py-2">
                                                GO
                                            </Link>
                                        </div>
                                    </div>
                                    <h6 className="px-3">{details.full_address}</h6>
                                    <p className="px-3">
                                        {details.description} 
                                    </p>
                                    {details.allotments.map((item) =>( 
                                        <p className="font-semibold px-3">{item.vehicle_name} Vacancy : {parseInt(
                                            (details.space_sumations.vehicle_count - (item.current_vehicle_count * item.parking_unit)) / item.parking_unit
                                          )}</p>
                                    ))}
                                    <div className="grid grid-cols-6">
                                        <div className="col-span-6 ">
                                            <div>
                                                <div className="relative w-full h-80  overflow-hidden rounded-lg">
                                                    {details.files.map((item, index) => (
                                                        <img
                                                        key={index}
                                                        src={'/files/space_content/'+item.content}
                                                        alt={`Slide ${index + 1}`}
                                                        className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                                                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                        />
                                                    ))}
                                                    <button
                                                            onClick={prevSlide}
                                                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
                                                        >
                                                        ◀
                                                    </button>
                                                    <button
                                                        onClick={nextSlide}
                                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
                                                    >
                                                        ▶
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={()=>{
                                     SetDetails({
                                        ...details,
                                        id:null,
                                     })
                                }}>
                                    <svg viewBox="0 -4.5 24 24" className="h-8 w-8 text-red-700" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>chevron-up</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-521.000000, -1202.000000)" fill="currentColor"> <path d="M544.345,1213.39 L534.615,1202.6 C534.167,1202.15 533.57,1201.95 532.984,1201.99 C532.398,1201.95 531.802,1202.15 531.354,1202.6 L521.624,1213.39 C520.797,1214.22 520.797,1215.57 521.624,1216.4 C522.452,1217.23 523.793,1217.23 524.621,1216.4 L532.984,1207.13 L541.349,1216.4 C542.176,1217.23 543.518,1217.23 544.345,1216.4 C545.172,1215.57 545.172,1214.22 544.345,1213.39" id="chevron-up" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                ) : (
                    <></>
                )}
              
                <div className="relative">
                    <div className="h-4/5 bg-gray-200 rounded-lg relative">
                        <div
                            style={{ height: '100%' }}
                            ref={mapContainerRef}
                            className="map-container"
                        />
                    </div>
                    {(isDriving) !== true ? (
                        <>
                            <div className="absolute top-20 lg:top-4 right-1 space-y-2  h-10" >
                                <button
                                    onClick={HandleViewVehicles}
                                    className="bg-white text-black p-2 rounded-md shadow-md hover:bg-gray-100 flex"
                                >
                                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                {defaultVehicle && (<div className="flex items-center mx-2">
                                    {defaultVehicle.vehicle_type +' - '+defaultVehicle.cr_plate_number}
                                </div>
                                )}
                                </button>
                                <div className="">
                                    <div className="inline-block w-full h-full" id="dropDownProvinceContainer" >
                                        <div id="dropdownProvince" className="absolute left-0 mt-0 w-full bg-gray-50 border border-gray-300 rounded-lg shadow-lg hidden">
                                            <ul id="dropdownList" className="max-h-60 overflow-y-auto text-black">
                                            {vehicles.data.length > 0 && vehicles.data.map((item, index) => (
                                                <li
                                                    className={
                                                    item.id == defaultVehicle.id
                                                        ? "px-4 py-2 bg-gray-200 text-black hover:bg-gray-200 dark:bg-gray-200 hover:text-white cursor-pointer"
                                                        : "px-4 py-2 hover:bg-gray-200 bg-white dark:bg-gray-100 text-black cursor-pointer"
                                                    }
                                                    onClick={() =>
                                                    selectedDropDown(
                                                        "dropdownProvince",
                                                        "dropDownProvinceContainer",
                                                        "province_id",
                                                        "province-selected",
                                                        item.id,
                                                        item.brand,
                                                    )
                                                    }
                                                    key={item.id || index} // Using index as fallback if item.id is null
                                                    value={item.id}
                                                >
                                                    {item.vehicle_type +' - '+item.cr_plate_number}
                                                </li>
                                                ))}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                   
                </div>
            </main>
        </GuestLayout>
    );
}
