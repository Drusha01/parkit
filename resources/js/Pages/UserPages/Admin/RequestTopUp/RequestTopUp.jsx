import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import EditModal from '../../../../Components/Modals/EditModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

export default function RequestTopUp(data) {
   
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });

    const [status,setStatus] = useState([
        'Pending', 'Not found', 'Complete', 'Value mismatch'
    ])
    const [detail,setDetail] = useState({
        id:null,
        user_id:null, 
        created_by:null,
        amount:null, 
        reference_photo:null,
        reference_photo_url:null,
        status:null,
        remarks:null,
        is_topUp:null,
        password:null,
    })



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
        setDetail(detail => ({
            ...detail,
            [key]: value,
        }))
    }
    function handleStatusChange(e) {
        const key = e.target.id;
        const value = e.target.value
        if(value == 'Complete'){
            setDetail(detail => ({
                ...detail,
                [key]: value,
                is_topUp:1,
            }))
        }else{
            setDetail(detail => ({
                ...detail,
                is_topUp:null,
                [key]: value,
            }))
        }
    }
    function handleFileChange (e) {
        const key = e.target.id;
        const value = e.target.value
        const file = event.target.files[0];
        setDetail(detail => ({
            ...detail,
            [key]: file,
        }))
    }

    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);
    
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
        axios.post( "/admin/top-ups/all" , {  
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
        setDetails({
            id:null,
            parking_unit:1,
            type:null,
            name:null,
            description:null,
            icon:null,
        });
    }
    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/admin/top-ups/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            modalFunc();
            setDetail({
                id:detail.id,
                user_id:detail.user_id, 
                created_by:detail.created_by,
                amount:detail.amount, 
                reference_photo:null,
                reference_photo_url:detail.reference_photo,
                status:detail.status,
                remarks:detail.remarks,
                is_topUp:null,
                password:null,
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


    const HandleEdit = (e) =>{
        e.preventDefault();
        Swal.fire({
            didOpen: () => {
              Swal.showLoading();
            },
        });
        axios.post( "/admin/top-ups/edit" ,
            {  
                id: detail.id,
                user_id:detail.user_id,
                amount:detail.amount, 
                status:detail.status,
                remarks:detail.remarks,
                topup:1,
                password:detail.password,
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

    
 
    return (
        <>
            <AdminLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                        <li className="flex align-middle font-semibold text-md ml-2">
                                <Link href="/admin/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-md ml-1">
                                <Link href="/admin/top-ups">
                                    Top Ups
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    
                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="max-w-sm flex">
                                <label htmlFor="default-search" className="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <HeaderSearch Id={'search'} onChangeFunc={handleContentChange} value={content.search}/>
                                </div>
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-1 md:mx-4 mb-2">
                                <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:border dark:border-gray-700">
                                    <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                                        <tr className="text-md">
                                            <th scope="col" className="py-3 text-center">#</th>
                                            <th scope="col" >Renter</th>
                                            <th scope="col" class="px-1 py-4">Reference Photo</th>
                                            <th scope="col" class="px-1">Amount</th>
                                            <th scope="col" class="px-1">Status</th>
                                            <th scope="col" class="px-1 text-center">Action </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content?.data?.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-3 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <td className="pr-1 py-1 ">{item.full_name}</td>
                                                    <td className="pr-1 py-1">
                                                        <a href={`/files/reference_photo/`+item.reference_photo} target="blank">
                                                            <img src={`/files/reference_photo/`+item.reference_photo} alt="" width="40px"/>
                                                        </a>
                                                    </td>
                                                    <td className="pr-1 py-1 ">{formatCurrency(item.amount, "PHP", "en-PH")}</td>
                                                    <td className="pr-1 py-1 ">{item.status}</td>
                                                    <td className="text-center flex justify-center gap-2 mt-2 md:mt-2">
                                                        <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="text-center focus:outline-none bg-white text-black border border-black  hover:bg-gray-200 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md">
                                                            <svg fill="currentColor" className="text-black h-8 w-8" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>view</title> <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z"></path> </g></svg>
                                                        </button>
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
                        <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal} FuncCall={HandleEdit} Size={'w-full mx-1 md:w-8/12'} title="Edit Vehicle Types" className="text-black">
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <label for="amount" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Amount <span className="text-red-600">*</span></label>
                                    <input type="number" step="0.01" min="0.01" id="amount" value={detail.amount} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Top up amount" />
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full">
                                        <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Reference Photo <span className="text-red-600">*</span></label>
                                        <img src={`/files/reference_photo/`+detail.reference_photo_url}  alt="" height="400px"/>
                                    </div>
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full ">
                                        <label for="status" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Status  </label>
                                        <div className="flex justify-end">
                                            <select name="" value={detail.status} onChange={handleStatusChange} id="status"
                                                className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                {status.map((item) => (
                                                    <option key={"status-"+item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full">
                                        <label for="remarks" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Remarks</label>
                                        <textarea value={detail.remarks} onChange={handleChange} className="ps-2 pt-2 block w-full text-md text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                            id="remarks" rows="3" placeholder="Enter remarks" type="file" accept="image/*" >
                                        </textarea>
                                    </div>
                                </div>
                                {detail.is_topUp == 1 && (

                                    <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                        <div className="w-full">
                                            <label for="password" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Password <span className="text-red-600">*</span></label>
                                            <input type="password" min="1" required id="password" value={detail.password} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Enter password"  
                                                />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </EditModal>
                        <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} Size={'w-full mx-1 md:w-8/12'} title="View Vehicle Types" className="text-black">
                        <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <label for="amount" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Amount <span className="text-red-600">*</span></label>
                                    <input type="number" step="0.01" disabled min="0.01" id="amount" value={detail.amount} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Top up amount" />
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full">
                                        <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Reference Photo <span className="text-red-600">*</span></label>
                                        <img src={`/files/reference_photo/`+detail.reference_photo_url}  alt="" height="400px"/>
                                    </div>
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full ">
                                        <label for="status" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Status  </label>
                                        <div className="flex justify-end">
                                            <select name="" value={detail.status} disabled onChange={handleStatusChange} id="status"
                                                className="disabled:bg-gray-200 dark:disabled:bg-gray-700 bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                {status.map((item) => (
                                                    <option key={"status-"+item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                    <div className="w-full">
                                        <label for="remarks" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Remarks</label>
                                        <textarea value={detail.remarks} disabled onChange={handleChange} className="ps-2 pt-2 block w-full text-md text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                            id="remarks" rows="3" placeholder="Enter remarks" type="file" accept="image/*" >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </ViewModal>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
  }