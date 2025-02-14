import {React, useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import { format } from "date-fns";
import BasicPagination from '../../../../Components/Pagination/BasicPagination';

export default function RenterWallet(props) {
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
        axios.post( "/renter/wallet/all" , {  
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
            <RenterLayout>
            <div className="main-content w-full lg:w-4/5 shahow-xl bg-white dark:bg-gray-700 dark:text-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                    <div className="flex-none lg:flex xl:flex xxl:flex">
                        <div className="w-full">
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
                            <div className="content mx-5 my-10">   
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-200 dark:text-black ">
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
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
