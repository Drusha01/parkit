import { Link, usePage } from '@inertiajs/react'
import {React, useState, useEffect, useRef } from 'react';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ModalSample from '../../../../Components/Modals/ModalSample.jsx';
import AddModal from '../../../../Components/Modals/AddModal.jsx';
import EditModal from '../../../../Components/Modals/EditModal.jsx';
import ViewModal from '../../../../Components/Modals/ViewModal.jsx';
export default function AddSpace(props) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);


    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);

    const [values,setValues] = useState({
        step:1,
        id: null,
        user_id : null,
        is_approved: null,
        name : null,
        rules: null,
        description: null,
        location_long: null,
        location_lat: null,
        overall_rating: null,
        map_rendered: null,
        files:[],
        selected_files:null,
        vehicle_types:props.vehicle_types,
        rent_rate_types:props.rent_rate_types,

        vehicle_type_id: null,
        vehicle_type_name:null,
        rent_rate_type_id:null,
        rent_rate_type_name:null,
        number_of_vehicles: 1,
        duration_fee: 0,
        duration_month: 0,
        duration_day: 0,
        duration_hour: 0,
        flat_rate_fee: 0,
        flat_rate_month: 0,
        flat_rate_day: 0,
        flat_rate_hour: 0,
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

    // --------------------------------------------- Space Images -------------------------------------------------------------------
    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setValues(values => ({
            ...values,
            selected_files: Array.from(event.target.files), 
        }));
        const fileArray = Array.from(Array.from(event.target.files));
        const imagePreviewsArray = fileArray.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file); 
            });
        });
        Promise.all(imagePreviewsArray)
        .then((previews) => {
            setValues(values => ({
                ...values,
                [key]:previews,
                // [key]: [...(values[key] || []), ...previews],
            }))
        })
        .catch((error) => {
            console.error("Error reading files", error);
        });
    };

    const handleDeleteImage = (index) =>{
        const updatedFiles = values.files.filter((_, i) => i !== index);
        setValues(values => ({
            ...values,
            files: updatedFiles
        }))
    }
    // --------------------------------------------- Space Images -------------------------------------------------------------------
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
            if (values.files.length != 0) {
                setValues(values => ({
                    ...values,
                    step: values.step + 1,
                }))
            }else{
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Please choose at least one photo",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }else if(values.step == 3){
            if (vehicleAllotments.length > 0) {
                setValues(values => ({
                    ...values,
                    step: values.step + 1,
                }))
            }else{
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Please add at least one vehicle allotment",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }else if(values.step == 4){
            HandleSpaceSubmit();
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
        setValues(values => ({
            ...values,
            rent_rate_type_id:id,
        }))
    }




    // --------------------------------------------- Vehicle Allotment -------------------------------------------------------------------
    const handleRentRateValueChange = (rent_type_id) =>{
        const target_id = rent_type_id;
         const item = values.rent_rate_types.find((item) => Number(item.id) === Number(target_id));
   
        setValues(values => ({
            ...values,
            rent_rate_type_id:item.id,
            rent_rate_type_name:item.name,
        }))
    }
    const handleRentVehicleChange = (vehicle_type_id) =>{
         const item = values.vehicle_types.find((item) => Number(item.id) === Number(vehicle_type_id));
        setValues(values => ({
            ...values,
            vehicle_type_id:item.id,
            vehicle_type_name:item.name,
        }))
    }
    
    
   
    const [vehicleAllotments, setVehicleAllotments] = useState([])
    const handleAddVehicleAllotment = (e) =>{
        e.preventDefault(); 
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
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully added",
            showConfirmButton: false,
            timer: 1500
        });
        closeAddModal();
    }
    const getVehicleAllotmentByIndex = (index) => {
        if (index >= 0 && index < vehicleAllotments.length) {
            return vehicleAllotments[index];
        }
        return null;
    };
    const ClearVehicleAllotment = (MyFunc) =>{
        setValues(values => ({
            ...values,
            vehicle_type_id: null,
            vehicle_type_name:null,
            rent_rate_type_id:null,
            rent_rate_type_name:null,
            number_of_vehicles: 1,
            duration_fee: 0,
            duration_month: 0,
            duration_day: 0,
            duration_hour: 0,
            flat_rate_fee: 0,
            flat_rate_month: 0,
            flat_rate_day: 0,
            flat_rate_hour: 0,
        }))
        if (typeof MyFunc === 'function') {
            MyFunc();
        }
    }

    const deleteVehicleAllotment = (indexToDelete) => {
        setVehicleAllotments((prevVehicleAllotments) =>
            prevVehicleAllotments.filter((_, index) => index !== indexToDelete)
        );
    };

    const HandleGetVehicleAllotment = (index,modalFunc)=>{
        const VehicleAllotment = getVehicleAllotmentByIndex(index);
        console.log(VehicleAllotment)
        setValues(values => ({
            ...values,
            index: index,
            vehicle_type_id: VehicleAllotment.vehicle_type_id,
            vehicle_type_name: VehicleAllotment.vehicle_type_name,
            number_of_vehicles: VehicleAllotment.number_of_vehicles,
            rent_rate_type_id:VehicleAllotment.rent_rate_type_id,
            rent_rate_type_name:VehicleAllotment.rent_rate_type_name,
            duration_fee: VehicleAllotment.duration_fee,
            duration_month: VehicleAllotment.duration_month,
            duration_day: VehicleAllotment.duration_day,
            duration_hour:VehicleAllotment.duration_hour,
            flat_rate_fee: VehicleAllotment.flat_rate_fee,
            flat_rate_month: VehicleAllotment.flat_rate_month,
            flat_rate_day: VehicleAllotment.flat_rate_day,
            flat_rate_hour: VehicleAllotment.flat_rate_hour,
        }))
        modalFunc();
    }

    const updateVehicleAllotmentByIndex = (index, newValues) => {
        setVehicleAllotments((prevAllotments) =>
            prevAllotments.map((allotment, i) =>
                i === index ? { ...allotment, ...newValues } : allotment
            )
        );
    };

    const sadsafkdasfj = (e) => {
        e.preventDefault(); 
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
        updateVehicleAllotmentByIndex(values.index, newVehicleAllotments);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully updated",
            showConfirmButton: false,
            timer: 1500
        });
        closeEditModal();
    }

    // --------------------------------------------- Vehicle Allotment -------------------------------------------------------------------

    const HandleSpaceSubmit = () =>{
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('rules', values.rules);
        formData.append('description', values.description);
        formData.append('location_long', values.location_long);
        formData.append('location_lat', values.location_lat);
        vehicleAllotments.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
              formData.append(`vehicleAllotments[${index}][${key}]`, value);
            });
        });
        values.selected_files.forEach((file, index) => {
            formData.append('files[]', file); // Use `files[]` to send as an array
          });
        axios.post(`/spaceowner/spaces/add`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            if (parseInt(res.data) === 1) {
                Swal.close();
                document.getElementById("space_index").click()
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                var validationErrors = error.response.data.errors;
                if (validationErrors) {
                    Object.keys(validationErrors).every(field => {
                        Swal.close();
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: `${validationErrors[field].join(', ')}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                }
                validationErrors = error.response.data;
                if (validationErrors) {
                    Object.keys(validationErrors).every(field => {
                        Swal.close();
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: validationErrors.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                }
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }
    return (
        <>
            <SpaceOwnerLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces" id="space_index">
                                    Spaces 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces/add">
                                    Add Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-50 ">
                        <div className="m-5 text-lg font-semibold flex justify-start">   
                            Add Space
                        </div>
                        <div className="content">
                            <div className="content-header w-full my-2">
                                
                            </div>    
                            <div className="content-body">
                                <div className='w-full'>
                                    <div className="space w-full min-h-[500px]">
                                    {values.step == 1 && (
                                        <>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 mx-2 md:mx-5 mt-3">
                                                    <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space name  <span className="text-red-600">*</span></label>
                                                    <input type="text" id="name" value={values.name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space name" 
                                                        required />
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:mr-1 mt-3">
                                                    <label for="rules" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rules <span className="text-red-600">*</span></label>
                                                    <textarea id="rules" rows="4"  value={values.rules} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space rules ..."
                                                        required></textarea>
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:ml-0 mt-3">
                                                    <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                    <textarea id="description" rows="4"  value={values.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space description ..."
                                                    >
                                                    </textarea>
                                                </div>
                                                
                                                <div className="col-span-4 mx-2 md:mx-5 mt-3">
                                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Choose location  <span className="text-red-600">*</span></label>
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
                                                    <label for="files" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space pictures  <span className="text-red-600">*</span></label>
                                                    <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                       id="files" name='files' accept="image/*" multiple type="file"  />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 overflow-auto max-h-[600px] justify-items-center">
                                                {values.files.map((imageSrc, index) => (
                                                    <div className="relative h-32 md:h-80 lg:h-80 xl:h-80 xxl:h-80 w-full">
                                                        <img
                                                            className="h-full w-full object-cover rounded-lg border border-black"
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
                                            <div className="flex justify-end m-2 mb-4">
                                                <button
                                                    onClick={() =>ClearVehicleAllotment(openAddModal)}
                                                    className="bg-blue-700 text-white px-3.5 py-2 rounded-md hover:bg-blue-700 transition"
                                                >
                                                Add
                                                </button>
                                            </div>
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                                        <tr className="text-md">
                                                            <th scope="col" className="pl-5 py-3">
                                                                #
                                                            </th>
                                                            <th scope="col" className="py-3">
                                                                Vehicle Type
                                                            </th>
                                                            <th scope="col" className="py-3 hidden md:table-cell">
                                                                Rent Type
                                                            </th>
                                                            <th scope="col" className="py-3 hidden md:table-cell">
                                                                # of Vehicles
                                                            </th>
                                                            <th scope="col" className="py-3 hidden xl:table-cell">
                                                                Duration Fee
                                                            </th>
                                                            <th scope="col" className="py-3 hidden xl:table-cell">
                                                                Duration
                                                            </th>
                                                            <th scope="col" className="py-3 hidden xl:table-cell">
                                                                Flat Rate Fee
                                                            </th>
                                                            <th scope="col" className="py-3 hidden xl:table-cell">
                                                                Flat Rate Duration
                                                            </th>
                                                            <th scope="col" className="py-3 text-center">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            vehicleAllotments.length > 0 ? (
                                                                vehicleAllotments.map((item, index) => (
                                                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                                        <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {index + 1}
                                                                        </th>
                                                                        <td className="py-4">
                                                                           {item.vehicle_type_name}
                                                                        </td>
                                                                        <td className="py-4 hidden md:table-cell">
                                                                            {item.rent_rate_type_name}
                                                                        </td>
                                                                        <td className="py-4 hidden md:table-cell">
                                                                            {item.number_of_vehicles}
                                                                        </td>
                                                                        <td className="py-4 hidden xl:table-cell">
                                                                            {item.duration_fee}
                                                                        </td>
                                                                        <td className="py-4 hidden xl:table-cell">
                                                                            {Number(item.duration_day * 24) + Number(item.duration_month * 24 * 30 ) + Number(item.duration_hour)} hours
                                                                        </td>
                                                                        <td className="py-4 hidden xl:table-cell">
                                                                            PHP {Number(item.flat_rate_fee)}
                                                                        </td>
                                                                        <td className="py-4 hidden xl:table-cell">
                                                                            {Number(item.flat_rate_day * 24) + Number(item.flat_rate_month * 24 * 30 ) + Number(item.flat_rate_hour)} hours
                                                                        </td>
                                                                        <td className="text-center mt-2 flex gap-2">
                                                                            <button onClick={() => HandleGetVehicleAllotment(index,openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm">
                                                                                <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                                            </button>
                                                                            <button onClick={() => HandleGetVehicleAllotment(index,openEditModal)} className="focus:outline-2  border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 border-green-700 bg-white text-green-700  font-medium rounded-lg text-sm">
                                                                                <svg viewBox="0 0 24 24"  className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="currentColor"></path> </g></svg>
                                                                            </button>
                                                                            <button onClick={() => deleteVehicleAllotment(index)} className="focus:outline-2  border hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-600 border-red-700 bg-white text-red-700  font-medium rounded-lg text-sm">
                                                                                <svg viewBox="0 0 24 24" className="h-8 w-8"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                                            </button>
                                                                            {/* <button type="button" onClick={() => HandleGetVehicleAllotment(index,openViewModal)} className="mx-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                                                            <button type="button" onClick={() => HandleGetVehicleAllotment(index,openEditModal)} className="mx-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                                                            <button type="button" onClick={() => deleteVehicleAllotment(index)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button> */}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="6" className="text-center py-4 text-gray-500">No vehicle allotments found.</td>
                                                                </tr>
                                                            )
                                                        }

                                                      
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 mx-5 mb-2">
                                                        <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} FuncCall={handleAddVehicleAllotment} title="Add vehicle allotment">
                                                            <div className="w-full grid mb-2 grid-cols-4">
                                                                <div className="col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2 xxl:col-span-2 md:mx-2 md:ml-5 md:mr-5 lg:mr-1 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type <span className="text-red-700">*</span></label>
                                                                        <select name="" id="vehicle_type_id" className="w-full rounded-lg px-3 py-2 dark:bg-gray-700" onChange={(e) => handleRentVehicleChange(e.target.value)}  >
                                                                            <option value="" selected>Select Vehicle type</option>
                                                                                {values.vehicle_types.map((item) => (
                                                                                    <option key={"vehicle-"+item.id} value={item.id}>{item.type+" - "+item.name}</option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 md:mr-0 lg:mr-1 lg:ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="number_of_vehicles" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number of vehicles <span className="text-red-700">*</span></label>
                                                                        <input type="number" id="number_of_vehicles" min="1" value={values.number_of_vehicles} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Number of vehicles it can accomodate"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-1 md:mr-5 lg:ml-0 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Rent Types <span className="text-red-700">*</span></label>
                                                                        <select name="rent_types" id="rent_types" className="w-full rounded-lg px-3 py-2 dark:bg-gray-700" onChange={(e) => handleRentRateValueChange(e.target.value)}  >
                                                                            <option value="" selected>Rent type</option>
                                                                                {values.rent_rate_types.map((item) => (
                                                                                    <option value={item.id} >{item.name}</option>
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
                                                        </AddModal>
                                                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="View vehicle allotment">
                                                            <div className="w-full grid mb-2 grid-cols-4">
                                                                <div className="col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2 xxl:col-span-2 md:mx-2 md:ml-5 md:mr-5 lg:mr-1 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type <span className="text-red-700">*</span></label>
                                                                        <select name="" disabled id="vehicle_type_id" className="w-full rounded-lg px-3 py-2 dark:bg-gray-700 disabled:bg-gray-400" onChange={(e) => handleRentVehicleChange(e.target.value)}  >
                                                                            <option value="" selected>Select Vehicle type</option>
                                                                                {values.vehicle_types.map((item) => (
                                                                                    <option key={"vehicle-"+item.id} value={item.id}>{item.type+" - "+item.name}</option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 md:mr-0 lg:mr-1 lg:ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="number_of_vehicles" className="block mb-1 text-sm font-medium text-gray-900  dark:text-white">Number of vehicles <span className="text-red-700">*</span></label>
                                                                        <input type="number" id="number_of_vehicles" min="1" value={values.number_of_vehicles} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Number of vehicles it can  " disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-1 md:mr-5 lg:ml-0 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Rent Types <span className="text-red-700">*</span></label>
                                                                        <select name="rent_types" id="rent_types" disabled className="w-full rounded-lg px-3 py-2 dark:bg-gray-700 disabled:bg-gray-400" onChange={(e) => handleRentRateValueChange(e.target.value)}  >
                                                                            <option value="" selected>Rent type</option>
                                                                                {values.rent_rate_types.map((item) => (
                                                                                    <option value={item.id} >{item.name}</option>
                                                                                ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Duration Fee</label>
                                                                        <input type="number" id="duration_fee" min="0" disabled value={values.duration_fee} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration fee"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 lg:ml-0 lg:mr-1 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Months</label>
                                                                        <input type="number" id="duration_month" min="0" disabled value={values.duration_month} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in months"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 lg:ml-0 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Days</label>
                                                                        <input type="number" id="duration_day" min="0" disabled value={values.duration_day} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in days"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Hours</label>
                                                                        <input type="number" id="duration_hour" min="0" disabled value={values.duration_hour} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Duration in hours"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flat Rate Fee</label>
                                                                        <input type="number" id="flat_rate_fee" min="0" disabled value={values.flat_rate_fee} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate fee"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 lg:ml-0 lg:mr-1 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Months</label>
                                                                        <input type="number" id="flat_rate_month" min="0" disabled value={values.flat_rate_month} onChange={handleChange} 
                                                                            className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in months"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:ml-5 lg:ml-0 mr-1 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Days</label>
                                                                        <input type="number" id="flat_rate_day" min="0" disabled value={values.flat_rate_day} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in days"  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-span-4 md:col-span-2 lg:col-span-1 md:mr-5 ml-0 mb-2">
                                                                    <div className="w-full">
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Hours</label>
                                                                        <input type="number" id="flat_rate_hour" min="0" disabled value={values.flat_rate_hour} onChange={handleChange} className="disabled:bg-gray-400 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                                            placeholder="Flat rate duration in hours"  />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ViewModal>
                                                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={sadsafkdasfj} title="Edit vehicle allotment">
                                                            <div className="w-full grid mb-2 grid-cols-4">
                                                                <div className="col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-5 md:mr-5 lg:mr-1 mb-2">
                                                                    <div className="w-full">   
                                                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type</label>
                                                                        <select name="" id="vehicle_type_id" className="w-full rounded-lg px-3 py-2 dark:bg-gray-700" value={values.vehicle_type_id} onChange={(e) => handleRentVehicleChange(e.target.value)}  >
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
                                                                        <select name="rent_types" id="rent_types" className="w-full rounded-lg px-3 py-2 dark:bg-gray-700" value={values.rent_rate_type_id} onChange={(e) => handleRentRateValueChange(e.target.value)}  >
                                                                            <option value="" selected>Rent type</option>
                                                                                {values.rent_rate_types.map((item) => (
                                                                                    <option value={item.id} >{item.name}</option>
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
                                                        </EditModal>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {values.step == 4 && (
                                        <>
                                             <div className='min-h-[200px] '>
                                                <div className='text-xl text-center'>
                                                    Please review your parking space details .. 
                                                </div>
                                                <div className="flex justify-center my-5">
                                                    <button className='py-2.5 bg-yellow-300 px-3.5 rounded-lg' >
                                                        Review
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    </div>
                                    <div className="flex justify-evenly w-full mt-5"> 
                                        <button type="button" className={values.step == 1 ? "bg-gray-600 text-white rounded-lg p-3 py-2 opacity-0 ":"bg-gray-600 text-white rounded-lg p-3 py-2"} onClick={handlePrevSubmit}>
                                            Prev
                                        </button>
                                        {values.step <=3?
                                            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white rounded-lg p-3 py-2">
                                                Next
                                            </button>
                                        :
                                        <button type="button" onClick={handleSubmit}  className="bg-green-600 text-white rounded-lg p-3 py-2">
                                            Submit
                                        </button>
                                        }
                                    </div>
                                </div>    
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

