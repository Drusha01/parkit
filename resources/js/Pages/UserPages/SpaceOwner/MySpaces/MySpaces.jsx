import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import DeleteModal from '../../../../Components/Modals/DeleteModal';
import ViewModal from '../../../../Components/Modals/ViewModal';

export default function MySpaces() {

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [files,setFiles] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewLocModalOpen, setIsViewLocModalOpen] = useState(false);
    const [isViewContentModalOpen, setIsViewContentModalOpen] = useState(false);
    const [isViewAllotmentModalOpen, setIsViewAllotmentModalOpen] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const openViewLocModal = () => setIsViewLocModalOpen(true);
    const closeViewLocModal = () => setIsViewLocModalOpen(false);
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


    const [details,SetDetails] = useState({
        id:null,
        name:null,
        area_m2:null,
        rules:null,
        description:null,
        location_long:null,
        location_lat:null,
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
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                name:detail.name,
                area_m2:detail.area_m2,
                rules:detail.rules,
                description:detail.description,
                location_long:detail.location_long,
                location_lat:detail.location_lat,
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

    const getSpaceContentImage = (id,ModalFunc) =>{
        axios.get(`/spaceowner/spaces/content/all/`+id, {  
        })
        .then(res => {
            setFiles(
                res.data.space_pictures
            )
            ModalFunc();
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

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZHJ1c2hhMDEiLCJhIjoiY20zdTgza2QwMGkwdDJrb2JiYWtrdDU3aiJ9.8UB0zgcqAeo9BUF7y3Xr-w';
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current, 
                center: [
                    details.location_long,
                    details.location_lat],
                zoom: 16,
                scrollZoom: false,
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

   
    return (
        <>
            <SpaceOwnerLayout>
                <main className="text-white">
                    <nav className="border border-gray-200">
                        <ul className="flex py-2 text-black ml-2">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">Home</Link>
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8" viewBox="0 0 512 512">
                                    <g><path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path></g>
                                </svg>
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces">Spaces</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="w-50 text-black flex justify-between">
                        <div className="m-5 text-lg font-semibold">
                            My Spaces
                        </div>
                        <Link type="button" href='/spaceowner/spaces/add' className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Add
                        </Link>
                    </div>

                    <div className="content">
                        <div className="content-header w-full my-2">
                            <div className="ml-5 max-w-sm">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." />
                                </div>
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-5 py-3">Space Name</th>
                                            <th scope="col" className="py-3">Rules</th>
                                            <th scope="col" className="py-3">Area (m²)</th>
                                            <th scope="col" className="py-3">Location</th>
                                            <th scope="col" className="py-3 text-center">Approval Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content.data.map((space,index) => (
                                            <tr key={space.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <td className="px-4 py-2 border-b text-center">{index+1 + (content.page - 1) * content.rows}</td>
                                                <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {space.name}
                                                </th>
                                                <td className="py-4">{space.rules}</td>
                                                <td className="py-4">{space.area_m2}</td>
                                                <td className="py-4">{`Lat: ${space.location_lat}, Long: ${space.location_long}`}</td>
                                                <td className="py-4 text-center">
                                                    {space.is_approved == 1 && (
                                                        <span class="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                                                            Pending
                                                        </span>
                                                    )}
                                                   {space.is_approved == 0 && (
                                                        <span class="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                                                            New
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="text-center flex justify-center gap-2 mt-2">
                                                    <button onClick={() => HandleViewModal(space.id,openViewLocModal)} className="focus:outline-2 text-black border border-black  hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 ">
                                                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </button>
                                                    <button onClick={() => getSpaceContentImage(space.id,openViewContentModal)}  className="focus:outline-2 text-black border border-black  hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 ">
                                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </button>
                                                    <button href={`/spaceowner/spaces/edit/${space.id}`} className="focus:outline-2 text-black border border-black  hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 ">
                                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12H21.9282M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M14 5V12M8 5V12M4 17C2.89543 17 2 16.1046 2 15V8.2C2 7.0799 2 6.51984 2.21799 6.09202C2.40973 5.71569 2.71569 5.40973 3.09202 5.21799C3.51984 5 4.0799 5 5.2 5H16.143C16.8193 5 17.1575 5 17.4599 5.09871C17.7275 5.18605 17.9737 5.32889 18.1822 5.51789C18.418 5.7315 18.5858 6.02512 18.9213 6.61236L21.5784 11.2622C21.7354 11.5369 21.8139 11.6744 21.8694 11.8202C21.9186 11.9497 21.9543 12.084 21.9758 12.2209C22 12.3751 22 12.5333 22 12.8498V15C22 16.1046 21.1046 17 20 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </button>
                                                    <Link  href={`/spaceowner/spaces/edit/${space.id}`} className="text-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                        Edit
                                                    </Link>
                                                    {!space.is_approved == 1 && (
                                                        <button onClick={() => HandleGetDetails(space.id,openDeleteModal)} href={`/spaceowner/spaces/delete/${space.id}`} className="text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="content-footer mx-5 text-black">
                            <div className="flex justify-center gap-2">
                                <button className="py-2 px-2.5 border border-black rounded-lg hover:bg-gray-200" >
                                    Prev
                                </button>
                                <button className="py-2 px-2.5 border border-black rounded-lg hover:bg-gray-200" >
                                    Next
                                </button>
                            </div>
                        </div>
                        <div>
                            <DeleteModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} FuncCall={HandleDelete} title="Delete space">
                                <div className="text-center mt-5 text-red-600">Are you sure you want to delete this?</div>
                            </DeleteModal>
                            <ViewModal isOpen={isViewLocModalOpen} closeModal={closeViewLocModal} title="View Location">
                                <div className="col-span-4 mx-2 md:mx-5 mt-3">
                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking location  <span className="text-red-600">*</span></label>
                                    <div className="h-96 bg-gray-200 rounded-lg relative">
                                        <div
                                            style={{ height: '100%' }}
                                            ref={mapContainerRef}
                                            className="map-container"
                                        />
                                    </div>
                                </div>
                            </ViewModal>
                            <ViewModal isOpen={isViewContentModalOpen} closeModal={closeViewContentModal} title="View Space Contents">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 overflow-auto max-h-[600px] justify-items-center">
                                    {files.map((item, index) => (
                                        <div className="relative h-40 w-full">
                                            <img
                                                key={item.id}
                                                className="h-full w-full object-cover rounded-lg border border-black"
                                                src={"/files/space_content/"+item.content}
                                                alt={`Preview ${index}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(item.id)}
                                                className="absolute top-2 right-2 bg-red-700 border-red-700 border text-white shadow-lg py-2 px-4 rounded hover:bg-red-600 hover:opacity-100 focus:outline-none"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </ViewModal>
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    );
}
