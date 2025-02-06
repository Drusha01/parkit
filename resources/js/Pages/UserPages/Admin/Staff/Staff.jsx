import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import ActivateModal from '../../../../Components/Modals/ActivateModal';
import DeactivateModal from '../../../../Components/Modals/DeactivateModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import AddModal from '../../../../Components/Modals/AddModal';
import EditModal from '../../../../Components/Modals/EditModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

export default function Staff(data) {
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });
    const [details,SetDetails] = useState({
        id:null,
        email:null,
        first_name:null,
        middle_name:null,
        last_name:null,
        suffix:null,
        gender:null,
        birthdate:null,
        password:null,
        confirm_password:null,
    });

    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openActivateModal = () => setIsActivateModalOpen(true);
    const closeActivateModal = () => setIsActivateModalOpen(false);
    const openDeactivateModal = () => setIsDeactivateModalOpen(true);
    const closeDeactivateModal = () => setIsDeactivateModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    
    function handleContentChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setContent(content => ({
            ...content,
            [key]: value,
        }))
    }

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
        if (content.search !== null) GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "/admin/staffs/all" , {  
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
        axios.get( "/admin/staffs/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                birthdate:detail.birthdate,
                email:detail.email,
                email_verified:detail.email_verified,
                first_name:detail.first_name,
                middle_name:detail.middle_name,
                last_name:detail.last_name,
                suffix:detail.suffix,
                gender:detail.gender,
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

      
    const HandleToggleIsActive = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/staffs/toggle_is_active" , {  
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

    const HandleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        SetDetails({
            ...details,
            [key]: value,
        })
    }

    const HandleAddStaff = (e) =>{
        e.preventDefault();
        if (details.password !== details.confirm_password) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Password doesn't match!",
                showConfirmButton: false,
                timer: 1000
            });
            return;
        }
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/staffs/add" , {  
            id: details.id,
            email:details.email,
            first_name:details.first_name,
            middle_name:details.middle_name,
            last_name:details.last_name,
            suffix:details.suffix,
            gender:details.gender,
            birthdate:details.birthdate,
            password:details.password,
            confirm_password:details.email,
        })
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
    const HandleEditStaff = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/staffs/edit" , {  
            id: details.id,
            email:details.email,
            first_name:details.first_name,
            middle_name:details.middle_name,
            last_name:details.last_name,
            suffix:details.suffix,
            gender:details.gender,
            birthdate:details.birthdate,
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

    return (
        <>
            <AdminLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/admin/staffs">
                                    Staffs 
                                </Link>
                            </li>
                        </ul>
                    </nav>

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
                                <button type="button" onClick={openAddModal} className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className="content-body mx-1 md:mx-4">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-5 py-3 hidden xl:table-cell">Profile</th>
                                            <th scope="col" className="px-2 py-3">Fullname</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Gender</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Birthdate</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Email</th>
                                            <th scope="col" className="py-3 hidden md:table-cell text-center">Verified?</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <td className="hidden xl:table-cell py-4 text-center text-black">
                                                        {item.profile ? (
                                                             <a href={"/files/profile/"+item.profile} target='blank'>
                                                                <img 
                                                                    src={"/files/profile/"+item.profile} 
                                                                    className="h-6" 
                                                                    alt={item.full_name}
                                                                />
                                                            </a>
                                                        ):(
                                                            <>
                                                                <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                                            </>
                                                        )}
                                                    </td>
                                                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.full_name}
                                                    </th>
                                                    <td className="py-4 hidden md:table-cell">{item.gender_name}</td>
                                                    <td className="py-4 hidden md:table-cell">{item.birthdate}</td>
                                                    <td className="py-4 hidden md:table-cell">{item.email}</td>
                                                    <td className="py-4 hidden md:table-cell text-center">
                                                        {item.email_verified == 1 ? (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-green-700  rounded-full">
                                                                <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="currentColor"></path> </g></svg>
                                                            </span>
                                                            ) : (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-red-700  rounded-full">
                                                                <svg viewBox="0 0 24 24" width="32"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" fill="currentColor"></path> <path d="M9.00001 15.75C8.90147 15.7504 8.80383 15.7312 8.71282 15.6934C8.62181 15.6557 8.53926 15.6001 8.47001 15.53C8.32956 15.3893 8.25067 15.1987 8.25067 15C8.25067 14.8012 8.32956 14.6106 8.47001 14.47L14.47 8.46997C14.6122 8.33749 14.8002 8.26537 14.9945 8.26879C15.1888 8.27222 15.3742 8.35093 15.5116 8.48835C15.649 8.62576 15.7278 8.81115 15.7312 9.00545C15.7346 9.19975 15.6625 9.38779 15.53 9.52997L9.53001 15.53C9.46077 15.6001 9.37822 15.6557 9.2872 15.6934C9.19619 15.7312 9.09855 15.7504 9.00001 15.75Z" fill="currentColor"></path> <path d="M15 15.75C14.9015 15.7504 14.8038 15.7312 14.7128 15.6934C14.6218 15.6557 14.5392 15.6001 14.47 15.53L8.47 9.52997C8.33752 9.38779 8.2654 9.19975 8.26882 9.00545C8.27225 8.81115 8.35097 8.62576 8.48838 8.48835C8.62579 8.35093 8.81118 8.27222 9.00548 8.26879C9.19978 8.26537 9.38782 8.33749 9.53 8.46997L15.53 14.47C15.6704 14.6106 15.7493 14.8012 15.7493 15C15.7493 15.1987 15.6704 15.3893 15.53 15.53C15.4608 15.6001 15.3782 15.6557 15.2872 15.6934C15.1962 15.7312 15.0985 15.7504 15 15.75Z" fill="currentColor"></path> </g></svg>
                                                            </span>
                                                            )}

                                                    </td>
                                                    <td className="text-center flex justify-center gap-2 mt-2 md:mt-4">
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
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} Size={'w-full mx-1 md:w-8/12'} title="Staff Details" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="email"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Email <span className="text-red-700">*</span></label>
                                    <input type="email" id="email" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Email" disabled required onChange={HandleChange} value={details.email} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">First name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="first_name" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="First name" disabled onChange={HandleChange} value={details.first_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="middle_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Middle name </label>
                                    <input type="text" id="middle_name" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Middle name" disabled onChange={HandleChange}  value={details.middle_name}  />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="last_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Last name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="last_name" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Last name" disabled onChange={HandleChange}  value={details.last_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="suffix"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Suffix </label>
                                    <input type="text" id="suffix" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="suffix" disabled onChange={HandleChange}   value={details.suffix} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="gender"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Gender</label>
                                    <select 
                                    id="gender"  
                                    disabled
                                    value={details.gender} 
                                    tabIndex="5" 
                                    className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Birthdate <span className="text-red-700">*</span></label>
                                    <input type="date" id="birthdate" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:bg-gray-900 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name" disabled onChange={HandleChange}  value={details.birthdate} />
                                </div>
                            </div>
                        </ViewModal>
                        <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} Size={'w-full mx-1 md:w-8/12 min-h-10/12'} FuncCall={HandleAddStaff} title="Add Staff" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="email"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Email <span className="text-red-700">*</span></label>
                                    <input type="email" id="email" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Email" required onChange={HandleChange} value={details.email} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">First name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="first_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="First name" onChange={HandleChange} value={details.first_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="middle_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Middle name </label>
                                    <input type="text" id="middle_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Middle name" onChange={HandleChange}  value={details.middle_name}  />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="last_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Last name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="last_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Last name" onChange={HandleChange}  value={details.last_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="suffix"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Suffix </label>
                                    <input type="text" id="suffix" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="suffix" onChange={HandleChange}   value={details.suffix} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="gender"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Gender</label>
                                    <select 
                                    id="gender"  
                                    value={details.gender} 
                                    onChange={HandleChange} 
                                    tabIndex="5" 
                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Birthdate <span className="text-red-700">*</span></label>
                                    <input type="date" id="birthdate" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name" required onChange={HandleChange}  value={details.birthdate} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Password <span className="text-red-700">*</span></label>
                                    <input type="password" id="password" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Password" required    onChange={HandleChange}  value={details.password} />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">ConfirmPassword <span className="text-red-700">*</span></label>
                                    <input type="password" id="confirm_password" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Confirm password" required    onChange={HandleChange}  value={details.confirm_password} />
                                </div>
                            </div>
                        </AddModal>
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} Size={'w-full mx-1 md:w-8/12 min-h-10/12'} FuncCall={HandleEditStaff} title="Edit Staff" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="email"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Email <span className="text-red-700">*</span></label>
                                    <input type="email" id="email" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Email" required onChange={HandleChange} value={details.email} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="first_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">First name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="first_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="First name" onChange={HandleChange} value={details.first_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="middle_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Middle name </label>
                                    <input type="text" id="middle_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Middle name" onChange={HandleChange}  value={details.middle_name}  />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="last_name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Last name <span className="text-red-700">*</span></label>
                                    <input type="text" required id="last_name" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Last name" onChange={HandleChange}  value={details.last_name}  />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="suffix"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Suffix </label>
                                    <input type="text" id="suffix" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="suffix" onChange={HandleChange}   value={details.suffix} />
                                </div>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="gender"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Gender</label>
                                    <select 
                                    id="gender"  
                                    value={details.gender} 
                                    onChange={HandleChange} 
                                    tabIndex="5" 
                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Birthdate <span className="text-red-700">*</span></label>
                                    <input type="date" id="birthdate" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name" required onChange={HandleChange}  value={details.birthdate} />
                                </div>
                            </div>
                            {/* <div className="mb-2 grid grid-cols-2 gap-1">
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Password <span className="text-red-700">*</span></label>
                                    <input type="password" id="password" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Password" required    onChange={HandleChange}  value={details.password} />
                                </div>
                                <div className="w-full col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                                    <label for="birthdate"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">ConfirmPassword <span className="text-red-700">*</span></label>
                                    <input type="password" id="confirm_password" min="0"  className="disabled:bg-gray-200 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Confirm password" required    onChange={HandleChange}  value={details.confirm_password} />
                                </div>
                            </div> */}
                        </EditModal>
                        <DeactivateModal isOpen={isDeactivateModalOpen} closeModal={closeDeactivateModal} FuncCall={HandleToggleIsActive} title="Deactivate Vehicle type">
                            <div className="text-center mt-5 text-red-600">Are you sure you want to deactivate this?</div>
                        </DeactivateModal>
                        <ActivateModal isOpen={isActivateModalOpen} closeModal={closeActivateModal} FuncCall={HandleToggleIsActive} title="Activate Vehicle type">
                            <div className="text-center mt-5 text-green-600">Are you sure you want to activate this?</div>
                        </ActivateModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }