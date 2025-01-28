import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState, useEffect, useRef } from 'react';
import AddModal from '../../../../Components/Modals/AddModal';
import EditModal from '../../../../Components/Modals/EditModal';
import DeleteModal from '../../../../Components/Modals/DeleteModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';

export default function RenterVehicles(props) {
    const [vehicleTypes,setVehicleTypes] = useState(props.vehicle_types);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isViewVehicleModalOpen, setIsViewVehicleModalOpen] = useState(false);
    const openAddModal = () => {
        setIsAddModalOpen(true);
        HandleClearDetails();
    };
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const openViewVehicleModal = () => setIsViewVehicleModalOpen(true);
    const closeViewVehicleModal = () => setIsViewVehicleModalOpen(false);
    

    const [vehicle,setVehicle] = useState({
        id:null,
        is_approved:null,
        cr_file_number :null,
        cr_plate_number:null,
        vehicle_type_id :null,
        cor_picture :null,
        cor_holding_picture :null,
        left_side_picture :null,
        right_side_picture :null,
        cor_picture_url :null,
        cor_holding_picture_url :null,
        left_side_picture_url :null,
        right_side_picture_url :null,
    })

    useEffect(() => {
        GetVehicleData()
        return () => {
        };
      }, []);

    const [vehicles, setVehicles] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })

    const handleVehicleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setVehicle(vehicle => ({
            ...vehicle,
            [key]: value,
        }))
    }

    const handleVehicleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setVehicle(vehicle => ({
            ...vehicle,
            [key]:event.target.files[0]
        }))
    };

    const GetVehicleData = () =>{
        axios.post( "/renter/vehicles/all" , {  
            rows: vehicles.rows,
            search: vehicles.search,
            page: vehicles.page,
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
    const HandleVehicleNextPage = () => {
        setVehicles((prevContent) => ({
            ...prevContent,
            page:prevContent.page+1,
        }));
    }
    const HandleVehiclePrevPage = () => {
        setVehicles((prevContent) => ({
            ...prevContent,
            page:prevContent.page-1,
        }));
    }
    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/renter/vehicles/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            console.log(detail);
            modalFunc();
            setVehicle({
                id:detail.id,
                is_approved :detail.is_approved,
                cr_file_number :detail.cr_file_number,
                cr_plate_number:detail.cr_plate_number,
                vehicle_type_id :detail.vehicle_type_id,
                cor_picture :null,
                cor_holding_picture :null,
                left_side_picture :null,
                right_side_picture :null,
                cor_picture_url :detail.cor_picture,
                cor_holding_picture_url :detail.cor_holding_picture,
                left_side_picture_url :detail.left_side_picture,
                right_side_picture_url :detail.right_side_picture,
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
    const HandleClearDetails = () => {
        setVehicle({
            id:null,
            cr_file_number :null,
            cr_plate_number:null,
            vehicle_type_id :null,
            cor_picture :null,
            cor_holding_picture :null,
            left_side_picture :null,
            right_side_picture :null,
            cor_picture_url :null,
            cor_holding_picture_url :null,
            left_side_picture_url :null,
            right_side_picture_url :null,
        });
    }
    const HandleAddVehicle = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/vehicles/add`, {
            cr_file_number :vehicle.cr_file_number,
            cr_plate_number:vehicle.cr_plate_number,
            vehicle_type_id :vehicle.vehicle_type_id,
            cor_picture :vehicle.cor_picture,
            cor_holding_picture :vehicle.cor_holding_picture,
            left_side_picture :vehicle.left_side_picture,
            right_side_picture :vehicle.right_side_picture,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                closeAddModal();
                GetVehicleData();
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
    const HandleEditVehicle = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/vehicles/edit`, {
            id :vehicle.id,
            cr_file_number :vehicle.cr_file_number,
            cr_plate_number:vehicle.cr_plate_number,
            vehicle_type_id :vehicle.vehicle_type_id,
            cor_picture :vehicle.cor_picture,
            cor_holding_picture :vehicle.cor_holding_picture,
            left_side_picture :vehicle.left_side_picture,
            right_side_picture :vehicle.right_side_picture,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                closeEditModal();
                GetVehicleData();
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
    
    const HandleDeleteVehicle = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/vehicles/delete`, {
            id :vehicle.id,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                closeDeleteModal();
                GetVehicleData();
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
    return (
        <>
            <RenterLayout >
                <div className="main-content w-full lg:w-4/5 shadow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px] flex flex-col relative">    
                    <div className="h-full">  
                        <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                            Vehicles
                        </div>
                        <div className="flex justify-end">
                            <div className="flex justify-end mx-5 mb-5 ">
                                <button type="button" className=" bg-blue-700 text-white rounded-lg p-3 py-2" onClick={openAddModal}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="content">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-5 py-3">Plate Number</th>
                                            <th scope="col" className="py-3">MV File</th>
                                            <th scope="col" className="py-3">Vehicle Type</th>
                                            <th scope="col" className="py-3 text-center">Approval Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.data.length > 0 ? 
                                            (vehicles.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 border-b text-center">{index + 1 + (vehicles.page - 1) * vehicles.rows}</td>
                                                    <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whiteitem-nowrap dark:text-white">
                                                        {item.cr_plate_number}
                                                    </th>
                                                    <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whiteitem-nowrap dark:text-white">
                                                        {item.cr_file_number}
                                                    </th>
                                                    <td className="py-4">{item.vehicle_type_name}</td>
                                                    <td className="py-4 text-center">
                                                        {item.is_approved == 1 ? (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="text-center flex justify-center gap-2 h-full mt-1">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            COR
                                                        </button>
                                                        <button onClick={() => HandleGetDetails(item.id, openViewVehicleModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            Vehicle
                                                        </button>
                                                        <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="focus:outline-2  border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 bg-green-600 text-white font-medium rounded-lg text-sm px-3 py-2">
                                                            Edit
                                                        </button>
                                                
                                                        <button onClick={() => HandleGetDetails(item.id, openDeleteModal)} className="focus:outline-2  border hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-600 bg-red-600 text-white font-medium rounded-lg text-sm px-3 py-2">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <BasicPagination currentPage={vehicles.page} perPage={vehicles.rows} TotalRows={vehicles.total} PrevPageFunc={HandleVehiclePrevPage} NextPageFunc={HandleVehicleNextPage} />
                        <div>
                            <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal}  Size={'w-12/12 md:w-8/12 mx-2'} FuncCall={HandleAddVehicle}  title="Add Vehicle">
                                <div className="w-full grid mb-2 md:grid-cols-4">
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <label for="cr_plate_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Plate no. <span className="text-red-600">*</span></label>
                                        <input type="text" id="cr_plate_number" value={vehicle.cr_plate_number} onChange={handleVehicleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Plate no." />
                                    </div>
                                    <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <label for="cr_file_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">MV File no. <span className="text-red-600">*</span></label>
                                        <input type="text" id="cr_file_number" value={vehicle.cr_file_number} onChange={handleVehicleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="MV File no."  required />
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <div className='w-full'>
                                            <label for="vehicle_type_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type <span className="text-red-600">*</span></label>
                                            <select required id="vehicle_type_id" value={vehicle.vehicle_type_id} onChange={handleVehicleChange} tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="" selected>Select Vehicle type</option>
                                                {vehicleTypes.map((item) => (
                                                    <option key={"vehicle-"+item.id} value={item.id}>{item.type+" - "+item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <div className="w-full">
                                            <label for="cor_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Certificate of Registration <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="cor_picture" type="file" required accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <div className='w-full'>
                                            <label for="left_side_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Left side picture <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="left_side_picture" type="file" required accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <div className="w-full">
                                            <label for="right_side_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Right side picture <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="right_side_picture" type="file" required accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                            </AddModal>
                            <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal}  Size={'w-12/12 md:w-8/12 mx-2'} FuncCall={HandleEditVehicle}  title="Edit Vehicle">
                                <div className="w-full grid mb-2 md:grid-cols-4">
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <label for="cr_plate_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Plate no. <span className="text-red-600">*</span></label>
                                        <input type="text" id="cr_plate_number" value={vehicle.cr_plate_number} onChange={handleVehicleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Plate no." />
                                    </div>
                                    <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <label for="cr_file_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">MV File no. <span className="text-red-600">*</span></label>
                                        <input type="text" id="cr_file_number" value={vehicle.cr_file_number} onChange={handleVehicleChange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="MV File no."  required />
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <div className='w-full'>
                                            <label for="vehicle_type_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle type <span className="text-red-600">*</span></label>
                                            <select required id="vehicle_type_id" value={vehicle.vehicle_type_id} onChange={handleVehicleChange} tabIndex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="" selected>Select Vehicle type</option>
                                                {vehicleTypes.map((item) => (
                                                    <option key={"vehicle-"+item.id} value={item.id}>{item.type+" - "+item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <div className="w-full">
                                            <label for="cor_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Certificate of Registration <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="cor_picture" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                        <div className='w-full'>
                                            <label for="left_side_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Left side picture <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="left_side_picture" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className="flex col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                        <div className="w-full">
                                            <label for="right_side_picture" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Right side picture <span className="text-red-600">*</span></label>
                                            <input onChange={handleVehicleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                id="right_side_picture" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                            </EditModal>
                            <DeleteModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} FuncCall={HandleDeleteVehicle} Size={'w-12/12 md:w-8/12 mx-2'} title="Delete Vehicle" className="text-black">
                                <div className="text-center mt-5 text-red-600">Are you sure you want to delete this?</div>  
                            </DeleteModal>
                            <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal}  Size={"w-4/5"} title="View Vehicle Certificate of Registration" className="text-black">
                                <div className="flex justify-center h-1/2">
                                    <img src={"/files/vehicle/cor_picture/"+vehicle.cor_picture_url} alt=""  />
                                </div>
                            </ViewModal>
                            <ViewModal isOpen={isViewVehicleModalOpen} closeModal={closeViewVehicleModal} Size={'w-12/12 md:w-8/12 mx-2'} title="View Vehicle Certificate of Registration" className="text-black">
                                <div className="flex h-1/2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="" className="font-semibold">Left side of vehicle</label>
                                        <img src={"/files/vehicle/left_side_picture/"+vehicle.left_side_picture_url} className="h-2/3" alt="" />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="" className="font-semibold">Right side of vehicle</label>
                                        <img src={"/files/vehicle/right_side_picture/"+vehicle.right_side_picture_url}  className="h-2/3" alt="" />
                                    </div>
                                </div>
                            </ViewModal>
                        </div>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
