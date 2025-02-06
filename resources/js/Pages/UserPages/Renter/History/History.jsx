import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';

export default function RenterHistory() {
      const transactions = [
        { id: 1,  reference_no: '132c-asf3-asd13',vehicle: 'Sniper 150', parking_space: 'SM Mindpro Basement', location:"21,223",time_in_and_out:"Nov 15, 2024 2:12 pm - Nov 15, 2024 5:00 pm",fee:"P 30.5 " },
        
      ];
    return (
        <>
            <RenterLayout>
                <div className="main-content w-full lg:w-4/5 bg-white dark:text-white dark:bg-gray-700 rounded-xl shadow-lg">   
                    <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-6">History</h1>
                    
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2 dark:border dark:border-white">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs uppercase bg-gray-300 dark:bg-gray-200 dark:text-black ">
                                <tr className="bg-gray-100 text-left">
                                    <th className="px-2 font-semibold text-center text-gray-600 py-4">#</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600">Ref#</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600">Vehicle</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600">Parking Space</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Location</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Time</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600">Fee</th>
                                    <th className="pr-1 py-1 font-semibold text-gray-600 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                <tr key={transaction.id} className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="pr-1 py-1 ">{transaction.id}</td>
                                    <td className="pr-1 py-1 ">{transaction.reference_no}</td>
                                    <td className="pr-1 py-1 ">{transaction.vehicle}</td>
                                    <td className="pr-1 py-1 ">{transaction.parking_space}</td>
                                    <td className="pr-1 py-1 text-center">{transaction.location}</td>
                                    <td className="pr-1 py-1 text-center">{transaction.time_in_and_out}</td>
                                    <td className="pr-1 py-1 ">{transaction.fee}</td>
                                    <td className="pr-1 py-1 flex justicy-center">
                                        <button className="btn text-white hover:bg-blue-600 bg-blue-700 px-3 py-1 rounded-md">View</button>
                                        <button className="btn text-white hover:bg-yellow-600 bg-yellow-700 px-3 py-1 rounded-md ml-2">Rate</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </RenterLayout>
        </>
    )
};
