import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';

export default function RenterWallet() {
    return (
        <>
            <RenterLayout>
            <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                    <div className="flex-none lg:flex xl:flex xxl:flex">
                        <div className="w-full">
                            <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                                My Wallet
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="flex border border-black p-2">
                                    <div className="h-full flex align-middle mt-3 mx-3">
                                        P90.00
                                    </div>
                                    <button className="btn flex justify-center bg-main-color text-white hover:bg-blue-900">
                                        <svg viewBox="0 0 24 24" className='text-white '  width="15px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                        Top up
                                    </button>
                                </div>
                            </div>
                            <div className="content mx-5 my-10">   
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6">
                                                    Transactions
                                                </th>
                                                <th scope="col" class="px-6">
                                                    Balance
                                                </th>
                                                <th scope="col" class="px-6 justify-center flex">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Top up
                                                </th>
                                                <td class="px-6">
                                                    +102.30
                                                </td>
                                                <td class="flex justify-center">
                                                    <button className=" w-14 rounded-lg py-2 my-2 border border-black flex justify-center hover:bg-gray-100 hover:border-opacity-0">
                                                        sd
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Park
                                                </th>
                                                <td class="px-6">
                                                    -46.30
                                                </td>
                                                <td class="flex justify-center">
                                                <button className=" w-14 rounded-lg py-2 my-2 border border-black flex justify-center hover:bg-gray-100 hover:border-opacity-0">
                                                        sd
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr class="bg-white dark:bg-gray-800">
                                                <th scope="row" class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Top up
                                                </th>
                                                <td class="px-6">
                                                    +86.30
                                                </td>
                                                <td class="flex justify-center">
                                                    <button className=" w-14 rounded-lg py-2 my-2 border border-black flex justify-center hover:bg-gray-100 hover:border-opacity-0">
                                                        sd
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
