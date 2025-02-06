import { useState, React,useRef,useEffect  } from "react";
import QRScanner from "../../../../Components/QRScanner/QRScanner";

import { Link, usePage } from '@inertiajs/react';
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import ViewModal from '../../../../Components/Modals/ViewModal';

export default function Scan(props) {
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef();
    const [vehicleTypes,setVehicleTypes] = useState(props.vehicle_types);
    const [vehicles,setVehicles] = useState(props.vehicles);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [isViewQrModalOpen, setIsViewQrModalOpen] = useState(false);
    const openViewQrModal = () => setIsViewQrModalOpen(true);
    const closeViewQrModal = () => setIsViewQrModalOpen(false);

    const [vehicle,setVehicle] = useState({
        id:null,
        is_approved:null,
        cr_file_number :null,
        cr_plate_number:null,
        brand :null,
        unit:null,
        vehicle_type_id :null,
        cor_picture :null,
        cor_holding_picture :null,
        front_side_picture :null,
        back_side_picture :null,
        cor_picture_url :null,
        cor_holding_picture_url :null,
        front_side_picture_url :null,
        back_side_picture_url :null,
    })

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
                brand :detail.brand,
                unit:detail.unit,
                cor_picture :null,
                cor_holding_picture :null,
                front_side_picture :null,
                back_side_picture :null,
                cor_picture_url :detail.cor_picture,
                cor_holding_picture_url :detail.cor_holding_picture,
                front_side_picture_url :detail.front_side_picture,
                back_side_picture_url :detail.back_side_picture,
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

    const HandleGetDefaultVehicle = ()=>{
        axios.get( "/renter/vehicles/default" )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            setVehicle({
                id:detail.id,
                is_approved :detail.is_approved,
                cr_file_number :detail.cr_file_number,
                cr_plate_number:detail.cr_plate_number,
                vehicle_type_id :detail.vehicle_type_id,
                brand :detail.brand,
                unit:detail.unit,
                cor_picture :null,
                cor_holding_picture :null,
                front_side_picture :null,
                back_side_picture :null,
                cor_picture_url :detail.cor_picture,
                cor_holding_picture_url :detail.cor_holding_picture,
                front_side_picture_url :detail.front_side_picture,
                back_side_picture_url :detail.back_side_picture,
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
        HandleGetDefaultVehicle()
        return () => {
        };
      }, []);

    const HandleUpdateDefaultVehicle = (e) =>{
        e.preventDefault(); 
        const value = e.target.value
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/vehicles/default`, {
            id :value,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                HandleGetDefaultVehicle()
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
    

    const OpenScanner = () =>{
        scannerRef.current?.openScanner()
        setIsScanning(true);
    }
    const CloseScanner = () =>{
        scannerRef.current?.closeScanner();
        setIsScanning(false);
    }

    return (
        <RenterLayout>
            <div className="main-content w-full lg:w-4/5 shadow-xl bg-white dark:bg-gray-700 dark:text-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px] flex flex-col relative">    
                <div className="h-full flex flex-col justify-between">  
                    <div>
                        <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                            Scan
                        </div>
                        <div className="flex justify-end mt-5 mr-5">
                            <svg viewBox="0 0 24 24" fill="none" width="40px"  onClick={() => HandleGetDetails(vehicle.id, openViewQrModal)} type="button" className="button mr-2 rounded-lg p-2 hover:bg-gray-200 hover:text-black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z" fill="currentColor"></path> <path d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z" fill="currentColor"></path> <path d="M4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16V20C1 21.6569 2.34315 23 4 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21H4Z" fill="currentColor"></path> <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 5.44772 10.5523 5 10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6ZM9 7.5C9 7.22386 8.77614 7 8.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5V7.5Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18 13C18.5523 13 19 13.4477 19 14V18C19 18.5523 18.5523 19 18 19H14C13.4477 19 13 18.5523 13 18V14C13 13.4477 13.4477 13 14 13H18ZM15 15.5C15 15.2239 15.2239 15 15.5 15H16.5C16.7761 15 17 15.2239 17 15.5V16.5C17 16.7761 16.7761 17 16.5 17H15.5C15.2239 17 15 16.7761 15 16.5V15.5Z" fill="currentColor"></path> <path d="M14 5C13.4477 5 13 5.44772 13 6C13 6.55229 13.4477 7 14 7H16.5C16.7761 7 17 7.22386 17 7.5V10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H14Z" fill="currentColor"></path> <path d="M14 8C13.4477 8 13 8.44771 13 9V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V9C15 8.44772 14.5523 8 14 8Z" fill="currentColor"></path> <path d="M6 13C5.44772 13 5 13.4477 5 14V16C5 16.5523 5.44772 17 6 17C6.55229 17 7 16.5523 7 16V15.5C7 15.2239 7.22386 15 7.5 15H10C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13H6Z" fill="currentColor"></path> <path d="M10 17C9.44771 17 9 17.4477 9 18C9 18.5523 9.44771 19 10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17Z" fill="currentColor"></path> </g></svg>   
                            <div>
                                <select name="" id="" value={vehicle.id} onChange={HandleUpdateDefaultVehicle} className="dark:bg-gray-600 dark:border dark:border-gray-400 rounded-lg">
                                    {vehicle.id === null && (
                                        <option value="">Select Default Vehicle</option>
                                    )}
                                    {vehicles.map((item) => (
                                        <option key={"status-"+item.id} value={item.id}>{item.brand+" MV :"+item.cr_file_number}</option>
                                    ))}
                                </select>
                                {/* <button className="px-3 py-2 border border-black rounded-lg mr-5">
                                    <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 mb-5 flex justify-center">
                    {vehicle.id !== null ? (
                        isScanning ? (
                            <div className="w-full md:w-full lg:w-1/2 xl:w-1/2 xxl:w-1/2 mt-2 m-10 ">
                                <QRScanner
                                    ref={scannerRef}
                                    onScanSuccess={(data) => console.log("Scanned:", data)}
                                    onScanError={(err) => console.error(err)}
                                />
                            </div>
                        ) : (
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                    <label htmlFor="cr_plate_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Plate no.
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cr_plate_number" 
                                        value={vehicle.cr_plate_number}  
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Plate no."
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                    <label htmlFor="cr_file_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        MV File no.
                                    </label>
                                    <input 
                                        type="text" 
                                        id="cr_file_number" 
                                        value={vehicle.cr_file_number}   
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="MV File no."  
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-4 md:mr-1 md:ml-4  mb-2">
                                    <label htmlFor="brand" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Brand
                                    </label>
                                    <input 
                                        type="text" 
                                        id="brand" 
                                        value={vehicle.brand}   
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Brand" 
                                        readOnly
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-4 md:mr-4 md:ml-0 mb-2">
                                    <label htmlFor="unit" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Unit
                                    </label>
                                    <input 
                                        type="text" 
                                        id="unit" 
                                        value={vehicle.unit}   
                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Unit ... " 
                                        readOnly
                                    />
                                </div>
                                <div className="flex col-span-4 mx-4 mb-2">
                                    <div className='w-full'>
                                        <label htmlFor="vehicle_type_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Vehicle type
                                        </label>
                                        <select 
                                            required 
                                            id="vehicle_type_id" 
                                            value={vehicle.vehicle_type_id}  
                                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            disabled
                                        >
                                            <option value="" selected>Select Vehicle type</option>
                                            {vehicleTypes.map((item) => (
                                                <option key={"vehicle-" + item.id} value={item.id}>
                                                    {item.type + " - " + item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="flex justify-center h-1/2">
                                    <img src={`/files/vehicle/cor_picture/${vehicle.cor_picture_url}`} alt="Vehicle COR" />
                                </div>
                                <div className="flex h-1/2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="" className="font-semibold">Front side of vehicle</label>
                                        <img src={`/files/vehicle/front_side_picture/${vehicle.front_side_picture_url}`} className="h-2/3" alt="Front Side" />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="" className="font-semibold">Back side of vehicle</label>
                                        <img src={`/files/vehicle/back_side_picture/${vehicle.back_side_picture_url}`} className="h-2/3" alt="Back Side" />
                                    </div>
                                </div> */}
                            </div>
                        )
                    ) : (
                        <h4 className='font-semibold text-center'>No Vehicle selected</h4>
                    )}
                    </div>
                    <div className="flex justify-center mx-4 mb-5">
                        {vehicle.id !== null ? (
                              isScanning ? (
                                <>
                                    <button
                                        onClick={() => CloseScanner()}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Close Scanner
                                    </button>
                                </>
                            ):(
                                <>
                                 <button
                                        onClick={() =>  OpenScanner()}
                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Open Scanner
                                    </button>
                                </>
                            )) : (
                            <button className="bg-green-500 px-3 py-2 rounded-lg ">
                                Select Vehicle
                            </button>
                        )}
                    </div>
                    {/* Scan results */}
                    {/* <div className="text-center mb-4">
                        {result && <p className="text-green-600 font-bold">Scanned: {result}</p>}
                        {error && <p className="text-red-600">Error: {error}</p>}
                    </div> */}
                </div>
                <div>
                    <ViewModal isOpen={isViewQrModalOpen} closeModal={closeViewQrModal}  Size={"w-3/5"} title="View QR code" className="text-black">
                        <h2 className="uppercase">{" Brand : "+vehicle.brand}</h2>
                        <h2 className="uppercase">{" Plate # : "+vehicle.cr_plate_number}</h2>
                        <h2 className="uppercase">{" MV : "+vehicle.cr_file_number}</h2>
                        <div className="flex justify-center">
                            <img src={`/renter/vehicles/qr/${vehicle.id}`} alt="QR Code" className="w-1/5" />
                        </div>
                        <div className="flex justify-center mt-4">
                            <a
                                href={`/renter/vehicles/qr/${vehicle.id}`}
                                download={`vehicle-${vehicle.id}-qr.png`}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Download QR Code
                            </a>
                        </div>
                    </ViewModal>
                </div>
            </div>
        </RenterLayout>
    );
}
