import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';
import { format } from "date-fns";
import { Star } from "lucide-react";
import ViewModal from '../../../../Components/Modals/ViewModal';

export default function History() {

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
        axios.post( "/spaceowner/history/all" , {  
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
    


    return (
        <>
            <SpaceOwnerLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/history">
                                    History 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="max-w-sm flex">
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
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-200 dark:text-black">
                                            <tr className="text-md">
                                            <th className="px-2 font-semibold text-center text-gray-600 py-4">#</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Ref#</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Vehicle</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Parking Space</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Time</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Fee</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Rating</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content.data.length > 0 ? 
                                            (content.data.map((item, index) => (
                                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="px-4 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                    <td className="pr-1 py-1 ">#{item.space_id}-{formatNumber(item.id,8)}</td>
                                                    <td className="pr-1 py-1 ">{item.vehicle_type} - {item.brand} : {item.cr_file_number}</td>
                                                    <td className="pr-1 py-1 ">{item.space_name}</td>
                                                    <td className="pr-1 py-1 text-center">{format(new Date(item.time_start), "MMM d, yyyy h:mm a")} - {format(new Date(item.time_end), "MMM d, yyyy h:mm a")}  </td>
                                                    <td className="pr-1 py-1 ">{formatCurrency(item.amount, "PHP", "en-PH")}</td>
                                                    <td className="pr-1 py-1 text-center">
                                                        {item.rate === null ? (
                                                            <div className="mt-3 ml-2">
                                                                N/A
                                                            </div>
                                                        ) :(
                                                            <>
                                                            <div className=" ml-2">
                                                                <div className="relative w-7 h-7">
                                                                    <Star className="absolute text-gray-500 " size={28} fill="currentColor" stroke="currentColor" />
                                                                    <div className={`absolute top-0 left-0 w-${item.rate}/5 overflow-hidden`}>
                                                                    <Star className="text-yellow-500" size={28} fill="currentColor" stroke="currentColor" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </>
                                                        )}
                                                    </td>
                                                    <td className="pr-1 py-1 text-center">
                                                        <button  onClick={() => HandleGetDetails(item.id, openViewModal)}  className="btn text-white hover:bg-blue-600 bg-blue-700 px-3 py-1 rounded-md">View</button>
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
                    <ViewModal isOpen={isViewModalOpen} closeModal={closeViewModal} title="Parking Details" Size={'w-full mx-1 md:w-8/12 '} Height={'max-h-[500px]'}>
                        <div className="w-full grid mb-2 grid-cols-4">
                            <div className="col-span-4 mt-3">
                                <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Ref#  </label>
                                <input type="text" id="name" value={details.space_id+ "-" +formatNumber(details.id,8)}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Space name" 
                                    required />
                            </div>
                            <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                <label for="rules" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Vehicle </label>
                                <input type="text" id="name" value={details.vehicle_type + " - " +  details.brand+ " - " +details.cr_file_number}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Space name" 
                                    required />
                            </div>
                            <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Parking Space</label>
                                <input type="text" id="name" value={details.space_name}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Space name" 
                                    required />
                            </div>
                            <div className="col-span-4 lg:col-span-2 lg:mr-1 mt-3">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                <input type="text" id="name" value={format(new Date(details.time_start), "MMM d, yyyy h:mm a") + " - " + format(new Date(details.time_end), "MMM d, yyyy h:mm a")}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Space name" 
                                    required />
                            </div>
                            <div className="col-span-4 lg:col-span-2 lg:ml-0 mr-1mt-3">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Fee</label>
                                <input type="text" id="name" value={formatCurrency(details.amount, "PHP", "en-PH")}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Space name" 
                                    required />
                            </div>
                            <div className="col-span-4 lg:col-span-2 lg:ml-0 mt-3">
                                <label for="description" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                {details.rate === null ? (
                                    <div className="mt-3 ml-2">
                                        N/A
                                    </div>
                                ) :(
                                    <>
                                    <div className=" ml-2">
                                        <div className="relative w-7 h-7">
                                            <Star className="absolute text-gray-500 " size={28} fill="currentColor" stroke="currentColor" />
                                            <div className={`absolute top-0 left-0 w-${details.rate}/5 overflow-hidden`}>
                                            <Star className="text-yellow-500" size={28} fill="currentColor" stroke="currentColor" />
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )}
                            </div>
                        </div> 
                    </ViewModal>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
  }