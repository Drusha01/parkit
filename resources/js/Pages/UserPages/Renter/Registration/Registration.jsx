import { Link, usePage } from '@inertiajs/react'
import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';
import {React, useState} from 'react';

export default function RenterRegistration() {
    return (
        <>
            <RenterLayout>
            <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                <div className="">
                    <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                        Registration
                    </div>
                    <div className="flex justify-center w-full"> 
                        <ol className="flex w-full mx-40 mb-10">
                            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                <button>
                                    <span className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                        <svg className="w-6 h-6 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg"><g  stroke-width="0"></g>
                                            <g  stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" 
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" 
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> 
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                <button>
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                <button >
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" width="25px" viewBox="0 0 100 100" aria-hidden="true" role="img" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g >
                                                <path d="M49.368 11.228c-11.646-.171-27.826.079-31.156 9.027l-8.184 19.204a2.85 2.85 0 0 0-1.37-.865l-3.296-.927a2.86 2.86 0 0 0-3.534 1.983l-1.72 6.104a2.86 2.86 0 0 0 1.983 3.535l3.297.927c.11.03.22.04.33.059c-.63 1.569-1.023 3.295-1.023 4.322v22.32c0 1.145.48 1.674 1.243 1.922v5.947a4.008 4.008 0 0 0 4.017 4.017H20.73a4.008 4.008 0 0 0 4.017-4.017v-5.729h50.504v5.729a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017v-5.947c.763-.248 1.24-.777 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.322c.11-.018.22-.028.33-.06l3.297-.926a2.86 2.86 0 0 0 1.982-3.535l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.37.865l-8.185-19.204c-3.57-9.084-20.773-8.856-32.42-9.027zm33.358 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.435.026c-10.596 0-31.738-1.877-31.738-1.877c-.607-.036-1.187-.419-.993-.995c8.142-24.821 8.385-22.955 32.275-22.694c23.891.26 24.03-1.513 33.177 22.694zm-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.356-10.292.719-15.424.93a8.879 8.879 0 0 1 7.977-4.921zM9.407 46.511c.072.106.142.213.221.317h-.31zm5.294 6.234c2.096-.035 13.348 3.753 13.348 3.753c1.405.395 2.642 3.051 2.635 4.511c-.021 4.917-12.71 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.635zm70.598 0c2.096.034 4.512 1.175 4.512 2.635v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.23c-.007-1.46 1.23-4.117 2.635-4.512c0 0 11.252-3.788 13.348-3.753z" fill="currentColor">
                                                </path>
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            <li className="flex items-center">
                                <button >
                                    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                                        <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ol>
                    </div>
                    <div className="w-full ">
                        <div className="my-5 ml-10 text-xl font-semibold">Profile details</div>
                        <div className="mb-2 mx-2">
                            <label for="firstname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First name <span className="text-red-600">*</span></label>
                            <input type="text" id="firstname" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                        </div> 
                        <div className="mb-2 mx-2">
                            <label for="middlename" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                            <input type="text" id="middlename" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Middle name" required />
                        </div> 
                        <div className="mb-2 mx-2">
                            <label for="lastname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last name <span className="text-red-600">*</span></label>
                            <input type="text" id="lastname" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                        </div> 
                        <div className="w-full grid mb-2 md:grid-cols-4">
                            <div className="mx-2 col-span-4 md:col-span-4 md:mr-2 lg:col-span-2 lg:mr-1 xl:mr-1">
                                <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                                <input type="text" id="suffix" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Suffix" required />
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 mx-2 md:mr-1 lg:ml-0 lg:mr-2 xl:mr-1">
                                <label for="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="tel" id="phone" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 md:ml-0 xl:col-span-1 mx-2 lg:mr-1 lg:ml-2 xl:mr-2 xl:ml-0 mb-2 ">
                                <label for="birthdate" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Birthdate <span className="text-red-600">*</span></label>
                                <input id="birthdate" type="date" 
                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 mx-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Sex <span className="text-red-600">*</span></label>
                                <div className="flex justify-between border border-black rounded-lg w-full hover:bg-gray-100 text-start p-2">
                                    <div className="text-start">
                                        Select Region
                                    </div>
                                    <div className="text-end">
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-2 lg-colspan-2 xl-colspan-2 mr-0">
                                <div className="flex">
                                    <div className="w-2/3 ml-2 mr-1">
                                        <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Sex <span className="text-red-600">*</span></label>
                                        <select id="sex" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Femail">Female</option>
                                        </select>
                                    </div>
                                    <div className="w-1/3 ml-0 mr-0">
                                        <label for="region-filter" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Search region</label>
                                        <input type="text" id="region-filter" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
    
                                    </div>
                                </div>
                            </div>
                            <div className="mx-2 mr-2 md:mr-1">
                                <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" id="suffix" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Suffix" required />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-evenly w-full mt-5"> 
                        <button className="bg-gray-600 text-white rounded-lg p-3 py-2">
                            Prev
                        </button>
                        <button className="bg-green-600 text-white rounded-lg p-3 py-2">
                            Next
                        </button>
                    </div>
                    <div className="w-full ">
                        <div className="my-5 ml-10 text-xl font-semibold">
                            License details
                        </div>
                        <div className="w-full grid mb-2 md:grid-cols-4">
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="nationality">Nationality <span className="text-red-600">*</span></label>
                                <input type="text" id="nationality" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Nationality"  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="sex">Sex <span className="text-red-600">*</span></label>
                                <select id="sex" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Femail">Female</option>
                                </select>
                            </div>
                            <div className="col-span-2 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mr-0 ml-2 lg:ml-2 lg:mr-0 xl:ml-0 xl:mr-0 mb-2">
                                <label for="weight" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Weight (kg) <span className="text-red-600">*</span></label>
                                <input type="number" id="weight" min="0"step="0.01" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="weight in kg"  required />
                            </div>
                            <div className="col-span-2 md:col-span-2 md:ml-0 lg:col-span-2 mr-2 ml-1 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-2 xl:ml-1 mb-2">
                                <label for="height" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Height (m) <span className="text-red-600">*</span></label>
                                <input type="number" id="height" min="0" step="0.01" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="height in meters"  required />
                            </div>
                        </div>
                        <div className="w-full grid mb-2 md:grid-cols-4">
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                <label for="license-no" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">License no. <span className="text-red-600">*</span></label>
                                <input type="text" id="license-no"  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="License no."  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                <label for="expiration-date" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Expiration date <span className="text-red-600">*</span></label>
                                <input id="expiration-date" type="date" 
                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-2 lg:mr-0 xl:ml-0 xl:mr-0 mb-2">
                                <label for="agency-code" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Agency code <span className="text-red-600">*</span></label>
                                <input type="text" id="agency-code" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Agency code"  required />
                            </div>
                            <div className="col-span-2 md:col-span-2 md:ml-0 lg:col-span-2 ml-2 mr-1 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-2 xl:ml-1 mb-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="blood-type">Blood type <span className="text-red-600">*</span></label>
                                <select id="blood-type" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" selected>Select Bloodtype</option>
                                    <option value="1">A+</option>
                                    <option value="2">A-</option>
                                    <option value="3">B+</option>
                                    <option value="4">B-</option>
                                    <option value="5">O+</option>
                                    <option value="6">O-</option>
                                    <option value="7">AB+</option>
                                    <option value="8">AB-</option>
                                </select>
                            </div>
                            <div className="col-span-2 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mr-2 ml-0 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-0 mb-2">
                                <label for="eye-color" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Eye Color<span className="text-red-600">*</span></label>
                                <select id="eye-color" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" selected>Select Eye color</option>
                                    <option value="1">Brown</option>
                                    <option value="2">Amber</option>
                                    <option value="3">Hazel</option>
                                    <option value="4">Green</option>
                                    <option value="5">Blue</option>
                                    <option value="6">Gray</option>
                                </select>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:col-span-1 xl:mr-1 xl:ml-1 mb-2">
                                <label for="conditions" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Conditions <span className="text-red-600">*</span></label>
                                <select id="conditions" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" selected>Select Conditions</option>
                                    <option value="1">Condition 1 - Wear eyeglasses</option>
                                    <option value="2">Condition 2 - Drive with special equipment for upper/lower limbs*</option>
                                    <option value="3">Condition 3 - Customized vehicle only</option>
                                    <option value="4">Condition 4 - Daylight driving only*</option>
                                    <option value="5">Condition 5 - Should always be accompanied by a person without hearing impairment</option>
                                </select>
                            </div>
                            <div className="col-span-4 md:col-span-4 md:ml-2 lg:col-span-4 mx-2 xl:col-span-2 xl:mr-2 xl:ml-0  mb-2">
                                <label for="dl-code" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Driver license code <span className="text-red-600">*</span></label>
                                <input type="text" id="dl-code"className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Restriction codes"  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1  mb-2">
                                <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture of License <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-of-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0  mb-2">
                                <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Picture holding license <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-holding-license" type="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="my-5 ml-10 text-xl font-semibold">
                            Vehicles
                        </div>
                        <div className="flex justify-end mx-10">
                            <button className=" bg-green-700 text-white rounded-lg p-3 py-2">
                                Add
                            </button>
                        </div>
                        <div className="w-full grid mb-2 md:grid-cols-4 ">
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1 mb-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="blood-type">Vehicle type <span className="text-red-600">*</span></label>
                                <select id="blood-type" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="" selected>Select Vehicle type</option>
                                    <option value="1">M - Motorcycle</option>
                                    <option value="2">C - Car</option>  
                                    <option value="3">T - Tricycle</option>
                                    <option value="4">J - Jeepney</option>
                                    <option value="5">V - Van</option>
                                    <option value="6">LCV - Light Comercial Vehicle</option>
                                    <option value="7">HCV - Heavy Comercial Vehicle</option>
                                    <option value="8">LB - Light Buses</option>
                                    <option value="9">HB - Heavy Buses</option>
                                    <option value="10">LAV - Light Articulated Vehicle</option>
                                    <option value="11">HAV - Heavy Articulated Vehicle</option>
                                </select>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0 mb-2">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="nationality">Plate number <span className="text-red-600">*</span></label>
                                <input type="text" id="nationality" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Nationality"  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1 mb-2">
                                <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Certificate of Registration <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-of-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0 mb-2">
                                <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Official Registration <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-holding-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1 mb-2">
                                <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Front side picture <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-of-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0 mb-2">
                                <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Back side picture <span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-holding-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1 mb-2">
                                <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Left side picture<span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-of-license" type="file"/>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0 mb-2">
                                <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Right side picture<span className="text-red-600">*</span></label>
                                <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                    id="picture-holding-license" type="file"/>
                            </div>
                        </div>    
                    </div>    
                </div>
            </div>
            </RenterLayout>
        </>
    )
};
