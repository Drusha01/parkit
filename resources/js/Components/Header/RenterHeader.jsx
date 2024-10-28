import {React, useState } from 'react';
import { Link, usePage } from '@inertiajs/react'
import { NavLink } from 'react-router-dom';

let isOpen = false
export const RenterHeader = () => {
    const [isToggled, setIsToggled] = useState(false);


    function handleClick(){
        setIsToggled(!isToggled)
    }
    return (
        <>
            <header>
                <nav className="bg-main-color h-[80px] text-white fixed top-0 left-0 w-full z-50 shadow-2xl" >
                    <div className="flex justify-between h-full">
                        <div className="flex items-center  h-full">
                            <Link href="/">
                                <img src="/img/logo.png" className="ml-5" width="100px" alt=""/>
                            </Link>
                        </div>
                        <div className="items-center hidden lg:flex"> 
                            <ul className="flex jusitfy-center items-center h-full gap-3">
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/browse">
                                        Browse
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/howitworks">
                                    How it works
                                    </Link>
                                </li>
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/aboutus">
                                    About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>  
                        <div className="items-center hidden lg:flex mr-3"> 
                            <div className="h-full flex items-center text-end">
                                Hanrickson Dumapit
                            </div>
                            <div className="h-full flex items-center mx-3">
                                <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </button>
                                <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Help and Support
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                Privacy 
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden">
                            <div className="items-center mr-5 mt-7 "  type="button" 
                                data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" 
                                data-drawer-placement="right" aria-controls="drawer-right-example"  htmlFor="my-drawer-4">
                                <svg viewBox="0 -2 32 32" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>hamburger-2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1037.000000)" fill="#ffffff"> <path d="M336,1063 L312,1063 C310.896,1063 310,1062.1 310,1061 C310,1059.9 310.896,1059 312,1059 L336,1059 C337.104,1059 338,1059.9 338,1061 C338,1062.1 337.104,1063 336,1063 L336,1063 Z M336,1057 L312,1057 C309.791,1057 308,1058.79 308,1061 C308,1063.21 309.791,1065 312,1065 L336,1065 C338.209,1065 340,1063.21 340,1061 C340,1058.79 338.209,1057 336,1057 L336,1057 Z M336,1053 L312,1053 C310.896,1053 310,1052.1 310,1051 C310,1049.9 310.896,1049 312,1049 L336,1049 C337.104,1049 338,1049.9 338,1051 C338,1052.1 337.104,1053 336,1053 L336,1053 Z M336,1047 L312,1047 C309.791,1047 308,1048.79 308,1051 C308,1053.21 309.791,1055 312,1055 L336,1055 C338.209,1055 340,1053.21 340,1051 C340,1048.79 338.209,1047 336,1047 L336,1047 Z M312,1039 L336,1039 C337.104,1039 338,1039.9 338,1041 C338,1042.1 337.104,1043 336,1043 L312,1043 C310.896,1043 310,1042.1 310,1041 C310,1039.9 310.896,1039 312,1039 L312,1039 Z M312,1045 L336,1045 C338.209,1045 340,1043.21 340,1041 C340,1038.79 338.209,1037 336,1037 L312,1037 C309.791,1037 308,1038.79 308,1041 C308,1043.21 309.791,1045 312,1045 L312,1045 Z" id="hamburger-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                            </div>
                            <div id="drawer-right-example" className={false == false ? "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800": "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 transform-none"} tabIndex="-1" aria-labelledby="drawer-right-label">
                                <button type="button"    data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="mr-2 text-gray-400 bg-transparent hover:bg-gray-200 mt-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.707,8.707,13.414,12l3.293,3.293a1,1,0,1,1-1.414,1.414L12,13.414,8.707,16.707a1,1,0,1,1-1.414-1.414L10.586,12,7.293,8.707A1,1,0,1,1,8.707,7.293L12,10.586l3.293-3.293a1,1,0,1,1,1.414,1.414Z"></path></g></svg>
                                </button>
                                <div id="accordion-flush" className="mt-10" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                                    <h2 id="accordion-flush-heading-1">
                                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                                        <span>
                                            <div className="flex gap-2">
                                                <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                <div className="mt-1">
                                                    Profile
                                                </div>
                                            </div>
                                        </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                                        <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                                        </div>
                                    </div>
                                    <h2 id="accordion-flush-heading-2">
                                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
                                        <span>
                                            <div className="flex gap-2">
                                                <svg viewBox="0 0 24 24" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H10M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V10M9 17H11.5M9 13H14M9 9H10M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                <div className="mt-1">
                                                    My Registration
                                                </div>
                                            </div>
                                        </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
                                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                                        <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                                        </div>
                                    </div>
                                    <h2 id="accordion-flush-heading-3">
                                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
                                        <span>
                                            <div className="flex gap-2">
                                                <svg viewBox="0 0 24 24"  width="30px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                <div className="mt-1">
                                                    My Vehicles
                                                </div>
                                            </div>
                                        </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
                                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                                                <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                                <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h2 id="accordion-flush-heading-4">
                                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" 
                                            data-accordion-target="#accordion-flush-body-4" aria-expanded="false" aria-controls="accordion-flush-body-4">
                                        <span>
                                            <div className="flex gap-2">
                                                <svg version="1.1"  width="30px" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <path className="linesandangles_een" d="M24,19V7c0-1.657-1.343-3-3-3H7C5.343,4,4,5.343,4,7v5h4v12c0,1.657,1.343,3,3,3h14 c1.657,0,3-1.343,3-3v-5H24z M8,10H6V7c0-0.551,0.449-1,1-1c0.552,0,1,0.448,1,1V10z M10,24V7c0-0.35-0.06-0.687-0.171-1H21 c0.551,0,1,0.449,1,1v12H12v5c0,0.552-0.448,1-1,1C10.449,25,10,24.551,10,24z M26,24c0,0.551-0.449,1-1,1H13.829 C13.94,24.687,14,24.35,14,24v-3h12V24z M20,12h-8v-2h8V12z M20,16h-8v-2h8V16z"></path> </g></svg>
                                                <div className="mt-1">
                                                    History
                                                </div>
                                            </div>
                                        </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-flush-body-4" className="hidden" aria-labelledby="accordion-flush-heading-4">
                                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                                                <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                                <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h2 id="accordion-flush-heading-5">
                                        <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" 
                                            data-accordion-target="#accordion-flush-body-5" aria-expanded="false" aria-controls="accordion-flush-body-5">
                                        <span>
                                            <div className="flex gap-2">
                                               <svg viewBox="0 0 24 24"  width="30px"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 14.93C11.4205 14.93 10.854 14.7582 10.3722 14.4362C9.89035 14.1143 9.51481 13.6567 9.29304 13.1213C9.07128 12.5859 9.01325 11.9968 9.12631 11.4284C9.23936 10.86 9.51842 10.338 9.92819 9.92819C10.338 9.51842 10.86 9.23936 11.4284 9.12631C11.9968 9.01325 12.5859 9.07128 13.1213 9.29304C13.6567 9.51481 14.1143 9.89035 14.4362 10.3722C14.7582 10.854 14.93 11.4205 14.93 12C14.93 12.7771 14.6213 13.5224 14.0718 14.0718C13.5224 14.6213 12.7771 14.93 12 14.93ZM12 10.57C11.7172 10.57 11.4407 10.6539 11.2055 10.811C10.9704 10.9681 10.7871 11.1915 10.6789 11.4528C10.5706 11.7141 10.5423 12.0016 10.5975 12.279C10.6527 12.5564 10.7889 12.8112 10.9888 13.0112C11.1888 13.2112 11.4436 13.3474 11.721 13.4025C11.9984 13.4577 12.2859 13.4294 12.5472 13.3212C12.8085 13.2129 13.0319 13.0296 13.189 12.7945C13.3461 12.5593 13.43 12.2828 13.43 12C13.43 11.6207 13.2793 11.257 13.0112 10.9888C12.743 10.7207 12.3793 10.57 12 10.57Z" fill="#000000"></path> <path d="M12.06 20.75C11.7676 20.7487 11.4784 20.6896 11.2089 20.5762C10.9394 20.4628 10.6949 20.2973 10.4896 20.0892C10.2842 19.881 10.122 19.6344 10.0123 19.3634C9.90252 19.0924 9.84737 18.8024 9.85001 18.51C9.84606 18.4198 9.81676 18.3326 9.76546 18.2583C9.71416 18.184 9.64295 18.1257 9.56001 18.09C9.46824 18.0479 9.36604 18.034 9.26634 18.05C9.16665 18.066 9.07396 18.1112 9.00001 18.18C8.58482 18.592 8.02493 18.8253 7.44001 18.83C6.8514 18.8338 6.28454 18.6077 5.86001 18.2C5.6538 17.9938 5.49022 17.7491 5.37861 17.4797C5.26701 17.2103 5.20956 16.9216 5.20956 16.63C5.20956 16.3384 5.26701 16.0497 5.37861 15.7803C5.49022 15.5109 5.6538 15.2662 5.86001 15.06C5.93053 14.9957 5.98119 14.9126 6.006 14.8205C6.0308 14.7283 6.02873 14.631 6.00001 14.54C5.95128 14.4556 5.88137 14.3854 5.79719 14.3363C5.71301 14.2872 5.61747 14.2609 5.52001 14.26C4.93163 14.2577 4.36714 14.027 3.94554 13.6166C3.52393 13.2062 3.27815 12.6481 3.26001 12.06C3.26132 11.7685 3.32004 11.48 3.43282 11.2112C3.5456 10.9424 3.71022 10.6984 3.9173 10.4931C4.12437 10.2879 4.36984 10.1255 4.63969 10.0152C4.90953 9.9048 5.19847 9.84868 5.49001 9.85C5.5802 9.84605 5.66746 9.81675 5.74175 9.76545C5.81604 9.71415 5.87436 9.64294 5.91001 9.56C5.95213 9.46823 5.96606 9.36603 5.95004 9.26633C5.93402 9.16664 5.88876 9.07395 5.82001 9C5.40797 8.58481 5.17468 8.02492 5.17001 7.44C5.1649 7.14801 5.21797 6.85792 5.32613 6.58665C5.4343 6.31538 5.59539 6.06836 5.80001 5.86C6.00616 5.65379 6.25092 5.49021 6.52031 5.3786C6.78969 5.267 7.07842 5.20955 7.37001 5.20955C7.6616 5.20955 7.95033 5.267 8.21971 5.3786C8.4891 5.49021 8.73385 5.65379 8.94001 5.86C9.01201 5.9285 9.10041 5.97735 9.19672 6.00187C9.29303 6.02638 9.39402 6.02574 9.49001 6C9.57752 5.95207 9.65169 5.88308 9.70582 5.79927C9.75995 5.71546 9.79232 5.61947 9.80001 5.52C9.79973 4.92989 10.0293 4.36287 10.4399 3.93912C10.8506 3.51537 11.4102 3.2682 12 3.25C12.2915 3.25261 12.5797 3.31263 12.8481 3.42662C13.1164 3.5406 13.3597 3.70633 13.564 3.91434C13.7682 4.12234 13.9296 4.36855 14.0387 4.63891C14.1478 4.90926 14.2026 5.19846 14.2 5.49C14.2038 5.5815 14.2317 5.67038 14.2809 5.74764C14.33 5.8249 14.3987 5.88781 14.48 5.93C14.5683 5.96241 14.6639 5.96927 14.7558 5.94982C14.8478 5.93036 14.9324 5.88537 15 5.82C15.4152 5.40796 15.9751 5.17467 16.56 5.17C16.8525 5.16083 17.1438 5.21204 17.4156 5.32044C17.6875 5.42883 17.9341 5.59208 18.14 5.8C18.3462 6.00615 18.5098 6.25091 18.6214 6.5203C18.733 6.78968 18.7905 7.07841 18.7905 7.37C18.7905 7.66159 18.733 7.95032 18.6214 8.2197C18.5098 8.48909 18.3462 8.73385 18.14 8.94C18.0767 9.01489 18.0333 9.10463 18.0141 9.20082C17.9949 9.29701 18.0003 9.3965 18.03 9.49C18.0779 9.57751 18.1469 9.65168 18.2307 9.70581C18.3145 9.75994 18.4105 9.79231 18.51 9.8C19.0949 9.80745 19.6544 10.0404 20.0717 10.4503C20.489 10.8602 20.732 11.4153 20.75 12C20.7474 12.2915 20.6874 12.5797 20.5734 12.848C20.4594 13.1164 20.2937 13.3597 20.0857 13.5639C19.8777 13.7682 19.6315 13.9296 19.3611 14.0387C19.0907 14.1478 18.8015 14.2026 18.51 14.2C18.4185 14.2038 18.3296 14.2317 18.2524 14.2809C18.1751 14.33 18.1122 14.3987 18.07 14.48C18.0376 14.5683 18.0307 14.6638 18.0502 14.7558C18.0696 14.8478 18.1146 14.9324 18.18 15C18.5921 15.4152 18.8253 15.9751 18.83 16.56C18.8351 16.852 18.782 17.1421 18.6739 17.4133C18.5657 17.6846 18.4046 17.9316 18.2 18.14C17.9939 18.3462 17.7491 18.5098 17.4797 18.6214C17.2103 18.733 16.9216 18.7904 16.63 18.7904C16.3384 18.7904 16.0497 18.733 15.7803 18.6214C15.5109 18.5098 15.2662 18.3462 15.06 18.14C14.9924 18.0746 14.9078 18.0296 14.8158 18.0102C14.7239 17.9907 14.6283 17.9976 14.54 18.03C14.4556 18.0787 14.3854 18.1486 14.3363 18.2328C14.2872 18.317 14.2609 18.4125 14.26 18.51C14.2526 19.0949 14.0196 19.6544 13.6097 20.0717C13.1998 20.489 12.6447 20.732 12.06 20.75ZM9.35001 16.54C9.61524 16.5369 9.87797 16.5915 10.12 16.7C10.4772 16.8489 10.7835 17.0982 11.0018 17.4177C11.2202 17.7372 11.3411 18.1131 11.35 18.5C11.3472 18.6929 11.4199 18.8792 11.5525 19.0193C11.6852 19.1594 11.8673 19.2422 12.06 19.25C12.2527 19.2348 12.4324 19.1466 12.5625 19.0036C12.6925 18.8605 12.7632 18.6733 12.76 18.48C12.7624 18.0918 12.8744 17.7121 13.0832 17.3848C13.292 17.0575 13.589 16.7958 13.94 16.63C14.3052 16.4781 14.7072 16.4379 15.0952 16.5144C15.4832 16.5909 15.8399 16.7808 16.12 17.06C16.2526 17.1926 16.4325 17.2671 16.62 17.2671C16.8075 17.2671 16.9874 17.1926 17.12 17.06C17.2526 16.9274 17.3271 16.7475 17.3271 16.56C17.3271 16.3725 17.2526 16.1926 17.12 16.06C16.8425 15.7788 16.6545 15.4216 16.5798 15.0336C16.505 14.6456 16.5469 14.2442 16.7 13.88C16.8577 13.5291 17.1133 13.2311 17.4362 13.0218C17.759 12.8126 18.1353 12.7008 18.52 12.7C18.7103 12.7028 18.8941 12.6311 19.0323 12.5004C19.1705 12.3696 19.2522 12.1901 19.26 12C19.2472 11.8064 19.1597 11.6253 19.0162 11.4947C18.8726 11.3642 18.684 11.2944 18.49 11.3C18.0986 11.2894 17.7179 11.1695 17.391 10.9539C17.0641 10.7383 16.804 10.4356 16.64 10.08C16.4903 9.71114 16.4513 9.30669 16.5277 8.91602C16.604 8.52535 16.7925 8.16536 17.07 7.88C17.1357 7.81434 17.1878 7.73639 17.2233 7.6506C17.2588 7.56481 17.2771 7.47286 17.2771 7.38C17.2771 7.28714 17.2588 7.19519 17.2233 7.1094C17.1878 7.02361 17.1357 6.94566 17.07 6.88C17.0043 6.81434 16.9264 6.76225 16.8406 6.72672C16.7548 6.69118 16.6629 6.67289 16.57 6.67289C16.4772 6.67289 16.3852 6.69118 16.2994 6.72672C16.2136 6.76225 16.1357 6.81434 16.07 6.88C15.7889 7.14113 15.4385 7.31587 15.0608 7.38337C14.6831 7.45088 14.2939 7.4083 13.9397 7.26072C13.5855 7.11314 13.2812 6.86679 13.0632 6.55105C12.8452 6.2353 12.7226 5.86351 12.71 5.48C12.7128 5.28976 12.6412 5.10595 12.5104 4.96773C12.3797 4.82951 12.2001 4.7478 12.01 4.74C11.8164 4.75286 11.6353 4.84026 11.5047 4.98385C11.3742 5.12744 11.3044 5.31603 11.31 5.51C11.2994 5.90145 11.1795 6.28212 10.9639 6.60903C10.7483 6.93593 10.4456 7.19605 10.09 7.36C9.72115 7.50966 9.3167 7.54869 8.92603 7.47233C8.53536 7.39598 8.17537 7.20753 7.89001 6.93C7.82435 6.86434 7.7464 6.81225 7.66061 6.77672C7.57482 6.74118 7.48287 6.72289 7.39001 6.72289C7.29715 6.72289 7.2052 6.74118 7.11941 6.77672C7.03362 6.81225 6.95567 6.86434 6.89001 6.93C6.82435 6.99566 6.77226 7.07361 6.73673 7.1594C6.70119 7.24519 6.6829 7.33714 6.6829 7.43C6.6829 7.52286 6.70119 7.61481 6.73673 7.7006C6.77226 7.78639 6.82435 7.86434 6.89001 7.93C7.16585 8.21235 7.35197 8.57002 7.42493 8.95795C7.49789 9.34588 7.45443 9.74673 7.30001 10.11C7.15113 10.4672 6.90183 10.7735 6.58234 10.9918C6.26284 11.2101 5.88687 11.3311 5.50001 11.34C5.30712 11.3372 5.12077 11.4099 4.98067 11.5425C4.84058 11.6752 4.75781 11.8572 4.75001 12.05C4.76525 12.2427 4.85336 12.4224 4.99641 12.5525C5.13947 12.6825 5.3267 12.7531 5.52001 12.75C5.90823 12.7524 6.28788 12.8644 6.6152 13.0732C6.94251 13.282 7.20417 13.579 7.37001 13.93C7.52192 14.2952 7.56215 14.6972 7.48561 15.0852C7.40907 15.4732 7.2192 15.8299 6.94001 16.11C6.87435 16.1757 6.82226 16.2536 6.78673 16.3394C6.75119 16.4252 6.7329 16.5171 6.7329 16.61C6.7329 16.7029 6.75119 16.7948 6.78673 16.8806C6.82226 16.9664 6.87435 17.0443 6.94001 17.11C7.00567 17.1757 7.08362 17.2277 7.16941 17.2633C7.2552 17.2988 7.34715 17.3171 7.44001 17.3171C7.53287 17.3171 7.62482 17.2988 7.71061 17.2633C7.7964 17.2277 7.87435 17.1757 7.94001 17.11C8.3201 16.7471 8.82451 16.5432 9.35001 16.54Z" fill="#000000"></path> </g></svg>       
                                               <div className="mt-1">
                                                    Settings
                                                </div>
                                            </div>
                                        </span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                        </svg>
                                        </button>
                                    </h2>
                                    <div id="accordion-flush-body-5" className="hidden" aria-labelledby="accordion-flush-heading-5">
                                        <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                                            <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                                            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                                                <li><a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                                                <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}