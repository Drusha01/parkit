import {React, useState } from 'react';
import { Link, usePage } from '@inertiajs/react'
import { NavLink } from 'react-router-dom';
import {RenterHeaderNav} from './RenterHeaderNav.jsx';
let isOpen = false
export const RenterHeader = (props) => {
    const [spaces,setSpaces] = useState(usePage().props.spaces)
    const [user,setUser] = useState(usePage().props.auth)
    return (
        <>
            <header>
                <nav className="bg-main-color h-[80px] text-white fixed top-0 left-0 w-full z-50 shadow-2xl" >
                    <div className="w-full flex h-full">
                        <div className="flex justify-start items-center w-1/5 h-full">
                            <Link href="/">
                                <img src="/img/logo.png" className="ml-5" width="100px" alt=""/>
                            </Link>
                        </div>
                        <div className="items-center hidden lg:flex justify-center w-3/5"> 
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
                                <li className="px-5 font-semibold transition ease-in duration-200 hover:scale-110">
                                    <Link href="/spaceowner/dashboard">
                                        {spaces.length > 0 ? "My Parking Spaces" :"Be a space Owner"}
                                    </Link>
                                </li>
                            </ul>
                        </div>  
                        <RenterHeaderNav ></RenterHeaderNav>
                    </div>
                </nav>
            </header>
        </>
    )
}