import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import ActivateModal from '../../../../Components/Modals/ActivateModal';
import DeactivateModal from '../../../../Components/Modals/DeactivateModal';
import EditModal from '../../../../Components/Modals/EditModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Spaces(props) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const contentFileRef = useRef(null);

    const [status,setStatus] = useState(props.status);
    const [content,setContent] = useState({
        filter:{
            status_id:null,
            statuses:[],
        },
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });
    const [details,SetDetails] = useState({
        id:null,
        status_id:null,
        name:null,
        rules:null,
        description:null,
        location_long:null,
        location_lat:null,
        files:[],
        allotments:[],
    });

    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openActivateModal = () => setIsActivateModalOpen(true);
    const closeActivateModal = () => setIsActivateModalOpen(false);
    const openDeactivateModal = () => setIsDeactivateModalOpen(true);
    const closeDeactivateModal = () => setIsDeactivateModalOpen(false);
    
    const handleContentChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setContent(content => ({
            ...content,
            [key]: value,
        }))
    }
    const HandleContentFilterChange = (e)=> {
        const key = e.target.id;
        const value = e.target.value;
    
        setContent(content => ({
            ...content,
            filter: {
                ...content.filter, 
                [key]: value, 
            }
        }));
        clearStatuses();
        if (e.target.value) {
            addStatus(e.target.value);
        }
    }   

    const addStatus = (newStatus) => {
        setContent((prevContent) => ({
            ...prevContent,
            filter: {
                ...prevContent.filter,
                statuses: [...prevContent.filter.statuses, newStatus], 
            },
        }));
    };
    const clearStatuses = () => {
        setContent((prevContent) => ({
            ...prevContent,
            filter: {
                ...prevContent.filter,
                statuses: [],
            },
        }));
    };

    const HandleNextPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page+1,
        }));
    }
    const HandlePrevPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page-1,
        }));
    }

    
    useEffect(() => {
        GetData();
    }, []);
    
    useEffect(() => {
        if (content.page !== null) GetData();
    }, [content.page]);
    
    useEffect(() => {
        if (content.filter.status_id !== null) GetData();
    }, [content.filter.status_id]);
    
    useEffect(() => {
        if (content.search !== null) GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "/admin/spaces/all" , {  
            filter:content.filter,
            rows: content.rows,
            search: content.search,
            page: content.page,
        })
        .then(res => {
            setContent((prevContent) => ({
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

    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/admin/spaces/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            const files = JSON.parse(res.data.space_pictures)
            const allotments = JSON.parse(res.data.allotments)
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                status_id:detail.status,
                name:detail.name,
                rules:detail.rules,
                description:detail.description,
                location_long:detail.location_long,
                location_lat:detail.location_lat,
                files:files,
                allotments:allotments,
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

      
    const HandleModifyStatus = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/spaces/modify_status" , {  
            id: details.id,
            status_id: details.status_id,
        })
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully updated!",
                    showConfirmButton: false,
                    timer: 1000
                });
                closeEditModal();
                GetData();
            } 
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

    const HandleModify = (e) =>{
        const key = e.target.id;
        const value = e.target.value
        SetDetails({
            ...details,
            [key]: value,
        })
    }
    // ----------------------------------- location -------------------------------------------

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, 
                center: [
                    details.location_long,
                    details.location_lat],
                zoom: 16,
                scrollZoom: true,
                dragPan: false 
            });
            new mapboxgl.Marker({
                color: 'red' 
            })
            .setLngLat([ 
                details.location_long,
                details.location_lat]) 
            .addTo(mapRef.current);
        }
    }, [openViewModal]); 

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, 
                center: [
                    details.location_long,
                    details.location_lat],
                zoom: 16,
                scrollZoom: true,
                dragPan: false   
            });
            new mapboxgl.Marker({
                color: 'red' 
            })
            .setLngLat([ 
                details.location_long,
                details.location_lat]) 
            .addTo(mapRef.current);
        }
    }, [isEditModalOpen]); 

    // ----------------------------------- location -------------------------------------------
    return (
        <>
            <AdminLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 ml-2 ">
                        <li className="flex align-middle font-semibold text-md ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-md ml-1">
                                <Link href="/admin/spaces">
                                    Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="max-w-sm flex-none md:flex flex-wrap md:flex-nowrap">
                                <label htmlFor="default-search" className="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <HeaderSearch Id={'search'} onChangeFunc={handleContentChange} value={content.search}/>
                                </div>
                                <select name="" value={content.filter.status_id} onChange={HandleContentFilterChange} 
                                    className="rounded h-9 w-auto m-0 md:mx-2 mt-1 md:mt-0 text-black dark:text-white dark:bg-gray-900 border-gray-600 text-left flex items-center leading-tight py-1"  id="status_id">
                                    <option value="">All</option>
                                    {status.map((item) => (
                                        <option key={"status-"+item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end h-16">
                                
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-1 md:mx-4 mb-2 dark:border dark:border-gray-700">
                                <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-600 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="hidden md:table-cell pl-5 py-3">Owner</th>
                                            <th scope="col" className="py-3">Space Name</th>
                                            <th scope="col" className="hidden xl:table-cell py-3 text-start">Longitude</th>
                                            <th scope="col" className="hidden xl:table-cell py-3 text-start">Latitude</th>
                                            <th scope="col" className="hidden md:table-cell py-3 text-center">Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <th scope="row" className="hidden md:table-cell pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.full_name}
                                                    </th>
                                                    <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.name}
                                                    </th>
                                                    <td scope="row" className="hidden xl:table-cell  py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.location_long}
                                                    </td>
                                                    <td scope="row" className="hidden xl:table-cell py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.location_lat}
                                                    </td>
                                                    <td className="py-4 text-center hidden md:table-cell">
                                                        <span className={`inline-block px-3 py-1 text-md font-medium text-white rounded-full ${
                                                            item.status_name === "Pending" ? "bg-blue-500" : 
                                                            item.status_name === "Active" ? "bg-green-500" : 
                                                            item.status_name === "Deactivated" ? "bg-red-500" : 
                                                            item.status_name === "Suspended" ? "bg-gray-700" : 
                                                            "bg-gray-500"
                                                        }`}>
                                                            {item.status_name}
                                                        </span>
                                                    </td>
                                                    <td className="text-center flex justify-center gap-2 mt-2 mx-1 md:mx-4">
                                                        {/* <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md">
                                                            <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button> */}
                                                        <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md">
                                                            <svg viewBox="0 0 48 48" className="text-black h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 0h48v48H0z" fill="none"></path> <g id="Shopicon"> <path d="M8.706,37.027c2.363-0.585,4.798-1.243,6.545-1.243c0.683,0,1.261,0.101,1.688,0.345c1.474,0.845,2.318,4.268,3.245,7.502 C21.421,43.866,22.694,44,24,44c1.306,0,2.579-0.134,3.816-0.368c0.926-3.234,1.771-6.657,3.244-7.501 c0.427-0.245,1.005-0.345,1.688-0.345c1.747,0,4.183,0.658,6.545,1.243c1.605-1.848,2.865-3.99,3.706-6.333 c-2.344-2.406-4.872-4.891-4.872-6.694c0-1.804,2.528-4.288,4.872-6.694c-0.841-2.343-2.101-4.485-3.706-6.333 c-2.363,0.585-4.798,1.243-6.545,1.243c-0.683,0-1.261-0.101-1.688-0.345c-1.474-0.845-2.318-4.268-3.245-7.502 C26.579,4.134,25.306,4,24,4c-1.306,0-2.579,0.134-3.816,0.368c-0.926,3.234-1.771,6.657-3.245,7.501 c-0.427,0.245-1.005,0.345-1.688,0.345c-1.747,0-4.183-0.658-6.545-1.243C7.101,12.821,5.841,14.962,5,17.306 C7.344,19.712,9.872,22.196,9.872,24c0,1.804-2.527,4.288-4.872,6.694C5.841,33.037,7.101,35.179,8.706,37.027z M18,24 c0-3.314,2.686-6,6-6s6,2.686,6,6s-2.686,6-6,6S18,27.314,18,24z"></path> </g> </g></svg>
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
                        <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandlePrevPage} NextPageFunc={HandleNextPage} />
                    </div>
                    <div>
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="Vehicle Details" Size={'w-full mx-2 md:w-8/12 '}>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-md font-medium text-gray-900 dark:text-white ">Full name </label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.full_name}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-md font-medium text-gray-900 dark:text-white ">Plate #</label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.cr_plate_number}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-md font-medium text-gray-900 dark:text-white ">MV File #</label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.cr_file_number}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-md font-medium text-gray-900 dark:text-white ">Vehicle Type</label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.vehicle_type_name}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-md font-medium text-gray-900 dark:text-white ">Status</label>
                                    <span className={`inline-block px-3 py-1 text-md font-medium text-white rounded-full ${
                                            details.status_name === "Pending" ? "bg-blue-500" : 
                                            details.status_name === "Active" ? "bg-green-500" : 
                                            details.status_name === "Deactivated" ? "bg-red-500" : 
                                            details.status_name === "Suspended" ? "bg-gray-700" : 
                                            "bg-gray-500"
                                        }`}>
                                            {details.status_name}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full mb-2 ">
                                <label for="icon" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Front Side of Vehicle  </label>
                                <div className="flex justify-center">
                                    {details.front_side_picture ? (
                                        <a href={"/files/vehicle/front_side_picture/"+details.front_side_picture} target='blank'>
                                            <img 
                                                src={"/files/vehicle/front_side_picture/"+details.front_side_picture} 
                                                className="w-10/12 mx-auto"
                                                alt={details.full_name}
                                            />
                                        </a>
                                    ):(
                                        <>
                                            <svg fill="currentColor"  width="200" height="200" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256.001,0L0.009,95.939V512h77.323h76.831h203.674h76.831h77.323V95.939L256.001,0z M123.747,481.584h-15.999v-48.869 h15.999V481.584z M357.837,481.584H154.163v-48.869h203.674V481.584z M404.252,481.584h-15.999v-48.869h15.999V481.584z M357.837,402.299H154.163H77.332H76.74v-17.236h358.52v17.236h-0.592H357.837z M253.614,240.802h-78.657l83.429-83.429h78.657 L253.614,240.802z M369.42,168.01l12.965,72.792h-85.757L369.42,168.01z M131.942,240.802h-2.327l14.861-83.429h70.896 L131.942,240.802z M399.944,271.218c11.49,0,20.839,9.349,20.839,20.839v62.59h-88.737v-63.152H301.63v63.152h-30.42v-63.152 h-30.416v63.152h-30.42v-63.152h-30.416v63.152H91.219v-62.59c0-11.49,9.348-20.839,20.839-20.839H399.944z M481.575,481.584 L481.575,481.584h-46.907v-48.869h31.008v-78.068h-14.478v-62.59c0-23.528-15.941-43.391-37.585-49.389l-20.611-115.711H118.998 l-20.611,115.71c-21.644,5.999-37.584,25.862-37.584,49.389v62.59H46.324v78.068h31.008v48.869H30.425V117.022l225.575-84.541 l225.574,84.541V481.584z"></path> </g> </g> <g> <g> <circle cx="130.283" cy="312.931" r="18.822"></circle> </g> </g> <g> <g> <circle cx="381.723" cy="312.931" r="18.822"></circle> </g> </g> </g></svg>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="w-full mb-2 ">
                                <label for="icon" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Picture of License  </label>
                                <div className="flex justify-center">
                                    {details.back_side_picture ? (
                                        <a href={"/files/vehicle/back_side_picture/"+details.back_side_picture} target='blank'>
                                            <img 
                                                src={"/files/vehicle/back_side_picture/"+details.back_side_picture} 
                                                className="w-10/12 mx-auto"
                                                alt={details.full_name}
                                            />
                                        </a>
                                    ):(
                                        <>
                                            <svg fill="currentColor"  width="200" height="200" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256.001,0L0.009,95.939V512h77.323h76.831h203.674h76.831h77.323V95.939L256.001,0z M123.747,481.584h-15.999v-48.869 h15.999V481.584z M357.837,481.584H154.163v-48.869h203.674V481.584z M404.252,481.584h-15.999v-48.869h15.999V481.584z M357.837,402.299H154.163H77.332H76.74v-17.236h358.52v17.236h-0.592H357.837z M253.614,240.802h-78.657l83.429-83.429h78.657 L253.614,240.802z M369.42,168.01l12.965,72.792h-85.757L369.42,168.01z M131.942,240.802h-2.327l14.861-83.429h70.896 L131.942,240.802z M399.944,271.218c11.49,0,20.839,9.349,20.839,20.839v62.59h-88.737v-63.152H301.63v63.152h-30.42v-63.152 h-30.416v63.152h-30.42v-63.152h-30.416v63.152H91.219v-62.59c0-11.49,9.348-20.839,20.839-20.839H399.944z M481.575,481.584 L481.575,481.584h-46.907v-48.869h31.008v-78.068h-14.478v-62.59c0-23.528-15.941-43.391-37.585-49.389l-20.611-115.711H118.998 l-20.611,115.71c-21.644,5.999-37.584,25.862-37.584,49.389v62.59H46.324v78.068h31.008v48.869H30.425V117.022l225.575-84.541 l225.574,84.541V481.584z"></path> </g> </g> <g> <g> <circle cx="130.283" cy="312.931" r="18.822"></circle> </g> </g> <g> <g> <circle cx="381.723" cy="312.931" r="18.822"></circle> </g> </g> </g></svg>
                                        </>
                                    )}
                                </div>
                            </div>
                        </ViewModal>
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleModifyStatus} title="Parking Space Details" Size={'w-full mx-1 md:w-8/12 md:h-[660]'} Height={'max-h-[500px]'} >
                            <div className="w-full grid mb-2 grid-cols-4">
                                <div className="col-span-4 mt-3">
                                    <label for="name" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Space name  </label>
                                    <input type="text" id="name" value={details.name}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space name" 
                                        required />
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                    <label for="rules" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Rules </label>
                                    <textarea id="rules" rows="4"  value={details.rules}  className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space rules ..."
                                        required></textarea>
                                </div>
                                <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                    <label for="description" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" rows="4"  value={details.description}  className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Space description ..."
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-span-4 mt-3">
                                <label for="message" class="block mb-1 text-md font-medium text-gray-900 dark:text-white">Parking location  </label>
                                <div className="h-96 bg-gray-200 rounded-lg relative">
                                    <div
                                        style={{ height: '100%' }}
                                        ref={mapContainerRef}
                                        className="map-container"
                                    />
                                </div>
                            </div>
                            <label for="message" class="mt-10 block mb-1 text-md font-medium text-gray-900 dark:text-white">Parking Space Images</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  overflow-auto max-h-[600px] justify-items-center">
                                {details.files.map((item, index) => (
                                    <div className="relative h-40 w-full">
                                        <a href={"/files/space_content/"+item.content} target="blank">
                                            <img
                                                key={item.id}
                                                className="h-full w-full object-cover rounded-lg border border-black"
                                                src={"/files/space_content/"+item.content}
                                                alt={`Preview ${index}`}
                                            />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(details.id,item.id)}
                                            className="absolute top-2 right-2 bg-red-700 border-red-700 border text-white shadow-lg py-2 px-4 rounded hover:bg-red-600 hover:opacity-100 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label for="message" class="mt-10 block mb-1 text-md font-medium text-gray-900 dark:text-white">Vehicle Allotments</label>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                    <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="pl-5 py-3">
                                                #
                                            </th>
                                            <th scope="col" className="py-3">
                                                V-Type
                                            </th>
                                            <th scope="col" className="py-3">
                                                R-Type
                                            </th>
                                            <th scope="col" className="py-3">
                                                Allotment
                                            </th>
                                            <th scope="col" className="py-3">
                                                Fee
                                            </th>
                                            <th scope="col" className="py-3">
                                                Duration
                                            </th>
                                            <th scope="col" className="py-3">
                                                Flat rate Fee
                                            </th>
                                            <th scope="col" className="py-3">
                                                Flat rate Duration
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details.allotments.length > 0 ? (
                                            details.allotments.map((item, index) => (
                                                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {index + 1}
                                                    </th>
                                                    <td className="py-4">
                                                    {item.vehicle_type + " - " +item.vehicle_name}
                                                    </td>
                                                    <td className="py-4">
                                                        {item.rent_rate_name}
                                                    </td>
                                                    <td className="py-4">
                                                        {item.vehicle_count}
                                                    </td>
                                                    <td className="py-4">
                                                        {Number(item.rent_duration_rate)}
                                                    </td>
                                                    <td className="py-4">
                                                        {Number(item.rent_duration/60/60)} hours
                                                    </td>
                                                    <td className="py-4">
                                                        PHP {Number(item.rent_flat_rate)}
                                                    </td>
                                                    <td className="py-4">
                                                        {Number(item.rent_flat_rate_duration/60/60)} hours
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="40" className="text-center py-4 text-gray-500">No vehicle allotments found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pt-4 bg-white dark:bg-gray-800 sticky bottom-0 m-0 p-0">
                                <div className="w-full ">
                                    <label for="icon" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Status  </label>
                                    <div className="flex justify-end">
                                        <select name="" value={details.status_id} onChange={HandleModify} id="status_id"
                                            className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                            {status.map((item) => (
                                                <option key={"status-"+item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </EditModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }