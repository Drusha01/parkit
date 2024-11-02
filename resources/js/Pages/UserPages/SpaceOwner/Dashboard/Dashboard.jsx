import React from 'react'
import { Link, usePage } from '@inertiajs/react'

import { SpaceOwnerLayout } from '../../../../Layout/SpaceOwnerLayout.jsx';

export default function Dashboard(data) {
    return (
        <>
            <SpaceOwnerLayout>
                <main className="ml-[300px] h-full text-white">
                    <nav className=" border border-gray-200">
                        <ul className="flex py-2 text-black ml-2 ">
                            <li className="flex gap-3 align-middle font-semibold mt-1 text-md lg:text-lg ml-3">
                                <Link href="/spaceowner/dashboard">
                                    Home 
                                </Link>
                                <svg fill="#000000" className="align-middle mt-2 w-[10px] h-[10px] lg:w-[12px] lg:h-[12px]" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M441.749,240.917L207.082,6.251C203.093,2.24,197.674,0,191.999,0H85.333c-8.619,0-16.427,5.184-19.712,13.163 c-3.307,7.979-1.472,17.152,4.629,23.253L289.834,256L70.25,475.584c-6.101,6.101-7.936,15.275-4.629,23.253 C68.906,506.816,76.714,512,85.333,512H192c5.675,0,11.093-2.24,15.083-6.251L441.75,271.082 C450.09,262.741,450.09,249.259,441.749,240.917z"></path> </g> </g> </g></svg> 
                            </li>
                            <li className="flex gap-3 align-middle font-semibold mt-1 text-md lg:text-lg ml-3">
                                <Link href="/spaceowner/dashboard">
                                    Dashboard 
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="w-50 text-black flex justify-between">
                        <div className="m-5 text-md lg:text-xl font-semibold">   
                            Dashboard
                        </div>
                    </div>
                </main>
            </SpaceOwnerLayout>
        </>
    )
  }