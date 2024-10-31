import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';

export default function RenterRegistration() {
    return (
        <>
            <RenterLayout>
            <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                <div className="">
                    <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                        License Registration
                    </div>
                    <div className="w-full ">
                        <div class="mb-2 mx-2">
                            <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First name <span className="text-red-600">*</span></label>
                            <input type="text" id="firstname" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                        </div> 
                        <div class="mb-2 mx-2">
                            <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                            <input type="text" id="firstname" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Middle name" required />
                        </div> 
                        <div class="mb-2 mx-2">
                            <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last name <span className="text-red-600">*</span></label>
                            <input type="text" id="firstname" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                        </div> 
                        <div class="w-full grid mb-2 md:grid-cols-4">
                            <div className="mx-2 col-span-4 md:col-span-4 md:mr-2 lg:col-span-2 lg:mr-1 xl:mr-1">
                                <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                                <input type="text" id="suffix" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Suffix" required />
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 mx-2 md:mr-1 lg:ml-0 lg:mr-2 xl:mr-1">
                                <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <input type="tel" disabled id="phone" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                            </div>
                            <div className="col-span-4 md:col-span-2 lg:col-span-2 md:ml-0 xl:col-span-1 mx-2 lg:mr-1 lg:ml-2 xl:mr-2 xl:ml-0 ">
                                <label for="website" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Birthdate <span className="text-red-600">*</span></label>
                                <input type="url" id="website" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                            </div>
                            <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-1 mx-2 lg:ml-0 lg:mr-2 xl:ml-2 xl:mr-0">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="username">Nationality <span className="text-red-600">*</span></label>
                                <select id="countries" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select Nationality</option>
                                    <option value="Male">Filipino</option>
                                    <option value="Femail">American</option>
                                </select>
                            </div>
                            <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 mx-2 lg:mr-1 lg:ml-2 xl:col-span-1 xl:mr-1 xl:ml-1">
                                <label className="block text-gray-700 mb-1 text-sm font-bold" for="username">Sex <span className="text-red-600">*</span></label>
                                <select id="countries" tabindex="5" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Femail">Female</option>
                                </select>
                            </div>
                            <div className="col-span-2 ml-2 mr-1 lg:col-span-1 lg:mr-1 lg:ml-0">
                                <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Weight <span className="text-red-600">*</span></label>
                                <input type="tel" disabled id="phone" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                            </div>
                            <div className="col-span-2 ml-1 mr-2 md:ml-0 lg:col-span-1 lg:mr-2 xl:ml-0">
                                <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Height <span className="text-red-600">*</span></label>
                                <input type="tel" disabled id="phone" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                            </div>
                        </div>
                        <div class="w-full grid mb-2 md:grid-cols-4">
                            <div className="col-span-2 ml-1 mr-2 md:ml-0 lg:col-span-1 lg:mr-2 xl:ml-0">
                                <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Height <span className="text-red-600">*</span></label>
                                <input type="tel" disabled id="phone" class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09876543210"  required />
                            </div>
                        </div>
                        <div className="mx-2 mr-2 md:mr-1">
                            <label for="suffix" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" id="suffix" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Suffix" required />
                        </div>
                    </div>
                </div>
            </div>
            </RenterLayout>
        </>
    )
};
