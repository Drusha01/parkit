import { Link, usePage } from '@inertiajs/react'
import {React, useState, useEffect, useRef } from 'react';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ModalSample from '../../../../Components/Modals/ModalSample.jsx';
import AddModal from '../../../../Components/Modals/AddModal.jsx';
import EditModal from '../../../../Components/Modals/EditModal.jsx';
export default function EditSpace(props) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    console.log(props);
    const [values,setValues] = useState({
        step:1,
        id: props.space.id,
        user_id : props.space.user_id,
        is_approved: props.space.is_approved,
        name : props.space.name,
        rules: props.space.rules,
        description: props.space.description,
        location_long: props.space.location_long,
        location_lat: props.space.location_lat,
        overall_rating: null,
        map_rendered: null,
        files:props.space_pictures,
        selected_files:null,
        vehicle_types:props.vehicle_types,
        rent_rate_types:props.rent_rate_types,
        allotments:props.allotments,

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
                [key]:previews
            }))
        })
        .catch((error) => {
            console.error("Error reading files", error);
        });
    };

    const handleDeleteImage = (id) =>{
        axios.post(`/spaceowner/spaces/content/delete`, {  
            space_id:values.id,
            id: id,
        })
        .then(res => {
            if (parseInt(res.data) === 1) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
                getSpaceContentImage();
            }
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
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
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
    }

    const getSpaceContentImage = () =>{
        axios.get(`/spaceowner/spaces/content/all/`+values.id, {  
        })
        .then(res => {
            setValues(values => ({
                ...values,
                files:res.data.space_pictures
            }))
        })
        .catch(function (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
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
            } else {
                console.error('An error occurred:', error.response || error.message);
            }
        })
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

    console.log(vehicleAllotments)
 
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
            number_of_vehicles: null,
            duration_fee: null,
            duration_month: null,
            duration_day: null,
            duration_hour: null,
            flat_rate_fee: null,
            flat_rate_month: null,
            flat_rate_day: null,
            flat_rate_hour: null,
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
        console.log(values.index)
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
        axios.post( "/spaceowner/spaces/edit/" , {  
            space_id:values.id,
        })
        .then(res => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully added",
                showConfirmButton: false,
                timer: 1500
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
                        title: `${validationErrors[field]}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
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
                                <Link href="/spaceowner/spaces">
                                    Spaces 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces/edit/">
                                    Edit Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-50 text-black dark:text-white ">
                        <div className="m-5 text-lg font-semibold flex justify-start">   
                            Edit Space
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
                                                <div className="col-span-4 mx-5">
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
                                            </div>
                                        </>
                                    )}
                                    </div>
                                    <div className="flex justify-evenly w-full mt-5"> 
                                        <button type="button" onClick={handleSubmit}  className="bg-green-600 text-white rounded-lg p-3 py-2">
                                            Save
                                        </button>
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

