import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import AddModal from '../../../../Components/Modals/AddModal';
import EditModal from '../../../../Components/Modals/EditModal';
import DeleteModal from '../../../../Components/Modals/DeleteModal';
import ViewModal from '../../../../Components/Modals/ViewModal';
import { format } from "date-fns";
import BasicPagination from '../../../../Components/Pagination/BasicPagination';


export default function RequestTopUp(props) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => {
        setIsAddModalOpen(true);
        HandleClearDetails();
    }
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);

    const [content, setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })

    const [details,setDetails] = useState({
        id:null,
        user_id:null, 
        created_by:null,
        amount:null, 
        reference_photo:null,
        reference_photo_url:null,
        status:null,
        remarks:null,
    })

    useEffect(() => {
        GetData();
    }, []);
    
    useEffect(() => {
        if (content.page !== null) GetData();
    }, [content.page]);
    
    useEffect(() => {
        if (content.search !== null) GetData();
    }, [content.search]);

    
    const GetData = () =>{
        axios.post( "/renter/top-ups/all" , {  
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
    
    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setDetails(details => ({
            ...details,
            [key]: value,
        }))
    }

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setDetails(details => ({
            ...details,
            [key]:event.target.files[0]
        }))
    };

    const HandleAddTopup = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/top-ups/add`, {
            amount:details.amount, 
            reference_photo:details.reference_photo,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Successfully added`,
                    showConfirmButton: false,
                    timer: 1500
                });
                closeAddModal();
                GetData();
            }
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

    const HandleEditTopup = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/top-ups/edit`, {
            id:details.id,
            amount:details.amount, 
            reference_photo:details.reference_photo,
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Successfully updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
                closeEditModal();
                GetData();
            }
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

    const HandleDeleteTopup = (e) =>{
        e.preventDefault(); 
        Swal.fire({
            didOpen: () => {
                Swal.showLoading();
            },
        });
        axios.post(`/renter/top-ups/delete`, {
            id:details.id, 
        },{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
        const obj = JSON.parse(res.data)
            if (res.data = 1) {
                Swal.close();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Successfully deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
                closeDeleteModal();
                GetData();
            }
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

    const HandleGetDetails = (id,modalFunc)=>{
        axios.get( "/renter/top-ups/view/"+id )
        .then(res => {
            const detail = JSON.parse(res.data.detail)
            console.log(detail);
            modalFunc();
            setDetails({
                id:detail.id,
                user_id:detail.user_id, 
                created_by:detail.created_by,
                amount:detail.amount, 
                reference_photo:null,
                reference_photo_url:detail.reference_photo,
                status:detail.status,
                remarks:detail.remarks,
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

    
    const HandleClearDetails = () => {
        setDetails({
            id:null,
            user_id:null, 
            created_by:null,
            amount:null, 
            reference_photo:null,
            status:null,
            remarks:null,
        });
    }

    return (
        <>
            <RenterLayout>
                <div className="main-content w-full lg:w-4/5 shahow-xl bg-white dark:bg-gray-700 dark:text-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                    <div className="flex-none lg:flex xl:flex xxl:flex">
                        <div className="w-full">
                            <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                                Top Ups
                            </div>
                            <div className="flex justify-end w-full">
                                <button className="btn flex mx-5 justify-center bg-main-color text-white hover:bg-blue-900" type="button" onClick={()=>openAddModal()}>
                                    <svg viewBox="0 0 24 24" className='text-white '  width="15px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    Top up
                                </button>
                            </div>
                            <div className="content mx-5 my-10">   
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                                    <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-200 dark:text-black ">
                                            <tr>
                                                <th scope="col" class="px-3 py-4 text-center">
                                                    #
                                                </th>
                                                <th scope="col" class="px-1 py-4">
                                                    Reference Photo
                                                </th>
                                                <th scope="col" class="px-1">
                                                    Amount
                                                </th>
                                                <th scope="col" class="px-1">
                                                    Status
                                                </th>
                                                <th scope="col" class="px-1 text-center">Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {content.data.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-3 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <td className="pr-1 py-1">
                                                        <a href={`/files/reference_photo/`+item.reference_photo} target="blank">
                                                            <img src={`/files/reference_photo/`+item.reference_photo} alt="" width="40px"/>
                                                        </a>
                                                    </td>
                                                    <td className="pr-1 py-1 ">{formatCurrency(item.amount, "PHP", "en-PH")}</td>
                                                    <td className="pr-1 py-1 ">{item.status}</td>
                                                    <td class="text-center">
                                                        { item.status === 'Pending' && (
                                                            <div className="flex gap-1 justify-center">
                                                                <button onClick={() => HandleGetDetails(item.id, openEditModal)} className="focus:outline-2  border hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-600 bg-green-600 text-white font-medium rounded-lg text-md px-3 py-2">
                                                                    Edit
                                                                </button>
                                                                <button onClick={() => HandleGetDetails(item.id, openDeleteModal)} className="focus:outline-2  border hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-600 bg-red-600 text-white font-medium rounded-lg text-md px-3 py-2">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                         <button onClick={() => HandleGetDetails(item.id, openViewModal)} className="focus:outline-2  border hover:bg-gray-800 hover:text-white focus:ring-4 focus:ring-gray-600 bg-gray-600 text-white font-medium rounded-lg text-md px-3 py-2">
                                                            View
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
                                <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandlePrevPage} NextPageFunc={HandleNextPage} />
                            </div>
                            <div>
                                <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal}  Size={'w-12/12 md:w-8/12 mx-2'} FuncCall={HandleAddTopup}  title="Add Top Up">
                                    <div className="w-full grid mb-2 md:grid-cols-4">
                                        <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <label for="amount" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Amount <span className="text-red-600">*</span></label>
                                            <input type="number" step="0.01" min="0.01" id="amount" value={details.amount} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Top up amount" />
                                        </div>
                                        <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <div className="w-full">
                                                <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Reference Photo <span className="text-red-600">*</span></label>
                                                <input onChange={handleFileChange}  className="block w-full text-md text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="reference_photo" type="file" required accept="image/*" />
                                            </div>
                                        </div>
                                    </div>
                                </AddModal>
                                <EditModal isOpen={isEditModalOpen} closeModal={closeEditModal}  Size={'w-12/12 md:w-8/12 mx-2'} FuncCall={HandleEditTopup}  title="Edit Top Up">
                                    <div className="w-full grid mb-2 md:grid-cols-4">
                                        <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <label for="amount" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Amount <span className="text-red-600">*</span></label>
                                            <input type="number" step="0.01" min="0.01" id="amount" value={details.amount} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Top up amount" />
                                        </div>
                                        <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <div className="w-full">
                                                <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Reference Photo <span className="text-red-600">*</span></label>
                                                <input onChange={handleFileChange}  className="block w-full text-md text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="reference_photo" type="file" accept="image/*" />
                                            </div>
                                        </div>
                                    </div>
                                </EditModal>
                                <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal}  Size={'w-12/12 md:w-8/12 mx-2'}  title="View Top Up">
                                    <div className="w-full grid mb-2 md:grid-cols-4">
                                        <div className="col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <label for="amount" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Amount <span className="text-red-600">*</span></label>
                                            <input type="number" step="0.01" min="0.01" id="amount" disabled value={details.amount} onChange={handleChange}  className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Top up amount" />
                                        </div>
                                        <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <div className="w-full">
                                                <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Reference Photo <span className="text-red-600">*</span></label>
                                                <img src={`/files/reference_photo/`+details.reference_photo_url}  alt="" height="400px"/>
                                            </div>
                                        </div>
                                        <div className="flex col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 mx-4 mb-2">
                                            <div className="w-full">
                                                <label for="reference_photo" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">Remarks</label>
                                                <textarea disabled value={details.remarks} className="block w-full ps-2 pt-2 text-md text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                    id="reference_photo" rows="3" type="file" accept="image/*" >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </ViewModal>
                                <DeleteModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} FuncCall={HandleDeleteTopup} Size={'w-12/12 md:w-8/12 mx-2'} title="Delete Topup" className="text-black">
                                    <div className="text-center mt-5 text-red-600">Are you sure you want to delete this?</div>  
                                </DeleteModal>
                            </div>
                        </div>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
