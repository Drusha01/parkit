import { Link, usePage } from '@inertiajs/react'
import {React, useState, useEffect, useRef } from 'react';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ModalSample from '../../../../Components/Modals/ModalSample.jsx';
export default function AddSpace(props) {
    console.log(props)

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => setIsModalOpen(true);

    // Function to close the modal
    const closeModal = () => setIsModalOpen(false);

    const [values,setValues] = useState({
        step:1,
        id: null,
        user_id : null,
        is_approved: null,
        name : null,
        rules: null,
        description: null,
        area_m2: null,
        location_long: null,
        location_lat: null,
        overall_rating: null,
        map_rendered: null,
        files:[],
        vehicle_types:props.vehicle_types,
        rent_rate_types:props.rent_rate_types,

        vehicle_type_id: null,
        vehicle_type_name:null,
        rent_rate_type_id:null,
        rent_rate_type_name:null,
        number_of_vehicles: null,
        duration_fee: null,
        duration_month: null,
        duration_day: null,
        duration_hour: null,
        flat_rate_fee: null,
        flat_rate_month: null,
        flat_rate_day: null,
        flat_rate_hour: null,
    })
    
  
    const [markers, setMarkers] = useState([]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        const fileArray = Array.from(Array.from(event.target.files));
        const imagePreviewsArray = fileArray.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result); // Add the data URL to the previews array
                };
                reader.onerror = reject;
                reader.readAsDataURL(file); // Read the file as a data URL
            });
        });
      
          // Wait for all the files to be read and update the state
        Promise.all(imagePreviewsArray)
        .then((previews) => {
            setValues(values => ({
                ...values,
                [key]:previews
            }))
        })
        .catch((error) => {
            console.error("Error reading files", error);
        });
    };

    const handleDeleteImage = (index) =>{
        console.log(index)
        const updatedFiles = values.files.filter((_, i) => i !== index);
        //setFiles(updatedFiles);
        setValues(values => ({
            ...values,
            files: updatedFiles
        }))
    }

    const handlePrevSubmit = () =>{
        if(values.step >1){
            setValues(values => ({
                ...values,
                step: values.step - 1,
            }))
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(values.step == 1){
            getCenterCoordinates()
            setValues(values => ({
                ...values,
                step: values.step + 1,
            }))
        }else if(values.step == 2){
            setValues(values => ({
                ...values,
                step: values.step + 1,
            }))
        }else if(values.step == 3){
        }else if(values.step == 3){
        }

    }

    const mapContainerRef = useRef();
    const mapRef = useRef();
    useEffect(() => {
        if (values.step === 1) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
    
            if (!values.map_rendered) {
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    center: [
                        values.location_long || 122.0748198,
                        values.location_lat || 6.9022435,
                    ],
                    zoom: 16,
                });
                setValues((prevValues) => ({
                    ...prevValues,
                    map_rendered: 1,
                }));
            }
        } else {
            if (values.map_rendered !== null) {
                setValues((prevValues) => ({
                    ...prevValues,
                    map_rendered: null,
                }));
            }
        }
    }, [values.step, values.map_rendered, values.location_lat, values.location_long]);
    
    const getCenterCoordinates = () => {
        const center = mapRef.current.getCenter();
        console.log(center.lng)
        setValues(values => ({
            ...values,
            location_long:center.lng,
            location_lat:center.lat,
        }))
    };

    const handleRentRateChange  = (id) => { 
        document.querySelector("#duration_fee").disabled = false;
        document.querySelector("#duration_month").disabled = false;
        document.querySelector("#duration_day").disabled = false;
        document.querySelector("#duration_hour").disabled = false;
        document.querySelector("#flat_rate_fee").disabled = false;
        document.querySelector("#flat_rate_month").disabled = false;
        document.querySelector("#flat_rate_day").disabled = false;
        document.querySelector("#flat_rate_hour").disabled = false;
        if(id == 1){
            document.querySelector("#duration_fee").disabled = true;
            document.querySelector("#duration_month").disabled = true;
            document.querySelector("#duration_day").disabled = true;
            document.querySelector("#duration_hour").disabled = true;
        }else if (id == 2){

        }else if (id == 3){
            document.querySelector("#flat_rate_fee").disabled = true;
            document.querySelector("#flat_rate_month").disabled = true;
            document.querySelector("#flat_rate_day").disabled = true;
            document.querySelector("#flat_rate_hour").disabled = true;
        }

    }

    const handleRentRateValueChange = (rent_id,rent_name) =>{
        setValues(values => ({
            ...values,
            rent_rate_type_id:rent_id,
            rent_rate_type_name:rent_name,
        }))
        alert(values)
    }
    
   
     const [vehicleAllotments, setVehicleAllotments] = useState([])

     console.log(vehicleAllotments)
 
    const handleAddVehicleAllotment = () =>{
        console.log(values)
        const newVehicleAllotments = {
            vehicle_type_id: values.vehicle_type_id,
            vehicle_type_name:values.vehicle_type_name,
            number_of_vehicles: values.number_of_vehicles,
            rent_rate_type_id:values.rent_rate_type_id,
            rent_rate_type_name:values.rent_rate_type_name,
            duration_fee: values.duration_fee,
            duration_month: values.duration_month,
            duration_day: values.duration_day,
            duration_hour: values.duration_hour,
            flat_rate_fee: values.flat_rate_fee,
            flat_rate_month: values.flat_rate_month,
            flat_rate_day: values.flat_rate_day,
            flat_rate_hour: values.flat_rate_hour,
        }
        setVehicleAllotments([
            ...vehicleAllotments,
            newVehicleAllotments
        ])
        return false
    }

    const HandleSpaceSubmit = () =>{
        setValues(values => ({
            ...values,
            step: values.step + 1,
        }))
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('rules', values.rules);
        formData.append('description', values.description);
        formData.append('area_m2', values.area_m2);
        formData.append('location_long', values.location_long);
        formData.append('location_lat', values.location_lat);
        // axios.post(`/spaceowner/spaces/add`, formData,{
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        // })
        // .then(res => {
        // const obj = JSON.parse(res.data)
        //     if (res.data = 1) {
        //         Swal.close();
        //         setValues(values => ({
        //             ...values,
        //             step: values.step + 1,
        //         }))
        //     }
        // })
        // .catch(function (error) {
        //     if (error.response && error.response.status === 422) {
        //         const validationErrors = error.response.data.errors;
        //         Object.keys(validationErrors).every(field => {
        //             Swal.close();
        //             Swal.fire({
        //                 position: "center",
        //                 icon: "warning",
        //                 title: `${validationErrors[field].join(', ')}`,
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //         });
        //     } else {
        //         console.error('An error occurred:', error.response || error.message);
        //     }
        // })
    }
    return (
        <>
            <SpaceOwnerLayout>
                <main className="text-white">
                    <nav className=" border border-gray-200">
                        <ul className="flex py-2 text-black ml-2">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces">
                                    Spaces 
                                </Link>
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces/add">
                                    Add Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-50 text-black ">
                        <div className="m-5 text-lg font-semibold flex justify-start">   
                            Add Space
                        </div>
                        <div className="content">
                            <div className="content-header w-full my-2">
                                
                            </div>    
                            <div className="content-body">
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className="space w-full min-h-[500px]">
                                    {values.step == 1 && (
                                        <>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-5 md:mr-1">
                                                    <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space name</label>
                                                    <input type="text" id="name" value={values.name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space name" 
                                                        required />
                                                </div>
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-0 md:mr-5">
                                                    <label for="area_m2" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space area</label>
                                                    <input type="number" step="0.1" id="area_m2" value={values.area_m2} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space area in square meter" 
                                                         />
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:mr-1 mt-3">
                                                    <label for="rules" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rules</label>
                                                    <textarea id="rules" rows="4"  value={values.rules} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space rules ..."
                                                        required></textarea>
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:ml-0 mt-3">
                                                    <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                    <textarea id="description" rows="4"  value={values.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space description ..."
                                                        required></textarea>
                                                </div>
                                                
                                                <div className="col-span-4 mx-2 md:mx-5 mt-3">
                                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose location</label>
                                                    <div className="h-96 bg-gray-200 rounded-lg relative">
                                                        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-10 z-10" width="40px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#8a0000"></path>
                                                            </g>
                                                        </svg>
                                                        <div
                                                            style={{ height: '100%' }}
                                                            ref={mapContainerRef}
                                                            className="map-container"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {values.step == 2 && (
                                        <>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 mx-2 md:mx-5">
                                                    <label for="files" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space pictures</label>
                                                    <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                       id="files" name='files' accept="image/*" multiple type="file"  />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 overflow-auto max-h-[600px] justify-items-center">
                                                {values.files.map((imageSrc, index) => (
                                                    <div className="relative h-80 w-full">
                                                        <img
                                                            className="h-full w-full object-cover rounded-lg"
                                                            src={imageSrc}
                                                            alt={`Preview ${index}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteImage(index)}
                                                            className="absolute top-2 right-2 bg-red-700 border-red-700 border text-white shadow-lg py-2 px-4 rounded hover:bg-red-600 hover:opacity-100 focus:outline-none"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                       {values.step == 3 && (
                                        <>
                                            
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4  mx-5 mb-2">
                                                    <div className="flex justify-end">
                                                        <ModalSample 
                                                            props={{
                                                                size: 'w-11/12',
                                                                title: 'Add Vehicle Allotment',
                                                                buttonText: 'Add Vehicle',
                                                                buttonClass: 'bg-green-500 text-white py-2 px-4 rounded-lg',
                                                                submitButtonText: 'Add',
                                                                submitButtonClass: 'bg-green-600 text-white py-2.5 px-3.5 rounded-lg',
                                                                submitFunction: handleAddVehicleAllotment ,
                                                            }}
                                                            
                                                            >
                                                            <div className="w-full grid mb-2 grid-cols-4">
                                                                <div className="col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-5 md:mr-5 lg:mr-1 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type</label>
                                                                        <select name="" id="" className="w-full rounded-lg px-3 py-2" >
                                                                            <option value="" selected>Select Vehicle type</option>
                                                                                {values.vehicle_types.map((item) => (
                                                                                    <option key={"vehicle-"+item.id} value={item.id}>{item.type+" - "+item.name}</option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 md:mr-0 lg:mr-1 lg:ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="number_of_vehicles" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number of vehicles</label>
                                                                        <input type="number" id="number_of_vehicles" min="1" value={values.number_of_vehicles} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Number of vehicles it can accomodate"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-1 md:mr-5 lg:ml-0 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rent Types</label>
                                                                        <select name="" id="" className="w-full rounded-lg px-3 py-2" onChange={(e) => handleRentRateChange(e.target.value)}  >
                                                                            <option value="" selected>Rent type</option>
                                                                                {values.rent_rate_types.map((item) => (
                                                                                    <option value={item.id} onClick={() => handleRentRateValueChange(item.id,item.name)}>{item.name}</option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Duration Fee</label>
                                                                        <input type="number" id="duration_fee" min="0" value={values.duration_fee} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration fee"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 lg:ml-0 lg:mr-1 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Months</label>
                                                                        <input type="number" id="duration_month" min="0" value={values.duration_month} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in months"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 lg:ml-0 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Days</label>
                                                                        <input type="number" id="duration_day" min="0" value={values.duration_day} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in days"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Hours</label>
                                                                        <input type="number" id="duration_hour" min="0" value={values.duration_hour} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in hours"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flat Rate Fee</label>
                                                                        <input type="number" id="flat_rate_fee" min="0" value={values.flat_rate_fee} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate fee"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 lg:ml-0 lg:mr-1 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Months</label>
                                                                        <input type="number" id="flat_rate_month" min="0" value={values.flat_rate_month} onChange={handleChange} 
                                                                            className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in months"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 lg:ml-0 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Days</label>
                                                                        <input type="number" id="flat_rate_day" min="0" value={values.flat_rate_day} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in days"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Hours</label>
                                                                        <input type="number" id="flat_rate_hour" min="0" value={values.flat_rate_hour} onChange={handleChange} className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in hours"  />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ModalSample>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                                        <tr className="text-md">
                                                            <th scope="col" className="pl-5 py-3">
                                                                #
                                                            </th>
                                                            <th scope="col" className="py-3">
                                                                Vehicle Type
                                                            </th>
                                                            <th scope="col" className="py-3">
                                                                Rent Type
                                                            </th>
                                                            <th scope="col" className="py-3">
                                                                Duration
                                                            </th>
                                                            <th scope="col" className="py-3">
                                                                Fee
                                                            </th>
                                                            <th scope="col" className="py-3 text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            vehicleAllotments.map((item,index) => (
                                                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                                <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                    {index+1}
                                                                </th>
                                                                <td className="py-4">
                                                                    {item.vehicle_type_name}
                                                                </td>
                                                                <td className="py-4">
                                                                    {item.rent_rate_type_name}
                                                                </td>
                                                                <td className="py-4">
                                                                    1 day
                                                                </td>
                                                                <td className="py-4">
                                                                    PHP 100
                                                                </td>
                                                                <td className="text-center">
                                                                    <button type="button" className=" mx-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                       )}
                                    </div>
                                    <div className="flex justify-evenly w-full mt-5"> 
                                        <button type="button" className={values.step == 1 ? "bg-gray-600 text-white rounded-lg p-3 py-2 opacity-0 ":"bg-gray-600 text-white rounded-lg p-3 py-2"} onClick={handlePrevSubmit}>
                                            Prev
                                        </button>
                                        {values.step <=3?
                                            <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                                Next
                                            </button>
                                        :
                                        <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                            Submit
                                        </button>
                                        }
                                    </div>
                                </form>    
                            </div>     
                            <div className="content-footer">

                            </div>
                        </div>

                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
};

