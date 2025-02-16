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

    const [isSent,setIsSent] = useState(false);
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
            console.log(detail);
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

    const HandleSelectSpace = (e) =>{
        const value = e.target.value
        if (Number(value)) {
            setIsScanning(false);
            HandleGetDetails(value);
        }
    }

    const HandleDecodedQRCode = (data) =>{
        if(isSent){
            return;
        }else{
            setIsSent(true);
        }
        axios.post( "/spaceowner/scan/hash" , {  
            url: data,
            space_id: details.id,
        })
        .then(res => {
            if (res.data === 'Success, Welcome to parkIt' || res.data === 'Success, Welcome back to parkIt') {
                const time = 1500;
                    setTimeout(() => {
                        setIsSent(false);
                    }, time);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: res.data,
                        showConfirmButton: false,
                        timer: time
                    });
            }else if(res.data === 'Successfully time-out, please try again time-in later' || res.data === 'Successfully time-in, please try again time-out later'){
                const time = 3000;
                setTimeout(() => {
                    setIsSent(false);
                }, time);
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: res.data,
                    showConfirmButton: false,
                    timer: time
                });
            }else if( res.data === 'Invalid Vehicle QR Code'){
                const time = 1000;
                setTimeout(() => {
                    setIsSent(false);
                }, time);
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: res.data,
                    showConfirmButton: false,
                    timer: time
                });
            }else{
                const time = 3000;
                setTimeout(() => {
                    setIsSent(false);
                }, time);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.data,
                    showConfirmButton: false,
                    timer: time
                });
            }
        })
        .catch(function (error) {
            setIsSent(false);
            // if (error.response && error.response.status === 422) {
            //     const validationErrors = error.response.data.errors;
            //     Object.keys(validationErrors).forEach(field => {
            //         Swal.close();
            //         Swal.fire({
            //             position: "center",
            //             icon: "warning",
            //             title: `${validationErrors[field].join(', ')}`,
            //             showConfirmButton: false,
            //             timer: 1500
            //         });
            //     });
            // } else {
            //     console.error('An error occurred:', error.response || error.message);
            // }
        })
    }
    
    useEffect(() => {
        // HandleGetDetails()
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

                    <div className="content">
                        <div className="content-header my-2 mx-3 md:mx-6 lg:mx-6 xl:mx-6 xxl:mx-6">
                            <div className="flex justify-end ">
                                <svg viewBox="0 0 24 24" fill="none" width="40px"  onClick={() => HandleGetDetails(vehicle.id, openViewQrModal)} type="button" className="button mr-2 rounded-lg p-2 hover:bg-gray-200 hover:text-black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z" fill="currentColor"></path> <path d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z" fill="currentColor"></path> <path d="M4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16V20C1 21.6569 2.34315 23 4 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21H4Z" fill="currentColor"></path> <path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 5.44772 10.5523 5 10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6ZM9 7.5C9 7.22386 8.77614 7 8.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5V7.5Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18 13C18.5523 13 19 13.4477 19 14V18C19 18.5523 18.5523 19 18 19H14C13.4477 19 13 18.5523 13 18V14C13 13.4477 13.4477 13 14 13H18ZM15 15.5C15 15.2239 15.2239 15 15.5 15H16.5C16.7761 15 17 15.2239 17 15.5V16.5C17 16.7761 16.7761 17 16.5 17H15.5C15.2239 17 15 16.7761 15 16.5V15.5Z" fill="currentColor"></path> <path d="M14 5C13.4477 5 13 5.44772 13 6C13 6.55229 13.4477 7 14 7H16.5C16.7761 7 17 7.22386 17 7.5V10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H14Z" fill="currentColor"></path> <path d="M14 8C13.4477 8 13 8.44771 13 9V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V9C15 8.44772 14.5523 8 14 8Z" fill="currentColor"></path> <path d="M6 13C5.44772 13 5 13.4477 5 14V16C5 16.5523 5.44772 17 6 17C6.55229 17 7 16.5523 7 16V15.5C7 15.2239 7.22386 15 7.5 15H10C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13H6Z" fill="currentColor"></path> <path d="M10 17C9.44771 17 9 17.4477 9 18C9 18.5523 9.44771 19 10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17Z" fill="currentColor"></path> </g></svg>   
                            <div>
                                <select name="" id="id" value={details.id} onChange={HandleSelectSpace} className="dark:bg-gray-600 dark:border dark:border-gray-400 rounded-lg">
                                    {details.id === null && (
                                        <option value="">Select Space</option>
                                    )}
                                    {spaces.map((item) => (
                                        <option key={"space-"+item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            </div>
                        </div>

                        <div className="content-body mx-1 md:mx-4">
                            <div className="relative sm:rounded-lg mb-2">
                                <div className="md:min-h-[320px] lg:min-hh-[320px] xl:min-hh-[320px] xxl:min-hh-[320px]">
                                    {details.id !== null ? (
                                        isScanning ? (
                                            <>
                                                <div className="col-span-4 mx-2 mb-2">
                                                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="name" 
                                                        value={details.name}  
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Name"
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="w-full h-full flex justify-center">
                                                    <div className=" w-full md:w-full lg:w-1/2 xl:w-1/2 xxl:w-1/2 mt-2 m-1 ">
                                                        <QRScanner
                                                            ref={scannerRef}
                                                            onScanSuccess={(data) => HandleDecodedQRCode(data)}
                                                            // onScanError={(err) => console.error(err)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full grid mb-2 md:grid-cols-4">
                                                <div className="col-span-4 mx-2 mb-2">
                                                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="name" 
                                                        value={details.name}  
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Name"
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-2 md:mr-1 md:ml-2 lg:mr-1 lg:ml-2 xl:mr-1 xl:ml-2 xxl:mr-1 xxl:ml-2 mb-2">
                                                    <label htmlFor="cr_file_number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Rules
                                                    </label>
                                                    <textarea 
                                                        type="text" 
                                                        id="rules" 
                                                        value={details.rules}   
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="rules"  
                                                        readOnly
                                                        rows="5"

                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-2 md:mr-2 md:ml-0 lg:mr-2 lg:ml-0 xl:mr-2 xl:ml-0 xxl:mr-2 xxl:ml-0 mb-2">
                                                    <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Description
                                                    </label>
                                                    <textarea 
                                                        type="text" 
                                                        id="description" 
                                                        value={details.description}   
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Description" 
                                                        readOnly
                                                        rows="5"
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2  lg:col-span-2 xl:col-span-2 mx-2 md:mr-1 md:ml-2 lg:mr-1 lg:ml-2 xl:mr-1 xl:ml-2 xxl:mr-1 xxl:ml-2 mb-2">
                                                    <label htmlFor="location_lat" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Latitude
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="location_lat" 
                                                        value={details.location_lat}   
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Latitude ... " 
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 mx-2 md:mr-2 md:ml-0 lg:mr-2 lg:ml-0 xl:mr-2 xl:ml-0 xxl:mr-2 xxl:ml-0 mb-2">
                                                    <label htmlFor="location_long" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                                        Logitude
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id="location_long" 
                                                        value={details.location_long}   
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Latitude ... " 
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <h4 className='font-semibold flex items-center justify-center h-full'>No Space Selected</h4>
                                    )}
                                </div>
                                    <div className="flex justify-center mx-4 mb-5">
                                        {details.id !== null ? (
                                            isScanning ? (
                                                <>
                                                    <button
                                                        onClick={() => CloseScanner()}
                                                        className="bg-gray-600 text-white px-4 py-2 rounded"
                                                        id="closeScannerButtonId"
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
                                                <>
                                                </>
                                            // <button className="bg-green-500 px-3 py-2 rounded-lg ">
                                            //     Select Vehicle
                                            // </button>
                                        )}
                                    </div>
                            </div>
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
}
