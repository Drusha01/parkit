import React from 'react'
import { Link, usePage } from '@inertiajs/react'

import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
export default function MySpaces() {
    return (
        <>
            <SpaceOwnerLayout>
                <main className="text-white">
                    <nav className=" border border-gray-200">
                    <ul className="flex py-2 text-black ml-2">
                            <li className="flex align-middle font-semibold text-sm ml-2">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces">
                                    Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="w-50 text-black flex justify-between">
                        <div className="m-5 text-lg font-semibold">   
                            My Spaces
                        </div>
                                <Link type="button" href='/spaceowner/spaces/add' className="mt-5 mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Add
                                </Link>
                    </div>
                            {/* <ModalSample props={{
                                size:"w-11/12",
                                title: 'Sample Modal Title',
                                buttonText:'Change password',
                                buttonClass: 'bg-main-color text-white py-2.5 text-center rounded-lg',
                                submitButtonText: 'Save',
                                submitButtonClass: 'bg-green-600 text-white py-2.5 px-3.5 rounded-lg',
                            }}>
                                <div>inner</div>
                            </ModalSample> */}
     
                    <div className="content">
                        <div className="content-header w-full my-2">
                            <div className="ml-5 max-w-sm ">   
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..."/>
                                </div>
                            </div>
                        </div>   
                        <div className="content-body">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4 mb-2">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-900">
                                        <tr className="text-md">
                                            <th scope="col" className="pl-5 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" className="py-3">
                                                Color
                                            </th>
                                            <th scope="col" className="py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="py-4">
                                                Silver
                                            </td>
                                            <td className="py-4">
                                                Laptop
                                            </td>
                                            <td className="py-4">
                                                $2999
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                            </td>
                                        </tr>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className=" pl-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Microsoft Surface Pro
                                            </th>
                                            <td className="py-4">
                                                White
                                            </td>
                                            <td className="py-4">
                                                Laptop PC
                                            </td>
                                            <td className="py-4">
                                                $1999
                                            </td>
                                            <td className="py-4 text-center">
                                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                        <div className="content-footer mx-5">
                            pagination
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
}