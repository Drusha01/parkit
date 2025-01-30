import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import ActivateModal from '../../../../Components/Modals/ActivateModal';
import DeactivateModal from '../../../../Components/Modals/DeactivateModal';
import EditModal from '../../../../Components/Modals/EditModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';
export default function Vehicles(props) {
    const [status,setStatus] = useState(props.status);
    const [content,setContent] = useState({
        filter:{
            status_id:null,
            statuses:[],
        },
        data:[],
        total:0,
        page:1,
        rows:10,
        search:null,
    });
    const [details,SetDetails] = useState({
        id:null,
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
    
    function handleContentChange(e) {
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
        if (content.page !== 1) GetData();
    }, [content.page]);
    
    useEffect(() => {
        if (content.filter.status_id !== null) GetData();
    }, [content.filter.status_id]);
    
    useEffect(() => {
        if (content.search !== null) GetData();
    }, [content.search]);

    const GetData = ()=>{
        axios.post( "/admin/vehicles/all" , {  
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
        axios.get( "/admin/vehicles/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
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
        axios.post( "/admin/vehicles/toggle_is_active" , {  
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

    const HandleModify = () =>{
        alert("asdf");
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
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/admin/vehicles">
                                    Vehicles 
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
                                <select name="" value={content.filter.status_id} onChange={HandleContentFilterChange} 
                                    className="rounded max-h-9 mx-2 text-black border-gray-600 text-left flex items-center leading-tight py-1"  id="status_id">
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
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" className="pl-5 py-3">Fullname</th>
                                            <th scope="col" className="py-3 text-start">Vehicle Type</th>
                                            <th scope="col" className="py-3 text-start">Plate #</th>
                                            <th scope="col" className="py-3 text-start">MV File #</th>
                                            <th scope="col" className="py-3 text-center">Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 border-b text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.full_name}
                                                    </th>
                                                    <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.vehicle_type_name}
                                                    </th>
                                                    <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.cr_plate_number}
                                                    </th>
                                                    <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.cr_file_number}
                                                    </th>
                                                    <td className="py-4 text-center">
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
                                                    <td className="text-center flex justify-center gap-2 mt-2">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            View
                                                        </button>
                                                        <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2">
                                                            Modify
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
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="Vehicle Details" Size={'w-full mx-2 md:w-8/12'}>
                            <div className="flex flex-col h-[70vh]"> 
                                <div className="flex-1 overflow-y-auto p-4">
                                    <div className="content">
                                        asdf
                                    </div>
                                </div>
                                <div className="border-t p-4 bg-white sticky bottom-0">
                                    <div className="action">
                                        adsfsaf
                                    </div>
                                </div>
                            </div>
                        </ViewModal>
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleToggleIsActive} title="Vehicle Details" Size={'w-full mx-2 md:w-8/12'} >
                            <div className="text-center mt-5 text-red-600">Are you sure you want to deactivate this?</div>
                        </EditModal>
                        <DeactivateModal isOpen={isDeactivateModalOpen} closeModal={closeDeactivateModal} FuncCall={HandleToggleIsActive} title="Deactivate License ">
                            <div className="text-center mt-5 text-red-600">Are you sure you want to deactivate this?</div>
                        </DeactivateModal>
                        <ActivateModal isOpen={isActivateModalOpen} closeModal={closeActivateModal} FuncCall={HandleToggleIsActive} title="Activate License ">
                            <div className="text-center mt-5 text-green-600">Are you sure you want to activate this?</div>
                        </ActivateModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }