import React from 'react';
import { Link } from '@inertiajs/react'
export const RenterFooter = () => {
    return (
        <>
            <footer className="bg-main-color shadow dark:bg-gray-900 ">
                <div className="md:block hidden justify-start ml-5">  
                    <img src="/img/logo.png" className="ml-5" width="150px" alt=""/>
                </div>
                <div className="lg-hidden block p-5">
                </div>
                <div className="min-h-32 bg-main-color flex justify-center py-5 mb-3 ">
                    <div className="grid grid-cols-3 gap-1 md:gap-3 lg:gap-4">
                        <div className="text-center text-white px-10 sm:col-span-1 col-span-3">
                            <div className="mb-3 text-xl lg:text-2xl">
                                ParkIT
                            </div>
                            <ul className="text-sm md:text-lg lg:text:xl">
                                <li className="py-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="/aboutus">
                                        About Us
                                    </Link>
                                </li>
                                <li className="py-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="">
                                        Why Choose Us
                                    </Link>
                                </li>
                                <li className="py-1 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="">
                                        Our Story
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center text-white px-10 sm:col-span-1 col-span-3">
                            <div className="mb-3 text-xl lg:text-2xl">
                                Support
                            </div>
                            <ul className="text-sm md:text-lg lg:text:xl">
                                <li className="py-1 transition ease-out duration-200 hover:scale-110" >
                                    <Link href="/support">
                                        Support
                                    </Link>
                                </li>
                                <li className="py-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="/contactus">
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="py-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="/driverfaq">
                                        Driver FAQs
                                    </Link>
                                </li>
                                <li className="py-2 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="/spaceownerfaq">
                                        Space Owner FAQs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center text-white px-10 sm:col-span-1 col-span-3">
                            <div className="mb-3 text-xl lg:text-2xl">
                                Terms
                            </div>
                            <ul className="text-sm md:text-lg lg:text:xl">
                                <li className="py-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="">
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li className="py-1 pb-5 sm-pb-1 transition ease-out duration-200 hover:scale-110">
                                    <Link href="privacypolicy">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="h-24 bg-[#47B5FF]">
                    <div className="flex items-center justify-center h-full">
                        <a href="">
                            <img src="/img/socials/facebook.png" className="p-2 transition ease-in duration-200 hover:scale-110" width="65px" alt=""/>
                        </a>
                        <a href="">
                            <img src="/img/socials/instagram.png" className="p-2 transition ease-in duration-200 hover:scale-110" width="70px"  alt=""/>
                        </a>
                        <a href="">
                            <img src="/img/socials/tiktok.png" className="p-2 transition ease-in duration-200 hover:scale-110" width="50px"   alt=""/>
                        </a>
                    </div>
                </div>
                <span className="block text-sm text-gray-500 text-center dark:text-gray-400 py-4">
                    © 2024 ParkIT . All Rights Reserved.
                </span>
            </footer>
        </>
    )
};