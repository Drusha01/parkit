import React from 'react';
import { Link, usePage } from '@inertiajs/react'

import { RenterLayout } from '../../../../Layout/RenterLayout.jsx';

export default function RenterVehicles(props) {
    return (
        <>
            <RenterLayout props={props}>
                <div className="main-content w-full lg:w-4/5 shahow-xl bg-white md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl min-h-[500px]">   
                    <div className="">
                        <div className="flex justify-center w-full mt-10 mb-5 font-semibold text-xl">
                            Vehicles
                        </div>
                        <div className="w-full ">
                            <div className="flex justify-end mx-10">
                                <button className=" bg-green-700 text-white rounded-lg p-3 py-2">
                                    Add
                                </button>
                            </div>
                            <div className="w-full grid mb-2 md:grid-cols-4">
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1">
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
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0">
                                    <label className="block text-gray-700 mb-1 text-sm font-bold" for="nationality">Plate number <span className="text-red-600">*</span></label>
                                    <input type="text" id="nationality" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="Nationality"  required />
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1">
                                    <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Certificate of Registration <span className="text-red-600">*</span></label>
                                    <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture-of-license" type="file"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0">
                                    <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Official Registration <span className="text-red-600">*</span></label>
                                    <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture-holding-license" type="file"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1">
                                    <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Front side picture <span className="text-red-600">*</span></label>
                                    <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture-of-license" type="file"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0">
                                    <label for="picture-holding-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Back side picture <span className="text-red-600">*</span></label>
                                    <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture-holding-license" type="file"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:mr-1 lg:col-span-2 xl:col-span-2 mx-2 lg:ml-2 lg:mr-0 xl:ml-2 xl:mr-1">
                                    <label for="picture-of-license" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Left side picture<span className="text-red-600">*</span></label>
                                    <input className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                        id="picture-of-license" type="file"/>
                                </div>
                                <div className="col-span-4 md:col-span-2 md:ml-0 lg:col-span-2 xl:col-span-2 mx-2 lg:mr-2 lg:ml-1 xl:mr-2 xl:ml-0">
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
