import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { AdminLayout } from '../../../../Layout/AdminLayout.jsx';
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import HeaderSearch from '../../../../Components/Search/HeaderSearch';
import { format } from "date-fns";

export default function Comission(data) {
    const [content,setContent] = useState({
        data:[],
        total:0,
        page:null,
        rows:10,
        search:null,
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
        axios.post( "/admin/commission/all" , {  
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

    const openTopUpModal = () =>{

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
                                <Link href="/admin/wallet">
                                    Comission 
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
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Ref#</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Vehicle</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Parking Space</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Time</th>
                                            <th className="pr-1 py-1 font-semibold text-gray-600">Commission</th>
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
                                                    <td className="pr-1 py-1 ">{formatCurrency(item.commission, "PHP", "en-PH")}</td>
                                                 
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