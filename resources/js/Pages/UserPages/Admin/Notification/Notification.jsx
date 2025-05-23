import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';

import { format } from "date-fns";
import { Star } from "lucide-react";
import ViewModal from '../../../../Components/Modals/ViewModal';
import { formatDistanceToNow } from 'date-fns';

export default function Notification() {

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const openViewModal = () => setIsViewModalOpen(true);
    const closeViewModal = () => setIsViewModalOpen(false);

    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
    });

    
    const [details,SetDetails] = useState({
        id:null,
        user_id:null,
        space_vehicle_alotment_id:null,
        time_start:null,
        time_end:null,
        commission:null,
        rate_rate:null,
        rate_type:null,
        amount:null,
        vehicle_id:null,
        brand:null,
        unit:null,
        cr_file_number:null,
        cr_plate_number :null,
        vehicle_type_id :null,
        vehicle_type :null,
        vehicle_type_name:null,
        space_id:null,
        space_name:null,
        rules :null,
        description :null,
        location_long :null,
        location_lat :null,
        overall_rating :null,
        date_created :null,
        date_updated :null,
        rate:null,
        remarks:null
    });

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

    
    const GetData = () =>{
        axios.post( "/admin/notifications/all" , {  
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
        axios.get( "/spaceowner/history/view/"+id )
        .then(res => {
            modalFunc();
            const detail = JSON.parse(res.data.detail)
            SetDetails({
                ...details,
                id :detail.id,
                user_id:detail.user_id ,
                space_vehicle_alotment_id:detail.space_vehicle_alotment_id,
                time_start:detail.time_start,
                time_end:detail.time_end,
                commission:detail.commission,
                rate_rate:detail.rate_rate,
                rate_type:detail.rate_type,
                amount:detail.amount,
                vehicle_id:detail.vehicle_id,
                brand:detail.brand,
                unit:detail.unit,
                cr_file_number:detail.cr_file_number,
                cr_plate_number :detail.cr_plate_number,
                vehicle_type_id :detail.vehicle_type_id,
                vehicle_type :detail.vehicle_type,
                vehicle_type_name:detail.vehicle_type_name,
                space_id:detail.space_id,
                space_name:detail.space_name,
                rules :detail.rules,
                description :detail.description,
                location_long :detail.location_long,
                location_lat :detail.location_lat,
                overall_rating :detail.overall_rating,
                date_created :detail.date_created,
                date_updated :detail.date_updated,
                rate:detail.rate,
                remarks:detail.remarks
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

    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };
    const formatNumber = (num,padding) => {
        return String(num).padStart(padding, "0");
    };

    const toggleReadStatus = (id) =>{
        axios.post(`/admin/notifications/toggle`, {
            id:id,
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
                    title: 'Successfully updated',
                    showConfirmButton: false,
                    timer: 1500
                });
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
                                <Link href="/admin/notifications">
                                    Notifications 
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
                            <div className="flex justify-end h-16">
                              
                            </div>
                        </div>

                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                                <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-200 dark:text-black">
                                        <tr className="text-md">
                                            <th className="px-2 font-semibold text-center text-gray-600 py-4">#</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Title</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Message</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Time</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">isRead?</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content.data.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <td className="pr-1 py-1">
                                                        {item.title}
                                                    </td>
                                                    <td className="pr-1 py-1">
                                                    {item.full_name} {item.message}
                                                    </td>
                                                    <td className="pr-1 py-1">
                                                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                                    </td>
                                                    <td className="pr-1 py-1">
                                                        {item.is_read ? (
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                Read
                                                            </span>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                                Unread
                                                            </span>
                                                        )}
                                                        </td>
                                                    <td className="pr-1 py-1">
                                                        <button
                                                            onClick={() => toggleReadStatus(item.id)} // <- trigger function
                                                            className={`text-xs font-medium px-3.5 py-2.5 rounded
                                                            ${item.is_read == 0  ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                        >
                                                            {item.is_read == 0 ? 'Mark as Read' : 'Mark as Unread'}
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
                </main>
            </AdminLayout>
        </>
    )
  }