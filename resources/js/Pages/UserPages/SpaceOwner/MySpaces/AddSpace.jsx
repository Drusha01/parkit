import { Link, usePage } from '@inertiajs/react'
import {React, useState} from 'react';
import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';
export default function AddSpace() {
    const [values,setValues] = useState({
        step:1,
        name:""
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleFileChange = (event) => {
        const key = event.target.id;
        const value = event.target.value
        setRegistration(values => ({
            ...values,
        }))
    };

    const handlePrevSubmit = () =>{
        if(values.step >1){
            setValues(values => ({
                ...values,
                step: values.step - 1,
            }))
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues(values => ({
            ...values,
            step: values.step + 1,
        }))
        if(values.step == 1){
        }else if(values.step == 2){
        }else if(values.step == 3){
        }else if(values.step == 3){
        }

    }

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
                                <svg fill="#000000" className="h-full align-middle ml-1" width="11" height="8"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex align-middle font-semibold text-sm ml-1">
                                <Link href="/spaceowner/spaces/add">
                                    Add Spaces 
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-50 text-black ">
                        <div className="m-5 text-lg font-semibold flex justify-start">   
                            Add Space
                        </div>
                        <div className="content">
                            <div className="content-header w-full my-2">
                                
                            </div>    
                            <div className="content-body">
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <div className="space w-full min-h-[500px]">
                                    {values.step == 1 && (
                                        <>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-5 md:mr-1">
                                                    <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space name</label>
                                                    <input type="text" id="name" value={values.name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space name"  />
                                                </div>
                                                <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 xxl:col-span-2 mx-2 md:ml-0 md:mr-5">
                                                    <label for="area_m2" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space area</label>
                                                    <input type="text" id="area_m2" value={values.name} onChange={handleChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space area in square meter"  />
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:mr-1 mt-3">
                                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Rules</label>
                                                    <textarea id="rules" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space rules ..."></textarea>
                                                </div>
                                                <div className="col-span-4 mx-2 md:mx-5 lg:col-span-2 lg:ml-0 mt-3">
                                                    <label for="message" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                    <textarea id="rules" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder="Space description ..."></textarea>
                                                </div>
                                                <div className="col-span-4 mx-2 lg:mx-5 mt-3">
                                                    <div className="h-60 bg-gray-200 rounded-lg">
                                                        map here
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {values.step == 2 && (
                                        <>
                                            <div className="w-full grid mb-2 grid-cols-4">
                                                <div className="col-span-4 mx-2 md:mx-5">
                                                    <label for="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Space pictures</label>
                                                    <input onChange={handleFileChange}  className="block w-full text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                                                       id="picture_holding_license" name='files' accept="image/*" multiple type="file" />
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5 overflow-auto max-h-[600px] justify-items-center">
                                                <div className=''>
                                                    <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                                                    <button type="button" class="relative bottom-10 left-1/2 transform -translate-x-1/2 bg-red-700 opacity-50 border-red-700 border text-white shadow-lg py-2 px-6 rounded hover:bg-red-600 hover:opacity-100 focus:outline-none">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    </div>
                                    <div className="flex justify-evenly w-full mt-5"> 
                                        <button type="button" className={values.step == 1 ? "bg-gray-600 text-white rounded-lg p-3 py-2 opacity-0 ":"bg-gray-600 text-white rounded-lg p-3 py-2"} onClick={handlePrevSubmit}>
                                            Prev
                                        </button>
                                        {values.step <=3?
                                            <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                                Next
                                            </button>
                                        :
                                        <button type="submit" className="bg-green-600 text-white rounded-lg p-3 py-2">
                                            Submit
                                        </button>
                                        }
                                    </div>
                                </form>    
                            </div>     
                            <div className="content-footer">

                            </div>
                        </div>

                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
};

