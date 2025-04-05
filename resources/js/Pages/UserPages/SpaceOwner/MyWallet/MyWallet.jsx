import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { format } from "date-fns";
import BasicPagination from '../../../../Components/Pagination/BasicPagination';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';

export default function MySpaces(props) {
    const [walletBalances, SetWalletBalances] = useState(props.wallet_balances)
    const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
        }).format(amount);
    };
    const formatNumber = (num,padding) => {
        return String(num).padStart(padding, "0");
    };

    const [content, setContent] = useState({
        data:[],
        total:0,
        page:1,
        rows:10,
        search:"",
    })

    useEffect(() => {
        GetData()
    }, []);
      useEffect(() => {
        GetData()
    }, [content.page]);

    
    const GetData = () =>{
        axios.post( "/spaceowner/wallet/all" , {  
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
    const HandleVehicleNextPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page+1,
        }));
    }
    const HandleVehiclePrevPage = () => {
        setContent((prevContent) => ({
            ...prevContent,
            page:prevContent.page-1,
        }));
    }
    return (
        <>
            <SpaceOwnerLayout>
                <main className="dark:text-white text-black">
                    <nav className="my-1">
                        <ul className="flex py-2 text-black dark:text-white ml-2 ">
                            <li className="flex align-middle font-semibold text-md ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="currentColor" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-md ml-1">
                                <Link href="/spaceowner/wallet">
                                    Wallet 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="content">
                        <div className="content-header my-2 mx-1 md:mx-4">
                            <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                                My Wallet
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="flex border dark:border-white border-black p-2">
                                    <div className="h-full flex align-middle mx-3">
                                        {walletBalances !== null ? (
                                            <>
                                            {formatCurrency(walletBalances.amount, "PHP", "en-PH")}
                                            </>
                                            ) : (
                                                <>
                                                {formatCurrency(0, "PHP", "en-PH")}
                                                </>
                                                )}
                                    </div>
                                    {/* <button className="btn flex justify-center bg-main-color text-white hover:bg-blue-900">
                                        <svg viewBox="0 0 24 24" className='text-white '  width="15px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        Top up
                                    </button> */}
                                </div>
                            </div>
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
                                                Transactions
                                            </th>
                                            <th scope="col" class="px-1">
                                                Details
                                            </th>
                                            <th scope="col" class="px-1">
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {content.data.length > 0 ? 
                                        (content.data.map((item, index) => (
                                            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <td className="px-3 py-2 text-center">{index + 1 + (content.page - 1) * content.rows}</td>
                                                <td className="pr-1 py-1  ">{item.rent_id !== null ? (
                                                    <>
                                                        #{item.space_id}-{formatNumber(item.id,8)} 
                                                    </>
                                                    ):(
                                                        <>
                                                            Top up
                                                        </>
                                                        )}</td>
                                                <td className="pr-1 py-1 ">{item.log_details}</td>
                                                <td className="pr-1 py-1 ">{formatCurrency(item.amount_paid, "PHP", "en-PH")}</td>
                                                {/* <td className="pr-1 py-1 text-center">{format(new Date(item.time_start), "MMM d, yyyy h:mm a")} - {format(new Date(item.time_end), "MMM d, yyyy h:mm a")}  </td> */}
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
                            <BasicPagination currentPage={content.page} perPage={content.rows} TotalRows={content.total} PrevPageFunc={HandleVehiclePrevPage} NextPageFunc={HandleVehicleNextPage} />
                        </div>             
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
  }