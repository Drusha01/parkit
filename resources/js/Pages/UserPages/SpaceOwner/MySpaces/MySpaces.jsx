import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage} from '@inertiajs/react'
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import DeleteModal from '../../../../Components/Modals/DeleteModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';
import LocationModal from './Modals/LocationModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';

export default function MySpaces() {

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const contentFileRef = useRef(null);

    const [files,setFiles] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewLocModalOpen, setIsViewLocModalOpen] = useState(false);
    const [isLocationEditable, setLocationEditable] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isViewContentModalOpen, setIsViewContentModalOpen] = useState(false);
    const [isViewAllotmentModalOpen, setIsViewAllotmentModalOpen] = useState(false);
    const [isViewQrModalOpen, setIsViewQrModalOpen] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const openViewLocModal = () => setIsViewLocModalOpen(true);
    const closeViewLocModal = () => setIsViewLocModalOpen(false);
    const openViewQrModal = () => setIsViewQrModalOpen(true);
    const closeViewQrModal = () => setIsViewQrModalOpen(false);

    const openViewContentModal = () => setIsViewContentModalOpen(true);
    const closeViewContentModal = () => setIsViewContentModalOpen(false);
    const openViewAllotmentModal = () => setIsViewAllotmentModalOpen(true);
    const closeViewAllotmentModal = () => setIsViewAllotmentModalOpen(false);

    
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    });

    function handleContentChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setContent(content => ({
            ...content,
            [key]: value,
        }))
    }

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
    }, [content.page]);

    const GetData = ()=>{
        axios.post( "/spaceowner/spaces/all" , {  
            rows: content.rows,
            search: content.search,
            page: content.page,
        })
        .then(res => {
            setContent((prevContent) => ({
                ...prevContent,
                data: res.data.data,
                total:res.data.total,
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
        axios.get( "/spaceowner/spaces/view/"+id )
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
    const HandleDelete = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "/spaceowner/spaces/delete" , {  
            id: details.id,
        })
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully deleted!",
                    showConfirmButton: false,
                    timer: 1000
                });
                closeDeleteModal();
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


    const HandleViewModal = (id, ModalFunc) => {
        HandleGetDetails(id, ModalFunc);
    };

   

    // ---------------------------------- Location ---------------------------------
    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, 
                center: [
                    details.location_long,
                    details.location_lat],
                zoom: 16,
                scrollZoom: isLocationEditable,
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
    }, [openViewLocModal]); 

    const EditableLocation = () => setLocationEditable(prevState => !prevState);

    const SaveLocation = () =>{
        const center = mapRef.current.getCenter();
        axios.post(`/spaceowner/spaces/save_location`, { 
            space_id:details.id,
            location_long:center.lng,
            location_lat:center.lat,
        })
        .then(res => {

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
        HandleGetDetails(details.id,EditableLocation);
    }
    // ---------------------------------- Location ---------------------------------

    // ---------------------------------- Image ---------------------------------

    const [contentFiles,setContentFiles] = useState([]);
    const getSpaceContentImage = (id,ModalFunc) =>{
        axios.get(`/spaceowner/spaces/content/all/`+id, {  
        })
        .then(res => {
            HandleGetDetails(id,ModalFunc)
            setFiles(
                res.data.space_pictures
            )
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

    const handleDeleteImage = (space_id,id) => {
        axios.post(`/spaceowner/spaces/content/delete`, { 
            id:id,
            space_id:space_id
        })
        .then(res => {
            getSpaceContentImage(space_id,openViewContentModal);
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

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setContentFiles(
            Array.from(event.target.files)
        );
    }

    const handleSaveContentFiles = (space_id) => {
        if (contentFiles.length <= 0) {
            return;
        }
        const formData = new FormData();
        contentFiles.forEach((file, index) => {
            formData.append('files[]', file); // Use `files[]` to send as an array
        });
        formData.append('space_id', space_id);
        axios.post(`/spaceowner/spaces/content/add`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            setContentFiles([]);
            contentFileRef.current.value = "";
            getSpaceContentImage(space_id,openViewContentModal);
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
    // ---------------------------------- Image ---------------------------------
    // ---------------------------------- Allotments ---------------------------------
    const [contentAllotments,setContentAllotments] = useState([]);
    const getAllotments = (id,ModalFunc) =>{
        axios.get(`/spaceowner/spaces/allotments/all/`+id, {  
        })
        .then(res => {
            HandleGetDetails(id,ModalFunc)
            setContentAllotments(
                res.data.space_allotments
            )
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
    // ---------------------------------- Allotments ---------------------------------
   
    return (
        <>
            <SpaceOwnerLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">Home</Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8" viewBox="0 0 512 512">
                                    <g><path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path></g>
                                </svg>
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces">Spaces</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className=" flex justify-between">
                        <div className="m-5 text-lg font-semibold">
                            My Spaces
                        </div>
                     
                    </div>

                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="max-w-md flex">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <HeaderSearch Id={'search'} onChangeFunc={handleContentChange} value={content.search}/>
                                </div>
                            </div>
                            <div className="flex justify-end h-16">
                                <Link type="button" href='/spaceowner/spaces/add' className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Add
                                </Link>
                            </div>
                        </div>

                        <div className="content-body mx-1 md:mx-4">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2 dark:border dark:border-white">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-200 dark:text-black">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-2 py-3">Space Name</th>
                                            <th scope="col" className="py-3 hidden xl:table-cell">Rules</th>
                                            <th scope="col" className="py-3 hidden lg:table-cell">Location</th>
                                            <th scope="col" className="py-3 hidden lg:table-cell text-center">Approval Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content.data.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-1 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <th scope="row" className="pl-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.name}
                                                    </th>
                                                    <td className="py-4 hidden xl:table-cell">{item.rules}</td>
                                                    <td className="py-4 hidden lg:table-cell">{`Lat: ${item.location_lat}, Long: ${item.location_long}`}</td>
                                                    <td className="py-4 text-center hidden lg:table-cell">
                                                        <span className={`inline-block px-3 py-1 text-sm font-medium text-white rounded-full ${
                                                            item.status_name === "Pending" ? "bg-blue-500" : 
                                                            item.status_name === "Active" ? "bg-green-500" : 
                                                            item.status_name === "Deactivated" ? "bg-red-500" : 
                                                            item.status_name === "Suspended" ? "bg-gray-700" : 
                                                            "bg-gray-500"
                                                        }`}>
                                                            {item.status_name}
                                                        </span>
                                                    </td>
                                                    <td className="text-center flex justify-center gap-1 mt-2">
                                                        { item.status_name === 'Active' && (
                                                            <button onClick={() => HandleGetDetails(item.id, openViewQrModal)} className=" hidden md:block text-center focus:outline-none bg-white dark:bg-transparent dark:text-white dark:border-white  text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2">
                                                                QR
                                                            </button>
                                                        )}
                                                        <button onClick={() => HandleViewModal(item.id, openViewLocModal)} className="hidden xl:block focus:outline-2 text-black dark:text-white dark:border-white  border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            View
                                                        </button>
                                                        <button onClick={() => getSpaceContentImage(item.id, openViewContentModal)} className="hidden xl:block focus:outline-2 text-black dark:text-white dark:border-white  border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            Images
                                                        </button>
                                                        <button onClick={() => getAllotments(item.id, openViewAllotmentModal)} className="hidden xl:block focus:outline-2 text-black dark:text-white dark:border-white border border-black hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            Allotments
                                                        </button>
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm">
                                                            <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button>
                                                        <Link href={`/spaceowner/spaces/edit/${item.id}`} className="focus:outline-2  border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 border-green-700 bg-white text-green-700  font-medium rounded-lg text-sm">
                                                            <svg viewBox="0 0 24 24"  className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="currentColor"></path> </g></svg>
                                                        </Link>
                                                        {!item.is_approved && (
                                                            <button onClick={() => HandleGetDetails(item.id, openDeleteModal)} className="focus:outline-2  border hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-600 border-red-700 bg-white text-red-700  font-medium rounded-lg text-sm">
                                                                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                            </button>
                                                        )}
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
                        <div className="content-footer mx-5 text-black">
                            <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandlePrevPage} NextPageFunc={HandleNextPage} />
                        </div>
                        <div>
                            <DeleteModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} FuncCall={HandleDelete} title="Delete space">
                                <div className="text-center mt-5 text-red-600">Are you sure you want to delete this?</div>
                            </DeleteModal>
                            <ViewModal isOpen={isViewLocModalOpen} closeModal={closeViewLocModal} title="View Location">
                                <div className="flex justify-end">
                                    {!isLocationEditable ?  
                                        <button className="text-white py-2 px-3 rounded-md bg-green-600" onClick={EditableLocation}> Edit</button>
                                    :
                                        <button className="text-white py-2 px-3 rounded-md bg-green-600" onClick={SaveLocation}> Save</button>
                                    }
                                       
                                </div>
                                <div className="col-span-4 mx-2 md:mx-5 mt-3">
                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking location  <span className="text-red-600">*</span></label>
                                    <div className="h-96 bg-gray-200 rounded-lg relative">
                                    {isLocationEditable && (
                                        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-10 z-10" width="40px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" fill="#8a0000"></path>
                                            </g>
                                        </svg>
                                    )}
                                        <div
                                            style={{ height: '100%' }}
                                            ref={mapContainerRef}
                                            className="map-container"
                                        />
                                    </div>
                                </div>
                            </ViewModal>
                            <ViewModal isOpen={isViewContentModalOpen} closeModal={closeViewContentModal} title="View Space Contents">
                                <div className="flex">
                                    <div className="w-full mb-2 flex mx-5">
                                        <div className="w-full">
                                            <label for="files" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space pictures  <span className="text-red-600">*</span></label>
                                            <input  onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                ref={contentFileRef} id="files" name='files' accept="image/*" multiple type="file"  />
                                        </div>
                                        <button className="mt-5 ml-1 text-white bg-green-600 px-3 py-2.5 rounded-md" onClick={() => handleSaveContentFiles(details.id)}>Add</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 overflow-auto max-h-[600px] justify-items-center">
                                    {files.map((item, index) => (
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
                            </ViewModal>
                            <ViewModal isOpen={isViewAllotmentModalOpen} closeModal={closeViewAllotmentModal} title="View Vehicle Allotments">
                                <div className="flex justify-end">
                                    <button type="button" className=" my-2 mx-4 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-v-800">Add</button>
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
                                                    # of Vehicles
                                                </th>
                                                <th scope="col" className="py-3">
                                                    Duration Fee
                                                </th>
                                                <th scope="col" className="py-3">
                                                    Duration
                                                </th>
                                                <th scope="col" className="py-3">
                                                    Flat Rate Fee
                                                </th>
                                                <th scope="col" className="py-3">
                                                    Flat Rate Duration
                                                </th>
                                                <th scope="col" className="py-3 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                contentAllotments.length > 0 ? (
                                                    contentAllotments.map((item, index) => (
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
                                                            <td className="text-center">
                                                                <button type="button" onClick={() => HandleGetVehicleAllotment(index,openEditModal)} className="mx-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                                                <button type="button" onClick={() => deleteVehicleAllotment(index)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="40" className="text-center py-4 text-gray-500">No vehicle allotments found.</td>
                                                    </tr>
                                                )
                                            }

                                            
                                        </tbody>
                                    </table>
                                </div>
                            </ViewModal>
                            <ViewModal isOpen={isViewQrModalOpen} closeModal={closeViewQrModal}  Size={"w-3/5"} title="View QR code" className="text-black">
                                <div className="flex justify-center">
                                    <img src={`/spaceowner/spaces/qr/${details.id}`} alt="QR Code" />
                                </div>

                                <div className="flex justify-center mt-4">
                                    <a
                                        href={`/spaceowner/spaces/qr/${details.id}`}
                                        download={`vehicle-${details.id}-qr.png`}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Download QR Code
                                    </a>
                                </div>
                            </ViewModal>
                            
                            <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="Parking Space Details" Size={'w-full mx-1 md:w-8/12 md:h-[660]'} Height={'max-h-[500px]'}>
                                <div className="w-full grid mb-2 grid-cols-4">
                                    <div className="col-span-4 mt-3">
                                        <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space name  </label>
                                        <input type="text" id="name" value={details.name}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Space name" 
                                            required />
                                    </div>
                                    <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                        <label for="rules" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rules </label>
                                        <textarea id="rules" rows="4"  value={details.rules}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Space rules ..."
                                            required></textarea>
                                    </div>
                                    <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                        <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea id="description" rows="4"  value={details.description}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="Space description ..."
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <label for="message" class="my-10 block mb-1 text-sm font-medium text-gray-900 dark:text-white">QR Code</label>
                                <div className="flex justify-center">
                                    <img src={`/spaceowner/spaces/qr/${details.id}`} alt="QR Code" />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <a
                                        href={`/spaceowner/spaces/qr/${details.id}`}
                                        download={`vehicle-${details.id}-qr.png`}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Download QR Code
                                    </a>
                                </div>
                                <div className="col-span-4 mt-3">
                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking location  </label>
                                    <div className="h-96 bg-gray-200 rounded-lg relative">
                                        <div
                                            style={{ height: '100%' }}
                                            ref={mapContainerRef}
                                            className="map-container"
                                        />
                                    </div>
                                </div>
                                <label for="message" class="mt-10 block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking Space Images</label>
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
                                <label for="message" class="mt-10 block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle Allotments</label>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
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
                            </ViewModal>
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    );
}
