import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import DeleteModal from '../../../../Components/Modals/DeleteModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import AddModal from '../../../../Components/Modals/AddModal';
import EditModal from '../../../../Components/Modals/EditModal';
import ActivateModal from '../../../../Components/Modals/ActivateModal';
import DeactivateModal from '../../../../Components/Modals/DeactivateModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

export default function VehicleTypes(data) {
   
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    });

    const [details,SetDetails] = useState({
        id:null,
        type:null,
        name:null,
        description:null,
        icon:null,
    });



    function handleContentChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setContent(content => ({
            ...content,
            [key]: value,
        }))
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        SetDetails(details => ({
            ...details,
            [key]: value,
        }))
    }
    function handleFileChange (e) {
        const key = e.target.id;
        const value = e.target.value
        const file = event.target.files[0];
        SetDetails(details => ({
            ...details,
            [key]: file,
        }))
    }

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const openAddModal = () => {
        HandleClearDetails();
        setIsAddModalOpen(true);
    }
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const openActivateModal = () => setIsActivateModalOpen(true);
    const closeActivateModal = () => setIsActivateModalOpen(false);
    const openDeactivateModal = () => setIsDeactivateModalOpen(true);
    const closeDeactivateModal = () => setIsDeactivateModalOpen(false);
    
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
    useEffect(() => {
        GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "/admin/vehicle-types/all" , {  
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

    const HandleClearDetails = () => {
        SetDetails({
            id:null,
            type:null,
            name:null,
            description:null,
            icon:null,
        });
    }
    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/admin/vehicle-types/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                type:detail.type,
                name:detail.name,
                description:detail.description,
                icon:null,
                icon_url:detail.icon,
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


    const HandleAdd = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "/admin/vehicle-types/add" ,
            {  
                id: details.id,
                type: details.type,
                name: details.name,
                description: details.description,
                icon: details.icon,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then(res => {
            const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully added!",
                    showConfirmButton: false,
                    timer: 1000
                });
                closeAddModal();
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

    const HandleEdit = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "/admin/vehicle-types/edit" ,
            {  
                id: details.id,
                type: details.type,
                name: details.name,
                description: details.description,
                icon: details.icon,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then(res => {
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

    
    const HandleToggleIsActive = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/vehicle-types/toggle_is_active" , {  
            id: details.id,
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
                closeDeactivateModal();
                closeActivateModal();
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
    const HandleDelete = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/vehicle-types/delete" , {  
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
    return (
        <>
            <AdminLayout>
                <main className="text-white">
                    <nav className=" border border-gray-200">
                        <ul className="flex py-2 text-black ml-2 ">
                        <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/admin/vehicle-types">
                                    Vehicle Types 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    
                    <div className="content">
                        <div className="content-header w-full my-2">
                            <div className="ml-5 max-w-sm flex">
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
                                <button type="button" onClick={openAddModal}  className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-1 md:mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-1 md:pl-5 py-3">Type</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Vehicle Name</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Description</th>
                                            <th scope="col" className="py-3 text-center hidden md:table-cell">Icon</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 border-b text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <th scope="row" className="pl-1 md:pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.type}
                                                    </th>
                                                    <td className="py-1 md:py-4 hidden md:table-cell">{item.name}</td>
                                                    <td className="py-4 hidden md:table-cell">{item.description}</td>
                                                    <td className="py-4 text-center hidden md:table-cell">
                                                        {item.icon ? (
                                                            <a href={"/files/vehicle-type/"+item.icon} target='blank'>
                                                                <img 
                                                                    src={"/files/vehicle-type/"+item.icon} 
                                                                    className="h-6" 
                                                                    alt={item.name}
                                                                />
                                                            </a>
                                                        ):(
                                                            <>
                                                                <svg fill="currentColor" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256.001,0L0.009,95.939V512h77.323h76.831h203.674h76.831h77.323V95.939L256.001,0z M123.747,481.584h-15.999v-48.869 h15.999V481.584z M357.837,481.584H154.163v-48.869h203.674V481.584z M404.252,481.584h-15.999v-48.869h15.999V481.584z M357.837,402.299H154.163H77.332H76.74v-17.236h358.52v17.236h-0.592H357.837z M253.614,240.802h-78.657l83.429-83.429h78.657 L253.614,240.802z M369.42,168.01l12.965,72.792h-85.757L369.42,168.01z M131.942,240.802h-2.327l14.861-83.429h70.896 L131.942,240.802z M399.944,271.218c11.49,0,20.839,9.349,20.839,20.839v62.59h-88.737v-63.152H301.63v63.152h-30.42v-63.152 h-30.416v63.152h-30.42v-63.152h-30.416v63.152H91.219v-62.59c0-11.49,9.348-20.839,20.839-20.839H399.944z M481.575,481.584 L481.575,481.584h-46.907v-48.869h31.008v-78.068h-14.478v-62.59c0-23.528-15.941-43.391-37.585-49.389l-20.611-115.711H118.998 l-20.611,115.71c-21.644,5.999-37.584,25.862-37.584,49.389v62.59H46.324v78.068h31.008v48.869H30.425V117.022l225.575-84.541 l225.574,84.541V481.584z"></path> </g> </g> <g> <g> <circle cx="130.283" cy="312.931" r="18.822"></circle> </g> </g> <g> <g> <circle cx="381.723" cy="312.931" r="18.822"></circle> </g> </g> </g></svg>
                                                            </>
                                                        )}
                                                    </td>
                                                    <td className="text-center flex justify-center gap-2 mt-2 md:mt-2">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm">
                                                            <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button>
                                                        <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="focus:outline-2  border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 border-green-700 bg-white text-green-700  font-medium rounded-lg text-sm">
                                                            <svg viewBox="0 0 24 24"  className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="currentColor"></path> </g></svg>
                                                        </button>
                                                        {item.is_active == 1 ?(
                                                            <button onClick={() => HandleGetDetails(item.id, openDeactivateModal)} className="text-center focus:outline-none border border-yellow-700 text-yellow-700 bg-white hover:bg-yellow-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm">
                                                                <svg viewBox="0 0 48 48" className="h-8 w-8"   xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>thumbs-down-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M45,24l-.5-8h0C44,8,38.9,4,33,4H28c-2.4,0-7.1,2.6-8.5,3.6a1.6,1.6,0,0,1-1.2.4H17V28.4c3.3,2.4,9,14.4,9,14.4A2,2,0,0,0,27.5,44h.3c3.2-.9,4.2-4.8,3.6-9.7L31,31h7A6.7,6.7,0,0,0,45,24ZM5,28h8V8H5a2,2,0,0,0-2,2V26A2,2,0,0,0,5,28Z"></path> </g> </g> </g></svg>
                                                            </button>
                                                        ):(
                                                            <button onClick={() => HandleGetDetails(item.id, openActivateModal)} className="text-center focus:outline-none border border-green-700 text-green-700 bg-white hover:bg-green-100 focus:ring-4 focus:ring-green-600 font-medium rounded-lg text-sm">
                                                                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="currentColor"></path> </g></svg>
                                                            </button>
                                                        )
                                                    }
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
                        <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} FuncCall={HandleAdd} Size={'w-full mx-1 md:w-8/12'} title="Add Vehicle Types" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Type <span className="text-red-700">*</span></label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type"  value={details.type} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="name" required className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Name <span className="text-red-700">*</span></label>
                                    <input type="text" id="name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name"   value={details.name} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="w-full mb-2">
                                <label for="icon" required className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Icon  <span className="text-red-600">*</span></label>
                                <input  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="icon" name='icon' accept="image/*" type="file"   onChange={handleFileChange} />
                            </div>
                            <div className="mb-2">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="4"  value={details.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="description ..."
                                >
                                </textarea>
                            </div>
                        </AddModal>

                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleEdit} Size={'w-full mx-1 md:w-8/12'} title="Edit Vehicle Types" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Type <span className="text-red-700">*</span></label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type"  value={details.type} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="name"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Name <span className="text-red-700">*</span></label>
                                    <input type="text" id="name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name"  required  value={details.name} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="w-full mb-2">
                                <label for="icon" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Icon  </label>
                                <input  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="icon" name='icon' accept="image/*" type="file"  onChange={handleFileChange} />
                            </div>
                            <div className="mb-2">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="4"  value={details.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="description ..."
                                >
                                </textarea>
                            </div>
                        </EditModal>
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} Size={'w-full mx-1 md:w-8/12'} title="View Vehicle Types" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Type <span className="text-red-700">*</span></label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.type} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="name"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Name <span className="text-red-700">*</span></label>
                                    <input type="text" id="name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name" disabled required  value={details.name} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="w-full mb-2 ">
                                <label for="icon" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Icon  </label>
                                <div className="flex justify-center">
                                    {details.icon_url ? (
                                        <a href={"/files/vehicle-type/"+details.icon_url} target='blank'>
                                            <img 
                                                src={"/files/vehicle-type/"+details.icon_url} 
                                                className="h-52"
                                                alt={details.name}
                                            />
                                        </a>
                                    ):(
                                        <>
                                            <svg fill="currentColor" width="32" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256.001,0L0.009,95.939V512h77.323h76.831h203.674h76.831h77.323V95.939L256.001,0z M123.747,481.584h-15.999v-48.869 h15.999V481.584z M357.837,481.584H154.163v-48.869h203.674V481.584z M404.252,481.584h-15.999v-48.869h15.999V481.584z M357.837,402.299H154.163H77.332H76.74v-17.236h358.52v17.236h-0.592H357.837z M253.614,240.802h-78.657l83.429-83.429h78.657 L253.614,240.802z M369.42,168.01l12.965,72.792h-85.757L369.42,168.01z M131.942,240.802h-2.327l14.861-83.429h70.896 L131.942,240.802z M399.944,271.218c11.49,0,20.839,9.349,20.839,20.839v62.59h-88.737v-63.152H301.63v63.152h-30.42v-63.152 h-30.416v63.152h-30.42v-63.152h-30.416v63.152H91.219v-62.59c0-11.49,9.348-20.839,20.839-20.839H399.944z M481.575,481.584 L481.575,481.584h-46.907v-48.869h31.008v-78.068h-14.478v-62.59c0-23.528-15.941-43.391-37.585-49.389l-20.611-115.711H118.998 l-20.611,115.71c-21.644,5.999-37.584,25.862-37.584,49.389v62.59H46.324v78.068h31.008v48.869H30.425V117.022l225.575-84.541 l225.574,84.541V481.584z"></path> </g> </g> <g> <g> <circle cx="130.283" cy="312.931" r="18.822"></circle> </g> </g> <g> <g> <circle cx="381.723" cy="312.931" r="18.822"></circle> </g> </g> </g></svg>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mb-2">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="4" disabled  value={details.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="description ..."
                                >
                                </textarea>
                            </div>
                        </ViewModal>

                        <DeactivateModal isOpen={isDeactivateModalOpen} closeModal={closeDeactivateModal} FuncCall={HandleToggleIsActive} Size={'w-full mx-1 md:w-8/12'} title="Deactivate Vehicle type">
                            <div className="text-center mt-5 text-red-600">Are you sure you want to deactivate this?</div>
                        </DeactivateModal>
                        <ActivateModal isOpen={isActivateModalOpen} closeModal={closeActivateModal} FuncCall={HandleToggleIsActive} Size={'w-full mx-1 md:w-8/12'} title="Activate Vehicle type">
                            <div className="text-center mt-5 text-green-600">Are you sure you want to activate this?</div>
                        </ActivateModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }