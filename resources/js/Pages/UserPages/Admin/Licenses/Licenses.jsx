import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import ActivateModal from '../../../../Components/Modals/ActivateModal';
import DeactivateModal from '../../../../Components/Modals/DeactivateModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

export default function Licenses(data) {
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });
    const [details,SetDetails] = useState({
        id:null,
    });

    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const openActivateModal = () => setIsActivateModalOpen(true);
    const closeActivateModal = () => setIsActivateModalOpen(false);
    const openDeactivateModal = () => setIsDeactivateModalOpen(true);
    const closeDeactivateModal = () => setIsDeactivateModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    
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
        axios.post( "/admin/licenses/all" , {  
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
        axios.get( "/admin/licenses/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            console.log(detail);
            modalFunc();
            SetDetails({
                ...details,
                id:detail.id,
                birthdate:detail.birthdate,
                date_created:detail.date_created,
                date_updated:detail.date_updated,
                email:detail.email,
                email_verified:detail.email_verified,
                full_name:detail.full_name,
                is_active:detail.is_active,
                is_approved:detail.is_approved,
                license_no:detail.license_no,
                picture_holding_license:detail.picture_holding_license,
                picture_of_license:detail.picture_of_license,
                profile:detail.profile,
                user_id:detail.user_id,
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
    const ShowDetaiils = () =>{
        alert("asdf")
    }

      
    const HandleToggleIsActive = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post( "/admin/licenses/toggle_is_active" , {  
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
                                <Link href="/admin/licenses">
                                    Licenses 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <div className="content-header my-2">
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
                                
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-1 md:mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            {/* <th scope="col" className="py-3 text-center table-cell md:hidden "></th> */}
                                            <th scope="col" className="pl-5 py-3 hidden md:table-cell align">Profile</th>
                                            <th scope="col" className="pl-5 py-3">Fullname</th>
                                            <th scope="col" className="py-3 text-start hidden md:table-cell">License #</th>
                                            <th scope="col" className="py-3 hidden md:table-cell">Email</th>
                                            <th scope="col" className="py-3 text-center hidden md:table-cell">Status</th>
                                            <th scope="col" className="py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-2 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    {/* <td>
                                                        <button onClick={() => ShowDetaiils(index)}>
                                                            <svg viewBox="0 0 32 32" className="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#000000"> <path d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z" id="plus-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                                        </button>
                                                    </td> */}
                                                    <td className="py-4 text-center text-black hidden md:table-cell">
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
                                                    <th scope="row" className="pl-5 pr-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.full_name}
                                                    </th>
                                                    <th scope="row" className="hidden md:table-cell py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.license_no}
                                                    </th>
                                                    <td className="hidden md:table-cell py-4">{item.email}</td>
                                                    <td className="hidden md:table-cell py-4 text-center">
                                                        {item.is_approved === 1 ? (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                                                                Approved
                                                            </span>
                                                        ) : (
                                                            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                                                                Pending
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="text-center flex justify-center gap-2 mt-2 md:mt-4">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm">
                                                            <svg fill="currentColor" className="text-black h-8 w-8"viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button>
                                                        {item.is_approved == 1 ?(
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
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} Size={'w-full mx-1 md:w-8/12'} title="View License" className="text-black">
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Full name </label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.full_name}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">License # </label>
                                    <input type="text" required id="type" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Type" disabled value={details.license_no}  />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="name"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Email </label>
                                    <input type="text" id="name" min="0"  className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Name" disabled required  value={details.email} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="w-full">
                                    <label for="name"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Is Approved? </label>
                                    {details.is_approved === 1 ? (
                                        <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full">
                                            Approved
                                        </span>
                                    ) : (
                                        <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="w-full mb-2 ">
                                <label for="icon" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture of License  </label>
                                <div className="flex justify-center">
                                    {details.picture_of_license ? (
                                        <a href={"/files/license/pictureoflicense/"+details.picture_of_license} target='blank'>
                                            <img 
                                                src={"/files/license/pictureoflicense/"+details.picture_of_license} 
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
                                <label for="icon" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture Holding License  </label>
                                <div className="flex justify-center">
                                    {details.picture_holding_license ? (
                                        <a href={"/files/license/pictureholdinglicense/"+details.picture_holding_license} target='blank'>
                                            <img 
                                                src={"/files/license/pictureholdinglicense/"+details.picture_holding_license} 
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
                        <DeactivateModal isOpen={isDeactivateModalOpen} closeModal={closeDeactivateModal} FuncCall={HandleToggleIsActive} Size={'w-full mx-1 md:w-8/12'} title="Deactivate License ">
                            <div className="text-center mt-5 text-red-600">Are you sure you want to deactivate this?</div>
                        </DeactivateModal>
                        <ActivateModal isOpen={isActivateModalOpen} closeModal={closeActivateModal} FuncCall={HandleToggleIsActive} Size={'w-full mx-1 md:w-8/12'} title="Activate License ">
                            <div className="text-center mt-5 text-green-600">Are you sure you want to activate this?</div>
                        </ActivateModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }