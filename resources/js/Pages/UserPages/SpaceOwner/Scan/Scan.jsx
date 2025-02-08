import { useState, React,useRef,useEffect  } from "react";
import QRScanner from "../../../../Components/QRScanner/QRScanner";

import { Link, usePage } from '@inertiajs/react';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import ViewModal from '../../../../Components/Modals/ViewModal';

export default function Scan(props) {
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef();
    const [vehicleTypes,setVehicleTypes] = useState(props.vehicle_types);
    const [spaces,setSpaces] = useState(props.active_spaces);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [isViewQrModalOpen, setIsViewQrModalOpen] = useState(false);
    const openViewQrModal = () => setIsViewQrModalOpen(true);
    const closeViewQrModal = () => setIsViewQrModalOpen(false);

    const [details,SetDetails] = useState({
        id:null,
        name:null,
        rules:null,
        description:null,
        location_long:null,
        location_lat:null,
        hash:null,
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
                hash:detail.hash,
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
        HandleGetDetails()
        return () => {
        };
      }, []);


    const OpenScanner = () =>{
        scannerRef.current?.openScanner()
        setIsScanning(true);
    }
    const CloseScanner = () =>{
        scannerRef.current?.closeScanner();
        setIsScanning(false);
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
                                <Link href="/spaceowner/scan">
                                    Scan 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="w-50 ">
                        <div className="m-5 text-lg font-semibold">   
                            Scan
                        </div>

                        <div className="mt-2 mb-5 flex justify-center">
                            {details.id !== null ? (
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
                                                value={details.cr_plate_number}  
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
                                                value={details.cr_file_number}   
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
                                                value={details.brand}   
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
                                                value={details.unit}   
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
                                                    value={details.vehicle_type_id}  
                                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    disabled
                                                >
                                                    <option value="" selected>Select Vehicle type</option>
                                                    {vehicleTypes.map((item) => (
                                                        <option key={"details-" + item.id} value={item.id}>
                                                            {item.type + " - " + item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <h4 className='font-semibold text-center'>No Vehicle selected</h4>
                            )}
                            <div className="flex justify-center mx-4 mb-5">
                                {details.id !== null ? (
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
                            <ViewModal isOpen={isViewQrModalOpen} closeModal={closeViewQrModal}   Size={'w-full mx-2 md:w-8/12 '} title="View QR code" className="text-black">
                                <h2 className="uppercase">{" Brand : "+details.brand}</h2>
                                <h2 className="uppercase">{" Plate # : "+details.cr_plate_number}</h2>
                                <h2 className="uppercase">{" MV : "+details.cr_file_number}</h2>
                                <div className="flex justify-center">
                                    <img src={`/renter/vehicles/qr/${details.id}`} alt="QR Code" className="w-full md:w-3/5 lg:w-3/5 xl:w-1/5 xxl:w-1/5" />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <a
                                        href={`/renter/vehicles/qr/${details.id}`}
                                        download={`details-${details.id}-qr.png`}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Download QR Code
                                    </a>
                                </div>
                            </ViewModal>
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
}
